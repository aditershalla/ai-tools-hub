/* AI Tools Hub hero showcase: one accessible set per row, one non-tabbable visual repeat. */
'use strict';
(() => {
  const hero = document.querySelector('.hero-logo-showcase');
  if (!hero) return;

  for (const row of hero.querySelectorAll('.hero-logo-row')) {
    const track = row.querySelector('.hero-logo-track');
    const original = row.querySelector('.hero-logo-set');
    if (!track || !original || track.querySelector('.hero-logo-copy')) continue;

    // This copy enables a seamless CSS loop. The original links are the only
    // links in the tab order; pointer users can still open a repeated logo.
    const copy = original.cloneNode(true);
    copy.classList.add('hero-logo-copy');
    copy.setAttribute('aria-hidden', 'true');
    for (const link of copy.querySelectorAll('a')) link.tabIndex = -1;
    track.appendChild(copy);
  }
  hero.classList.add('is-ready');
})();
