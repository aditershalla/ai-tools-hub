// Pages Function: private contact submissions. No emails or third-party services required.
// Safe by default: accepting submissions requires ALL four owner-controlled settings:
// CONTACT_INBOX (Workers KV binding), CONTACT_TURNSTILE_SITEKEY (public env variable),
// CONTACT_TURNSTILE_SECRET (encrypted secret), CONTACT_TTL_DAYS (owner-approved retention, 1-90).
// The operator reads messages privately via the Cloudflare KV dashboard; no public GitHub issues are created.
const CATEGORIES = new Set(['general', 'business', 'broken-link', 'tool-submission']);
const headers = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
function response(payload,status=200){return new Response(JSON.stringify(payload),{status,headers});}
function setup(env){
 const ttl=Number(env?.CONTACT_TTL_DAYS);
 return env?.CONTACT_INBOX && typeof env.CONTACT_INBOX.put==='function'
   && typeof env.CONTACT_TURNSTILE_SITEKEY==='string' && env.CONTACT_TURNSTILE_SITEKEY.length>10
   && typeof env.CONTACT_TURNSTILE_SECRET==='string' && env.CONTACT_TURNSTILE_SECRET.length>10
   && Number.isInteger(ttl) && ttl>=1 && ttl<=90;
}
const clean=(x)=>typeof x==='string'?x.trim():'';
export function onRequestGet({env}){
 const active=Boolean(setup(env));
 return response({available:active,sitekey:active?env.CONTACT_TURNSTILE_SITEKEY:null,
   message:active?'Private contact form is available.':'The private contact form is awaiting site-owner setup. Use the public GitHub issue tracker only for non-sensitive website reports.'});
}
export async function onRequestPost({request,env}){
 if(!setup(env))return response({error:'Private messages are not being accepted yet. No information was saved. Please use GitHub for non-sensitive website reports.'},503);
 const siteOrigin=new URL(request.url).origin;
 if(request.headers.get('Origin')!==siteOrigin)return response({error:'This form can only be submitted from this website.'},403);
 const type=request.headers.get('Content-Type')||'';
 if(!type.toLowerCase().startsWith('application/json'))return response({error:'Expected JSON content.'},415);
 if(Number(request.headers.get('Content-Length')||0)>16000)return response({error:'Message too large.'},413);
 let raw;try{raw=await request.text();if(raw.length>16000)return response({error:'Message too large.'},413);}
 catch{return response({error:'Could not read the message.'},400);}
 let data;try{data=JSON.parse(raw)}catch{return response({error:'Invalid message format.'},400)}
 if(!data||typeof data!=='object'||Array.isArray(data))return response({error:'Invalid form.'},400);
 // Honeypot: ignore automated posts without storing personal information.
 if(clean(data.website))return response({ok:true},200);
 const name=clean(data.name),email=clean(data.email),category=clean(data.category),subject=clean(data.subject),message=clean(data.message);
 const turnstile=clean(data.turnstile);
 if(name.length<2||name.length>80||/[<>\r\n]/.test(name))return response({error:'Enter a name between 2 and 80 characters.'},422);
 if(email.length>254||!(/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/).test(email))return response({error:'Enter a valid email address.'},422);
 if(!CATEGORIES.has(category))return response({error:'Select a valid inquiry category.'},422);
 if(subject.length<5||subject.length>150)return response({error:'Enter a subject between 5 and 150 characters.'},422);
 if(message.length<20||message.length>3000)return response({error:'Enter a message between 20 and 3,000 characters.'},422);
 if(data.consent!==true)return response({error:'Please acknowledge how your message will be handled.'},422);
 if(!turnstile||turnstile.length>2048)return response({error:'Complete the anti-spam verification.'},422);
 let verification;
 try{
  const body=new URLSearchParams({secret:env.CONTACT_TURNSTILE_SECRET,response:turnstile});
  const cf=request.headers.get('CF-Connecting-IP');if(cf)body.set('remoteip',cf);
  const result=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
  if(!result.ok)return response({error:'Anti-spam verification is temporarily unavailable. Nothing was saved.'},503);
  verification=await result.json();
 }catch{return response({error:'Anti-spam verification failed to connect. Nothing was saved.'},503)}
 const hostname=new URL(request.url).hostname;
 if(!verification?.success||verification.hostname!==hostname)return response({error:'Anti-spam verification failed. Please retry the challenge.'},403);
 const key='contact:'+new Date().toISOString().slice(0,10)+':'+crypto.randomUUID();
 try{
  await env.CONTACT_INBOX.put(key,JSON.stringify({name,email,category,subject,message,receivedAt:new Date().toISOString(),consent:true}),
    {expirationTtl:Number(env.CONTACT_TTL_DAYS)*86400});
 }catch(error){console.error('Contact KV storage failed:',error instanceof Error?error.name:'storage-error');return response({error:'The message was not saved. Please try again later.'},503)}
 return response({ok:true,message:'Message received securely. The site operator can review it in their private Cloudflare inbox.'},201);
}
