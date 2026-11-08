'use strict';
(() => {
 const form=document.getElementById('newsletter-form');if(!form)return;
 const submit=document.getElementById('newsletter-submit'),email=document.getElementById('newsletter-email');
 const status=document.getElementById('newsletter-status'),challenge=document.getElementById('newsletter-turnstile');
 let widget=null;
 function inform(message,kind=''){status.textContent=message;status.className='newsletter-status'+(kind?' '+kind:'');}
 const buttonDefault='Subscribe for Free ↗';
 async function setup(){
  submit.disabled=true;
  try{
   const response=await fetch('/api/newsletter',{headers:{Accept:'application/json'},cache:'no-store'});
   const config=await response.json();
   if(!response.ok||!config.available||!config.sitekey){inform(config.message||'Newsletter signup is not configured yet. No email addresses are being collected.');return;}
   const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;
   script.onload=()=>{try{widget=window.turnstile.render(challenge,{sitekey:config.sitekey,theme:'light'});submit.disabled=false;inform('Secure signup is ready. You will need to confirm your email before receiving updates.');}catch{inform('Anti-spam verification could not load. No email addresses were saved.','error')}};
   script.onerror=()=>inform('Anti-spam verification is unavailable. Newsletter signup is disabled.','error');
   document.head.appendChild(script);
  }catch{inform('Newsletter signup is unavailable. No email address was submitted through this form.','error')}
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(submit.disabled)return;
  if(!email.checkValidity()){email.reportValidity();return;}
  const consent=form.querySelector('#newsletter-agree');if(!consent.checked){consent.reportValidity();return;}
  const token=typeof window.turnstile?.getResponse==='function'?window.turnstile.getResponse(widget):'';
  if(!token){inform('Complete the anti-spam verification to continue.','error');return}
  submit.disabled=true;submit.textContent='Preparing…';inform('Sending your confirmation email…');
  try{
   const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),16000);
   let response;try{response=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email.value,consent:consent.checked,website:form.querySelector('#newsletter-website').value,turnstile:token}),signal:controller.signal});}
   finally{clearTimeout(timeout)}
   const result=await response.json().catch(()=>({}));
   if(!response.ok||!result.ok)throw new Error(result.error||'Signup failed. No subscription was activated.');
   inform(result.message||'Check your email to confirm your subscription.','success');form.reset();
  }catch(error){inform(error.name==='AbortError'?'Request timed out. Please check your inbox before trying again.':(error.message||'Signup unavailable.'),'error')}
  finally{submit.disabled=false;submit.textContent=buttonDefault;if(typeof window.turnstile?.reset==='function'&&widget!==null)window.turnstile.reset(widget)}
 });
 setup();
})();
