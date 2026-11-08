"use strict";
// V11: a single accessible quick menu shared by all public pages.
(() => {
  const header = document.querySelector('.site-header');
  const inner = header?.querySelector('.header-inner');
  if (!header || !inner) return;

  // Keep the same vector mark in the header and footer without rewriting 100 profile pages.
  document.querySelectorAll('.site-header .brand-icon, .footer .brand-icon, .site-footer .brand-icon').forEach(mark => {
    mark.innerHTML = '<img src="/assets/robot-head-mark.svg" width="38" height="38" alt="" decoding="async">';
  });

  const crown = '<svg class="top100-crown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true"><path d="M3 7.5 7.5 11 12 5 16.5 11 21 7.5l-2 10.3H5L3 7.5Z" fill="#F4BE37" stroke="#BF841B" stroke-width="1.35" stroke-linejoin="round"/><path d="M6.2 20h11.6" stroke="#BF841B" stroke-width="1.5" stroke-linecap="round"/><circle cx="3" cy="6.8" r="1.3" fill="#E7A92D"/><circle cx="12" cy="4" r="1.3" fill="#E7A92D"/><circle cx="21" cy="6.8" r="1.3" fill="#E7A92D"/></svg>';
  header.querySelectorAll('.header-top100').forEach(a => {
    a.setAttribute('href', '/top-100/');
    a.innerHTML = crown + '<span>Top 100</span>';
  });

  header.querySelectorAll('.header-action').forEach(a => a.remove());
  const button = inner.querySelector('.mobile-menu-toggle');
  if (!button) return;
  button.setAttribute('aria-controls', 'site-quick-menu');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Open site menu');
  button.setAttribute('title', 'Site menu');
  button.innerHTML = '<span class="site-menu-glyph" aria-hidden="true"><span></span><span></span><span></span></span>';

  // Navigation destinations are existing, working local pages/anchors.
  const entries = [
    ['/', 'Home', 'Start exploring', 'house'],
    ['/top-100/', 'Top 100 AI Tools', 'Browse the curated directory', 'grid'],
    ['/#free-tools', 'Free Workspace Tools', 'Seven tools you can use here', 'spark'],
    ['/guides/', 'Guides & Resources', 'Practical AI ideas and tutorials', 'book'],
    ['/about/', 'About AI Tools Hub', 'Learn about this project', 'info']
  ];
  const icons = {
    house:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-7h6v7"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    spark:'<path d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3Z"/><path d="m19 18 .6 1.4L21 20l-1.4.6L19 22l-.6-1.4L17 20l1.4-.6L19 18Z"/>',
    book:'<path d="M12 7c-2-2-5-2.5-9-2v14c4-.5 7 0 9 2 2-2 5-2.5 9-2V5c-4-.5-7 0-9 2ZM12 7v14"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>'
  };
  const svgIcon = name => '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icons[name]+'</svg>';
  const panel = document.createElement('nav');
  panel.id = 'site-quick-menu';
  panel.className = 'site-quick-menu';
  panel.setAttribute('aria-label', 'Quick site navigation');
  panel.hidden = true;
  panel.innerHTML = '<div class="site-menu-caption">Explore AI Tools Hub <span aria-hidden="true">✧</span></div>' +
    '<div class="site-menu-list">' + entries.map(([href,name,description,icon]) =>
      '<a class="site-menu-item" href="'+href+'"><span class="site-menu-icon">'+svgIcon(icon)+'</span><span class="site-menu-copy"><strong>'+name+'</strong><small>'+description+'</small></span><span class="site-menu-arrow" aria-hidden="true">↗</span></a>'
    ).join('') + '</div>' +
    '<div class="site-menu-bottom"><span>Have a question or found an issue?</span><a href="/contact/">Contact us <span aria-hidden="true">↗</span></a></div>';
  inner.append(panel);
  const links = Array.from(panel.querySelectorAll('a'));
  function close(restoreFocus = false){
    if(panel.hidden) return;
    panel.hidden = true;
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Open site menu');
    button.classList.remove('is-active');
    if(restoreFocus) button.focus();
  }
  function open(){
    panel.hidden = false;
    button.setAttribute('aria-expanded','true');
    button.setAttribute('aria-label','Close site menu');
    button.classList.add('is-active');
    links[0]?.focus();
  }
  button.addEventListener('click',()=>panel.hidden?open():close(true));
  panel.addEventListener('click',event=>{if(event.target.closest('a'))close();});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && !panel.hidden){event.preventDefault();close(true);}
  });
  document.addEventListener('pointerdown',event=>{
    if(!panel.hidden && !panel.contains(event.target) && !button.contains(event.target))close();
  });
})();
