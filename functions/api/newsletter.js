// Cloudflare Pages Functions /api/newsletter — secure, double opt-in preparation.
// No addresses can be accepted until the owner explicitly configures all bindings.
// NEWSLETTER_KV: private KV namespace, NEWSLETTER_TTL_DAYS: owner-approved 1..365,
// NEWSLETTER_TURNSTILE_SITEKEY / NEWSLETTER_TURNSTILE_SECRET: free Turnstile keys,
// NEWSLETTER_MAILER: an owner-approved Worker service binding implementing POST /send.
// NOTE: Workers Free does not support arbitrary-recipient outbound email on its own.
const HEADERS={"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:HEADERS});
const clean=value=>typeof value==="string"?value.trim():"";
export const getSetup=env=>{
 const days=Number(env?.NEWSLETTER_TTL_DAYS);
 return !!(env?.NEWSLETTER_KV && typeof env.NEWSLETTER_KV.put==='function' && typeof env.NEWSLETTER_KV.get==='function' && typeof env.NEWSLETTER_KV.delete==='function' &&
 typeof env?.NEWSLETTER_MAILER?.fetch==='function' &&
 typeof env.NEWSLETTER_TURNSTILE_SITEKEY==='string' && env.NEWSLETTER_TURNSTILE_SITEKEY.length>10 &&
 typeof env.NEWSLETTER_TURNSTILE_SECRET==='string' && env.NEWSLETTER_TURNSTILE_SECRET.length>10 &&
 Number.isInteger(days) && days>=1 && days<=365);
};
export const sha=async input=>{
 const bytes=new TextEncoder().encode(input);
 const digest=await crypto.subtle.digest('SHA-256',bytes);
 return Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
};
export const newToken=()=>{
 const bytes=crypto.getRandomValues(new Uint8Array(32));
 return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
};
export async function sendMail(env,message){
 // A service binding returns HTTP response only if the owner's approved mail delivery Worker succeeds.
 // Do not accept a newsletter subscription if there is no verified email delivery.
 const response=await env.NEWSLETTER_MAILER.fetch('https://newsletter-mailer.internal/send',{
  method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(message)
 });
 return response.ok;
}
const EMAIL=/^[^\s@<>]{1,64}@[^\s@<>]+\.[^\s@<>]{2,}$/;
export function onRequestGet({env}){
 const available=getSetup(env);
 return json({available,sitekey:available?env.NEWSLETTER_TURNSTILE_SITEKEY:null,
  message:available?'Secure newsletter signup is available. Confirmation by email is required.':
  'Newsletter subscriptions are not yet active. No email addresses are being collected.'});
}
export async function onRequestPost({request,env}){
 if(!getSetup(env))return json({error:'Newsletter signup is not configured. Nothing has been saved.'},503);
 if(request.headers.get('Origin')!==new URL(request.url).origin)return json({error:'Submit this form from the website.'},403);
 if(!(request.headers.get('Content-Type')||'').toLowerCase().startsWith('application/json'))return json({error:'Expected JSON.'},415);
 if(Number(request.headers.get('Content-Length')||0)>5000)return json({error:'Request too large.'},413);
 let data;try{const body=await request.text();if(body.length>5000)return json({error:'Request too large.'},413);data=JSON.parse(body)}catch{return json({error:'Invalid request.'},400)}
 if(!data||typeof data!=='object'||Array.isArray(data))return json({error:'Invalid form.'},400);
 if(clean(data.website))return json({ok:true,message:'If the request is valid, check your email for a confirmation link.'});
 const email=clean(data.email).toLowerCase();
 if(email.length>254||!EMAIL.test(email))return json({error:'Enter a valid email address.'},422);
 if(data.consent!==true)return json({error:'Newsletter consent is required.'},422);
 const captcha=clean(data.turnstile);
 if(!captcha||captcha.length>2048)return json({error:'Complete the anti-spam check.'},422);
 try{
  const form=new URLSearchParams({secret:env.NEWSLETTER_TURNSTILE_SECRET,response:captcha});
  const ip=request.headers.get('CF-Connecting-IP');if(ip)form.set('remoteip',ip);
  const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:form});
  if(!check.ok)return json({error:'Anti-spam verification is unavailable. Nothing was saved.'},503);
  const result=await check.json();if(!result.success)return json({error:'Anti-spam verification failed.'},422);
 }catch{return json({error:'Anti-spam verification is unavailable. Nothing was saved.'},503)}
 const hash=await sha(email);
 if(await env.NEWSLETTER_KV.get('newsletter:active:'+hash))return json({ok:true,message:'If this email is not already subscribed, you will receive a confirmation link.'});
 if(await env.NEWSLETTER_KV.get('newsletter:cooldown:'+hash))return json({ok:true,message:'If a confirmation is pending, please check your inbox before trying again.'});
 const token=newToken(), tokenHash=await sha(token),origin=new URL(request.url).origin;
 const confirm=origin+'/newsletter/confirm?token='+encodeURIComponent(token);
 const pendingKey='newsletter:pending:'+tokenHash;
 try{
  await env.NEWSLETTER_KV.put(pendingKey,JSON.stringify({email,createdAt:new Date().toISOString(),consent:true}),{expirationTtl:86400});
  const sent=await sendMail(env,{
   to:email,type:'confirm',subject:'Confirm your AI Tools Hub newsletter subscription',
   text:`You asked to receive the AI Tools Hub newsletter. To confirm, open this link and press Confirm: ${confirm}\nIf you did not request this, ignore this email. This link expires in 24 hours.`,
   html:`<p>Please confirm your request to receive AI Tools Hub updates.</p><p><a href="${confirm}">Confirm my subscription</a></p><p>If you did not request this, ignore this email. The link expires in 24 hours.</p>`
  });
  if(!sent){await env.NEWSLETTER_KV.delete(pendingKey);return json({error:'Confirmation email could not be delivered. Nothing was subscribed.'},503)}
  await env.NEWSLETTER_KV.put('newsletter:cooldown:'+hash,'1',{expirationTtl:300});
  return json({ok:true,message:'Check your email. Your subscription is not active until you confirm it.'});
 }catch{
  try{await env.NEWSLETTER_KV.delete(pendingKey)}catch{}
  return json({error:'Subscription could not be prepared. Nothing was activated.'},503);
 }
}
