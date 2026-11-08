'use strict';
(() => {
 const form=document.getElementById('contact-form');if(!form)return;
 const status=document.getElementById('contact-status');
 const send=document.getElementById('contact-send');
 const challenge=document.getElementById('contact-challenge');
 let widget=null;
 const inform=(message,isError=false)=>{status.textContent=message;status.setAttribute('role',isError?'alert':'status');status.classList.toggle('contact-error',isError)};
 function loadWidget(sitekey){
   const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;
   script.onload=()=>{try{widget=window.turnstile.render(challenge,{sitekey,theme:'light'});send.disabled=false;inform('The form is ready. Anti-spam verification is required before sending.');}catch{inform('Anti-spam verification could not load. No messages can be sent.',true)}};
   script.onerror=()=>inform('Anti-spam protection is unavailable; the form cannot be submitted.',true);
   document.head.appendChild(script);
 }
 async function setup(){
  send.disabled=true;
  try{
   const response=await fetch('/api/contact',{headers:{'Accept':'application/json'},cache:'no-store'});
   const config=await response.json();
   if(!response.ok||!config.available||!config.sitekey){inform(config.message||'Private contact is not yet configured. You can report non-sensitive issues through public GitHub Issues.');return;}
   loadWidget(config.sitekey);
  }catch{inform('The form is currently unavailable. No details have been submitted.',true)}
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(send.disabled||!form.reportValidity())return;
  const data=new FormData(form);
  const token=typeof window.turnstile?.getResponse==='function'?window.turnstile.getResponse(widget):'';
  if(!token){inform('Please complete the anti-spam check.',true);return;}
  const payload={name:data.get('name'),email:data.get('email'),category:data.get('category'),subject:data.get('subject'),message:data.get('message'),website:data.get('website'),consent:data.get('consent')==='yes',turnstile:token};
  send.disabled=true;send.textContent='Sending…';inform('Sending your message securely…');
  try{
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
   let response;try{response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});}
   finally{clearTimeout(timeout)}
   const result=await response.json().catch(()=>({}));
   if(!response.ok||!result.ok)throw new Error(result.error||'The message was not saved.');
   inform(result.message||'Message received.');form.reset();
  }catch(error){inform(error?.name==='AbortError'?'The request timed out. Please verify before resending.':(error?.message||'Message not sent.'),true)}
  finally{send.disabled=false;send.textContent='Send message';if(typeof window.turnstile?.reset==='function'&&widget!==null)window.turnstile.reset(widget)}
 });
 setup();
})();
