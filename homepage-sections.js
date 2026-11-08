"use strict";
(() => {
 const groups=window.AI_DISCOVERY_GROUPS || [];
 const source=typeof top100Tools!=="undefined" ? top100Tools : [];
 for(const group of groups){
   const count=source.filter(tool=>window.aiDiscoveryMatches(tool,group)).length;
   const el=document.querySelector(`[data-group-count="${group.slug}"]`);
   if(el){el.textContent=String(count);el.parentElement.lastChild.textContent=count===1?' tool':' tools';}
 }
 document.querySelectorAll('[data-brand-logo]').forEach(element=>{
   const slug=element.dataset.brandLogo;
   const known={chatgpt:'chatgpt.com',claude:'claude.ai',gemini:'gemini.google.com',perplexity:'perplexity.ai',deepseek:'deepseek.com'};
   if(!known[slug])return;
   const img=document.createElement('img');img.alt='';img.width=32;img.height=32;img.loading='lazy';img.decoding='async';
   img.onload=()=>element.replaceChildren(img); // Preserve the readable fallback letter until loading succeeds.
   img.onerror=()=>{};
   img.src='https://www.google.com/s2/favicons?domain='+encodeURIComponent(known[slug])+'&sz=64';
 });
 for(const button of document.querySelectorAll('.share-insight')){
   button.addEventListener('click',async()=>{
     const title=button.dataset.shareTitle+' — source research';const url=button.dataset.shareUrl;
     try{if(navigator.share)await navigator.share({title,url});else if(navigator.clipboard){await navigator.clipboard.writeText(url);button.textContent='Copied ✓';}
       else window.prompt('Copy the source link:',url);
     }catch(error){if(error.name!=='AbortError')window.prompt('Copy the source link:',url);}
   });
 }
})();
