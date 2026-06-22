// Cursor
(function () {
  const cur = document.getElementById('cur');
  const curf = document.getElementById('curf');
  if (!cur || !curf) return;
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function anim() {
    fx += (mx - fx) * .12; fy += (my - fy) * .12;
    curf.style.left = fx + 'px'; curf.style.top = fy + 'px';
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a,button,.gi,.cc,.wcard-gallery').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.width = '12px'; cur.style.height = '12px'; curf.style.width = '48px'; curf.style.height = '48px'; });
    el.addEventListener('mouseleave', () => { cur.style.width = '8px'; cur.style.height = '8px'; curf.style.width = '32px'; curf.style.height = '32px'; });
  });
})();

// Scroll reveal
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// Neural network canvas (hero only)
(function () {
  const canvas = document.getElementById('nc');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let nodes = [], W, H;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  for (let i = 0; i < 65; i++) nodes.push({ x: Math.random() * 1920, y: Math.random() * 900, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .8, p: Math.random() * Math.PI * 2 });
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.p += .018;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) { ctx.beginPath(); ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 150) * .28})`; ctx.lineWidth = .5; ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); }
    }
    nodes.forEach(n => {
      const g = (Math.sin(n.p) + 1) * .5;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${.35 + g * .45})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

// Workshop gallery inline navigation
function galleryNav(gallery, dir) {
  const imgs = gallery.querySelectorAll('img');
  const counter = gallery.querySelector('.gallery-counter');
  let cur = [...imgs].findIndex(i => i.classList.contains('active'));
  imgs[cur].classList.remove('active');
  cur = (cur + dir + imgs.length) % imgs.length;
  imgs[cur].classList.add('active');
  if (counter) counter.textContent = `${cur + 1} / ${imgs.length}`;
}

// Lightbox
let lbImgs = [], lbIdx = 0;
function openLB(gallery) {
  const imgs = gallery.querySelectorAll('img');
  lbImgs = [...imgs].map(i => i.src);
  lbIdx = [...imgs].findIndex(i => i.classList.contains('active'));
  if (lbIdx < 0) lbIdx = 0;
  showLBImg();
  document.getElementById('lb').classList.add('open');
}
function showLBImg() {
  document.getElementById('lb-img').src = lbImgs[lbIdx];
  document.getElementById('lb-counter').textContent = `${lbIdx + 1} / ${lbImgs.length}`;
  const showNav = lbImgs.length > 1;
  document.getElementById('lb-prev').style.display = showNav ? 'flex' : 'none';
  document.getElementById('lb-next').style.display = showNav ? 'flex' : 'none';
}
function lbNav(dir) {
  lbIdx = (lbIdx + dir + lbImgs.length) % lbImgs.length;
  showLBImg();
}
(function () {
  const lb = document.getElementById('lb');
  if (!lb) return;
  document.getElementById('lb-close').onclick = () => lb.classList.remove('open');
  document.getElementById('lb-prev').onclick = e => { e.stopPropagation(); lbNav(-1); };
  document.getElementById('lb-next').onclick = e => { e.stopPropagation(); lbNav(1); };
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowRight') lbNav(1);
    if (e.key === 'ArrowLeft') lbNav(-1);
    if (e.key === 'Escape') lb.classList.remove('open');
  });
})();

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.innerHTML;
  btn.textContent = 'Sent ✓';
  btn.style.background = '#2a6e4a';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 3000);
}

// Single-image lightbox (used by certificates)
function openCert(src) {
  lbImgs = [src];
  lbIdx = 0;
  showLBImg();
  document.getElementById('lb').classList.add('open');
}

// Certificate image format fallback: tries png → jpg → jpeg → webp
function tryCert(img) {
  const base = img.dataset.b;
  const fallbacks = ['jpg', 'jpeg', 'webp'];
  const tried = parseInt(img.dataset.tried || '0');
  if (tried < fallbacks.length) {
    img.dataset.tried = tried + 1;
    img.src = base + '.' + fallbacks[tried];
  } else {
    img.onerror = null;
    const wrap = img.closest('.cert-img-wrap');
    if (wrap) wrap.classList.add('cert-missing');
  }
}

// Publications tab switcher (publications.html only)
(function () {
  const tabs = document.querySelectorAll('.pub-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); document.getElementById(t.dataset.panel).classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });
})();
