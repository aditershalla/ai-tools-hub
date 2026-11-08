"use strict";
const q=document.getElementById('catalog-search');
const rows=[...document.querySelectorAll('.catalog-row')];
const counter=document.getElementById('catalog-result-count'),empty=document.getElementById('catalog-no-results');
const cat=document.getElementById('catalog-category'),plan=document.getElementById('catalog-plan'),sort=document.getElementById('catalog-sort');
const list=document.getElementById('catalog-list');

const requestedTopic = new URLSearchParams(window.location.search).get('topic');
const selectedTopic = (window.AI_DISCOVERY_GROUPS || []).find(group=>group.slug === requestedTopic) || null;
const topicStatus = document.getElementById('catalog-topic-status');
if(selectedTopic && topicStatus){
 topicStatus.hidden=false;
 topicStatus.textContent='Discovery category: '+selectedTopic.label+' · editorial cross-tags. A tool may appear in multiple categories.';
 const reset=document.getElementById('catalog-topic-clear');
 if(reset){reset.hidden=false;reset.addEventListener('click',()=>{window.location.href='/top-100/#catalog-results';});}
}

const categories=[...new Set(rows.map(r=>r.dataset.category))].sort();
for(const value of categories){const o=document.createElement('option');o.value=value;o.textContent=value[0].toUpperCase()+value.slice(1);cat.append(o);}
function render(){const term=q.value.trim().toLowerCase();let n=0;
 const order=rows.slice();
 if(sort.value==='name')order.sort((a,b)=>a.dataset.title.localeCompare(b.dataset.title));
 if(sort.value==='name-desc')order.sort((a,b)=>b.dataset.title.localeCompare(a.dataset.title));
 if(sort.value==='category')order.sort((a,b)=>a.dataset.category.localeCompare(b.dataset.category)||a.dataset.title.localeCompare(b.dataset.title));
 for(const row of order){const tier=row.dataset.plan;
 const tierMatch=plan.value==='all'||(plan.value==='free'&&tier==='freemium')||tier===plan.value;
 const found=(row.dataset.title+' '+row.dataset.category+' '+row.dataset.description).includes(term)&& (cat.value==='all'||row.dataset.category===cat.value)&&tierMatch && (!selectedTopic || window.aiDiscoveryMatches({name:row.dataset.toolName || row.dataset.title,category:row.dataset.category[0].toUpperCase()+row.dataset.category.slice(1)},selectedTopic));
 row.hidden=!found;if(found)n++;list.appendChild(row);
 }
 counter.textContent=`Showing ${n} of ${rows.length} tools`;
 empty.hidden=n>0;
}
[q,cat,plan,sort].forEach(e=>e.addEventListener(e===q?'input':'change',render));render();
