'use strict';

/* ── Auth ─────────────────────────────────────────── */
if (sessionStorage.getItem('pamun_admin') !== '1') location.href = 'admin.html';
function adminLogout() { sessionStorage.removeItem('pamun_admin'); location.href = 'admin.html'; }

/* ── Helpers ─────────────────────────────────────── */
let _debTimer = null;
const debouncedSave = () => { clearTimeout(_debTimer); _debTimer = setTimeout(saveAll, 800); };

function showStatus(msg, cls) {
  const el = document.getElementById('ap-status');
  el.textContent = msg; el.className = 'ap-status ' + (cls || '');
}

function setupPhoto(previewEl, urlEl, fileEl, onUpdate) {
  if (urlEl) urlEl.addEventListener('input', () => {
    clearTimeout(_debTimer);
    _debTimer = setTimeout(() => { if (urlEl.value) { previewEl.src = urlEl.value; onUpdate(urlEl.value); } }, 600);
  });
  if (fileEl) fileEl.addEventListener('change', () => {
    const f = fileEl.files[0];
    if (!f) return;
    if (f.size > 3 * 1024 * 1024) { alert('Archivo muy grande (máx 3 MB). Usa una URL en su lugar.'); fileEl.value = ''; return; }
    const r = new FileReader();
    r.onload = e => { previewEl.src = e.target.result; if (urlEl) urlEl.value = ''; onUpdate(e.target.result); debouncedSave(); };
    r.readAsDataURL(f);
  });
}

/* ── Navigation ──────────────────────────────────── */
document.querySelectorAll('.ap-nav-btn[data-section]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ap-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.ap-section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('s-' + btn.dataset.section).classList.add('active');
  });
});

/* ── CONFERENCIA ─────────────────────────────────── */
function loadConferencia(d) {
  document.getElementById('conf-year').value     = d.conference.year;
  document.getElementById('conf-date').value     = d.conference.date;
  document.getElementById('conf-location').value = d.conference.location;
  document.getElementById('conf-theme').value    = d.conference.theme;
  document.getElementById('conf-countdown').value= (d.conference.countdownDate || '').slice(0, 16);
  document.getElementById('conf-register').value = d.conference.registerUrl || '';
  const stats = document.getElementById('stats-container');
  stats.innerHTML = '';
  d.stats.forEach((st, i) => {
    const row = document.createElement('div');
    row.className = 'ap-stat-row';
    row.innerHTML = `<input class="ap-input" data-si="${i}" data-sk="count"  type="number" value="${st.count}" min="0">
                     <input class="ap-input" data-si="${i}" data-sk="suffix" type="text"   value="${st.suffix}" placeholder="+">
                     <input class="ap-input" data-si="${i}" data-sk="label"  type="text"   value="${st.label}"  placeholder="Delegates">`;
    stats.appendChild(row);
  });
}
function saveConferencia(d) {
  const v = id => document.getElementById(id).value.trim();
  d.conference.year          = v('conf-year');
  d.conference.date          = v('conf-date');
  d.conference.location      = v('conf-location');
  d.conference.theme         = v('conf-theme');
  d.conference.registerUrl   = v('conf-register');
  const cd = document.getElementById('conf-countdown').value;
  if (cd) d.conference.countdownDate = cd + ':00';
  document.querySelectorAll('[data-si]').forEach(inp => {
    const i = +inp.dataset.si, k = inp.dataset.sk;
    if (d.stats[i]) d.stats[i][k] = k === 'count' ? +inp.value : inp.value;
  });
}

/* ── SECRETARY-GENERAL ───────────────────────────── */
function loadSG(d) {
  const sg = d.sg;
  document.getElementById('sg-photo-preview').src  = sg.photo;
  document.getElementById('sg-photo-url').value    = '';
  document.getElementById('sg-name').value          = sg.name;
  document.getElementById('sg-email').value         = sg.email;
  document.getElementById('sg-indexRole').value     = sg.indexRole;
  document.getElementById('sg-featRole').value      = sg.featRole;
  document.getElementById('sg-featTitle').value     = sg.featTitle;
  document.getElementById('sg-bio1').value          = sg.bio1;
  document.getElementById('sg-bio2').value          = sg.bio2;
  document.getElementById('sg-letterOpening').value = sg.letterOpening;
  document.getElementById('sg-letter1').value       = sg.letter1;
  document.getElementById('sg-letter2').value       = sg.letter2;
  document.getElementById('sg-letter3').value       = sg.letter3;
  document.getElementById('sg-closing').value       = sg.closing;
  document.getElementById('sg-signature').value     = sg.signature;
  setupPhoto(
    document.getElementById('sg-photo-preview'),
    document.getElementById('sg-photo-url'),
    document.getElementById('sg-photo-file'),
    v => { _cur.sg.photo = v; }
  );
}
function saveSG(d) {
  const v = id => document.getElementById(id).value.trim();
  d.sg.name          = v('sg-name');
  d.sg.email         = v('sg-email');
  d.sg.indexRole     = v('sg-indexRole');
  d.sg.featRole      = v('sg-featRole');
  d.sg.featTitle     = v('sg-featTitle');
  d.sg.bio1          = document.getElementById('sg-bio1').value.trim();
  d.sg.bio2          = document.getElementById('sg-bio2').value.trim();
  d.sg.letterOpening = v('sg-letterOpening');
  d.sg.letter1       = document.getElementById('sg-letter1').value.trim();
  d.sg.letter2       = document.getElementById('sg-letter2').value.trim();
  d.sg.letter3       = document.getElementById('sg-letter3').value.trim();
  d.sg.closing       = v('sg-closing');
  d.sg.signature     = v('sg-signature');
}

/* ── EQUIPO ──────────────────────────────────────── */
let _team = [];
function renderTeam(d) {
  _team = JSON.parse(JSON.stringify(d.team));
  const ct = document.getElementById('team-container');
  ct.innerHTML = '';
  _team.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'ap-team-card';
    card.innerHTML = `
      <div class="ap-team-photo-row">
        <img class="ap-team-thumb" src="${m.photo}" onerror="this.style.background='#e2e8f0'">
        <div style="flex:1">
          <input class="ap-input" style="margin-bottom:.35rem;font-size:.8rem" type="url" placeholder="URL foto..." data-tp="${i}">
          <label class="ap-upload-label" style="font-size:.74rem">📁 Subir<input type="file" accept="image/*" data-tf="${i}" style="display:none"></label>
        </div>
      </div>
      <div class="ap-field" style="margin-bottom:.5rem"><label class="ap-label">Nombre</label><input class="ap-input" data-tn="${i}" value="${m.name}"></div>
      <div class="ap-field"><label class="ap-label">Puesto</label><input class="ap-input" data-tr="${i}" value="${m.role}"></div>`;
    ct.appendChild(card);
    const thumb = card.querySelector('.ap-team-thumb');
    setupPhoto(thumb, card.querySelector(`[data-tp="${i}"]`), card.querySelector(`[data-tf="${i}"]`),
      v => { _team[i].photo = v; });
  });
}
function saveTeam(d) {
  document.querySelectorAll('[data-tn]').forEach(el => { const i=+el.dataset.tn; if(_team[i]) _team[i].name=el.value.trim(); });
  document.querySelectorAll('[data-tr]').forEach(el => { const i=+el.dataset.tr; if(_team[i]) _team[i].role=el.value.trim(); });
  d.team = JSON.parse(JSON.stringify(_team));
}

/* ── COMITÉS ─────────────────────────────────────── */
let _committees = {};
function renderCommittees() {
  _committees = SiteData.getCommittees();
  const ct = document.getElementById('committees-container');
  ct.innerHTML = '';
  const catIcon = { regular: '🔵', specialized: '🟡', beginner: '🟢' };
  Object.keys(_committees).forEach(id => {
    const c = _committees[id];
    const item = document.createElement('div');
    item.className = 'ap-committee-item';
    item.dataset.id = id;
    const staffHtml = (c.staff || []).map((s, si) => `
      <div class="ap-staff-row">
        <input class="ap-input" style="max-width:130px" placeholder="Rol" data-sr="${id}-${si}" value="${s.role}">
        <input class="ap-input" placeholder="Nombre" data-sn="${id}-${si}" value="${s.name}">
        <button class="ap-remove-btn" onclick="this.closest('.ap-staff-row').remove();debouncedSave()">✕</button>
      </div>`).join('');
    item.innerHTML = `
      <button class="ap-committee-header">
        <span>${catIcon[c.category]||'⚪'} <strong>${c.acronym}</strong> — <span style="font-weight:400">${c.fullName}</span></span>
        <span class="ap-chevron">▾</span>
      </button>
      <div class="ap-committee-body">
        <div class="ap-row ap-row-3" style="margin-bottom:.75rem">
          <div class="ap-field"><label class="ap-label">Acrónimo</label><input class="ap-input" data-cf="${id}" data-ck="acronym" value="${c.acronym}"></div>
          <div class="ap-field"><label class="ap-label">Categoría</label>
            <select class="ap-select" data-cf="${id}" data-ck="category">
              <option value="regular" ${c.category==='regular'?'selected':''}>Regular</option>
              <option value="specialized" ${c.category==='specialized'?'selected':''}>Specialized</option>
              <option value="beginner" ${c.category==='beginner'?'selected':''}>Beginner</option>
            </select></div>
          <div class="ap-field"><label class="ap-label">URL Foto portada</label><input class="ap-input" data-cf="${id}" data-ck="heroImg" value="${c.heroImg||''}"></div>
        </div>
        <div class="ap-field" style="margin-bottom:.75rem"><label class="ap-label">Nombre completo</label><input class="ap-input" data-cf="${id}" data-ck="fullName" value="${c.fullName}"></div>
        <div class="ap-field" style="margin-bottom:.75rem"><label class="ap-label">Tema de debate</label><textarea class="ap-textarea" style="min-height:60px" data-cf="${id}" data-ck="topic">${c.topic}</textarea></div>
        <div class="ap-field" style="margin-bottom:.75rem"><label class="ap-label">Descripción</label><textarea class="ap-textarea" data-cf="${id}" data-ck="description">${c.description}</textarea></div>
        <div class="ap-label" style="margin-bottom:.5rem">Staff del comité</div>
        <div class="ap-staff-list" data-sl="${id}">${staffHtml}</div>
        <button class="ap-add-btn" onclick="addStaff('${id}')">+ Agregar miembro</button>
      </div>`;
    item.querySelector('.ap-committee-header').addEventListener('click', () => item.classList.toggle('open'));
    ct.appendChild(item);
  });
}
function addStaff(cid) {
  const list = document.querySelector(`[data-sl="${cid}"]`);
  const si = list.children.length;
  const row = document.createElement('div'); row.className = 'ap-staff-row';
  row.innerHTML = `<input class="ap-input" style="max-width:130px" placeholder="Rol" data-sr="${cid}-${si}" value="">
    <input class="ap-input" placeholder="Nombre" data-sn="${cid}-${si}" value="">
    <button class="ap-remove-btn" onclick="this.closest('.ap-staff-row').remove();debouncedSave()">✕</button>`;
  list.appendChild(row); row.querySelector('input').focus();
}
function saveCommittees() {
  document.querySelectorAll('[data-cf]').forEach(el => {
    const id = el.dataset.cf, k = el.dataset.ck;
    if (_committees[id]) _committees[id][k] = el.tagName === 'TEXTAREA' ? el.value.trim() : el.value.trim();
  });
  Object.keys(_committees).forEach(id => {
    const list = document.querySelector(`[data-sl="${id}"]`);
    if (!list) return;
    const staff = [];
    list.querySelectorAll('.ap-staff-row').forEach(row => {
      const r = row.querySelector('[data-sr]'), n = row.querySelector('[data-sn]');
      if (r && n && (r.value.trim() || n.value.trim())) staff.push({ role: r.value.trim(), name: n.value.trim() });
    });
    _committees[id].staff = staff;
  });
  SiteData.saveCommittees(_committees);
}

/* ── GALERÍA ─────────────────────────────────────── */
const GALLERY_LABELS = { session1:'Sesión 1', session2:'Sesión 2', session3:'Sesión 3', session4:'Sesión 4', team:'Foto Equipo', school:'Foto Escuela' };
function renderGallery(d) {
  const ct = document.getElementById('gallery-container'); ct.innerHTML = '';
  Object.keys(GALLERY_LABELS).forEach(key => {
    const src = d.gallery[key] || '';
    const item = document.createElement('div'); item.className = 'ap-gallery-item';
    item.innerHTML = `<img class="ap-thumb rect" src="${src}" onerror="this.style.background='#e2e8f0'">
      <div class="ap-label" style="margin-bottom:.4rem">${GALLERY_LABELS[key]}</div>
      <input class="ap-input" style="font-size:.8rem;margin-bottom:.4rem" type="url" placeholder="Pegar URL..." data-gk="${key}" value="${src.startsWith('data:') ? '' : src}">
      <label class="ap-upload-label" style="font-size:.74rem;width:100%;justify-content:center;box-sizing:border-box">📁 Subir<input type="file" accept="image/*" data-gf="${key}" style="display:none"></label>`;
    ct.appendChild(item);
    const thumb = item.querySelector('.ap-thumb');
    setupPhoto(thumb, item.querySelector(`[data-gk="${key}"]`), item.querySelector(`[data-gf="${key}"]`),
      v => { _cur.gallery[key] = v; });
  });
}
function saveGallery(d) {
  document.querySelectorAll('[data-gk]').forEach(el => { if (el.value.trim()) d.gallery[el.dataset.gk] = el.value.trim(); });
}

/* ── REDES ───────────────────────────────────────── */
function loadRedes(d) {
  document.getElementById('soc-instagram').value = d.social.instagram || '';
  document.getElementById('soc-tiktok').value    = d.social.tiktok    || '';
  document.getElementById('soc-email').value     = d.social.email     || '';
}
function saveRedes(d) {
  d.social.instagram = document.getElementById('soc-instagram').value.trim();
  d.social.tiktok    = document.getElementById('soc-tiktok').value.trim();
  d.social.email     = document.getElementById('soc-email').value.trim();
}

/* ── MASTER LOAD / SAVE ──────────────────────────── */
let _cur = SiteData.get();

function loadAll() {
  _cur = SiteData.get();
  loadConferencia(_cur); loadSG(_cur); renderTeam(_cur);
  renderCommittees(); renderGallery(_cur); loadRedes(_cur);
}

function saveAll() {
  showStatus('Guardando...');
  saveConferencia(_cur); saveSG(_cur); saveTeam(_cur); saveGallery(_cur); saveRedes(_cur);
  SiteData.save(_cur);
  saveCommittees();
  showStatus('Guardado ✓', 'saved');
  setTimeout(() => showStatus(''), 2500);
}

/* ── Auto-save on any form input ────────────────── */
document.querySelector('.ap-main').addEventListener('input', debouncedSave);

document.addEventListener('DOMContentLoaded', loadAll);

/* ── GitHub Publishing ───────────────────────────── */
function showGHModal() {
  const modal = document.getElementById('gh-modal');
  modal.style.display = 'flex';
  document.getElementById('gh-repo').value  = localStorage.getItem('pamun_gh_repo')  || '';
  document.getElementById('gh-token').value = localStorage.getItem('pamun_gh_token') || '';
}
function closeGHModal() {
  document.getElementById('gh-modal').style.display = 'none';
}
function saveGitHubConfig() {
  const repo  = document.getElementById('gh-repo').value.trim();
  const token = document.getElementById('gh-token').value.trim();
  if (!repo || !token) { alert('Ingresa el repositorio y el token.'); return; }
  localStorage.setItem('pamun_gh_repo',  repo);
  localStorage.setItem('pamun_gh_token', token);
  closeGHModal();
  publishToGitHub();
}

async function _ghUpdateFile(token, repo, path, content) {
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  };
  let sha = null;
  try {
    const r = await fetch(apiUrl, { headers });
    if (r.ok) { const d = await r.json(); sha = d.sha; }
  } catch(e) { /* file doesn't exist yet */ }

  const body = { message: `Update ${path} via admin panel`, content: btoa(unescape(encodeURIComponent(content))) };
  if (sha) body.sha = sha;

  const r = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!r.ok) { const e = await r.json(); throw new Error(e.message || `HTTP ${r.status}`); }
}

async function publishToGitHub() {
  const token = localStorage.getItem('pamun_gh_token');
  const repo  = localStorage.getItem('pamun_gh_repo');
  if (!token || !repo) { showGHModal(); return; }

  showStatus('Publicando en GitHub...', '');
  saveAll();

  try {
    await _ghUpdateFile(token, repo, 'data/site-data.json',      JSON.stringify(_cur,        null, 2));
    await _ghUpdateFile(token, repo, 'data/committees-data.json', JSON.stringify(_committees, null, 2));
    showStatus('✓ Publicado — en vivo en ~30 seg', 'saved');
    setTimeout(() => showStatus(''), 6000);
  } catch(e) {
    console.error(e);
    showStatus('Error: ' + e.message, 'error');
  }
}
