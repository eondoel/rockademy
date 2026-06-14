'use strict';
/* ===== Núcleo: estado, XP, sonidos, voz, estadísticas, cupones y motor de ejercicios =====
   Diseño pedagógico basado en evidencia:
   - Práctica de recuperación: los ejercicios SON la lección (testing effect)
   - Intercalado y variedad de tipos de ejercicio (Duolingo-style)
   - ~80% de tasa de éxito objetivo, feedback inmediato y correctivo
   - Segmentación: un concepto por pantalla, poco texto + imagen */

const STORE_KEY = 'academia-multiverso-v1';

const DEFAULT_STATE = {
  name: '',
  xp: 0,
  streak: { count: 0, last: '' },
  english: {},          // unitId -> { subDone, examBest, examDone, examTries }
  math: {},
  general: {},
  tech: {},
  robot: {},            // levelIndex -> true
  claude: { read: [], quizBest: 0, quizDone: false, quizTries: 0, missions: [] },
  coupons: [],          // índices de cupones ya otorgados
  stats: { days: {} },  // 'YYYY-MM-DD' -> { lec, ex, exOk, ok, err }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const base = structuredClone(DEFAULT_STATE);
      Object.assign(base, saved);
      base.claude = Object.assign(structuredClone(DEFAULT_STATE.claude), saved.claude || {});
      base.streak = Object.assign(structuredClone(DEFAULT_STATE.streak), saved.streak || {});
      base.stats = Object.assign(structuredClone(DEFAULT_STATE.stats), saved.stats || {});
      if (!base.stats.days) base.stats.days = {};
      if (!Array.isArray(base.coupons)) base.coupons = [];
      return base;
    }
  } catch (e) { /* estado corrupto: empezar de cero */ }
  return structuredClone(DEFAULT_STATE);
}

let S = loadState();
function save() {
  localStorage.setItem(STORE_KEY, JSON.stringify(S));
  if (typeof scheduleCloudSave === 'function') scheduleCloudSave();
}

/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);
function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- Estado de unidad (sub-lecciones + examen) ----------
   Migra el formato viejo { best, done } al nuevo. */
function unitState(store, id) {
  let st = store[id];
  if (!st || typeof st !== 'object') st = {};
  if (!st.subDone) {
    const legacyDone = !!st.done;
    st = {
      subDone: legacyDone ? { all: true } : {},
      examBest: st.best || 0,
      examDone: legacyDone,
      examTries: legacyDone ? 1 : 0,
    };
    store[id] = st;
  }
  return st;
}
function subIsDone(st, i) { return !!(st.subDone[i] || st.subDone.all); }
function allSubsDone(st, total) {
  if (st.subDone.all) return true;
  for (let i = 0; i < total; i++) if (!st.subDone[i]) return false;
  return true;
}

/* ---------- Imágenes de franquicias (proyecto personal, sin lucro) ---------- */
const IMG = {
  // Dragon Ball
  goku: 'assets/img/goku.webp', vegeta: 'assets/img/vegeta.webp', piccolo: 'assets/img/piccolo.webp',
  gohan: 'assets/img/gohan.webp', bulma: 'assets/img/bulma.webp', roshi: 'assets/img/roshi.webp',
  shenron: 'assets/img/shenron.webp', esfera: 'assets/img/esfera.webp', esfera_bola: 'assets/img/esfera_bola.webp',
  // Jurassic Park
  trex: 'assets/img/trex.webp', raptor: 'assets/img/raptor.webp', blue: 'assets/img/blue.webp',
  mosasaurus: 'assets/img/mosasaurus.webp', triceratops: 'assets/img/triceratops.webp',
  brachiosaurus: 'assets/img/brachiosaurus.webp', dilophosaurus: 'assets/img/dilophosaurus.webp',
  spinosaurus: 'assets/img/spinosaurus.webp', stegosaurus: 'assets/img/stegosaurus.webp',
  pteranodon: 'assets/img/pteranodon.webp', ankylosaurus: 'assets/img/ankylosaurus.webp',
  indominus: 'assets/img/indominus.webp', compy: 'assets/img/compy.webp', mrdna: 'assets/img/mrdna.webp',
  // Malcolm el de enmedio
  malcolm: 'assets/img/malcolm.webp', reese: 'assets/img/reese.webp', dewey: 'assets/img/dewey.webp',
  hal: 'assets/img/hal.webp', lois: 'assets/img/lois.webp', francis: 'assets/img/francis.webp',
  // Minecraft
  creeper: 'assets/img/creeper.png', steve: 'assets/img/steve.png', zombie: 'assets/img/zombie.png',
  skeleton: 'assets/img/skeleton.png', enderman: 'assets/img/enderman.png', pig: 'assets/img/pig.png',
  cow: 'assets/img/cow.png', mc_chicken: 'assets/img/mc_chicken.png', wolf: 'assets/img/wolf.png',
  spider: 'assets/img/spider.png', horse: 'assets/img/horse.png', diamond: 'assets/img/diamond.png',
  emerald: 'assets/img/emerald.png', gold: 'assets/img/gold.png', chest: 'assets/img/chest.gif',
  grass: 'assets/img/grass.png', tnt: 'assets/img/tnt.png', pickaxe: 'assets/img/pickaxe.png',
  mc_cake: 'assets/img/mc_cake.png', mc_apple: 'assets/img/mc_apple.png', mc_bread: 'assets/img/mc_bread.png',
  mc_egg: 'assets/img/mc_egg.png', mc_milk: 'assets/img/mc_milk.png', mc_water: 'assets/img/mc_water.png',
  mc_cookie: 'assets/img/mc_cookie.png', mc_bed: 'assets/img/mc_bed.png',
  // Fortnite
  llama: 'assets/img/llama.webp', vbucks: 'assets/img/vbucks.webp', peely: 'assets/img/peely.webp',
  battlebus: 'assets/img/battlebus.webp', chugjug: 'assets/img/chugjug.webp', boogie: 'assets/img/boogie.webp',
  // Bill & Ted
  bill: 'assets/img/bill.webp', ted: 'assets/img/ted.webp', cabina: 'assets/img/cabina.webp',
  // Star Wars (precuelas)
  anakin: 'assets/img/anakin.webp', obiwan: 'assets/img/obiwan.webp', maul: 'assets/img/maul.webp',
  yoda: 'assets/img/yoda.webp', r2d2: 'assets/img/r2d2.webp', padme: 'assets/img/padme.webp',
  // Mario Bros
  mario: 'assets/img/mario.webp', luigi: 'assets/img/luigi.webp', bowser: 'assets/img/bowser.webp',
  peach: 'assets/img/peach.webp', yoshi: 'assets/img/yoshi.webp', goomba: 'assets/img/goomba.webp',
  estrella: 'assets/img/estrella.webp', hongo: 'assets/img/hongo.webp',
  // How to Train Your Dragon
  chimuelo: 'assets/img/chimuelo.webp', hipo: 'assets/img/hipo.webp',
  // Cars / Toy Story
  mcqueen: 'assets/img/mcqueen.webp', mate_cars: 'assets/img/mate_cars.webp',
  woody: 'assets/img/woody.webp', buzz: 'assets/img/buzz.webp', rex_ts: 'assets/img/rex_ts.webp',
  // One Piece
  luffy: 'assets/img/luffy.webp', zoro: 'assets/img/zoro.webp', chopper: 'assets/img/chopper.webp',
  merry: 'assets/img/merry.webp',
};

/* fotos / ilustraciones con fondo: se muestran recortadas en círculo en iconos */
const IMG_PHOTO = new Set(['malcolm', 'reese', 'dewey', 'hal', 'lois', 'francis', 'blue', 'compy',
  'roshi', 'mrdna', 'piccolo', 'esfera', 'shenron', 'bill', 'ted', 'cabina', 'anakin', 'obiwan',
  'maul', 'yoda', 'padme', 'merry']);

/* rotación de "motivadores" para preguntas sin imagen propia */
const MOTIVADORES = ['goku', 'steve', 'peely', 'mrdna', 'mario', 'yoda', 'luffy', 'chimuelo',
  'mcqueen', 'buzz', 'reese', 'blue', 'vegeta', 'r2d2', 'yoshi', 'woody', 'bill', 'chopper'];
function motivador() { return pick(MOTIVADORES); }

function imgTag(name, cls = '', alt = '') {
  if (!IMG[name]) return '';
  if (IMG_PHOTO.has(name) && (cls.includes('item-img') || cls.includes('status-img') || cls.includes('icon-img'))) cls += ' photo';
  return `<img src="${IMG[name]}" class="${cls}" alt="${esc(alt)}" onerror="this.style.display='none'">`;
}

/* ---------- Rangos y XP ---------- */
const RANKS = [
  { xp: 0,    t: 'Aldeano Curioso',        e: '🌱' },
  { xp: 150,  t: 'Explorador Novato',      e: '🧭' },
  { xp: 350,  t: 'Minero del Saber',       e: '⛏️' },
  { xp: 600,  t: 'Domador de Dinos',       e: '🦖' },
  { xp: 950,  t: 'Constructor Épico',      e: '🏗️' },
  { xp: 1400, t: 'Guerrero Z',             e: '🥋' },
  { xp: 2000, t: 'Súper Guerrero',         e: '🔥' },
  { xp: 2800, t: 'Leyenda del Multiverso', e: '🐉' },
];

function rankFor(xp) {
  let r = RANKS[0];
  for (const rank of RANKS) if (xp >= rank.xp) r = rank;
  return r;
}
function nextRank(xp) {
  for (const rank of RANKS) if (xp < rank.xp) return rank;
  return null;
}

function renderHeader() {
  const r = rankFor(S.xp);
  const nr = nextRank(S.xp);
  $('#rank').textContent = `${r.e} ${r.t}`;
  const power = S.xp * 10;
  $('#power').textContent = `⚡ ${power.toLocaleString('es-MX')}` + (power > 8000 ? ' ‼️' : '');
  $('#power').title = power > 8000 ? '¡¡Es más de 8000!!' : 'Tu nivel de poder';
  $('#streak').textContent = `🔥 ${S.streak.count}`;
  let pct = 100;
  if (nr) {
    const prev = r.xp;
    pct = Math.round(((S.xp - prev) / (nr.xp - prev)) * 100);
  }
  $('#xpfill').style.width = pct + '%';
}

function addXP(n, x, y) {
  const before = rankFor(S.xp);
  S.xp += n;
  save();
  renderHeader();
  const f = document.createElement('div');
  f.className = 'xp-float';
  f.textContent = `+${n} XP`;
  f.style.left = (x != null ? x : window.innerWidth / 2 - 30) + 'px';
  f.style.top = (y != null ? y : 120) + 'px';
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1100);
  const after = rankFor(S.xp);
  if (after !== before) {
    setTimeout(() => {
      confetti(120);
      sfxWin();
      showModal(`
        <h2>${after.e} ¡SUBISTE DE RANGO!</h2>
        <p>Ahora eres <b style="color:var(--accent)">${esc(after.t)}</b>.<br>Tu poder sigue creciendo…</p>
        <button class="btn" data-close>¡Genial!</button>
      `);
    }, 600);
  }
}

function todayStr() { return new Date().toISOString().slice(0, 10); }
function touchStreak() {
  const today = todayStr();
  if (S.streak.last === today) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  S.streak.count = (S.streak.last === yesterday) ? S.streak.count + 1 : 1;
  S.streak.last = today;
  save();
  renderHeader();
}

/* ---------- Estadísticas (para el panel de papá) ---------- */
function statDay() {
  if (!S.stats) S.stats = { days: {} };
  if (!S.stats.days) S.stats.days = {};
  const d = todayStr();
  if (!S.stats.days[d]) S.stats.days[d] = { lec: 0, ex: 0, exOk: 0, ok: 0, err: 0 };
  return S.stats.days[d];
}
function statAnswer(right) {
  const d = statDay();
  if (right) d.ok++; else d.err++;
  // no save() aquí: el motor ya guarda con cada XP / al terminar
}
function statQuiz(isExam, passed) {
  const d = statDay();
  if (isExam) { d.ex++; if (passed) d.exOk++; }
  else d.lec++;
  save();
}

/* ---------- Cupones de regalo ---------- */
const COUPONS = [
  { t: 'Sándwich de Nutella', e: '🥪', c: '#7b4a2c' },
  { t: 'Boing de Guayaba', e: '🧃', c: '#d96a8b' },
  { t: 'Lego pequeño', e: '🧱', c: '#d92b2b' },
  { t: 'Mundo de Minecraft', e: '⛏️', c: '#3e8948' },
  { t: 'Baquetas nuevas', e: '🥁', c: '#b8742c' },
  { t: 'Viaje a Recórcholis', e: '🎮', c: '#7b2cb8' },
  { t: '¡VIAJE A DISNEY!', e: '🏰', c: '#2c5bb8' },
];
const COUPON_AT = [4, 8, 12, 16, 20, 23, 26]; // exámenes aprobados necesarios

function examsPassedCount() {
  let n = 0;
  try {
    if (typeof ENGLISH_UNITS !== 'undefined') ENGLISH_UNITS.forEach(u => { if (unitState(S.english, u.id).examDone) n++; });
    if (typeof MATH_TOPICS !== 'undefined') MATH_TOPICS.forEach(t => { if (unitState(S.math, t.id).examDone) n++; });
    if (typeof GENERAL_TOPICS !== 'undefined') GENERAL_TOPICS.forEach(t => { if (unitState(S.general, t.id).examDone) n++; });
    if (typeof ROBOT_LEVELS !== 'undefined' && ROBOT_LEVELS.every((_, i) => S.robot[i])) n++;
    if (unitState(S.tech, 'complab').examDone) n++;
    if (S.claude.quizDone) n++;
  } catch (e) { }
  return n;
}

function checkCoupons() {
  const n = examsPassedCount();
  for (let i = 0; i < COUPONS.length; i++) {
    if (n >= COUPON_AT[i] && !S.coupons.includes(i)) {
      S.coupons.push(i);
      save();
      setTimeout(() => awardCoupon(i), 1200);
      return; // uno a la vez
    }
  }
}

function drawCoupon(i) {
  const cp = COUPONS[i];
  const c = document.createElement('canvas');
  c.width = 1000; c.height = 620;
  const x = c.getContext('2d');
  // fondo
  const g = x.createLinearGradient(0, 0, 1000, 620);
  g.addColorStop(0, cp.c); g.addColorStop(1, '#1a1040');
  x.fillStyle = g; x.fillRect(0, 0, 1000, 620);
  // tarjeta interior
  x.fillStyle = '#fffdf5';
  roundRect(x, 40, 40, 920, 540, 28); x.fill();
  // borde punteado de cupón
  x.setLineDash([16, 12]);
  x.strokeStyle = cp.c; x.lineWidth = 6;
  roundRect(x, 64, 64, 872, 492, 18); x.stroke();
  x.setLineDash([]);
  // textos
  x.fillStyle = cp.c;
  x.font = 'bold 34px Arial';
  x.textAlign = 'center';
  x.fillText('🌌 ACADEMIA MULTIVERSO · CUPÓN OFICIAL 🌌', 500, 130);
  x.font = '150px Arial';
  x.fillText(cp.e, 500, 300);
  x.fillStyle = '#1a1040';
  x.font = 'bold 52px Arial';
  x.fillText(cp.t.toUpperCase(), 500, 390);
  x.font = '26px Arial';
  x.fillStyle = '#555';
  x.fillText(`Ganado por ${S.name || 'el guerrero'} al demostrar conocimiento sólido`, 500, 445);
  x.fillText(`Cupón ${i + 1} de 7 · ${new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}`, 500, 485);
  x.font = 'italic 22px Arial';
  x.fillText('Canjéalo con papá / mamá 💛', 500, 530);
  return c.toDataURL('image/png');
}
function roundRect(x, px, py, w, h, r) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}

function awardCoupon(i) {
  const cp = COUPONS[i];
  const dataURL = drawCoupon(i);
  // descarga automática (en compu va a Descargas; en iPhone se abre/guarda)
  try {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `cupon-${i + 1}-${cp.t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (e) { }
  confetti(160);
  sfxWin();
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  showModal(`
    <h2>🎟️ ¡CUPÓN DESBLOQUEADO!</h2>
    <img src="${dataURL}" alt="cupón" style="width:100%;border-radius:12px;margin:10px 0">
    <p><b>${esc(cp.t)}</b> — demostraste conocimiento sólido en ${COUPON_AT[i]} exámenes. 💪</p>
    <p class="muted" style="font-size:.85rem">${isIOS
      ? '📲 Mantén presionada la imagen y elige "Guardar en Fotos" para llevarla a tu galería.'
      : '💾 El cupón también se descargó a tu carpeta de Descargas.'}</p>
    <button class="btn" data-close>¡A canjearlo! 🎉</button>
  `);
}

/* ---------- Sonidos (WebAudio) ---------- */
let AC = null;
function audioCtx() {
  if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } }
  return AC;
}
function beep(freq, dur, type = 'square', vol = 0.12, delay = 0) {
  const ctx = audioCtx();
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(ctx.destination);
  o.start(t); o.stop(t + dur);
}
function sfxGood() { beep(660, .1); beep(880, .14, 'square', .12, .09); }
function sfxBad() { beep(180, .2, 'sawtooth', .1); beep(140, .25, 'sawtooth', .1, .12); }
function sfxWin() { [523, 659, 784, 1047].forEach((f, i) => beep(f, .18, 'square', .12, i * .12)); }
function sfxClick() { beep(440, .05, 'sine', .08); }

/* ---------- Voz en inglés ---------- */
function sayEN(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.82;
  const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
if ('speechSynthesis' in window) speechSynthesis.getVoices();

/* ---------- Confeti ---------- */
function confetti(n = 80) {
  let root = $('#confetti-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'confetti-root';
    document.body.appendChild(root);
  }
  const colors = ['#ffb52e', '#4cd964', '#38d6d6', '#ff5e57', '#a06bff', '#ffffff'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.className = 'confetto';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = pick(colors);
    c.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
    c.style.animationDelay = (Math.random() * .6) + 's';
    root.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

/* ---------- Modal ---------- */
function showModal(html, opts = {}) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="modal-bg"><div class="modal">${html}</div></div>`;
  root.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
  if (opts.onMount) opts.onMount(root);
}
function closeModal() { $('#modal-root').innerHTML = ''; }

/* ---------- Opciones numéricas ---------- */
function numOptions(answer, spread) {
  const set = new Set([answer]);
  let guard = 0;
  while (set.size < 4 && guard++ < 60) {
    const d = ri(1, spread) * (Math.random() < .5 ? -1 : 1);
    set.add(answer + d);
  }
  return shuffle([...set]).map(String);
}

/* ================= MOTOR DE EJERCICIOS =================
 Tipos soportados (q.type):
  'info'    { text, img?, emoji?, say? }                — tarjeta de concepto, no puntúa
  'mc'      { text, options, answer, img?, emoji?, say?, note? } — opción múltiple (V/F = 2 opciones)
  'spell'   { es, word, img?, emoji? }                  — armar palabra letra por letra
  'order'   { text, tokens, say?, img?, emoji? }        — ordenar fichas (frases, pasos de algoritmo)
  'match'   { text?, pairs:[[izq,der],...] }            — unir parejas
  'pickimg' { text, options:[imgKeys], answer, say? }   — elegir la imagen correcta
  'bits'    { target, text? }                           — encender focos binarios (8-4-2-1)
========================================================= */
function startQuiz(cfg) {
  // cfg: { qs, onBack, onDone(score,total,passed), isExam?, title? }
  const qs = cfg.qs;
  const scoredTotal = qs.filter(q => q.type !== 'info').length;
  const passNeed = Math.ceil(scoredTotal * 0.8);
  let i = 0, score = 0, answeredScored = 0;
  const app = $('#app');

  function blurActive() {
    // fix: que el foco/hover no se "pegue" en el botón de la pregunta anterior
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  function finish() {
    blurActive();
    touchStreak();
    const passed = score >= passNeed;
    statQuiz(!!cfg.isExam, passed);
    const stars = score >= scoredTotal * 0.9 ? 3 : (passed ? 2 : (score >= scoredTotal * 0.6 ? 1 : 0));
    const bonus = passed ? (cfg.isExam ? 40 : 20) : 0;
    if (bonus) addXP(bonus);
    if (passed) { confetti(cfg.isExam ? 140 : 100); sfxWin(); }
    const starsTxt = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    app.innerHTML = `
      <div class="end-card">
        <div class="stars">${starsTxt}</div>
        <h2>${passed ? (cfg.isExam ? '🏆 ¡EXAMEN APROBADO!' : '¡MISIÓN CUMPLIDA!') : '¡Casi lo logras!'}</h2>
        <p class="muted">Acertaste <b>${score} de ${scoredTotal}</b>${passed ? '' : ' — necesitas ' + passNeed + ' para aprobar'}</p>
        <div class="end-xp">+${score * 10 + bonus} XP ganados ⚡</div>
        <div id="reward-slot"></div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn secondary" id="q-again">🔁 Reintentar</button>
          <button class="btn" id="q-back">Continuar ➜</button>
        </div>
      </div>`;
    $('#q-again').addEventListener('click', () => startQuiz(cfg));
    $('#q-back').addEventListener('click', cfg.onBack);
    if (cfg.onDone) cfg.onDone(score, scoredTotal, passed);
  }

  function header(q) {
    const label = q.type === 'info' ? '📖' : `${Math.min(answeredScored + 1, scoredTotal)}/${scoredTotal}`;
    return `
      <button class="back-link" id="q-exit">← Salir</button>
      <div class="quiz-top">
        <span class="quiz-count">${label}</span>
        <div class="quiz-bar"><div style="width:${(i / qs.length) * 100}%"></div></div>
        <span class="quiz-score">✔ ${score}</span>
      </div>`;
  }

  function next() {
    blurActive();
    i++;
    if (i >= qs.length) finish(); else renderQ();
  }

  function mark(right, ev) {
    statAnswer(right);
    answeredScored++;
    if (right) {
      score++;
      sfxGood();
      addXP(10, ev && ev.clientX, ev && ev.clientY);
    } else {
      sfxBad();
    }
  }

  function continueBtn(target) {
    const cont = document.createElement('div');
    cont.className = 'btn-row';
    cont.style.justifyContent = 'center';
    cont.innerHTML = `<button class="btn small secondary">Seguir ➜</button>`;
    target.after(cont);
    cont.querySelector('button').addEventListener('click', next);
  }

  function visual(q) {
    return q.img ? imgTag(q.img, 'q-img') : (q.emoji ? `<div class="q-emoji">${q.emoji}</div>` : '');
  }
  function sayBtn(q) {
    return q.say ? `<button class="q-say" id="q-say" title="Escuchar">🔊</button>` : '';
  }
  function bindSay(q, auto) {
    if (!q.say) return;
    const b = $('#q-say');
    if (b) b.addEventListener('click', () => sayEN(q.say));
    if (auto) setTimeout(() => sayEN(q.say), 350);
  }
  function bindExit() { $('#q-exit').addEventListener('click', cfg.onBack); }

  /* --- tarjeta de concepto --- */
  function renderInfo(q) {
    app.innerHTML = `
      ${header(q)}
      <div class="q-card info-card">
        ${visual(q)}
        <div class="q-text">${q.text}</div>
        ${sayBtn(q)}
        <div class="btn-row" style="justify-content:center">
          <button class="btn teal" id="q-ok">¡Entendido! ➜</button>
        </div>
      </div>`;
    bindExit(); bindSay(q, true);
    $('#q-ok').addEventListener('click', next);
  }

  /* --- opción múltiple / V-F --- */
  function renderMC(q) {
    app.innerHTML = `
      ${header(q)}
      <div class="q-card">
        ${visual(q)}
        <div class="q-text">${q.text}</div>
        ${sayBtn(q)}
        <div class="opts ${q.options.length === 2 ? 'two' : ''}">
          ${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    bindExit(); bindSay(q, true);
    app.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const chosen = q.options[+btn.dataset.k];
        app.querySelectorAll('.opt').forEach(b => b.disabled = true);
        const right = String(chosen) === String(q.answer);
        mark(right, ev);
        if (right) {
          btn.classList.add('correct');
          setTimeout(next, 850);
        } else {
          btn.classList.add('wrong');
          app.querySelectorAll('.opt').forEach(b => {
            if (String(q.options[+b.dataset.k]) === String(q.answer)) b.classList.add('correct');
          });
          $('#q-note').innerHTML =
            `${q.note ? esc(q.note) + ' — ' : ''}La respuesta era: <span class="right">${esc(q.answer)}</span>`;
          continueBtn($('#q-note'));
        }
      });
    });
  }

  /* --- elegir la imagen --- */
  function renderPickImg(q) {
    app.innerHTML = `
      ${header(q)}
      <div class="q-card">
        <div class="q-text">${q.text}</div>
        ${sayBtn(q)}
        <div class="pick-grid">
          ${q.options.map((key, k) => `
            <button class="pick" data-k="${k}">
              <img src="${IMG[key]}" alt="opción ${k + 1}">
            </button>`).join('')}
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    bindExit(); bindSay(q, true);
    app.querySelectorAll('.pick').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        app.querySelectorAll('.pick').forEach(b => b.disabled = true);
        const right = q.options[+btn.dataset.k] === q.answer;
        mark(right, ev);
        if (right) {
          btn.classList.add('correct');
          setTimeout(next, 850);
        } else {
          btn.classList.add('wrong');
          app.querySelectorAll('.pick').forEach(b => {
            if (q.options[+b.dataset.k] === q.answer) b.classList.add('correct');
          });
          $('#q-note').textContent = '¡Esa no era! Fíjate en la marcada en verde.';
          continueBtn($('#q-note'));
        }
      });
    });
  }

  /* --- ordenar fichas (frases / pasos) --- */
  function renderOrder(q) {
    const tokens = q.tokens;
    const bank = shuffle(tokens.map((t, k) => ({ t, k })));
    let built = [];
    app.innerHTML = `
      ${header(q)}
      <div class="q-card">
        ${visual(q)}
        <div class="q-text">${q.text}</div>
        <div class="order-built" id="ord-built"></div>
        <div class="order-bank" id="ord-bank"></div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn small secondary" id="ord-del">⌫ Quitar última</button>
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    bindExit();
    const builtEl = $('#ord-built'), bankEl = $('#ord-bank');
    function draw() {
      builtEl.innerHTML = built.length
        ? built.map(b => `<span class="token placed">${esc(b.t)}</span>`).join('')
        : `<span class="empty-hint">Toca las fichas en el orden correcto…</span>`;
      bankEl.innerHTML = bank.map((b, k) => {
        const used = built.some(x => x.k === b.k);
        return `<button class="token" data-k="${k}" ${used ? 'disabled' : ''}>${esc(b.t)}</button>`;
      }).join('');
      bankEl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        sfxClick();
        built.push(bank[+b.dataset.k]);
        draw();
        if (built.length === tokens.length) check();
      }));
    }
    $('#ord-del').addEventListener('click', () => { built.pop(); draw(); });
    function check() {
      const right = built.map(b => b.t).join('¦') === tokens.join('¦');
      bankEl.querySelectorAll('button').forEach(b => b.disabled = true);
      mark(right);
      if (right) {
        builtEl.querySelectorAll('.token').forEach(t => t.classList.add('good'));
        if (q.say) sayEN(q.say);
        setTimeout(next, 1000);
      } else {
        builtEl.querySelectorAll('.token').forEach(t => t.classList.add('bad'));
        $('#q-note').innerHTML = `El orden correcto era:<br><span class="right">${tokens.map(esc).join(' → ')}</span>`;
        continueBtn($('#q-note'));
      }
    }
    draw();
  }

  /* --- unir parejas --- */
  function renderMatch(q) {
    const left = shuffle(q.pairs.map((p, k) => ({ t: p[0], k })));
    const right = shuffle(q.pairs.map((p, k) => ({ t: p[1], k })));
    let selL = null, selR = null, matched = 0, errors = 0, locked = false;
    app.innerHTML = `
      ${header(q)}
      <div class="q-card">
        <div class="q-text">${q.text || '🔗 Une las parejas'}</div>
        <div class="match-grid">
          <div class="match-col" id="m-left">
            ${left.map((p, k) => `<button class="mbtn" data-side="L" data-k="${k}">${esc(p.t)}</button>`).join('')}
          </div>
          <div class="match-col" id="m-right">
            ${right.map((p, k) => `<button class="mbtn" data-side="R" data-k="${k}">${esc(p.t)}</button>`).join('')}
          </div>
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    bindExit();
    app.querySelectorAll('.mbtn').forEach(btn => btn.addEventListener('click', () => {
      if (locked || btn.classList.contains('done')) return;
      sfxClick();
      const side = btn.dataset.side;
      app.querySelectorAll(`.mbtn[data-side="${side}"]`).forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      if (side === 'L') selL = btn; else selR = btn;
      if (selL && selR) {
        locked = true;
        const okPair = left[+selL.dataset.k].k === right[+selR.dataset.k].k;
        const a = selL, b = selR;
        selL = null; selR = null;
        if (okPair) {
          beep(700 + matched * 80, .08, 'sine', .1);
          a.classList.remove('sel'); b.classList.remove('sel');
          a.classList.add('done'); b.classList.add('done');
          matched++;
          locked = false;
          if (matched === q.pairs.length) {
            const rightAll = errors === 0;
            mark(rightAll);
            if (rightAll) {
              $('#q-note').innerHTML = '<span class="right">¡Parejas perfectas! 🤝</span>';
              setTimeout(next, 900);
            } else {
              $('#q-note').innerHTML = `Completado con ${errors} error${errors > 1 ? 'es' : ''}. ¡A la próxima sin fallar!`;
              continueBtn($('#q-note'));
            }
          }
        } else {
          errors++;
          sfxBad();
          a.classList.add('bad'); b.classList.add('bad');
          setTimeout(() => {
            a.classList.remove('sel', 'bad'); b.classList.remove('sel', 'bad');
            locked = false;
          }, 500);
        }
      }
    }));
  }

  /* --- focos binarios --- */
  function renderBits(q) {
    const vals = [8, 4, 2, 1];
    let on = [false, false, false, false];
    app.innerHTML = `
      ${header(q)}
      <div class="q-card">
        <div class="q-text">${q.text || `Enciende los focos para formar el número <b style="color:var(--accent);font-size:1.5rem">${q.target}</b>`}</div>
        <div class="bits-row" id="bits">
          ${vals.map((v, k) => `
            <button class="bit" data-k="${k}">
              <span class="bulb">⚫</span>
              <span class="bval">${v}</span>
            </button>`).join('')}
        </div>
        <div class="bits-sum" id="bits-sum">Valor actual: 0</div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn green" id="bits-check">✓ Comprobar</button>
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    bindExit();
    function sum() { return vals.reduce((s, v, k) => s + (on[k] ? v : 0), 0); }
    function draw() {
      app.querySelectorAll('.bit').forEach((b, k) => {
        b.querySelector('.bulb').textContent = on[k] ? '💡' : '⚫';
        b.classList.toggle('on', on[k]);
      });
      $('#bits-sum').textContent = `Valor actual: ${sum()}  (${on.map(x => x ? 1 : 0).join('')} en binario)`;
    }
    app.querySelectorAll('.bit').forEach((b, k) => b.addEventListener('click', () => {
      sfxClick();
      on[k] = !on[k];
      draw();
    }));
    $('#bits-check').addEventListener('click', () => {
      const right = sum() === q.target;
      $('#bits-check').disabled = true;
      app.querySelectorAll('.bit').forEach(b => b.disabled = true);
      mark(right);
      if (right) {
        $('#q-note').innerHTML = `<span class="right">¡Exacto! ${q.target} en binario es ${on.map(x => x ? 1 : 0).join('')}</span>`;
        setTimeout(next, 1100);
      } else {
        $('#q-note').innerHTML = `Sumaste ${sum()}, pero buscábamos ${q.target}. Pista: empieza por el foco más grande que quepa.`;
        continueBtn($('#q-note'));
      }
    });
    draw();
  }

  /* --- deletrear --- */
  function renderSpell(q) {
    const word = q.word.toLowerCase();
    const bank = shuffle(word.split(''));
    let built = [];
    app.innerHTML = `
      ${header(q)}
      <div class="q-card">
        ${q.img ? imgTag(q.img, 'q-img') : `<div class="q-emoji">${q.emoji || '✏️'}</div>`}
        <div class="q-text">Escribe en inglés: <b style="color:var(--accent)">${esc(q.es)}</b></div>
        <button class="q-say" id="q-say" title="Escuchar">🔊</button>
        <div class="spell-built" id="sp-built"></div>
        <div class="spell-bank" id="sp-bank"></div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn small secondary" id="sp-del">⌫ Borrar</button>
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    bindExit();
    $('#q-say').addEventListener('click', () => sayEN(word));

    const builtEl = $('#sp-built'), bankEl = $('#sp-bank');
    function draw() {
      builtEl.innerHTML = word.split('').map((_, k) =>
        `<div class="slot ${k < built.length ? 'filled' : ''}">${k < built.length ? built[k].ch : ''}</div>`).join('');
      bankEl.innerHTML = bank.map((ch, k) => {
        const used = built.some(b => b.k === k);
        return `<button data-k="${k}" ${used ? 'disabled' : ''}>${ch}</button>`;
      }).join('');
      bankEl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        sfxClick();
        built.push({ ch: bank[+b.dataset.k], k: +b.dataset.k });
        draw();
        if (built.length === word.length) check();
      }));
    }
    $('#sp-del').addEventListener('click', () => { built.pop(); draw(); });

    function check() {
      const attempt = built.map(b => b.ch).join('');
      bankEl.querySelectorAll('button').forEach(b => b.disabled = true);
      const right = attempt === word;
      mark(right);
      if (right) {
        builtEl.querySelectorAll('.slot').forEach(s => s.style.borderColor = 'var(--green)');
        sayEN(word);
        setTimeout(next, 950);
      } else {
        builtEl.querySelectorAll('.slot').forEach(s => s.style.borderColor = 'var(--red)');
        $('#q-note').innerHTML = `Se escribe: <span class="right">${esc(word)}</span>`;
        continueBtn($('#q-note'));
      }
    }
    draw();
  }

  function renderQ() {
    blurActive();
    const q = qs[i];
    if (q.type === 'info') return renderInfo(q);
    if (q.type === 'spell') return renderSpell(q);
    if (q.type === 'order') return renderOrder(q);
    if (q.type === 'match') return renderMatch(q);
    if (q.type === 'pickimg') return renderPickImg(q);
    if (q.type === 'bits') return renderBits(q);
    return renderMC(q);
  }

  renderQ();
}

/* helper: pregunta V/F genérica */
function tfQ(text, isTrue, opts = {}) {
  return Object.assign({
    type: 'mc',
    text: `🤔 ¿VERDADERO o FALSO?<br>${text}`,
    options: ['✅ Verdadero', '❌ Falso'],
    answer: isTrue ? '✅ Verdadero' : '❌ Falso',
  }, opts);
}
