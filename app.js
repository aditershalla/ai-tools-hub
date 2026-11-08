'use strict';



const categories = ['All','Writing','Images','Video','Audio','Coding','Research','Presentations','Favorites'];
const toolConfigs = [
  {id:'ai',icon:'✳',label:'AI Writer',description:'Create captions, summaries, emails, and SEO text with Cloudflare AI.',tag:'Cloudflare AI'},
  {id:'words',icon:'≡',label:'Word Counter',description:'Count words, characters, sentences, and estimated reading time.',tag:'In your browser'},
  {id:'case',icon:'Aa',label:'Case Converter',description:'Change text into uppercase, lowercase, title case, or sentence case.',tag:'In your browser'},
  {id:'json',icon:'{ }',label:'JSON Formatter',description:'Format and validate JSON without sending it to a server.',tag:'In your browser'},
  {id:'password',icon:'⌘',label:'Password Maker',description:'Generate a strong random password with your chosen options.',tag:'In your browser'},
  {id:'url',icon:'↗',label:'URL Encoder',description:'Encode or decode text for safe use inside URL parameters.',tag:'In your browser'},
  {id:'clean',icon:'✧',label:'Text Cleaner',description:'Remove extra spaces and blank lines from pasted text.',tag:'In your browser'}
];
let activeCategory='All';
let searchQuery='';
let activeTool='ai';
let top100Plan='all',top100Sort='editorial',directorySort='featured';
let toastTimeout;
const $ = (selector,root=document)=>root.querySelector(selector);
const escapeHtml = (s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let favorites=new Set();
try{favorites=new Set(JSON.parse(localStorage.getItem('aihub-favorites')||'[]'));}catch{}

function notify(message){const element=$('#toast');element.textContent=message;element.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>element.classList.remove('show'),2500);}
async function copyText(text){if(!text){notify('Nothing to copy yet.');return;}try{await navigator.clipboard.writeText(text);notify('Copied to clipboard!');}catch{notify('Copy unavailable. Select the output and copy manually.');}}

function renderCategories(){const root=$('#category-filters');root.innerHTML=categories.map(c=>`<button type="button" class="${activeCategory===c?'active':''}" data-category="${c}" aria-pressed="${activeCategory===c}">${c==='Favorites'?'☆ ':''}${c}</button>`).join('');root.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{activeCategory=button.dataset.category;renderCategories();renderDirectory();}));}
function renderDirectory(){const list=directoryTools.filter(item=>{
  const categoryOk=activeCategory==='All'||(activeCategory==='Favorites'?favorites.has(item.id):item.category===activeCategory);
  const words=`${item.name} ${item.category} ${item.description}`.toLowerCase();
  return categoryOk&&words.includes(searchQuery.toLowerCase());
});
if(directorySort==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
if(directorySort==='category')list.sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
$('#directory-grid').innerHTML=list.map(item=>`<article class="directory-card"><a class="card-overlay" href="${toolDetailsUrl(item)}" aria-label="Read about ${escapeHtml(item.name)}"></a><div class="card-head">${brandLogoMarkup(item,'tool-logo')}<button class="fav-button" data-favorite="${item.id}" type="button" aria-label="${favorites.has(item.id)?'Remove '+item.name+' from favorites':'Add '+item.name+' to favorites'}" aria-pressed="${favorites.has(item.id)}">${favorites.has(item.id)?'★':'☆'}</button></div><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p></div><div class="card-foot"><span class="category-label">${escapeHtml(item.category)}</span><a class="card-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(item.name)} official website (new tab)">Official site ↗</a></div><span class="card-detail-prompt" aria-hidden="true">View overview <span>→</span></span></article>`).join('');
$('#results-count').textContent=list.length;
$('#directory-empty').hidden=list.length!==0;
$('#directory-grid').querySelectorAll('[data-favorite]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.favorite;if(favorites.has(id))favorites.delete(id);else favorites.add(id);try{localStorage.setItem('aihub-favorites',JSON.stringify([...favorites]));}catch{}renderDirectory();}));}
function updateSearch(q){searchQuery=q.trim();$('#directory-search').value=q;activeCategory='All';renderCategories();renderDirectory();}
$('#directory-search').addEventListener('input',e=>{searchQuery=e.target.value.trim();renderDirectory();});
$('#hero-search-form').addEventListener('submit',e=>{e.preventDefault();updateSearch($('#hero-search').value);$('#directory').scrollIntoView({behavior:'smooth'});});
document.querySelectorAll('[data-search]').forEach(btn=>btn.addEventListener('click',()=>{const q=btn.dataset.search;$('#hero-search').value=q;updateSearch(q);$('#directory').scrollIntoView({behavior:'smooth'});}));
$('#reset-filters').addEventListener('click',()=>{searchQuery='';activeCategory='All';$('#directory-search').value='';$('#hero-search').value='';renderCategories();renderDirectory();});
const dirSortControl=$('#directory-sort');if(dirSortControl)dirSortControl.addEventListener('change',e=>{directorySort=e.target.value;renderDirectory();});
$('#directory-count').textContent=directoryTools.length;
$('#top100-stat').textContent=top100Tools.length;
$('#featured-stat').textContent=directoryTools.length;
$('#free-stat').textContent=toolConfigs.length;
const yearEl=$('#year'); if(yearEl)yearEl.textContent=new Date().getFullYear();
renderCategories();renderDirectory();

function renderToolChooser(){const root=$('#tool-buttons');root.innerHTML=toolConfigs.map(tool=>`<button type="button" data-tool="${tool.id}" class="choose-tool ${activeTool===tool.id?'selected':''}" aria-pressed="${activeTool===tool.id}"><span class="choose-icon" aria-hidden="true">${tool.icon}</span><span>${tool.label}</span></button>`).join('');root.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>{activeTool=button.dataset.tool;renderToolChooser();renderWorkspace();}));}
const textColumns=(leftLabel='Your text',rightLabel='Result',hint='Paste or type here...')=>`<div class="workspace-columns"><div><label class="field-label" for="source-text">${leftLabel}</label><textarea id="source-text" class="tool-textarea" placeholder="${hint}"></textarea></div><div><div class="field-label">${rightLabel}</div><div id="tool-output" class="output-box placeholder">Your result will appear here.</div><div class="form-actions"><button type="button" id="copy-output" class="secondary-button">Copy result</button></div></div></div>`;
function setOutput(text, placeholder='Your result will appear here.') {const o=$('#tool-output');o.textContent=text||placeholder;o.classList.toggle('placeholder',!text);}
function bindCopy(){const button=$('#copy-output');if(button)button.addEventListener('click',()=>copyText($('#tool-output').classList.contains('placeholder')?'':$('#tool-output').textContent));}
function renderWorkspace(){const selected=toolConfigs.find(t=>t.id===activeTool);$('#workspace-heading').textContent=selected.label;$('#workspace-description').textContent=selected.description;$('#workspace-tag').textContent=selected.tag;
const body=$('#workspace-body');
if(activeTool==='ai'){
  body.innerHTML=`<div class="workspace-columns"><form id="ai-form"><label class="field-label" for="ai-mode">What do you want to create?</label><select class="tool-select" id="ai-mode"><option value="caption">Social media captions</option><option value="seo">SEO titles and meta description</option><option value="summary">Summarize text</option><option value="email">Professional email</option><option value="general">Ask AI anything</option></select><label class="field-label" for="ai-prompt">Your topic or text</label><textarea class="tool-textarea" id="ai-prompt" maxlength="1500" placeholder="Example: A fun caption for a summer boat tour in Albania..." required></textarea><div class="form-actions"><button type="submit" class="primary-button" id="ai-submit">✦ Generate with AI</button><span class="inline-info">Up to 1,500 characters</span></div></form><div><div class="field-label">Generated result</div><div class="output-box placeholder" id="tool-output" aria-live="polite">Your AI-generated content will appear here. Connect the Workers AI binding in Cloudflare to enable this feature.</div><div class="form-actions"><button type="button" id="copy-output" class="secondary-button">Copy result</button></div></div></div>`;
  bindCopy();$('#ai-form').addEventListener('submit',async e=>{e.preventDefault();const prompt=$('#ai-prompt').value.trim();const mode=$('#ai-mode').value;const button=$('#ai-submit');if(!prompt){$('#tool-output').textContent='Enter a topic or some text before generating.';$('#tool-output').classList.remove('placeholder');return;}button.disabled=true;$('#ai-form').setAttribute('aria-busy','true');button.textContent='Generating…';setOutput('Generating your result…');try{const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),40000);let response;try{response=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,prompt}),signal:controller.signal});}finally{clearTimeout(timeout);}const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||`Request failed (${response.status}).`);setOutput(data.text||'The AI returned an empty response.');}catch(err){setOutput('');$('#tool-output').textContent=err.name==='AbortError'?'The AI request took too long. Please try again.':(err.message||'An unexpected error occurred.');$('#tool-output').classList.remove('placeholder');}finally{button.disabled=false;$('#ai-form').removeAttribute('aria-busy');button.textContent='✦ Generate with AI';}});
}
else if(activeTool==='words'){
  body.innerHTML=`<div><label class="field-label" for="source-text">Your text</label><textarea id="source-text" class="tool-textarea" placeholder="Start typing or paste your text to see real-time statistics..."></textarea></div><div class="tool-grid-small" style="margin-top:15px"><div class="stat-card"><strong id="word-count">0</strong><span>Words</span></div><div class="stat-card"><strong id="char-count">0</strong><span>Characters</span></div><div class="stat-card"><strong id="sentence-count">0</strong><span>Sentences</span></div><div class="stat-card"><strong id="line-count">0</strong><span>Lines</span></div><div class="stat-card"><strong id="read-count">0</strong><span>Minutes to read</span></div><div class="stat-card"><strong id="nospace-count">0</strong><span>Without spaces</span></div></div>`;
  $('#source-text').addEventListener('input',e=>{const text=e.target.value;const words=text.trim()?text.trim().split(/\s+/u).length:0;$('#word-count').textContent=words;$('#char-count').textContent=[...text].length;$('#sentence-count').textContent=(text.match(/[.!?]+(?=\s|$)/g)||[]).length;$('#line-count').textContent=text?text.split(/\r\n|\n|\r/).length:0;$('#read-count').textContent=words?Math.max(1,Math.ceil(words/200)):0;$('#nospace-count').textContent=[...text.replace(/\s/g,'')].length;});
}
else if(activeTool==='case'){
  body.innerHTML=`<div class="form-actions" style="margin:0 0 18px"><button class="secondary-button" data-case="upper">UPPERCASE</button><button class="secondary-button" data-case="lower">lowercase</button><button class="secondary-button" data-case="title">Title Case</button><button class="secondary-button" data-case="sentence">Sentence case</button></div>`+textColumns();bindCopy();
  body.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{const input=$('#source-text').value;const mode=button.dataset.case;const result=mode==='upper'?input.toUpperCase():mode==='lower'?input.toLowerCase():mode==='title'?input.toLowerCase().replace(/\b\p{L}/gu,s=>s.toUpperCase()):input.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s*\p{L})/gu,s=>s.toUpperCase());setOutput(result);}));
}
else if(activeTool==='json'){
  body.innerHTML=textColumns('Paste JSON','Formatted JSON','{"hello":"world","count":3}')+`<div class="form-actions"><button type="button" class="primary-button" id="format-json">Format JSON</button><button type="button" class="secondary-button" id="minify-json">Minify JSON</button></div>`;bindCopy();['format-json','minify-json'].forEach(id=>$('#'+id).addEventListener('click',()=>{try{const obj=JSON.parse($('#source-text').value);setOutput(JSON.stringify(obj,null,id==='format-json'?2:0));notify('JSON is valid.');}catch(e){setOutput('Invalid JSON: '+e.message);}}));
}
else if(activeTool==='password'){
  body.innerHTML=`<div class="workspace-columns"><div class="control-stack"><label class="field-label" for="pw-length">Password length: <strong id="pw-length-value">18</strong></label><input id="pw-length" type="range" min="8" max="64" value="18" style="accent-color:#6959ec;width:100%"/><label class="checkbox-line"><input type="checkbox" id="pw-upper" checked/> Uppercase letters (A–Z)</label><label class="checkbox-line"><input type="checkbox" id="pw-lower" checked/> Lowercase letters (a–z)</label><label class="checkbox-line"><input type="checkbox" id="pw-numbers" checked/> Numbers (0–9)</label><label class="checkbox-line"><input type="checkbox" id="pw-symbols" checked/> Symbols (!@#$...)</label><div class="form-actions"><button type="button" class="primary-button" id="generate-password">Generate password</button></div></div><div><div class="field-label">Your random password</div><div class="output-box password-result" id="tool-output" aria-live="polite">Click Generate password to start.</div><div class="form-actions"><button class="secondary-button" type="button" id="copy-output">Copy password</button></div><p class="privacy-footnote">Generated on your device with cryptographically secure randomness. Never reuse important passwords.</p></div></div>`;
  $('#pw-length').addEventListener('input',e=>$('#pw-length-value').textContent=e.target.value);bindCopy();$('#generate-password').addEventListener('click',()=>{const pools=[['pw-upper','ABCDEFGHIJKLMNOPQRSTUVWXYZ'],['pw-lower','abcdefghijklmnopqrstuvwxyz'],['pw-numbers','0123456789'],['pw-symbols','!@#$%^&*_-+=?']].filter(([id])=>$('#'+id).checked).map(([,pool])=>pool);if(!pools.length){notify('Choose at least one character set.');return;}const randomInt=max=>{const range=0x100000000;const limit=range-(range%max);const array=new Uint32Array(1);do{crypto.getRandomValues(array);}while(array[0]>=limit);return array[0]%max;};const alphabet=pools.join('');const count=Number($('#pw-length').value);const output=pools.map(pool=>pool[randomInt(pool.length)]);while(output.length<count)output.push(alphabet[randomInt(alphabet.length)]);for(let i=output.length-1;i>0;i--){const j=randomInt(i+1);[output[i],output[j]]=[output[j],output[i]];}setOutput(output.join(''));});
}
else if(activeTool==='url'){
  body.innerHTML=textColumns('Text or encoded URL parameter','Result','Example: hello world & more')+`<div class="form-actions"><button type="button" class="primary-button" id="url-encode">Encode text</button><button type="button" class="secondary-button" id="url-decode">Decode text</button></div>`;bindCopy();$('#url-encode').addEventListener('click',()=>setOutput(encodeURIComponent($('#source-text').value)));$('#url-decode').addEventListener('click',()=>{try{setOutput(decodeURIComponent($('#source-text').value));}catch{setOutput('Could not decode: the input contains invalid percent-encoding.');}});
}
else if(activeTool==='clean'){
  body.innerHTML=textColumns('Unclean text','Cleaned text','Paste text with extra spaces and blank lines...')+`<div class="form-actions"><button type="button" class="primary-button" id="clean-text">Clean text</button><button type="button" class="secondary-button" id="remove-blank-lines">Remove blank lines</button></div>`;bindCopy();$('#clean-text').addEventListener('click',()=>{const source=$('#source-text').value;setOutput(source.split(/\r?\n/).map(line=>line.trim().replace(/[\t ]+/g,' ')).join('\n').replace(/\n{3,}/g,'\n\n').trim());});$('#remove-blank-lines').addEventListener('click',()=>setOutput($('#source-text').value.split(/\r?\n/).filter(line=>line.trim()).join('\n')));
}
}
renderToolChooser();renderWorkspace();

// Top 100 editorial directory: live search, category filters, incremental loading.
let top100Category='All';
let top100Search='';
let top100Visible=12;
const top100Categories=['All',...new Set(top100Tools.map(item=>item.category))];
const top100Palette={Chatbots:['#ecf8f3','#18906f'],Research:['#ecf4ff','#487aca'],Coding:['#eff1ff','#6867d4'],Images:['#fff0ea','#e08756'],Video:['#f4eaff','#885fd3'],Design:['#e8fbfb','#0f9298'],Audio:['#fff1ee','#b86472'],Automation:['#fff5e5','#b38427'],Productivity:['#ecfaf0','#398b61'],Writing:['#f7efff','#8954c6'],Marketing:['#fff2e9','#b87632'],Presentations:['#e8f6ff','#4b92b4'],Website:['#eaf1ff','#5e73cb'],Translation:['#f1f2f5','#6c778c']};
function renderTop100Filters(){
  const root=$('#top100-filters');
  root.innerHTML=top100Categories.map(category=>`<button type="button" class="${top100Category===category?'active':''}" aria-pressed="${top100Category===category}" data-top-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  root.querySelectorAll('[data-top-category]').forEach(button=>button.addEventListener('click',()=>{
    top100Category=button.dataset.topCategory;
    top100Visible=12;
    renderTop100Filters();renderTop100();
  }));
}
function renderTop100(){
  const found=top100Tools.map((item,index)=>({...item,rank:index+1})).filter(item=>
    (top100Category==='All'||item.category===top100Category)&&
    `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(top100Search)
  );
  // Filter only on plans independently confirmed via providers' documentation.
  const selected=found.filter(item=>{
    const plan=planFor(item);
    if(top100Plan==='all')return true;
    if(top100Plan==='unknown')return !plan;
    if(top100Plan==='free')return !!plan&&plan.type==='freemium';
    return !!plan&&plan.type===top100Plan;
  });
  if(top100Sort==='name')selected.sort((a,b)=>a.name.localeCompare(b.name));
  if(top100Sort==='name-desc')selected.sort((a,b)=>b.name.localeCompare(a.name));
  if(top100Sort==='category')selected.sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
  const shown=selected.slice(0,top100Visible);
  $('#top100-results').textContent=selected.length;
  $('#top100-grid').innerHTML=shown.map(item=>{
    const palette=top100Palette[item.category]||['#f0f1f7','#6d72a0'];
    const plan=planFor(item);
    return `<article class="top100-card"><a class="card-overlay" href="${toolDetailsUrl(item)}" aria-label="Read about ${escapeHtml(item.name)}"></a><div class="top100-card-left"><span class="top100-rank">#${String(item.rank).padStart(2,'0')}</span>${brandLogoMarkup(item,'top100-logo')}</div><div class="top100-card-main"><div class="top100-card-line"><h3>${escapeHtml(item.name)}</h3><span class="top100-category">${escapeHtml(item.category)}</span></div><span class="plan-tag ${plan?'plan-checked':''}" title="${plan?'Verified from official pricing source on '+plan.checked:'Pricing not yet checked'}">${plan?(plan.type==='paid'?'Paid-only · checked':'Free plan · checked'):'Pricing not verified'}</span><p>${escapeHtml(item.description)}</p><div class="top100-card-bottom"><span class="top100-details-label">Overview →</span><a href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escapeHtml(item.name)} official website in a new tab">Official site ↗</a></div></div></article>`;
  }).join('');
  $('#top100-empty').hidden=selected.length!==0;
  $('#top100-more').hidden=selected.length<=top100Visible;
  $('#top100-more').textContent=`Show more tools (${Math.min(12,selected.length-top100Visible)} of ${selected.length-top100Visible} remaining) ↓`;
}
$('#top100-search').addEventListener('input',event=>{
  top100Search=event.target.value.trim().toLowerCase();top100Visible=12;renderTop100();
});
$('#top100-more').addEventListener('click',()=>{top100Visible+=12;renderTop100();});
$('#top100-plan').addEventListener('change',e=>{top100Plan=e.target.value;top100Visible=12;renderTop100();});
$('#top100-sort').addEventListener('change',e=>{top100Sort=e.target.value;top100Visible=12;renderTop100();});
renderTop100Filters();renderTop100();
