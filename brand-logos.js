// Browser-safe brand favicons sourced from each product's official website domain.
// If image fetching is unavailable, the card displays a branded letter fallback.
'use strict';
const logoEscape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function officialHost(url){try {const u=new URL(url);return u.protocol==='https:'?u.hostname.replace(/^www\./,''):'';} catch{return '';}}
function toolSlug(name){return String(name).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
const staticProfileSlugs=new Set(["chatgpt", "claude", "gemini", "perplexity", "midjourney", "canva", "runway", "elevenlabs", "cursor", "gamma", "notebooklm", "adobe-firefly", "deepseek"]);
function toolDetailsUrl(item){const s=toolSlug(item.name);return staticProfileSlugs.has(s)?'/tools/'+encodeURIComponent(s)+'/':'/tool.html?tool='+encodeURIComponent(s);}
function brandLogoMarkup(item, extraClass=''){
 const domain=officialHost(item.url);
 const main=domain?'https://www.google.com/s2/favicons?domain='+encodeURIComponent(domain)+'&sz=128':'';
 const backup=domain?'https://icons.duckduckgo.com/ip3/'+encodeURIComponent(domain)+'.ico':'';
 const fallback=String(item.name||'?').trim().charAt(0).toUpperCase();
 const color=item.color||'#f2efff';
 return `<span class="brand-logo ${logoEscape(extraClass)}" style="--logo-bg:${logoEscape(color)}" aria-hidden="true"><img class="brand-logo-img" src="${logoEscape(main)}" data-logo data-backup="${logoEscape(backup)}" loading="lazy" alt="" referrerpolicy="no-referrer" /><span class="brand-logo-fallback">${logoEscape(fallback)}</span></span>`;
}
document.addEventListener('load', event => {
 const image=event.target;
 if(image instanceof HTMLImageElement && image.hasAttribute('data-logo')) image.closest('.brand-logo')?.classList.add('logo-loaded');
}, true);
document.addEventListener('error', event => {
 const image=event.target;
 if(!(image instanceof HTMLImageElement)||!image.hasAttribute('data-logo'))return;
 if(!image.dataset.secondAttempt && image.dataset.backup){image.dataset.secondAttempt='true';image.src=image.dataset.backup;}
 else image.closest('.brand-logo')?.classList.add('logo-failed');
},true);
