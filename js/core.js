'use strict';
/* ===== Núcleo: estado, XP, sonidos, voz, quiz ===== */

const STORE_KEY = 'academia-multiverso-v1';

const DEFAULT_STATE = {
  name: '',
  xp: 0,
  streak: { count: 0, last: '' },
  english: {},          // unitId -> { best, done }
  math: {},             // topicId -> { best, done }
  robot: {},            // levelIndex -> true
  claude: { read: [], quizBest: 0, quizDone: false, missions: [] },
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
      return base;
    }
  } catch (e) { /* estado corrupto: empezar de cero */ }
  return structuredClone(DEFAULT_STATE);
}

let S = loadState();
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }

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
  // número flotante
  const f = document.createElement('div');
  f.className = 'xp-float';
  f.textContent = `+${n} XP`;
  f.style.left = (x != null ? x : window.innerWidth / 2 - 30) + 'px';
  f.style.top = (y != null ? y : 120) + 'px';
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1100);
  // ¿subió de rango?
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
if ('speechSynthesis' in window) speechSynthesis.getVoices(); // precarga voces

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

/* ---------- Opciones numéricas para quizzes ---------- */
function numOptions(answer, spread) {
  const set = new Set([answer]);
  let guard = 0;
  while (set.size < 4 && guard++ < 60) {
    const d = ri(1, spread) * (Math.random() < .5 ? -1 : 1);
    set.add(answer + d);
  }
  return shuffle([...set]).map(String);
}

/* ---------- Motor de quiz ----------
 q tipos:
  { type:'mc', text, emoji?, say?, options:[..], answer, note? }
  { type:'spell', es, emoji, word }   (escribir palabra en inglés)
----------------------------------- */
function startQuiz(cfg) {
  // cfg: { title, sub, qs, onDone(score,total), onBack }
  const total = cfg.qs.length;
  let i = 0, score = 0;
  const app = $('#app');

  function finish() {
    touchStreak();
    const passed = score >= Math.ceil(total * 0.8);
    const stars = score >= total * 0.9 ? 3 : (passed ? 2 : (score >= total * 0.6 ? 1 : 0));
    const bonus = passed ? 20 : 0;
    if (bonus) addXP(bonus);
    if (passed) { confetti(100); sfxWin(); }
    const starsTxt = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    app.innerHTML = `
      <div class="end-card">
        <div class="stars">${starsTxt}</div>
        <h2>${passed ? '¡MISIÓN CUMPLIDA!' : '¡Casi lo logras!'}</h2>
        <p class="muted">Acertaste <b>${score} de ${total}</b>${passed ? '' : ' — necesitas ' + Math.ceil(total * 0.8) + ' para ganar la recompensa'}</p>
        <div class="end-xp">+${score * 10 + bonus} XP ganados ⚡</div>
        <div id="reward-slot"></div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn secondary" id="q-again">🔁 Reintentar</button>
          <button class="btn" id="q-back">Continuar ➜</button>
        </div>
      </div>`;
    $('#q-again').addEventListener('click', () => startQuiz(cfg));
    $('#q-back').addEventListener('click', cfg.onBack);
    if (cfg.onDone) cfg.onDone(score, total, passed);
  }

  function header() {
    return `
      <button class="back-link" id="q-exit">← Salir</button>
      <div class="quiz-top">
        <span class="quiz-count">${i + 1}/${total}</span>
        <div class="quiz-bar"><div style="width:${(i / total) * 100}%"></div></div>
        <span class="quiz-score">✔ ${score}</span>
      </div>`;
  }

  function next() {
    i++;
    if (i >= total) finish(); else renderQ();
  }

  function renderQ() {
    const q = cfg.qs[i];
    if (q.type === 'spell') return renderSpell(q);

    app.innerHTML = `
      ${header()}
      <div class="q-card">
        ${q.emoji ? `<div class="q-emoji">${q.emoji}</div>` : ''}
        <div class="q-text">${q.text}</div>
        ${q.say ? `<button class="q-say" id="q-say" title="Escuchar">🔊</button>` : ''}
        <div class="opts">
          ${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    $('#q-exit').addEventListener('click', cfg.onBack);
    if (q.say) {
      $('#q-say').addEventListener('click', () => sayEN(q.say));
      setTimeout(() => sayEN(q.say), 350);
    }
    app.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const chosen = q.options[+btn.dataset.k];
        app.querySelectorAll('.opt').forEach(b => b.disabled = true);
        const right = String(chosen) === String(q.answer);
        if (right) {
          btn.classList.add('correct');
          score++;
          sfxGood();
          addXP(10, ev.clientX, ev.clientY);
          setTimeout(next, 850);
        } else {
          btn.classList.add('wrong');
          sfxBad();
          app.querySelectorAll('.opt').forEach(b => {
            if (String(q.options[+b.dataset.k]) === String(q.answer)) b.classList.add('correct');
          });
          $('#q-note').innerHTML =
            `${q.note ? esc(q.note) + ' — ' : ''}La respuesta era: <span class="right">${esc(q.answer)}</span>`;
          const cont = document.createElement('div');
          cont.className = 'btn-row';
          cont.style.justifyContent = 'center';
          cont.innerHTML = `<button class="btn small secondary">Seguir ➜</button>`;
          $('#q-note').after(cont);
          cont.querySelector('button').addEventListener('click', next);
        }
      });
    });
  }

  function renderSpell(q) {
    const word = q.word.toLowerCase();
    const bank = shuffle(word.split(''));
    let built = [];
    app.innerHTML = `
      ${header()}
      <div class="q-card">
        <div class="q-emoji">${q.emoji || '✏️'}</div>
        <div class="q-text">Escribe en inglés: <b style="color:var(--accent)">${esc(q.es)}</b></div>
        <button class="q-say" id="q-say" title="Escuchar">🔊</button>
        <div class="spell-built" id="sp-built"></div>
        <div class="spell-bank" id="sp-bank"></div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn small secondary" id="sp-del">⌫ Borrar</button>
        </div>
        <div class="q-note" id="q-note"></div>
      </div>`;
    $('#q-exit').addEventListener('click', cfg.onBack);
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
      if (attempt === word) {
        builtEl.querySelectorAll('.slot').forEach(s => s.style.borderColor = 'var(--green)');
        score++;
        sfxGood();
        sayEN(word);
        addXP(10);
        setTimeout(next, 950);
      } else {
        sfxBad();
        builtEl.querySelectorAll('.slot').forEach(s => s.style.borderColor = 'var(--red)');
        $('#q-note').innerHTML = `Se escribe: <span class="right">${esc(word)}</span>`;
        const cont = document.createElement('div');
        cont.className = 'btn-row';
        cont.style.justifyContent = 'center';
        cont.innerHTML = `<button class="btn small secondary">Seguir ➜</button>`;
        $('#q-note').after(cont);
        cont.querySelector('button').addEventListener('click', next);
      }
    }
    draw();
  }

  renderQ();
}
