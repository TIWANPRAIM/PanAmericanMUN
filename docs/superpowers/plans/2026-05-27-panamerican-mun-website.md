# Pan American MUN Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page premium dark static HTML/CSS/JS website for Pan American MUN with cinematic homepage, committee browser, secretariat profiles, and FAQ.

**Architecture:** Pure static site — no build step, no framework, no npm. One shared `css/styles.css` and one shared `js/main.js` loaded on every page. AOS 2.3.4 loaded from CDN for scroll animations. All other JS (canvas particles, countdown, typewriter, counter animation, FAQ accordion, committee filter) hand-written in `main.js`. Each HTML page is self-contained with inline nav and footer markup.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid, Flexbox), Vanilla JS (ES6+), AOS 2.3.4 (CDN), Google Fonts (CDN: Cormorant Garamond + Inter)

---

## File Map

| File | Responsibility |
|------|---------------|
| `css/styles.css` | All styles: design tokens, reset, shared components (navbar, footer, buttons, cards), page-specific sections, animations, responsive breakpoints |
| `js/main.js` | All JS: navbar scroll, mobile menu, AOS init, canvas particles, typewriter, countdown, counter animation, FAQ accordion, committee filter |
| `index.html` | Cinematic homepage: hero, stats, about, SG letter, committees preview, sponsors |
| `committees.html` | All 17 committee cards with filter tabs |
| `secretariat.html` | Carolina (real photo) + 6 placeholder team cards |
| `faq.html` | 12-question accordion + contact block |
| `img/carolina.jpg` | Secretary-General photo — **user must place this file manually** |

---

## Task 1: CSS Design System

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Create `css/styles.css` with the complete stylesheet**

```css
/* =============================================
   css/styles.css — Pan American MUN
   ============================================= */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');

/* ── Custom Properties ── */
:root {
  --bg-deep:     #0A0E1A;
  --bg-card:     #111827;
  --bg-elevated: #1A2234;
  --gold:        #C9A84C;
  --gold-light:  #E8C87A;
  --gold-dim:    rgba(201,168,76,0.12);
  --blue-un:     #1D4ED8;
  --text-1:      #F9FAFB;
  --text-2:      #9CA3AF;
  --text-3:      #6B7280;
  --border:      rgba(201,168,76,0.2);
  --border-strong: rgba(201,168,76,0.5);

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;

  --nav-height:   72px;
  --section-py:   96px;
  --container:    1200px;
  --radius:       8px;
  --radius-lg:    16px;
  --transition:   0.3s ease;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-deep);
  color: var(--text-1);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
}
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ── Typography ── */
h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 600; line-height: 1.15; }
h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: clamp(1.2rem, 2.5vw, 1.6rem); }

/* ── Container ── */
.container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }

/* ── Label ── */
.label-gold {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
}

/* ── Section heading ── */
.section-title { text-align: center; margin-bottom: 0.75rem; }
.section-title span { position: relative; display: inline-block; padding-bottom: 0.6rem; }
.section-title span::after {
  content: '';
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 56px; height: 2px;
  background: var(--gold);
}
.section-subtitle {
  text-align: center;
  color: var(--text-2);
  font-size: 1.05rem;
  margin-bottom: 3rem;
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: var(--transition);
}
.btn-gold { background: var(--gold); color: var(--bg-deep); }
.btn-gold:hover {
  background: var(--gold-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(201,168,76,0.35);
}
.btn-outline { border: 1px solid var(--gold); color: var(--gold); }
.btn-outline:hover { background: var(--gold-dim); transform: translateY(-2px); }

/* ── Paper button (committee cards) ── */
.btn-paper {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-2);
  letter-spacing: 0.05em;
  transition: var(--transition);
  position: relative;
}
.btn-paper:not([disabled]):hover { border-color: var(--gold); color: var(--gold); }
.btn-paper[disabled] { opacity: 0.45; cursor: not-allowed; }
.btn-paper[disabled]:hover::after {
  content: 'Coming soon';
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  font-size: 0.7rem;
  white-space: nowrap;
  color: var(--text-2);
  pointer-events: none;
}

/* ── Badges ── */
.badge {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.badge-regular    { background: rgba(29,78,216,0.18); color: #60A5FA; border: 1px solid rgba(96,165,250,0.3); }
.badge-specialized{ background: rgba(147,51,234,0.18); color: #C084FC; border: 1px solid rgba(192,132,252,0.3); }
.badge-beginner   { background: rgba(16,185,129,0.18); color: #34D399; border: 1px solid rgba(52,211,153,0.3); }

/* =========================================
   NAVBAR
   ========================================= */
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 1000; height: var(--nav-height);
  display: flex; align-items: center;
  transition: background 0.45s ease, backdrop-filter 0.45s ease, border-bottom 0.45s ease;
}
.navbar.scrolled {
  background: rgba(10,14,26,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.nav-logo {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.5rem; font-weight: 700; letter-spacing: 0.08em;
}
.nav-logo .dot { color: var(--gold); }
.nav-links { display: flex; align-items: center; gap: 2.5rem; }
.nav-links a {
  font-size: 0.8rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-2); transition: color var(--transition);
  position: relative; padding-bottom: 4px;
}
.nav-links a::after {
  content: ''; position: absolute;
  bottom: 0; left: 0; width: 0; height: 1px;
  background: var(--gold); transition: width var(--transition);
}
.nav-links a:hover { color: var(--text-1); }
.nav-links a:hover::after { width: 100%; }
.nav-links a.active { color: var(--gold); }
.nav-links a.active::after { width: 100%; background: var(--gold); }

/* hamburger */
.nav-hamburger {
  display: none; flex-direction: column; gap: 5px;
  width: 28px; cursor: pointer; z-index: 1100;
}
.nav-hamburger span { display: block; height: 2px; background: var(--text-1); border-radius: 2px; transition: var(--transition); }
.nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; }
.nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* mobile overlay */
.nav-overlay {
  display: none; position: fixed; inset: 0; z-index: 999;
  background: rgba(10,14,26,0.97);
  flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem;
}
.nav-overlay.open { display: flex; }
.nav-overlay a {
  font-family: var(--font-display);
  font-size: 2.25rem; letter-spacing: 0.1em;
  color: var(--text-1); transition: color var(--transition);
}
.nav-overlay a:hover, .nav-overlay a.active { color: var(--gold); }

/* =========================================
   PAGE HERO (inner pages — shorter)
   ========================================= */
.page-hero {
  position: relative; height: 52vh; min-height: 320px;
  display: flex; align-items: center; justify-content: center; text-align: center;
  overflow: hidden;
}
.page-hero canvas { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; }
.page-hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(to bottom, rgba(10,14,26,0.45) 0%, rgba(10,14,26,0.88) 100%);
}
.page-hero-content { position: relative; z-index: 2; }
.page-hero-content h1 { letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 1rem; }
.gold-line { width: 56px; height: 2px; background: var(--gold); margin: 0 auto 1rem; }
.page-hero-content .subtitle { color: var(--text-2); font-size: 1.05rem; max-width: 460px; margin: 0 auto; }

/* =========================================
   FOOTER
   ========================================= */
.footer {
  background: var(--bg-deep);
  border-top: 1px solid var(--border);
  padding: 4rem 0 2rem;
}
.footer-grid {
  display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem;
}
.footer-logo { font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; }
.footer-logo .dot { color: var(--gold); }
.footer-tagline { color: var(--text-2); font-size: 0.875rem; line-height: 1.6; }
.footer-col h4 {
  font-family: var(--font-body); font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem;
}
.footer-col ul { display: flex; flex-direction: column; gap: 0.6rem; }
.footer-col a { color: var(--text-2); font-size: 0.875rem; transition: color var(--transition); }
.footer-col a:hover { color: var(--gold); }
.footer-social-row { display: flex; gap: 1rem; margin-bottom: 1.25rem; }
.footer-social-row a { display: flex; align-items: center; gap: 0.5rem; color: var(--text-2); font-size: 0.875rem; transition: color var(--transition); }
.footer-social-row a:hover { color: var(--gold); }
.footer-email { color: var(--text-2); font-size: 0.8rem; }
.footer-email a { color: var(--text-2); transition: color var(--transition); }
.footer-email a:hover { color: var(--gold); }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 2rem; text-align: center;
  color: var(--text-3); font-size: 0.78rem;
}

/* =========================================
   HERO (index.html only)
   ========================================= */
.hero {
  position: relative; height: 100vh; min-height: 640px;
  display: flex; align-items: center; justify-content: center; text-align: center;
  overflow: hidden;
}
#hero-canvas { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; }
.hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: radial-gradient(ellipse at center, rgba(10,14,26,0.25) 0%, rgba(10,14,26,0.82) 72%);
}
.hero-content { position: relative; z-index: 2; max-width: 820px; padding: 0 24px; }
.hero-label {
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.3em;
  text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
  opacity: 0; animation: fadeUp 0.7s ease 0.4s forwards;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 9vw, 7.5rem);
  font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  line-height: 0.95; margin-bottom: 1.75rem;
  opacity: 0; animation: fadeUp 0.7s ease 0.65s forwards;
}
.hero-title .gold { color: var(--gold); }
.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-2); font-style: italic; min-height: 2.2em;
  margin-bottom: 1.5rem;
  opacity: 0; animation: fadeUp 0.7s ease 0.9s forwards;
}
.hero-date {
  font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--text-3); margin-bottom: 2.75rem;
  opacity: 0; animation: fadeUp 0.7s ease 1.1s forwards;
}

/* countdown */
.countdown {
  display: flex; align-items: center; justify-content: center; gap: 1rem;
  margin-bottom: 3rem; flex-wrap: wrap;
  opacity: 0; animation: fadeUp 0.7s ease 1.3s forwards;
}
.countdown-unit {
  display: flex; flex-direction: column; align-items: center;
  background: rgba(201,168,76,0.07); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1rem 1.5rem; min-width: 85px;
}
.countdown-num {
  font-family: 'Courier New', monospace;
  font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 700;
  color: var(--gold); line-height: 1;
}
.countdown-lbl {
  font-size: 0.58rem; font-weight: 600; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--text-3); margin-top: 0.4rem;
}
.countdown-sep { font-size: 2rem; color: var(--gold); opacity: 0.35; }
.hero-ctas {
  display: flex; align-items: center; justify-content: center;
  gap: 1rem; flex-wrap: wrap;
  opacity: 0; animation: fadeUp 0.7s ease 1.55s forwards;
}

/* scroll indicator */
.hero-scroll {
  position: absolute; bottom: 2.5rem; left: 50%;
  transform: translateX(-50%); z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
  opacity: 0; animation: fadeIn 0.7s ease 2.2s forwards;
}
.hero-scroll span { font-size: 0.6rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--text-3); }
.scroll-chevron {
  width: 18px; height: 18px;
  border-right: 2px solid var(--gold); border-bottom: 2px solid var(--gold);
  transform: rotate(45deg); animation: bounce 1.6s ease infinite;
}

/* =========================================
   STATS
   ========================================= */
.stats {
  padding: var(--section-py) 0; background: var(--bg-card); position: relative;
}
.stats::before, .stats::after {
  content: ''; position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, var(--gold), transparent);
}
.stats::before { top: 0; } .stats::after { bottom: 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4,1fr); }
.stat-item { text-align: center; padding: 2rem 1rem; position: relative; }
.stat-item:not(:last-child)::after {
  content: ''; position: absolute; right: 0; top: 20%; bottom: 20%;
  width: 1px; background: var(--border);
}
.stat-num {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4.5vw, 4.25rem);
  font-weight: 700; color: var(--gold); line-height: 1;
  display: block; margin-bottom: 0.4rem;
}
.stat-lbl {
  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--text-2);
}

/* =========================================
   ABOUT
   ========================================= */
.about { padding: var(--section-py) 0; }
.about-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 4rem; align-items: center; }
.about-text-wrap { position: relative; padding-left: 1.75rem; }
.about-accent {
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 3px; background: var(--gold); border-radius: 2px;
}
.about-text .label-gold { display: block; margin-bottom: 1rem; }
.about-text h2 { margin-bottom: 1.5rem; }
.about-text p { color: var(--text-2); margin-bottom: 1.25rem; line-height: 1.85; font-size: 1rem; }
.about-graphic { display: flex; align-items: center; justify-content: center; }
.globe-wrap { position: relative; width: 280px; height: 280px; }
.globe-glow {
  position: absolute; inset: -25%;
  background: radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 70%);
  border-radius: 50%; animation: pulseGlow 3s ease-in-out infinite;
}
.globe-wrap svg { position: relative; z-index: 1; }

/* =========================================
   SG LETTER
   ========================================= */
.sg-letter { padding: var(--section-py) 0; background: var(--bg-card); }
.sg-letter-grid { display: grid; grid-template-columns: 1fr 2.2fr; gap: 4.5rem; align-items: start; }
.sg-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top;
  border-radius: var(--radius-lg); border: 2px solid var(--border);
  box-shadow: 0 0 60px rgba(201,168,76,0.15);
}
.sg-photo-placeholder {
  width: 100%; aspect-ratio: 3/4; background: var(--bg-elevated);
  border-radius: var(--radius-lg); border: 2px dashed var(--border);
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 0.75rem; color: var(--text-3); font-size: 0.85rem;
}
.sg-name { font-family: var(--font-display); font-size: 1.5rem; margin-top: 1.25rem; }
.sg-title-lbl { color: var(--text-2); font-size: 0.8rem; letter-spacing: 0.05em; }
.sg-letter-content .label-gold { display: block; margin-bottom: 0.75rem; }
.sg-letter-content h2 { font-style: italic; margin-bottom: 2rem; }
.sg-letter-text { color: var(--text-2); line-height: 1.9; margin-bottom: 1.25rem; font-size: 0.975rem; }
.sg-closing { margin-top: 2rem; }
.sg-closing p { color: var(--text-2); margin-bottom: 0.2rem; font-size: 0.9rem; }
.sg-signature { font-family: var(--font-display); font-size: 1.75rem; font-style: italic; color: var(--text-1); margin: 0.4rem 0; }
.sg-sig-line { width: 72px; height: 2px; background: var(--gold); margin-top: 0.4rem; }

/* =========================================
   COMMITTEES PREVIEW (index)
   ========================================= */
.committees-preview { padding: var(--section-py) 0; }
.committees-grid {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-bottom: 2.5rem;
}
.committee-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 1.75rem;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
}
.committee-card:hover {
  transform: translateY(-5px); border-color: var(--border-strong);
  box-shadow: 0 12px 40px rgba(201,168,76,0.14);
}
.committee-card .acronym {
  font-family: var(--font-display);
  font-size: 2.5rem; font-weight: 700; color: var(--gold); line-height: 1; margin-bottom: 0.5rem;
}
.committee-card .full-name {
  font-size: 0.82rem; color: var(--text-2); line-height: 1.45; margin-bottom: 1rem; min-height: 2.5em;
}

/* =========================================
   SPONSORS
   ========================================= */
.sponsors { padding: var(--section-py) 0; background: var(--bg-card); }
.marquee-outer {
  overflow: hidden; margin: 2.25rem 0 3rem; position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}
.marquee-track {
  display: flex; gap: 1.5rem; width: max-content;
  animation: marquee 22s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }
.sponsor-block {
  flex-shrink: 0; width: 200px; height: 90px;
  background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-3);
  transition: border-color var(--transition), color var(--transition);
}
.sponsor-block:hover { border-color: var(--gold); color: var(--gold-light); }

/* =========================================
   COMMITTEES PAGE (full)
   ========================================= */
.filter-tabs {
  display: flex; align-items: center; justify-content: center;
  gap: 0.75rem; margin-bottom: 3rem; flex-wrap: wrap;
}
.filter-tab {
  padding: 0.6rem 1.5rem; border-radius: 20px;
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; border: 1px solid var(--border);
  color: var(--text-2); transition: var(--transition); cursor: pointer;
  background: transparent;
}
.filter-tab:hover { border-color: var(--gold); color: var(--gold); }
.filter-tab.active { background: var(--gold); color: var(--bg-deep); border-color: var(--gold); }
.committees-full-grid {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem;
}
.committee-card-full {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 1.75rem; position: relative; overflow: hidden;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
}
.committee-card-full::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--gold);
}
.committee-card-full:hover {
  transform: translateY(-5px); border-color: var(--border-strong);
  box-shadow: 0 12px 40px rgba(201,168,76,0.14);
}
.committee-card-full .acronym {
  font-family: var(--font-display); font-size: 2.25rem; font-weight: 700;
  color: var(--gold); line-height: 1; margin-bottom: 0.5rem;
}
.committee-card-full .full-name {
  font-size: 0.82rem; color: var(--text-2); line-height: 1.45; margin-bottom: 1rem; min-height: 2.5em;
}

/* =========================================
   SECRETARIAT PAGE
   ========================================= */
.sg-featured { padding: var(--section-py) 0 calc(var(--section-py) * 0.5); }
.sg-featured-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: start; }
.sg-feat-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top;
  border-radius: var(--radius-lg); border: 2px solid var(--border);
  box-shadow: 0 0 60px rgba(201,168,76,0.18);
}
.sg-feat-role { color: var(--gold); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 1rem; display: block; }
.sg-feat-name { font-family: var(--font-display); font-size: clamp(2rem,4vw,3rem); margin-bottom: 0.5rem; }
.sg-feat-title { color: var(--text-2); font-size: 0.9rem; letter-spacing: 0.05em; margin-bottom: 2rem; }
.sg-feat-text { color: var(--text-2); line-height: 1.85; font-size: 0.975rem; margin-bottom: 1.25rem; }
.sg-feat-email a { color: var(--gold); font-size: 0.875rem; transition: color var(--transition); }
.sg-feat-email a:hover { color: var(--gold-light); }
.team-section { padding: calc(var(--section-py) * 0.5) 0 var(--section-py); }
.team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
.team-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 2rem 1.5rem; text-align: center;
  transition: border-color var(--transition), transform var(--transition);
}
.team-card:hover { border-color: var(--gold); transform: translateY(-4px); }
.team-avatar {
  width: 96px; height: 96px; border-radius: 50%;
  background: var(--bg-elevated); border: 2px solid var(--border);
  margin: 0 auto 1.25rem; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.team-avatar svg { width: 56px; height: 56px; color: var(--text-3); }
.team-name { font-family: var(--font-display); font-size: 1.2rem; font-style: italic; margin-bottom: 0.3rem; }
.team-role { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-2); }
.tba-note {
  text-align: center; color: var(--text-3); font-size: 0.875rem; font-style: italic;
  margin-top: 2.5rem; padding: 1.25rem;
  border: 1px dashed rgba(201,168,76,0.2); border-radius: var(--radius);
}

/* =========================================
   FAQ PAGE
   ========================================= */
.faq-section { padding: var(--section-py) 0; }
.faq-list { max-width: 780px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); transition: padding-left 0.3s ease; }
.faq-item.open { border-left: 2px solid var(--gold); padding-left: 1.25rem; }
.faq-q {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.5rem 0; cursor: pointer; gap: 1rem;
}
.faq-q h3 { font-family: var(--font-body); font-size: 0.95rem; font-weight: 500; flex: 1; }
.faq-item.open .faq-q h3 { color: var(--gold); }
.faq-chevron {
  width: 20px; height: 20px; flex-shrink: 0;
  color: var(--gold); transition: transform 0.35s ease;
}
.faq-item.open .faq-chevron { transform: rotate(180deg); }
.faq-answer {
  max-height: 0; overflow: hidden;
  transition: max-height 0.4s ease;
}
.faq-item.open .faq-answer { max-height: 320px; }
.faq-answer p { padding-bottom: 1.5rem; color: var(--text-2); line-height: 1.85; font-size: 0.9rem; }
.contact-block { padding: 5rem 0 var(--section-py); text-align: center; }
.contact-block h2 { margin-bottom: 1rem; }
.contact-block p { color: var(--text-2); margin-bottom: 2.5rem; font-size: 1rem; }
.contact-links { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }

/* =========================================
   KEYFRAMES
   ========================================= */
@keyframes fadeUp  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
@keyframes bounce  { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(7px);} }
@keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
@keyframes pulseGlow { 0%,100%{opacity:.6;transform:scale(1);} 50%{opacity:1;transform:scale(1.06);} }

/* =========================================
   RESPONSIVE
   ========================================= */
@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-graphic { display: none; }
  .sg-letter-grid { grid-template-columns: 1fr; }
  .sg-photo, .sg-photo-placeholder { max-width: 300px; margin: 0 auto; }
  .sg-featured-grid { grid-template-columns: 1fr; }
  .sg-feat-photo { max-width: 320px; }
  .committees-grid { grid-template-columns: repeat(2,1fr); }
  .committees-full-grid { grid-template-columns: repeat(2,1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .team-grid { grid-template-columns: repeat(2,1fr); }
  .stats-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 768px) {
  :root { --section-py: 64px; --nav-height: 60px; }
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
  .committees-grid { grid-template-columns: 1fr; }
  .committees-full-grid { grid-template-columns: 1fr; }
  .countdown { gap: 0.6rem; }
  .countdown-unit { min-width: 62px; padding: 0.75rem 1rem; }
  .countdown-num { font-size: 1.75rem; }
  .countdown-sep { display: none; }
  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  .stat-item:not(:last-child)::after { display: none; }
  .team-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 480px) {
  .hero-title { font-size: 2.75rem; }
  .stats-grid { grid-template-columns: repeat(2,1fr); }
  .team-grid { grid-template-columns: 1fr; }
}

/* utility */
.text-center { text-align: center; }
.mt-4 { margin-top: 1rem; }
section { position: relative; }
```

- [ ] **Step 2: Open `css/styles.css` in a browser or editor and confirm the file saved without syntax errors** (no red squiggles in VS Code, or open DevTools on any HTML page later and check the Styles panel loads without 404).

- [ ] **Step 3: Commit**

```bash
git init
git add css/styles.css
git commit -m "feat: add shared CSS design system for PAMUN"
```

---

## Task 2: Shared JavaScript

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create `js/main.js` with all shared JS**

```javascript
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

/* ── AOS init ── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 750, once: true, offset: 90 });
  }
});

/* ── Canvas particle network ──
   Call initParticles('canvas-id') on any page.          */
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const GOLD = 'rgba(201,168,76,';
  const COUNT = 70;
  const MAX_D = 130;
  let W, H, pts = [];

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
          ctx.strokeStyle = GOLD + ((1 - d / MAX_D) * 0.22) + ')';
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
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => { resize(); mkPts(); });
  resize(); mkPts(); step();
}

/* ── Typewriter ── */
function initTypewriter(id, text, speed) {
  const el = document.getElementById(id);
  if (!el) return;
  speed = speed || 60;
  el.textContent = '';
  const cursor = Object.assign(document.createElement('span'), {
    textContent: '|',
    style: 'animation:twBlink 0.7s step-end infinite;color:var(--gold);margin-left:1px;'
  });
  const styleEl = document.createElement('style');
  styleEl.textContent = '@keyframes twBlink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(styleEl);
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
  if (!els.d) return;
  const target = new Date(isoDate).getTime();
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const diff = Math.max(0, target - Date.now());
    els.d.textContent = pad(Math.floor(diff / 86400000));
    els.h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    els.m.textContent = pad(Math.floor((diff % 3600000)  / 60000));
    els.s.textContent = pad(Math.floor((diff % 60000)    / 1000));
  }
  tick();
  setInterval(tick, 1000);
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
  items.forEach(i => io.observe(i));
}

/* ── FAQ accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
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
      cards.forEach(c => { c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none'; });
    });
  });
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles('hero-canvas');
  initParticles('page-canvas');
  initTypewriter('hero-typewriter', "Shaping Tomorrow's World", 58);
  initCountdown('2027-02-20T09:00:00');
  initCounters();
  initFAQ();
  initFilter();
});
```

- [ ] **Step 2: Open browser DevTools console on any page — verify no syntax errors appear on load.**

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add shared JS (particles, countdown, typewriter, counters, accordion, filter)"
```

---

## Task 3: Homepage — index.html

**Files:**
- Create: `index.html`
- Requires: `css/styles.css`, `js/main.js`, `img/carolina.jpg`

- [ ] **Step 1: Place the provided Secretary-General photo at `img/carolina.jpg`**

Copy the photo of Carolina De La Garza González to `img/carolina.jpg`. The CSS rule `object-position: top` ensures her face is always visible even on different aspect ratios.

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pan American MUN 2027 — Shaping Tomorrow's World</title>
  <meta name="description" content="Pan American MUN — the premier Model United Nations conference at Universidad Panamericana, Monterrey. February 2027." />
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
</head>
<body>

  <!-- ═══ NAVBAR ═══ -->
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">PAN<span class="dot">·</span>MUN</a>
      <div class="nav-links">
        <a href="index.html" class="active">Home</a>
        <a href="committees.html">Committees</a>
        <a href="secretariat.html">Secretariat</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div class="nav-hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
  <div class="nav-overlay" id="nav-overlay">
    <a href="index.html" class="active">Home</a>
    <a href="committees.html">Committees</a>
    <a href="secretariat.html">Secretariat</a>
    <a href="faq.html">FAQ</a>
  </div>

  <!-- ═══ HERO ═══ -->
  <section class="hero">
    <canvas id="hero-canvas"></canvas>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-label">Universidad Panamericana · Monterrey</p>
      <h1 class="hero-title">Pan <span class="gold">American</span><br>MUN</h1>
      <p class="hero-subtitle"><span id="hero-typewriter"></span></p>
      <p class="hero-date">February 20, 2027 &nbsp;·&nbsp; Monterrey, México</p>
      <div class="countdown">
        <div class="countdown-unit">
          <span class="countdown-num" id="cd-days">---</span>
          <span class="countdown-lbl">Days</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-num" id="cd-hours">--</span>
          <span class="countdown-lbl">Hours</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-num" id="cd-mins">--</span>
          <span class="countdown-lbl">Min</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-num" id="cd-secs">--</span>
          <span class="countdown-lbl">Sec</span>
        </div>
      </div>
      <div class="hero-ctas">
        <a href="#" class="btn btn-gold">Register Now</a>
        <a href="committees.html" class="btn btn-outline">Explore Committees</a>
      </div>
    </div>
    <div class="hero-scroll">
      <span>Scroll</span>
      <div class="scroll-chevron"></div>
    </div>
  </section>

  <!-- ═══ STATS ═══ -->
  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item" data-aos="fade-up">
          <span class="stat-num" data-count="300" data-suffix="+">0+</span>
          <span class="stat-lbl">Delegates</span>
        </div>
        <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
          <span class="stat-num" data-count="17">0</span>
          <span class="stat-lbl">Committees</span>
        </div>
        <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
          <span class="stat-num" data-count="3">0</span>
          <span class="stat-lbl">Experience Levels</span>
        </div>
        <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
          <span class="stat-num" data-count="1">0</span>
          <span class="stat-lbl">Shared Vision</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ ABOUT ═══ -->
  <section class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-text-wrap" data-aos="fade-right">
          <div class="about-accent"></div>
          <div class="about-text">
            <span class="label-gold">About the Conference</span>
            <h2>Where Young Leaders<br>Shape Global Policy</h2>
            <p>Pan American MUN is the flagship Model United Nations conference of Universidad Panamericana, Monterrey. Each year, hundreds of delegates from across the region gather to debate, negotiate, and forge solutions to the world's most pressing challenges.</p>
            <p>Through rigorous committee sessions, delegates develop critical thinking, public speaking, and diplomatic skills — emerging as the next generation of global leaders. With 17 committees spanning every level of experience, PAMUN offers a transformative journey for every participant.</p>
            <a href="committees.html" class="btn btn-outline mt-4">View All Committees</a>
          </div>
        </div>
        <div class="about-graphic" data-aos="fade-left">
          <div class="globe-wrap">
            <div class="globe-glow"></div>
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="280" height="280">
              <circle cx="100" cy="100" r="90" stroke="rgba(201,168,76,0.35)" stroke-width="1.5" stroke-dasharray="4 4"/>
              <circle cx="100" cy="100" r="65" stroke="rgba(201,168,76,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
              <circle cx="100" cy="100" r="40" stroke="rgba(201,168,76,0.2)"  stroke-width="1"/>
              <ellipse cx="100" cy="100" rx="90" ry="38" stroke="rgba(201,168,76,0.18)" stroke-width="1" stroke-dasharray="4 4"/>
              <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(201,168,76,0.15)" stroke-width="1" stroke-dasharray="3 3"/>
              <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(201,168,76,0.15)" stroke-width="1" stroke-dasharray="3 3"/>
              <circle cx="100" cy="100" r="4" fill="#C9A84C"/>
              <circle cx="65"  cy="85"  r="2.5" fill="rgba(201,168,76,0.7)"/>
              <circle cx="130" cy="75"  r="2.5" fill="rgba(201,168,76,0.7)"/>
              <circle cx="115" cy="120" r="2"   fill="rgba(201,168,76,0.6)"/>
              <circle cx="80"  cy="130" r="2"   fill="rgba(201,168,76,0.6)"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ SG LETTER ═══ -->
  <section class="sg-letter">
    <div class="container">
      <div class="sg-letter-grid">
        <div data-aos="fade-right">
          <img src="img/carolina.jpg" alt="Carolina De La Garza González — Secretary-General" class="sg-photo" onerror="this.outerHTML='<div class=\'sg-photo-placeholder\'><svg width=\'64\' height=\'64\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.5\'><path d=\'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\'/><circle cx=\'12\' cy=\'7\' r=\'4\'/></svg><span>Photo coming soon</span></div>'">
          <h3 class="sg-name">Carolina De La Garza González</h3>
          <p class="sg-title-lbl">Secretary-General, Pan American MUN</p>
        </div>
        <div data-aos="fade-left" data-aos-delay="100">
          <span class="label-gold">Message from Leadership</span>
          <h2 class="sg-letter-content" style="font-style:italic;margin-bottom:2rem;">A Letter from the<br>Secretary-General</h2>
          <p class="sg-letter-text">Dear Delegates, Faculty Advisors, and Distinguished Guests,</p>
          <p class="sg-letter-text">It is with immense pride and excitement that I welcome you to Pan American MUN 2027. As Secretary-General, I am honored to lead a conference that has grown to become one of Monterrey's most anticipated academic events, bringing together the brightest student minds in a spirit of diplomacy and collaboration.</p>
          <p class="sg-letter-text">This year, under the theme <em>"Shaping Tomorrow's World,"</em> we invite delegates to engage with the challenges that define our generation — from climate security and human rights to emerging technology and global health. Each committee session is designed to challenge you, inspire you, and ultimately transform you into a more thoughtful and effective global citizen.</p>
          <p class="sg-letter-text">I look forward to witnessing the passion, intellect, and creativity that you will bring to the dais. Together, let us build a conference worthy of the world we wish to create.</p>
          <div class="sg-closing">
            <p>Yours in diplomacy,</p>
            <p class="sg-signature">Carolina De La Garza González</p>
            <div class="sg-sig-line"></div>
            <p class="sg-title-lbl" style="margin-top:0.5rem;">Secretary-General · Pan American MUN 2027</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ COMMITTEES PREVIEW ═══ -->
  <section class="committees-preview">
    <div class="container">
      <h2 class="section-title" data-aos="fade-up"><span>Our Committees</span></h2>
      <p class="section-subtitle" data-aos="fade-up" data-aos-delay="80">17 committees across three levels of experience</p>
      <div class="committees-grid">
        <div class="committee-card" data-aos="fade-up" data-aos-delay="0">
          <div class="acronym">UNSC</div>
          <div class="full-name">United Nations Security Council</div>
          <span class="badge badge-regular">Regular</span>
        </div>
        <div class="committee-card" data-aos="fade-up" data-aos-delay="80">
          <div class="acronym">ICC</div>
          <div class="full-name">International Criminal Court</div>
          <span class="badge badge-specialized">Specialized</span>
        </div>
        <div class="committee-card" data-aos="fade-up" data-aos-delay="160">
          <div class="acronym">WHO</div>
          <div class="full-name">World Health Organization</div>
          <span class="badge badge-regular">Regular</span>
        </div>
        <div class="committee-card" data-aos="fade-up" data-aos-delay="240">
          <div class="acronym">UNESCO</div>
          <div class="full-name">UN Educational, Scientific and Cultural Organization</div>
          <span class="badge badge-beginner">Beginner</span>
        </div>
        <div class="committee-card" data-aos="fade-up" data-aos-delay="320">
          <div class="acronym">INTERPOL</div>
          <div class="full-name">International Criminal Police Organization</div>
          <span class="badge badge-specialized">Specialized</span>
        </div>
        <div class="committee-card" data-aos="fade-up" data-aos-delay="400">
          <div class="acronym">CSW</div>
          <div class="full-name">Commission on the Status of Women</div>
          <span class="badge badge-regular">Regular</span>
        </div>
      </div>
      <div class="text-center" data-aos="fade-up">
        <a href="committees.html" class="btn btn-outline">View All 17 Committees →</a>
      </div>
    </div>
  </section>

  <!-- ═══ SPONSORS ═══ -->
  <section class="sponsors">
    <div class="container">
      <h2 class="section-title" data-aos="fade-up"><span>Our Sponsors</span></h2>
      <p class="section-subtitle" data-aos="fade-up" data-aos-delay="80">Supporting the next generation of global leaders</p>
    </div>
    <div class="marquee-outer">
      <div class="marquee-track">
        <div class="sponsor-block">Sponsor 1</div>
        <div class="sponsor-block">Sponsor 2</div>
        <div class="sponsor-block">Sponsor 3</div>
        <div class="sponsor-block">Sponsor 4</div>
        <div class="sponsor-block">Sponsor 5</div>
        <!-- duplicate for seamless loop -->
        <div class="sponsor-block">Sponsor 1</div>
        <div class="sponsor-block">Sponsor 2</div>
        <div class="sponsor-block">Sponsor 3</div>
        <div class="sponsor-block">Sponsor 4</div>
        <div class="sponsor-block">Sponsor 5</div>
      </div>
    </div>
    <div class="container text-center" data-aos="fade-up">
      <a href="mailto:carolina.dg@alumno.pas.edu.mx" class="btn btn-outline">Become a Sponsor</a>
    </div>
  </section>

  <!-- ═══ FOOTER ═══ -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">PAN<span class="dot">·</span>MUN</div>
          <p class="footer-tagline">Shaping Tomorrow's World<br>Universidad Panamericana · Monterrey</p>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="committees.html">Committees</a></li>
            <li><a href="secretariat.html">Secretariat</a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <div class="footer-social-row">
            <a href="https://instagram.com/panamericanmun" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @panamericanmun
            </a>
          </div>
          <div class="footer-social-row">
            <a href="https://tiktok.com/@panamericanmun" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              @panamericanmun
            </a>
          </div>
          <p class="footer-email"><a href="mailto:carolina.dg@alumno.pas.edu.mx">carolina.dg@alumno.pas.edu.mx</a></p>
        </div>
      </div>
      <div class="footer-bottom">© 2027 Pan American MUN · Universidad Panamericana · All rights reserved</div>
    </div>
  </footer>

  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Open `index.html` in a browser and verify:**
  - Particles animate in the hero background
  - Typewriter types "Shaping Tomorrow's World"
  - Countdown shows correct days/hours/mins/secs ticking down to Feb 20, 2027
  - Scrolling turns navbar from transparent to frosted glass
  - Stats count up when scrolled into view
  - Committee cards have gold hover effect
  - Sponsors marquee scrolls automatically and pauses on hover
  - Mobile: hamburger menu opens full-screen overlay (test at 375px width)

- [ ] **Step 4: Commit**

```bash
git add index.html img/carolina.jpg
git commit -m "feat: add cinematic homepage with hero, stats, SG letter, committees preview, sponsors"
```

---

## Task 4: Committees Page — committees.html

**Files:**
- Create: `committees.html`

- [ ] **Step 1: Create `committees.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Committees — Pan American MUN 2027</title>
  <meta name="description" content="Explore all 17 Pan American MUN committees across Regular, Specialized, and Beginner levels." />
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">PAN<span class="dot">·</span>MUN</a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="committees.html" class="active">Committees</a>
        <a href="secretariat.html">Secretariat</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div class="nav-hamburger" id="hamburger"><span></span><span></span><span></span></div>
    </div>
  </nav>
  <div class="nav-overlay" id="nav-overlay">
    <a href="index.html">Home</a>
    <a href="committees.html" class="active">Committees</a>
    <a href="secretariat.html">Secretariat</a>
    <a href="faq.html">FAQ</a>
  </div>

  <!-- PAGE HERO -->
  <section class="page-hero">
    <canvas id="page-canvas"></canvas>
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Committees</h1>
      <div class="gold-line"></div>
      <p class="subtitle">Choose your arena. Shape the debate.</p>
    </div>
  </section>

  <!-- FILTER + GRID -->
  <section style="padding: var(--section-py) 0;">
    <div class="container">
      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all">All (17)</button>
        <button class="filter-tab" data-filter="regular">Regular (11)</button>
        <button class="filter-tab" data-filter="specialized">Specialized (3)</button>
        <button class="filter-tab" data-filter="beginner">Beginner (3)</button>
      </div>

      <div class="committees-full-grid">

        <!-- REGULAR (11) -->
        <div class="committee-card-full" data-category="regular" data-aos="fade-up">
          <div class="acronym">UNGA</div>
          <div class="full-name">United Nations General Assembly</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="60">
          <div class="acronym">UNSC</div>
          <div class="full-name">United Nations Security Council</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="120">
          <div class="acronym">UNHRC</div>
          <div class="full-name">United Nations Human Rights Council</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="0">
          <div class="acronym">CSW</div>
          <div class="full-name">Commission on the Status of Women</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="60">
          <div class="acronym">WHO</div>
          <div class="full-name">World Health Organization</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="120">
          <div class="acronym">UNODC</div>
          <div class="full-name">UN Office on Drugs and Crime</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="0">
          <div class="acronym">CTC</div>
          <div class="full-name">Counter-Terrorism Committee</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="60">
          <div class="acronym">UNOOSA</div>
          <div class="full-name">UN Office for Outer Space Affairs</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="120">
          <div class="acronym">US Senate</div>
          <div class="full-name">United States Senate</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="0">
          <div class="acronym">EU</div>
          <div class="full-name">European Union Council</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="regular" data-aos="fade-up" data-aos-delay="60">
          <div class="acronym">IOM</div>
          <div class="full-name">International Organization for Migration</div>
          <span class="badge badge-regular">Regular</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>

        <!-- SPECIALIZED (3) -->
        <div class="committee-card-full" data-category="specialized" data-aos="fade-up" data-aos-delay="0">
          <div class="acronym">GPM</div>
          <div class="full-name">Global Policy Meeting</div>
          <span class="badge badge-specialized">Specialized</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="specialized" data-aos="fade-up" data-aos-delay="60">
          <div class="acronym">ICC</div>
          <div class="full-name">International Criminal Court</div>
          <span class="badge badge-specialized">Specialized</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="specialized" data-aos="fade-up" data-aos-delay="120">
          <div class="acronym">INTERPOL</div>
          <div class="full-name">International Criminal Police Organization</div>
          <span class="badge badge-specialized">Specialized</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>

        <!-- BEGINNER (3) -->
        <div class="committee-card-full" data-category="beginner" data-aos="fade-up" data-aos-delay="0">
          <div class="acronym">UNESCO</div>
          <div class="full-name">UN Educational, Scientific and Cultural Organization</div>
          <span class="badge badge-beginner">Beginner</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="beginner" data-aos="fade-up" data-aos-delay="60">
          <div class="acronym">UNICEF</div>
          <div class="full-name">United Nations Children's Fund</div>
          <span class="badge badge-beginner">Beginner</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>
        <div class="committee-card-full" data-category="beginner" data-aos="fade-up" data-aos-delay="120">
          <div class="acronym">UNICEF II</div>
          <div class="full-name">United Nations Children's Fund — Committee II</div>
          <span class="badge badge-beginner">Beginner</span>
          <br><button class="btn-paper" disabled>📄 Position Paper</button>
        </div>

      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">PAN<span class="dot">·</span>MUN</div>
          <p class="footer-tagline">Shaping Tomorrow's World<br>Universidad Panamericana · Monterrey</p>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="committees.html">Committees</a></li>
            <li><a href="secretariat.html">Secretariat</a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <div class="footer-social-row">
            <a href="https://instagram.com/panamericanmun" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @panamericanmun
            </a>
          </div>
          <p class="footer-email"><a href="mailto:carolina.dg@alumno.pas.edu.mx">carolina.dg@alumno.pas.edu.mx</a></p>
        </div>
      </div>
      <div class="footer-bottom">© 2027 Pan American MUN · Universidad Panamericana · All rights reserved</div>
    </div>
  </footer>

  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `committees.html` in browser and verify:**
  - Page hero particles animate
  - Filter tabs work: clicking "Regular" shows 11 cards, "Specialized" shows 3, "Beginner" shows 3, "All" shows 17
  - Position Paper buttons show "Coming soon" tooltip on hover
  - Cards have gold top accent bar and lift on hover

- [ ] **Step 3: Commit**

```bash
git add committees.html
git commit -m "feat: add committees page with filter tabs and all 17 committee cards"
```

---

## Task 5: Secretariat Page — secretariat.html

**Files:**
- Create: `secretariat.html`

- [ ] **Step 1: Create `secretariat.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Secretariat — Pan American MUN 2027</title>
  <meta name="description" content="Meet the Pan American MUN 2027 Secretariat team." />
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">PAN<span class="dot">·</span>MUN</a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="committees.html">Committees</a>
        <a href="secretariat.html" class="active">Secretariat</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div class="nav-hamburger" id="hamburger"><span></span><span></span><span></span></div>
    </div>
  </nav>
  <div class="nav-overlay" id="nav-overlay">
    <a href="index.html">Home</a>
    <a href="committees.html">Committees</a>
    <a href="secretariat.html" class="active">Secretariat</a>
    <a href="faq.html">FAQ</a>
  </div>

  <!-- PAGE HERO -->
  <section class="page-hero">
    <canvas id="page-canvas"></canvas>
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>Secretariat</h1>
      <div class="gold-line"></div>
      <p class="subtitle">The team behind Pan American MUN</p>
    </div>
  </section>

  <!-- SECRETARY-GENERAL FEATURED -->
  <section class="sg-featured">
    <div class="container">
      <div class="sg-featured-grid">
        <div data-aos="fade-right">
          <img src="img/carolina.jpg" alt="Carolina De La Garza González" class="sg-feat-photo" onerror="this.style.display='none'">
        </div>
        <div data-aos="fade-left" data-aos-delay="100">
          <span class="sg-feat-role">Secretary-General</span>
          <h2 class="sg-feat-name">Carolina De La Garza González</h2>
          <p class="sg-feat-title">Pan American MUN 2027 · Universidad Panamericana</p>
          <p class="sg-feat-text">Carolina De La Garza González serves as the Secretary-General of Pan American MUN 2027. A dedicated student at Universidad Panamericana, Monterrey, she brings exceptional leadership, diplomatic skill, and a passion for global affairs to the role. As Secretary-General, Carolina oversees the conference's academic direction, secretariat operations, and delegate experience.</p>
          <p class="sg-feat-text">Her vision for PAMUN 2027 centers on creating an inclusive, intellectually rigorous environment where delegates of all experience levels can develop meaningful skills and lifelong connections.</p>
          <p class="sg-feat-email"><a href="mailto:carolina.dg@alumno.pas.edu.mx">carolina.dg@alumno.pas.edu.mx</a></p>
        </div>
      </div>
    </div>
  </section>

  <!-- TEAM -->
  <section class="team-section" style="background: var(--bg-card); padding: var(--section-py) 0;">
    <div class="container">
      <h2 class="section-title" data-aos="fade-up"><span>The Secretariat Team</span></h2>
      <p class="section-subtitle" data-aos="fade-up" data-aos-delay="80">Dedicated leaders working behind the scenes</p>
      <div class="team-grid">

        <div class="team-card" data-aos="fade-up" data-aos-delay="0">
          <div class="team-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <p class="team-name">TBA</p>
          <p class="team-role">Deputy Secretary-General</p>
        </div>

        <div class="team-card" data-aos="fade-up" data-aos-delay="80">
          <div class="team-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <p class="team-name">TBA</p>
          <p class="team-role">Under-Secretary for General Assemblies</p>
        </div>

        <div class="team-card" data-aos="fade-up" data-aos-delay="160">
          <div class="team-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <p class="team-name">TBA</p>
          <p class="team-role">Under-Secretary for Specialized Committees</p>
        </div>

        <div class="team-card" data-aos="fade-up" data-aos-delay="0">
          <div class="team-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <p class="team-name">TBA</p>
          <p class="team-role">Under-Secretary for Delegate Affairs</p>
        </div>

        <div class="team-card" data-aos="fade-up" data-aos-delay="80">
          <div class="team-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <p class="team-name">TBA</p>
          <p class="team-role">Director of Logistics</p>
        </div>

        <div class="team-card" data-aos="fade-up" data-aos-delay="160">
          <div class="team-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <p class="team-name">TBA</p>
          <p class="team-role">Director of Communications</p>
        </div>

      </div>
      <p class="tba-note">Secretariat positions are pending confirmation. Check back soon for updates.</p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">PAN<span class="dot">·</span>MUN</div>
          <p class="footer-tagline">Shaping Tomorrow's World<br>Universidad Panamericana · Monterrey</p>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="committees.html">Committees</a></li>
            <li><a href="secretariat.html">Secretariat</a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <div class="footer-social-row">
            <a href="https://instagram.com/panamericanmun" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @panamericanmun
            </a>
          </div>
          <p class="footer-email"><a href="mailto:carolina.dg@alumno.pas.edu.mx">carolina.dg@alumno.pas.edu.mx</a></p>
        </div>
      </div>
      <div class="footer-bottom">© 2027 Pan American MUN · Universidad Panamericana · All rights reserved</div>
    </div>
  </footer>

  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `secretariat.html` and verify:**
  - Carolina's photo displays at top-left with her name and role
  - 6 team cards show with SVG avatar placeholder and "TBA" name
  - TBA note appears below the grid
  - All cards animate in on scroll

- [ ] **Step 3: Commit**

```bash
git add secretariat.html
git commit -m "feat: add secretariat page with Carolina profile and placeholder team cards"
```

---

## Task 6: FAQ Page — faq.html

**Files:**
- Create: `faq.html`

- [ ] **Step 1: Create `faq.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FAQ — Pan American MUN 2027</title>
  <meta name="description" content="Frequently asked questions about Pan American MUN 2027." />
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">PAN<span class="dot">·</span>MUN</a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="committees.html">Committees</a>
        <a href="secretariat.html">Secretariat</a>
        <a href="faq.html" class="active">FAQ</a>
      </div>
      <div class="nav-hamburger" id="hamburger"><span></span><span></span><span></span></div>
    </div>
  </nav>
  <div class="nav-overlay" id="nav-overlay">
    <a href="index.html">Home</a>
    <a href="committees.html">Committees</a>
    <a href="secretariat.html">Secretariat</a>
    <a href="faq.html" class="active">FAQ</a>
  </div>

  <!-- PAGE HERO -->
  <section class="page-hero">
    <canvas id="page-canvas"></canvas>
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
      <h1>FAQ</h1>
      <div class="gold-line"></div>
      <p class="subtitle">Everything you need to know before the conference</p>
    </div>
  </section>

  <!-- FAQ ACCORDION -->
  <section class="faq-section">
    <div class="container">
      <div class="faq-list" data-aos="fade-up">

        <div class="faq-item">
          <div class="faq-q">
            <h3>What is Model United Nations?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>Model United Nations (MUN) is an academic simulation of the United Nations where students take on the roles of country delegates, debate global issues, and draft resolutions. It develops critical thinking, public speaking, research, and diplomacy skills in a structured conference format.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>Who can participate in Pan American MUN?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>PAMUN is open to high school and preparatory students in Monterrey and the surrounding region. Both first-time delegates and experienced MUN participants are welcome — we have three experience levels (Beginner, Regular, and Specialized) to match every skill level.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>How do I register as a delegate?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>Registration details will be announced in the coming months. The process typically involves registering your school's delegation through the official registration portal, selecting your committee preferences, and completing your delegate information. Follow @panamericanmun on Instagram for registration announcements.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>What is a position paper and how do I write one?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>A position paper is a 1–2 page document representing your assigned country's stance on the committee's topic. It covers: your country's background on the issue, previous UN actions, and your proposed solutions. Position paper templates and deadlines will be published on the Committees page once finalized.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>What committees are available and how do I choose?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>PAMUN 2027 offers 17 committees: 11 Regular, 3 Specialized, and 3 Beginner. If this is your first MUN experience, we recommend starting with a Beginner committee (UNESCO or UNICEF). Experienced delegates should consider Regular or Specialized committees for a greater challenge. Visit the Committees page to explore each one.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>What is the conference dress code?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>Western business formal attire is required for all committee sessions. This means suits, dress shirts with ties, or formal dresses/blazers. Delegates representing countries with traditional national dress may wear it during the opening and closing ceremonies. Casual clothing is not permitted in committee rooms.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>What should I bring to the conference?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>Bring your delegate badge (provided at registration), printed or digital copies of your position paper, a notepad and pens for drafting clauses, a laptop or tablet (optional but helpful for resolution drafting), and your research materials. Bring water and any snacks permitted by the venue. Full materials list will be sent to registered delegates.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>What languages are used in committee sessions?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>All committee sessions at PAMUN are conducted in English. Delegates are expected to prepare their speeches, draft resolutions, and conduct lobbying in English. Strong English language skills are beneficial. Some beginner committees may offer limited Spanish support — check individual committee descriptions for details.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>How are awards determined?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>Awards are determined by the dais (committee chair and co-chairs) based on: quality of speeches and diplomacy, participation in debate and lobbying, quality of working papers and resolutions, and overall contribution to committee progress. Awards typically include Best Delegate, Outstanding Delegate, and Honorable Mention for each committee.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>Can I participate if I have no previous MUN experience?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>Absolutely. PAMUN is designed to welcome first-time delegates. Our Beginner committees (UNESCO, UNICEF I and II) are specifically structured to provide extra guidance, slower-paced debate, and a supportive environment for new participants. Staff members are always available to answer questions and help you navigate the rules of procedure.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>Where does the conference take place?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>Pan American MUN 2027 takes place at Universidad Panamericana, Monterrey campus. The full venue address and logistical details including parking and transportation will be shared with registered delegates closer to the event date.</p></div>
        </div>

        <div class="faq-item">
          <div class="faq-q">
            <h3>How can my school sponsor or partner with PAMUN?</h3>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-answer"><p>We welcome sponsors and institutional partners who share our commitment to education and youth development. For sponsorship packages and partnership opportunities, please contact the Secretary-General directly at carolina.dg@alumno.pas.edu.mx. Sponsorship benefits include logo placement, delegate registration credits, and recognition at the opening ceremony.</p></div>
        </div>

      </div>
    </div>
  </section>

  <!-- CONTACT BLOCK -->
  <section class="contact-block" style="background: var(--bg-card);">
    <div class="container">
      <h2 data-aos="fade-up">Still have questions?</h2>
      <p data-aos="fade-up" data-aos-delay="80">Reach out to us — we're happy to help.</p>
      <div class="contact-links" data-aos="fade-up" data-aos-delay="160">
        <a href="mailto:carolina.dg@alumno.pas.edu.mx" class="btn btn-gold">Email Us</a>
        <a href="https://instagram.com/panamericanmun" target="_blank" rel="noopener" class="btn btn-outline">Instagram</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">PAN<span class="dot">·</span>MUN</div>
          <p class="footer-tagline">Shaping Tomorrow's World<br>Universidad Panamericana · Monterrey</p>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="committees.html">Committees</a></li>
            <li><a href="secretariat.html">Secretariat</a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <div class="footer-social-row">
            <a href="https://instagram.com/panamericanmun" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @panamericanmun
            </a>
          </div>
          <p class="footer-email"><a href="mailto:carolina.dg@alumno.pas.edu.mx">carolina.dg@alumno.pas.edu.mx</a></p>
        </div>
      </div>
      <div class="footer-bottom">© 2027 Pan American MUN · Universidad Panamericana · All rights reserved</div>
    </div>
  </footer>

  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `faq.html` and verify:**
  - Clicking a question expands it with smooth animation and gold left border
  - Clicking again (or another question) collapses it
  - Chevron rotates 180° when open
  - "Email Us" button links to correct email
  - Only one question can be open at a time

- [ ] **Step 3: Commit**

```bash
git add faq.html
git commit -m "feat: add FAQ page with 12-question accordion and contact block"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Hero with particles, typewriter, countdown → Task 3
- ✅ Stats counter animation → Task 3 (data-count attributes) + Task 2 (initCounters)
- ✅ About PAMUN section → Task 3
- ✅ SG Letter (Carolina photo + formal letter) → Task 3
- ✅ Committees preview (6 cards + CTA) → Task 3
- ✅ Sponsors marquee → Task 3
- ✅ All 17 committees with filter + disabled position paper buttons → Task 4
- ✅ Secretariat with Carolina featured + 6 TBA cards → Task 5
- ✅ FAQ 12 questions accordion → Task 6
- ✅ Contact block → Task 6
- ✅ Shared navbar (transparent → glass on scroll, hamburger mobile menu) → Tasks 1+2
- ✅ Shared footer (logo, links, social, email) → Tasks 1+3–6
- ✅ Responsive CSS (mobile, tablet, desktop) → Task 1
- ✅ AOS scroll animations → Task 2 + all HTML pages

**No placeholders found** — all code blocks are complete and runnable.

**Type consistency** — `initParticles('hero-canvas')` used in `main.js` matches `id="hero-canvas"` in `index.html`. `initParticles('page-canvas')` matches `id="page-canvas"` in inner pages. `cd-days`, `cd-hours`, `cd-mins`, `cd-secs` IDs consistent across HTML and JS. `data-count` / `data-suffix` attributes match `initCounters()` logic. `.filter-tab[data-filter]` and `.committee-card-full[data-category]` attributes consistent between HTML and JS. ✅
