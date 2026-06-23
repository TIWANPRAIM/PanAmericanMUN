/* =============================================
   js/main.js — Pan American MUN
   ============================================= */
'use strict';

/* ── Navbar scroll ── */
(function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Mobile hamburger ── */
(function initMobileMenu() {
  const ham = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-overlay');
  if (!ham || !overlay) return;
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Canvas particle network ──
   Call initParticles('canvas-id') on any page.          */
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const GOLD = 'rgba(255,255,255,';
  const COUNT = 70;
  const MAX_D = 130;
  let W, H, pts = [];
  let rafId = null;
  let resizeTimer = null;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkPts() {
    pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r:  Math.random() * 1.6 + 0.6
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_D) {
          ctx.strokeStyle = GOLD + ((1 - d / MAX_D) * 0.22).toFixed(3) + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = GOLD + '0.65)';
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    draw();
    rafId = requestAnimationFrame(step);
  }

  function start() { if (!rafId) rafId = requestAnimationFrame(step); }
  function stop()  { if (rafId)  { cancelAnimationFrame(rafId); rafId = null; } }

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); mkPts(); }, 150);
  });

  resize(); mkPts(); start();
}

/* ── Typewriter ── */
function initTypewriter(id, text, speed) {
  const el = document.getElementById(id);
  if (!el) return;
  speed = speed ?? 60;
  if (!document.head.querySelector('#tw-style')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'tw-style';
    styleEl.textContent = '@keyframes twBlink{0%,100%{opacity:1}50%{opacity:0}}';
    document.head.appendChild(styleEl);
  }
  el.textContent = '';
  const cursor = Object.assign(document.createElement('span'), {
    textContent: '|',
    style: 'animation:twBlink 0.7s step-end infinite;color:var(--gold);margin-left:1px;'
  });
  el.appendChild(cursor);
  let i = 0;
  const iv = setInterval(() => {
    if (i < text.length) { cursor.before(document.createTextNode(text[i++])); }
    else { clearInterval(iv); setTimeout(() => cursor.remove(), 1800); }
  }, speed);
}

/* ── Countdown ── */
function initCountdown(isoDate) {
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };
  if (!els.d || !els.h || !els.m || !els.s) return;
  const target = new Date(isoDate).getTime();
  const pad = n => String(n).padStart(2, '0');
  const iv = setInterval(tick, 1000);
  function tick() {
    const diff = Math.max(0, target - Date.now());
    els.d.textContent = pad(Math.floor(diff / 86400000));
    els.h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    els.m.textContent = pad(Math.floor((diff % 3600000)  / 60000));
    els.s.textContent = pad(Math.floor((diff % 60000)    / 1000));
    if (diff === 0) clearInterval(iv);
  }
  tick();
}

/* ── Stat counter animation ── */
function initCounters() {
  const items = document.querySelectorAll('[data-count]');
  if (!items.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el     = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const t0     = performance.now();
      const dur    = 1600;
      (function frame(now) {
        const p = Math.min((now - t0) / dur, 1);
        const v = Math.round((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = v + suffix;
        if (p < 1) requestAnimationFrame(frame);
      })(t0);
    });
  }, { threshold: 0.5 });
  items.forEach(el => io.observe(el));
}

/* ── FAQ accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    function toggle() {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    }
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

/* ── Committee filter ── */
function initFilter() {
  const tabs  = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.committee-card-full');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      cards.forEach(c => {
        const show = f === 'all' || c.dataset.category === f;
        c.style.display = show ? '' : 'none';
        if (show) c.classList.add('aos-animate');
      });
    });
  });
}

/* ── Toolkit sub-tabs ── */
function initToolkitTabs() {
  const tabs = document.querySelectorAll('.toolkit-tab');
  const panels = document.querySelectorAll('.toolkit-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.panel;
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    });
  });
}

/* ── Hero video clip (start at best skyline moment, loop from there) ── */
(function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;
  const START = 4; // seconds — seek to this point on load and on each loop
  video.addEventListener('loadeddata', () => { video.currentTime = START; });
  video.addEventListener('seeked', () => { video.play(); });
})();

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 750, once: true, offset: 90 });
  }
  initParticles('hero-canvas');
  initParticles('page-canvas');
  initTypewriter('hero-typewriter', "Lead · Debate · Inspire", 68);
  initCountdown('2026-09-16T09:00:00');
  initCounters();
  initFAQ();
  initFilter();
  initToolkitTabs();
});
