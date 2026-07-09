(function () {
  // Apply saved theme immediately to avoid flash
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  // Determine active page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const pages = {
    'index.html': '',
    'about.html': 'about',
    'research.html': 'research',
    'publications.html': 'publications',
    'workshops.html': 'workshops',
    'gallery.html': 'gallery',
    'collaborators.html': 'collaborators',
    'contact.html': 'contact',
    'projects.html': 'projects',
  };
  const active = pages[path] !== undefined ? pages[path] : '';

  function navLink(href, label, isCta) {
    const isActive = label.toLowerCase() === active;
    return `<li><a href="${href}"${isCta ? ' class="nav-cta' + (isActive ? ' active' : '') + '"' : (isActive ? ' class="active"' : '')}>${label}</a></li>`;
  }

  const sunIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="8" r="3"/><line x1="8" y1="1" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="1" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="15" y2="8"/><line x1="2.93" y1="2.93" x2="4.34" y2="4.34"/><line x1="11.66" y1="11.66" x2="13.07" y2="13.07"/><line x1="2.93" y1="13.07" x2="4.34" y2="11.66"/><line x1="11.66" y1="4.34" x2="13.07" y2="2.93"/></svg>`;
  const moonIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8z"/></svg>`;

  const html = `
    <div class="cur" id="cur"></div>
    <div class="cur-f" id="curf"></div>
    <div class="sprog" id="sprog"></div>

    <div class="mnav" id="mnav">
      <span class="mnav-x" id="mnav-x">✕</span>
      <a href="about.html">About</a>
      <a href="research.html">Research</a>
      <a href="publications.html">Publications</a>
      <a href="workshops.html">Workshops</a>
      <a href="gallery.html">Gallery</a>
      <a href="collaborators.html">Collaborators</a>
      <a href="projects.html">Projects</a>
      <a href="contact.html">Contact</a>
    </div>

    <nav id="mainnav">
      <a href="index.html" class="nav-logo">ABR</a>
      <ul class="nav-links">
        ${navLink('about.html', 'About', false)}
        ${navLink('research.html', 'Research', false)}
        ${navLink('publications.html', 'Publications', false)}
        ${navLink('workshops.html', 'Workshops', false)}
        ${navLink('gallery.html', 'Gallery', false)}
        ${navLink('collaborators.html', 'Collaborators', false)}
        ${navLink('projects.html', 'Projects', false)}
        ${navLink('contact.html', 'Contact', true)}
      </ul>
      <div style="display:flex;align-items:center;gap:.75rem">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme" title="Toggle light / dark mode">
          ${saved === 'light' ? moonIcon : sunIcon}
        </button>
        <div class="hamburger" id="hbg"><span></span><span></span><span></span></div>
      </div>
    </nav>
  `;

  const root = document.getElementById('nav-root');
  if (root) {
    root.innerHTML = html;
  } else {
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  // Theme toggle
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.innerHTML = next === 'light' ? moonIcon : sunIcon;
    // dismiss hint on first use
    localStorage.setItem('theme-hint-shown', '1');
    const hint = document.getElementById('theme-hint');
    if (hint) hint.remove();
  });

  // Permanent "Switch theme" label next to the toggle
  const hint = document.createElement('span');
  hint.id = 'theme-hint';
  hint.textContent = 'Switch theme';
  hint.style.cssText = 'font-family:var(--fm);font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);white-space:nowrap;pointer-events:none;user-select:none';
  btn.parentNode.insertBefore(hint, btn);

  // Scroll: nav scrolled class + progress bar
  const nav = document.getElementById('mainnav');
  const sprog = document.getElementById('sprog');
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    if (sprog) {
      const max = document.body.scrollHeight - window.innerHeight;
      sprog.style.width = (max > 0 ? (window.scrollY / max * 100) : 0) + '%';
    }
  }, { passive: true });

  // Mobile nav
  const mnav = document.getElementById('mnav');
  const hbg = document.getElementById('hbg');
  const mnavX = document.getElementById('mnav-x');
  if (hbg && mnav) hbg.addEventListener('click', () => mnav.classList.add('open'));
  if (mnavX && mnav) mnavX.addEventListener('click', () => mnav.classList.remove('open'));
  if (mnav) mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mnav.classList.remove('open')));
})();
