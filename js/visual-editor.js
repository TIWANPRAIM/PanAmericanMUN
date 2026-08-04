// PAMUN Visual Editor v1.0
// - Runs on every page: applies stored visual overrides (images, text)
// - Activates interactive editor when URL has ?edit=true
(function () {
'use strict';

var PAGE = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
var LS_KEY = 'pamun_ve';
var _e, _pop = null, _tip = null, _sel = null, _toastT;

/* ── storage ─────────────────────────────────────────────────────────────── */
function ls(k, v) {
  if (v === undefined) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (_) { return null; } }
  try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {}
}
function loadE() {
  var all = ls(LS_KEY) || {};
  _e = all[PAGE] || {};
  if (!_e.img) _e.img = {};
  if (!_e.txt) _e.txt = {};
  if (!_e.w) _e.w = {};
}
function saveE() {
  var all = ls(LS_KEY) || {};
  all[PAGE] = _e;
  ls(LS_KEY, all);
  // mirror into site_data so admin publish picks up VE changes
  try {
    var sd = ls('pamun_site_data') || {};
    if (!sd.ve) sd.ve = {};
    sd.ve[PAGE] = _e;
    ls('pamun_site_data', sd);
  } catch (_) {}
  toast('✓ Saved');
}

/* ── apply stored overrides (runs on every page load) ────────────────────── */
function applyAll(d) {
  if (!d) return;
  document.querySelectorAll('[data-ve-img]').forEach(function (el) {
    var k = el.dataset.veImg;
    if (d.img && d.img[k]) {
      if (el.tagName === 'IMG') el.src = d.img[k];
      else el.style.backgroundImage = 'url(' + d.img[k] + ')';
    }
    if (d.w && d.w[k]) { el.style.width = d.w[k]; el.style.maxWidth = '100%'; }
  });
  document.querySelectorAll('[data-ve-text]').forEach(function (el) {
    var k = el.dataset.veText;
    if (d.txt && d.txt[k]) el.innerHTML = d.txt[k];
  });
}

/* also apply from published site-data.json (loaded by SiteData.loadRemote) */
window.VE_applyRemote = function (remoteVe) {
  if (!remoteVe || !remoteVe[PAGE]) return;
  // merge remote into local (remote = published truth)
  var r = remoteVe[PAGE];
  Object.assign(_e.img, r.img || {});
  Object.assign(_e.txt, r.txt || {});
  Object.assign(_e.w, r.w || {});
  applyAll(_e);
};

/* ── tooltip ─────────────────────────────────────────────────────────────── */
function tip(el, txt) {
  if (!_tip) { _tip = document.createElement('div'); _tip.className = 've-tip'; document.body.append(_tip); }
  _tip.textContent = txt;
  var r = el.getBoundingClientRect();
  _tip.style.cssText = 'left:' + r.left + 'px;top:' + (r.top - 22 + window.scrollY) + 'px;display:block';
}
function untip() { if (_tip) _tip.style.display = 'none'; }

/* ── image popup ─────────────────────────────────────────────────────────── */
function closePop() {
  if (_pop) { _pop.remove(); _pop = null; }
  if (_sel) { _sel.classList.remove('ve-sel'); _sel = null; }
}

function openImgPop(el, key) {
  closePop();
  _sel = el; el.classList.add('ve-sel');
  var src = el.tagName === 'IMG' ? el.getAttribute('src') : (_e.img[key] || '');
  var wPct = parseInt(_e.w[key]) || 100;
  var rect = el.getBoundingClientRect();
  var pLeft = Math.min(Math.max(rect.left, 8), window.innerWidth - 330);
  var pTop = rect.bottom + window.scrollY + 10;

  _pop = document.createElement('div');
  _pop.className = 've-pop';
  _pop.style.cssText = 'top:' + pTop + 'px;left:' + pLeft + 'px';
  _pop.innerHTML =
    '<div class="ve-pop-hd">' +
      '<span class="ve-pop-title">' + (el.dataset.veLabel || key).toUpperCase() + '</span>' +
      '<button class="ve-pop-x" id="vepx">×</button>' +
    '</div>' +
    '<img class="ve-prev" id="veprev" src="' + src + '" onerror="this.style.background=\'#374151\'">' +
    '<label class="ve-lbl">Image URL</label>' +
    '<div class="ve-row">' +
      '<input class="ve-input" id="veurl" type="url" placeholder="https://..." value="' + src + '">' +
      '<label class="ve-upload-btn" title="Upload image file">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
        '<input type="file" id="vefile" accept="image/*" style="display:none">' +
      '</label>' +
    '</div>' +
    '<div class="ve-slider-row"><span class="ve-slider-lbl">Width</span><span class="ve-slider-val" id="vewval">' + wPct + '%</span></div>' +
    '<input type="range" class="ve-range" id="veslider" min="10" max="100" value="' + wPct + '">' +
    '<div class="ve-actions">' +
      '<button class="ve-pop-btn" id="vereset">Reset to original</button>' +
      '<button class="ve-pop-btn ve-pop-btn-p" id="veapply">Apply</button>' +
    '</div>';
  document.body.append(_pop);

  var urlI = _pop.querySelector('#veurl');
  var prev = _pop.querySelector('#veprev');
  var slider = _pop.querySelector('#veslider');
  var wval = _pop.querySelector('#vewval');

  urlI.addEventListener('input', function () { prev.src = urlI.value; });

  _pop.querySelector('#vefile').addEventListener('change', function (ev) {
    var f = ev.target.files[0]; if (!f) return;
    var rd = new FileReader();
    rd.onload = function (e2) { urlI.value = e2.target.result; prev.src = e2.target.result; };
    rd.readAsDataURL(f);
  });

  slider.addEventListener('input', function () {
    wval.textContent = slider.value + '%';
    el.style.width = slider.value + '%'; el.style.maxWidth = '100%';
  });

  _pop.querySelector('#vepx').addEventListener('click', closePop);

  _pop.querySelector('#vereset').addEventListener('click', function () {
    delete _e.img[key]; delete _e.w[key];
    el.style.removeProperty('width'); el.style.removeProperty('max-width');
    el.style.removeProperty('background-image');
    if (el.dataset.veOrigSrc) el.src = el.dataset.veOrigSrc;
    closePop(); saveE();
  });

  _pop.querySelector('#veapply').addEventListener('click', function () {
    var s = urlI.value.trim();
    if (s) {
      _e.img[key] = s;
      if (el.tagName === 'IMG') el.src = s;
      else el.style.backgroundImage = 'url(' + s + ')';
    }
    _e.w[key] = slider.value + '%';
    el.style.width = slider.value + '%'; el.style.maxWidth = '100%';
    closePop(); saveE();
  });

  function escClose(e) { if (e.key === 'Escape') { closePop(); document.removeEventListener('keydown', escClose); } }
  document.addEventListener('keydown', escClose);
}

/* ── text editing ────────────────────────────────────────────────────────── */
function editText(el, key) {
  if (el.contentEditable === 'true') return;
  el.contentEditable = 'true'; el.focus();
  el.addEventListener('blur', function done() {
    el.contentEditable = 'false';
    _e.txt[key] = el.innerHTML;
    saveE();
    el.removeEventListener('blur', done);
  }, { once: true });
  el.addEventListener('keydown', function noEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); el.blur(); el.removeEventListener('keydown', noEnter); }
  });
}

/* ── toast ───────────────────────────────────────────────────────────────── */
function toast(msg) {
  var t = document.querySelector('.ve-toast');
  if (!t) { t = document.createElement('div'); t.className = 've-toast'; document.body.append(t); }
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(_toastT);
  _toastT = setTimeout(function () { t.style.opacity = '0'; }, 2300);
}

/* ── toolbar ─────────────────────────────────────────────────────────────── */
function buildBar() {
  var bar = document.createElement('div');
  bar.className = 've-bar';
  bar.innerHTML =
    '<div class="ve-badge"><div class="ve-badge-dot"></div>EDIT MODE</div>' +
    '<span class="ve-bar-hint">Click any image or text to edit &nbsp;·&nbsp; Changes auto-save to your browser</span>' +
    '<button class="ve-btn ve-btn-save" id="ve-s">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Save</button>' +
    '<button class="ve-btn ve-btn-pub" id="ve-p">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>Publish</button>' +
    '<button class="ve-btn ve-btn-exit" id="ve-x">' +
      '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Exit</button>';
  document.body.prepend(bar);
  document.body.classList.add('ve-on');

  document.getElementById('ve-s').addEventListener('click', saveE);

  document.getElementById('ve-p').addEventListener('click', function () {
    saveE();
    if (typeof publishToGitHub === 'function') { publishToGitHub(); }
    else { alert('To publish, open the Admin Panel and click "Publish for all".'); }
  });

  document.getElementById('ve-x').addEventListener('click', function () {
    var u = new URL(location.href); u.searchParams.delete('edit'); location.replace(u.toString());
  });
}

/* ── wire editables ─────────────────────────────────────────────────────── */
function wireEditables() {
  // store original src so reset works
  document.querySelectorAll('[data-ve-img]').forEach(function (el) {
    if (el.tagName === 'IMG' && !el.dataset.veOrigSrc) el.dataset.veOrigSrc = el.getAttribute('src') || '';
    el.addEventListener('mouseenter', function () { tip(el, '🖼️ ' + (el.dataset.veLabel || el.dataset.veImg)); });
    el.addEventListener('mouseleave', untip);
    el.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); untip(); openImgPop(el, el.dataset.veImg); });
  });

  document.querySelectorAll('[data-ve-text]').forEach(function (el) {
    el.addEventListener('mouseenter', function () { tip(el, '✏️ ' + (el.dataset.veLabel || el.dataset.veText)); });
    el.addEventListener('mouseleave', untip);
    el.addEventListener('click', function (e) { e.stopPropagation(); untip(); editText(el, el.dataset.veText); });
  });

  document.body.addEventListener('click', function (e) {
    if (_pop && !_pop.contains(e.target) && e.target !== _sel) closePop();
  });
}

/* ── init ────────────────────────────────────────────────────────────────── */
function run() {
  loadE();
  applyAll(_e);
  if (new URLSearchParams(location.search).get('edit') !== 'true') return;

  // load editor CSS then activate
  var lnk = document.createElement('link');
  lnk.rel = 'stylesheet'; lnk.href = 'css/visual-editor.css?v=1';
  document.head.append(lnk);
  lnk.onload = function () { buildBar(); wireEditables(); };
  // fallback if onload doesn't fire (some browsers)
  setTimeout(function () {
    if (!document.querySelector('.ve-bar')) { buildBar(); wireEditables(); }
  }, 300);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
else run();

// public API
window.VE = { applyAll: applyAll, loadE: loadE, saveE: saveE, getEdits: function () { return _e; } };

})();
