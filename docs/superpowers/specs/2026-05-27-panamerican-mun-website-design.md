# Pan American MUN — Website Design Spec
**Date:** 2026-05-27  
**Status:** Approved by user

---

## Overview

A multi-page, premium-dark website for Pan American MUN (Model United Nations conference at Universidad Panamericana, Mexico). The site replaces a Google Sites page from the previous edition and must be significantly more professional, cinematic, and functional. The homepage is the cinematic centerpiece; inner pages are organized and polished but not as animation-heavy.

---

## Goals

- Establish Pan American MUN as a serious, prestigious conference
- Give delegates all the information they need (committees, secretariat, FAQ, contact)
- Drive delegate registrations and sponsor inquiries
- Carry placeholder content wherever this edition's information isn't finalized yet

---

## Design System

### Colors
```
--bg-deep:      #0A0E1A   /* page background */
--bg-card:      #111827   /* card / section surfaces */
--bg-elevated:  #1A2234   /* elevated cards, modals */
--gold:         #C9A84C   /* primary accent */
--gold-light:   #E8C87A   /* hover / highlight states */
--blue-un:      #1D4ED8   /* UN blue for badges */
--text-1:       #F9FAFB   /* headings */
--text-2:       #9CA3AF   /* body, secondary */
--border:       rgba(201,168,76,0.2)   /* subtle gold border */
```

### Typography
- **Headings:** Cormorant Garamond (Google Fonts) — elegant, institutional, serif
- **Body / UI:** Inter (Google Fonts) — clean, readable sans-serif
- **Monospace (countdown digits):** Courier New or similar monospace

### Spacing
- Base unit: 8px (0.5rem)
- Section padding: 96px (6rem) vertical on desktop, 64px on mobile
- Card gap: 24px

---

## File Structure

```
PanAmericanMUN/
├── index.html          ← cinematic main page
├── committees.html     ← all 17 committee cards with filter
├── secretariat.html    ← team profiles
├── faq.html            ← accordion FAQ + contact
├── css/
│   └── styles.css      ← single shared stylesheet
├── js/
│   └── main.js         ← shared: navbar, animations, countdown, AOS init
└── img/
    └── carolina.jpg    ← Secretary-General photo (user-provided)
```

---

## Shared Components

### Navbar
- Fixed to top on all pages
- Logo left: "PAMUN" wordmark + small globe icon (SVG inline)
- Links right: Home · Committees · Secretariat · FAQ
- Active page highlighted with gold underline
- On load: fully transparent background
- On scroll > 60px: transitions to `#0A0E1A` with `backdrop-filter: blur(12px)` and gold bottom border
- Mobile: hamburger menu, full-screen overlay slide-in

### Footer (all pages)
- Dark background (#0A0E1A), gold top border line
- Left: PAMUN logo + tagline "Shaping Tomorrow's World"
- Center: Quick links (Home, Committees, Secretariat, FAQ)
- Right: Social icons (Instagram @panamericanmun, TikTok @panamericanmun) + email carolina.dg@alumno.pas.edu.mx
- Bottom bar: © 2027 Pan American MUN · Universidad Panamericana

---

## Page 1: index.html (Cinematic Homepage)

### Section 1 — Hero (100vh)
- **Background:** animated particle / star field using canvas (vanilla JS, no library). Particles drift slowly, connected by faint gold lines to simulate a globe/network. Subtle radial gradient overlay (dark center to lighter edges).
- **Content (center-aligned):**
  - Small gold label: "UNIVERSIDAD PANAMERICANA PRESENTS"
  - Main headline: "PAN AMERICAN MUN" — Cormorant Garamond, ~96px, letter-spacing wide
  - Subtitle: "Shaping Tomorrow's World" — typewriter animation using JS (types out character by character on load)
  - Date line: "FEBRUARY 20, 2027 · MONTERREY, MEXICO" (placeholder — actual date TBD by client)
  - **Countdown timer:** Live countdown to February 20, 2027 00:00:00
    - Format: `278 DAYS  |  14 HRS  |  32 MIN  |  09 SEC`
    - Each unit in its own flip-card style box (dark card, gold number, label below)
    - Updates every second via `setInterval`
  - Two CTAs:
    - "Register Now" — gold filled button (visually active, href="#" for now)  
    - "Explore Committees" — outlined gold button → links to committees.html
- **Bottom:** animated scroll indicator (bouncing chevron-down icon)

### Section 2 — By The Numbers
- Dark section, full-width
- 4 stat blocks centered in a row:
  - `300+` Delegates
  - `17` Committees
  - `3` Committee Levels
  - `1` Shared Vision
- Numbers animate from 0 on scroll via Intersection Observer
- Horizontal gold divider lines between stats on desktop

### Section 3 — About PAMUN
- Split layout: text left (60%), graphic right (40%)
- Text: 2-paragraph intro about Pan American MUN — what it is, its mission, its role in developing young leaders. (Placeholder copy that reads like final content.)
- Right side: SVG world map outline in gold, subtle pulse animation on continents
- Gold accent vertical bar left of text block

### Section 4 — Letter from the Secretary-General
- Full-width section, slightly lighter background (#111827)
- Left third: Carolina De La Garza photo — large portrait, rounded corners, gold border glow
  - Name: "Carolina De La Garza González"
  - Title: "Secretary-General, Pan American MUN"
- Right two-thirds: Formal letter
  - Italic serif heading: "A Message from the Secretary-General"
  - 3–4 paragraphs (placeholder formal letter content welcoming delegates)
  - Closing: "Yours in diplomacy, Carolina De La Garza González"
  - Decorative gold signature underline
- Entire section slides in from the left on scroll (AOS `fade-right`)

### Section 5 — Committees Preview
- Section title: "OUR COMMITTEES" with gold underline accent
- Subtitle: "17 committees across three levels of experience"
- Preview grid: 6 cards (first 6 committees — one from each major category)
- Each card:
  - Committee acronym large, gold
  - Full committee name
  - Category badge (Regular / Specialized / Beginner)
  - Hover: gold border glow, slight scale-up
- "View All 17 Committees →" CTA button → committees.html
- Cards stagger-animate in on scroll (AOS with delay increments)

### Section 6 — Sponsors
- Section title: "OUR SPONSORS"
- Subtitle: "Interested in supporting the next generation of global leaders?"
- Auto-scrolling marquee row (CSS animation, infinite, pauses on hover):
  - Placeholder sponsor blocks: "Sponsor 1", "Sponsor 2", ... "Sponsor 5"
  - Each block: rounded rectangle, gold border, sponsor number centered
- "Become a Sponsor" button → mailto:carolina.dg@alumno.pas.edu.mx

---

## Page 2: committees.html

### Hero banner
- Shorter hero (~50vh), same particle background
- Title: "COMMITTEES" with gold underline
- Subtitle: "Choose your arena. Shape the debate."

### Filter tabs
- Pill-style tabs: All (17) · Regular (11) · Specialized (3) · Beginner (3)
- Active tab: gold background + dark text
- Clicking a tab filters cards with JS (hide/show by data-category attribute)

### Committee grid (3 columns desktop, 2 tablet, 1 mobile)
All 17 committees from the previous edition (same committees confirmed for this edition):

**Regular Committees (11):**
1. UNGA — UN General Assembly
2. UNSC — UN Security Council
3. UNHRC — UN Human Rights Council
4. CSW — Commission on the Status of Women
5. WHO — World Health Organization
6. UNODC — UN Office on Drugs and Crime
7. CTC — Counter-Terrorism Committee
8. UNOOSA — UN Office for Outer Space Affairs
9. US Senate
10. EU — European Union
11. IOM — International Organization for Migration

**Specialized Committees (3):**
12. GPM — (full name placeholder — to be confirmed)
13. ICC — International Criminal Court
14. INTERPOL

**Beginner Committees (3):**
15. UNESCO — UN Educational, Scientific and Cultural Organization
16. UNICEF — UN Children's Fund
17. UNICEF II — UN Children's Fund (second committee)

### Each committee card
- Dark card (#111827), gold top accent bar
- Acronym: large, Cormorant Garamond, gold
- Full name: Inter, text-2 color
- Category badge: color-coded pill (blue = Regular, purple = Specialized, green = Beginner)
- "Position Paper" button: visually styled but disabled (`disabled` attr + cursor-not-allowed), tooltip on hover: "Coming soon — check back later"
- Hover: card lifts (box-shadow), gold border

---

## Page 3: secretariat.html

### Hero banner
- Same style as committees.html
- Title: "SECRETARIAT"
- Subtitle: "The team behind Pan American MUN"

### Featured: Secretary-General
- Large profile section at top
- Carolina De La Garza González — large photo (img/carolina.jpg)
- Title, brief bio paragraph (placeholder)
- Contact: carolina.dg@alumno.pas.edu.mx

### Secretariat grid
- 6–8 placeholder positions below (grid 3-col desktop):
  - Deputy Secretary-General — generic avatar
  - Under-Secretary for General Assemblies — generic avatar
  - Under-Secretary for Specialized Committees — generic avatar
  - Under-Secretary for Delegate Affairs — generic avatar
  - Director of Logistics — generic avatar
  - Director of Communications — generic avatar
- Generic avatar: SVG silhouette in dark card with gold border
- Name field: "TBA" in italic
- Role field: actual role title
- Note below grid: "Secretariat positions are pending confirmation. Check back soon."

---

## Page 4: faq.html

### Hero banner
- Same style
- Title: "FAQ"
- Subtitle: "Everything you need to know before the conference"

### FAQ Accordion (12 questions)
Smooth expand/collapse with chevron rotation. Gold left border on open items.

Questions to include:
1. What is Model United Nations?
2. Who can participate in Pan American MUN?
3. How do I register as a delegate?
4. What is a position paper and how do I write one?
5. What committees are available and how do I choose?
6. What is the conference dress code?
7. What should I bring to the conference?
8. What languages are used in committee sessions?
9. How are awards determined?
10. Can I participate if I have no previous MUN experience?
11. Where does the conference take place?
12. How can my school sponsor or partner with PAMUN?

### Contact block at bottom
- "Still have questions?"
- Email button → carolina.dg@alumno.pas.edu.mx
- Instagram link → @panamericanmun

---

## Animations & Libraries

All loaded from CDN, no npm/build step required:

| Library | Version | Purpose |
|---|---|---|
| AOS (Animate On Scroll) | 2.3.4 | Scroll-triggered reveals on all pages |
| Google Fonts | n/a | Cormorant Garamond + Inter |
| No other JS libraries | — | Countdown, particles, filter tabs all in vanilla JS |

### Animation inventory
- **Hero particles:** Vanilla canvas — ~80 dots, connected lines, slow drift
- **Typewriter:** Vanilla JS — types subtitle char by char on load
- **Countdown:** `setInterval` every 1000ms, DOM update
- **Navbar transition:** scroll event listener
- **Stat counters:** Intersection Observer → count-up animation
- **Card hovers:** CSS transitions only (no JS)
- **FAQ accordion:** CSS max-height transition + JS toggle class
- **Sponsor marquee:** Pure CSS `@keyframes` animation
- **Page fade-in:** CSS `@keyframes` on `body` load

---

## Content Placeholders (to be updated by client)

| Item | Status | Notes |
|---|---|---|
| Conference date | Placeholder: Feb 20, 2027 | Client to confirm actual date |
| Conference theme | Placeholder: "Shaping Tomorrow's World" | Client to confirm |
| Secretariat members (except Carolina) | TBA | Generic avatars used |
| Sponsor logos | Placeholder blocks | Replace with real logos when confirmed |
| Position paper links | Disabled buttons | Enable and link when docs are ready |
| Registration link | href="#" | Client to provide registration URL |
| Delegate count / stats | Placeholder numbers | Update before launch |
| GPM full name | Placeholder | Client to confirm full committee name |
| SG letter body text | Placeholder formal letter | Client to confirm or rewrite |

---

## Responsiveness

- Mobile-first CSS with breakpoints at 768px (tablet) and 1024px (desktop)
- Hero text scales down on mobile (clamp-based font sizes)
- Navbar collapses to hamburger below 768px
- Stats stack vertically below 768px
- Committee grid: 1 column mobile, 2 tablet, 3 desktop
- Secretariat grid: same breakpoints

---

## SEO & Meta

Each page gets:
- `<title>` tag specific to that page
- `<meta name="description">` 
- Open Graph tags (og:title, og:description, og:image)
- `lang="en"` on `<html>`

---

## Out of Scope (this version)

- Backend/server (all static HTML/CSS/JS)
- CMS integration
- Real registration system (just a button linking to TBD URL)
- Contact form with server-side processing (contact uses mailto: links)
- Blog / news section
- Multilingual toggle
