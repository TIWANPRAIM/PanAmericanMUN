'use strict';
/* Central content store — loaded on public pages + admin panel.
   Public pages call applyPageData() which patches DOM from localStorage. */

const SITE_DEFAULTS = {
  conference: {
    year: '2026',
    date: 'September 16, 2026',
    location: 'Monterrey, México',
    theme: 'Lead · Debate · Inspire',
    countdownDate: '2026-09-16T09:00:00',
    registerUrl: '#',
  },
  stats: [
    { count: 300, suffix: '+', label: 'Delegates' },
    { count: 17,  suffix: '',  label: 'Committees' },
    { count: 3,   suffix: '',  label: 'Experience Levels' },
    { count: 1,   suffix: '',  label: 'Shared Vision' },
  ],
  sg: {
    name: 'Carolina De La Garza González',
    email: 'carolina.dg@alumno.pas.edu.mx',
    photo: 'img/carolina.jpg',
    indexRole: 'Secretary-General, Pan American MUN',
    featRole: 'Secretary-General',
    featTitle: 'Pan American MUN 2026 · Pan American School',
    bio1: 'Carolina De La Garza González serves as the Secretary-General of Pan American MUN 2026. A dedicated student at Pan American School, San Pedro Garza García, she brings exceptional leadership, diplomatic skill, and a passion for global affairs to the role. As Secretary-General, Carolina oversees the conference\'s academic direction, secretariat operations, and delegate experience.',
    bio2: 'Her vision for Pan American MUN 2026 centers on creating an inclusive, intellectually rigorous environment where delegates of all experience levels can develop meaningful skills and lifelong connections.',
    letterOpening: 'Dear Delegates, Faculty Advisors, and Distinguished Guests,',
    letter1: 'It is with immense pride and excitement that I welcome you to Pan American MUN 2026. As Secretary-General, I am honored to lead a conference that has grown to become one of Monterrey\'s most anticipated academic events, bringing together the brightest student minds in a spirit of diplomacy and collaboration.',
    letter2: 'This year, under the theme “Lead · Debate · Inspire,” we invite delegates to engage with the challenges that define our generation — from climate security and human rights to emerging technology and global health. Each committee session is designed to challenge you, inspire you, and ultimately transform you into a more thoughtful and effective global citizen.',
    letter3: 'I look forward to witnessing the passion, intellect, and creativity that you will bring to the dais. Together, let us build a conference worthy of the world we wish to create.',
    closing: 'Yours in diplomacy,',
    signature: 'Carolina De La Garza González',
    signatureTitle: 'Secretary-General · Pan American MUN 2026',
  },
  team: [
    { name: 'TBA', role: 'Chief of Staff',              photo: 'img/chief_of_staff.jpeg' },
    { name: 'TBA', role: 'Sub-Chief of Staff',          photo: 'img/subchief_of_staff.jpeg' },
    { name: 'TBA', role: 'Chief of Crisis',             photo: 'img/chief_of_crisis.jpeg' },
    { name: 'TBA', role: 'Director of Crisis',          photo: 'img/director_of_crisis.jpeg' },
    { name: 'TBA', role: 'Chief of Technology',         photo: 'img/chief_of_technology.jpeg' },
    { name: 'TBA', role: 'GA & Committees Specialist',  photo: 'img/GA_and_committees_specialist.jpeg' },
    { name: 'TBA', role: 'Chief of Social Media',       photo: 'img/chief_of_socialmedia.jpeg' },
    { name: 'TBA', role: 'Chief of Logistics',          photo: 'img/chief_of_logistics.jpeg' },
    { name: 'TBA', role: 'Chief of External Affairs',   photo: 'img/chief_of_externalaffairs.jpeg' },
    { name: 'TBA', role: 'Head of Pages',               photo: 'img/head_of_pages.jpeg' },
  ],
  gallery: {
    session1: 'img/session1.jpg',
    session2: 'img/session2.jpg',
    session3: 'img/session3.jpg',
    session4: 'img/session4.jpg',
    team:     'img/team.jpg',
    school:   'img/school.jpg',
  },
  social: {
    instagram: 'https://instagram.com/panamericanmun',
    tiktok:    'https://tiktok.com/@panamericanmun',
    email:     'carolina.dg@alumno.pas.edu.mx',
  },
};

function _deepMerge(target, source) {
  for (const k of Object.keys(source)) {
    if (source[k] !== null && typeof source[k] === 'object' && !Array.isArray(source[k])) {
      if (!target[k] || typeof target[k] !== 'object') target[k] = {};
      _deepMerge(target[k], source[k]);
    } else {
      target[k] = source[k];
    }
  }
  return target;
}

const SiteData = {
  _key:  'pamun_v1',
  _cKey: 'pamun_committees_v1',

  get() {
    try {
      const s = localStorage.getItem(this._key);
      return s ? _deepMerge(JSON.parse(JSON.stringify(SITE_DEFAULTS)), JSON.parse(s))
               : JSON.parse(JSON.stringify(SITE_DEFAULTS));
    } catch(e) { return JSON.parse(JSON.stringify(SITE_DEFAULTS)); }
  },

  save(data) {
    try { localStorage.setItem(this._key, JSON.stringify(data)); return true; }
    catch(e) { return false; }
  },

  getCommittees() {
    try {
      const base = typeof COMMITTEES !== 'undefined' ? JSON.parse(JSON.stringify(COMMITTEES)) : {};
      const s = localStorage.getItem(this._cKey);
      return s ? Object.assign(base, JSON.parse(s)) : base;
    } catch(e) { return typeof COMMITTEES !== 'undefined' ? COMMITTEES : {}; }
  },

  saveCommittees(data) {
    try { localStorage.setItem(this._cKey, JSON.stringify(data)); return true; }
    catch(e) { return false; }
  },

  reset() {
    if (!confirm('¿Restablecer todos los datos a los valores originales? Esta acción no se puede deshacer.')) return;
    localStorage.removeItem(this._key);
    localStorage.removeItem(this._cKey);
    location.reload();
  },

  /* Remote load — fetches published JSON from the repo (for public pages) */
  async loadRemote() {
    try {
      const resp = await fetch('data/site-data.json?t=' + Date.now(), { cache: 'no-store' });
      if (!resp.ok) return this.get();
      const remote = await resp.json();
      if (!remote || !Object.keys(remote).length) return this.get();
      return _deepMerge(JSON.parse(JSON.stringify(SITE_DEFAULTS)), remote);
    } catch(e) { return this.get(); }
  },

  async loadRemoteCommittees() {
    try {
      const resp = await fetch('data/committees-data.json?t=' + Date.now(), { cache: 'no-store' });
      if (!resp.ok) return this.getCommittees();
      const remote = await resp.json();
      if (!remote || !Object.keys(remote).length) return this.getCommittees();
      const base = typeof COMMITTEES !== 'undefined' ? JSON.parse(JSON.stringify(COMMITTEES)) : {};
      return Object.assign(base, remote);
    } catch(e) { return this.getCommittees(); }
  },
};
