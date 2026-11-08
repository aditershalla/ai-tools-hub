// Explicit POST confirmation prevents email security scanners from subscribing by merely visiting a link.
import {getSetup,sha,newToken,sendMail} from '../api/newsletter.js';
const headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow',
 'Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"};
const page=(title,body,status=200)=>new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | AI Tools Hub</title><style>body{background:#f7f7ff;color:#1e2845;font-family:system-ui;margin:0;display:grid;place-items:center;min-height:100vh;padding:20px}.box{max-width:580px;background:white;border:1px solid #e6e0ff;border-radius:20px;padding:32px;box-shadow:0 17px 42px #6355a81c}a{color:#5f4ad7}button{background:#6a54e8;color:white;padding:14px 20px;border:0;border-radius:10px;cursor:pointer;font-weight:700}</style></head><body><main class="box"><h1>${title}</h1>${body}<p><a href="/">Back to AI Tools Hub</a></p></main></body></html>`,{status,headers});
const safeToken=token=>typeof token==='string'&&/^[a-f0-9]{64}$/.test(token);
export function onRequestGet({request,env}){
 const token=new URL(request.url).searchParams.get('token');
 if(!getSetup(env)||!safeToken(token))return page('Confirmation unavailable','<p>This confirmation link is invalid or subscriptions are not configured.</p>',400);
 return page('Confirm your subscription',`<p>Only confirm if you requested email updates from AI Tools Hub.</p><form method="POST"><input type="hidden" name="token" value="${token}"><button type="submit">Confirm subscription</button></form>`);
}
export async function onRequestPost({request,env}){
 if(!getSetup(env))return page('Confirmation unavailable','<p>The service is not configured.</p>',503);
 if(request.headers.get('Origin')&&request.headers.get('Origin')!==new URL(request.url).origin)return page('Invalid request','<p>Return to the website.</p>',403);
 let token;try{const data=await request.formData();token=data.get('token')}catch{}
 if(!safeToken(token))return page('Invalid link','<p>This confirmation link is invalid.</p>',400);
 const key='newsletter:pending:'+(await sha(token));
 const raw=await env.NEWSLETTER_KV.get(key);
 if(!raw)return page('Link expired','<p>This confirmation link has expired or was already used.</p>',410);
 let pending;try{pending=JSON.parse(raw)}catch{return page('Invalid subscription','<p>Could not verify the pending request.</p>',400)}
 const email=pending.email,emailHash=await sha(email);
 const unsubToken=newToken(),unsubHash=await sha(unsubToken);
 const days=Number(env.NEWSLETTER_TTL_DAYS),ttl=days*86400;
 const url=new URL(request.url).origin+'/newsletter/unsubscribe?token='+unsubToken;
 const activeKey='newsletter:active:'+emailHash,unsubKey='newsletter:unsubscribe:'+unsubHash;
 try{
  await env.NEWSLETTER_KV.put(activeKey,JSON.stringify({email,confirmedAt:new Date().toISOString(),unsubscribeHash:unsubHash,consent:true}),{expirationTtl:ttl});
  await env.NEWSLETTER_KV.put(unsubKey,emailHash,{expirationTtl:ttl});
  const sent=await sendMail(env,{to:email,type:'welcome',subject:'Welcome to AI Tools Hub — your subscription is confirmed',
   text:`You're subscribed to AI Tools Hub. Unsubscribe at any time: ${url}`,
   html:`<p>Your AI Tools Hub subscription is active.</p><p><a href="${url}">Unsubscribe at any time</a></p>`});
  if(!sent){await env.NEWSLETTER_KV.delete(activeKey);await env.NEWSLETTER_KV.delete(unsubKey);return page('Email delivery unavailable','<p>We could not finish confirmation. Please try the confirmation link again.</p>',503)}
  await env.NEWSLETTER_KV.delete(key);
  return page('Subscription confirmed','<p>Your email subscription is now active. A welcome message with your private unsubscribe link has been sent.</p>');
 }catch{
  try{await env.NEWSLETTER_KV.delete(activeKey);await env.NEWSLETTER_KV.delete(unsubKey)}catch{}
  return page('Subscription unavailable','<p>Could not activate the subscription. Please try again later.</p>',503);
 }
}
