import {getSetup,sha} from '../api/newsletter.js';
const headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"};
const page=(title,body,status=200)=>new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | AI Tools Hub</title><style>body{background:#f7f7ff;color:#1e2845;font-family:system-ui;margin:0;display:grid;place-items:center;min-height:100vh;padding:20px}.box{max-width:580px;background:white;border:1px solid #e6e0ff;border-radius:20px;padding:32px;box-shadow:0 17px 42px #6355a81c}a{color:#5f4ad7}button{background:#6a54e8;color:white;padding:14px 20px;border:0;border-radius:10px;cursor:pointer;font-weight:700}</style></head><body><main class="box"><h1>${title}</h1>${body}<p><a href="/">Back to AI Tools Hub</a></p></main></body></html>`,{status,headers});
const safe=token=>typeof token==='string'&&/^[a-f0-9]{64}$/.test(token);
export function onRequestGet({request,env}){
 const token=new URL(request.url).searchParams.get('token');
 if(!getSetup(env)||!safe(token))return page('Unsubscribe unavailable','<p>The link is invalid or subscriptions are not configured.</p>',400);
 return page('Unsubscribe',`<p>Do you want to stop receiving AI Tools Hub updates? This will delete your subscriber record.</p><form method="POST"><input type="hidden" name="token" value="${token}"><button type="submit">Unsubscribe me</button></form>`);
}
export async function onRequestPost({request,env}){
 if(!getSetup(env))return page('Unsubscribe unavailable','<p>Newsletter storage is not configured.</p>',503);
 if(request.headers.get('Origin')&&request.headers.get('Origin')!==new URL(request.url).origin)return page('Invalid request','<p>Please use your email unsubscribe link.</p>',403);
 let token;try{const data=await request.formData();token=data.get('token')}catch{}
 if(!safe(token))return page('Invalid link','<p>The unsubscribe link is invalid.</p>',400);
 const key='newsletter:unsubscribe:'+(await sha(token));
 try{
  const emailHash=await env.NEWSLETTER_KV.get(key);
  if(!emailHash)return page('Not subscribed','<p>This link is expired or the subscription was already removed.</p>');
  await env.NEWSLETTER_KV.delete('newsletter:active:'+emailHash);
  await env.NEWSLETTER_KV.delete(key);
  return page('You are unsubscribed','<p>Your subscription record has been deleted. You will not receive future AI Tools Hub newsletters.</p>');
 }catch{return page('Unsubscribe failed','<p>The request could not be completed. Please try again.</p>',503)}
}
