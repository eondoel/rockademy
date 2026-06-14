'use strict';
/* ===== Inicio, navegación, guía y panel de papá ===== */

const PARENT_USER = 'dodo'; // el perfil de papá ve el progreso de todos

function showHome() {
  const app = $('#app');
  const ep = englishProgress();
  const mp = mathProgress();
  const gp = generalProgress();
  const rp = robotProgress();
  const clDone = unitState(S.tech, 'complab').examDone;
  const techTotal = rp.total + 2; // robot + complab + claude
  const techDone = rp.done + (clDone ? 1 : 0) + (S.claude.quizDone ? 1 : 0);
  const hello = S.name ? `¡Hola, ${esc(S.name)}!` : '¡Hola, guerrero!';
  const isParent = (typeof cloudUser !== 'undefined' && cloudUser && cloudUser.username === PARENT_USER);

  app.innerHTML = `
    <h1 class="screen-title">${hello} 👊</h1>
    <p class="screen-sub">Elige tu mundo de entrenamiento de hoy. Cada misión te da XP y sube tu nivel de poder. ⚡</p>

    ${isParent ? `
      <button class="world-card parent-card" id="w-parent">
        <span class="big-emoji">👨‍👦</span>
        <h2>Panel de Papá</h2>
        <p>Mira el progreso de todos: lecciones por día, errores, exámenes e intentos.</p>
      </button>` : ''}

    <button class="world-card english has-hero" id="w-english">
      ${imgTag('trex', 'hero-img', 'T-Rex')}
      <h2>Isla Jurásica — Inglés</h2>
      <p>Aprende inglés desde cero con audio. Colecciona dinos completando unidades.</p>
      <div class="progress-note">🥚 ${ep.done}/${ep.total} dinos</div>
      <div class="minibar" style="color:var(--green)"><div style="width:${(ep.done / ep.total) * 100}%"></div></div>
    </button>

    <button class="world-card math has-hero" id="w-math">
      ${imgTag('goku', 'hero-img', 'Goku')}
      <h2>Torre Z — Matemáticas</h2>
      <p>Entrena con problemas de 1° de secundaria. Junta las 7 esferas del dragón.</p>
      <div class="progress-note">🟠 ${mp.done}/7 esferas</div>
      <div class="minibar" style="color:var(--accent)"><div style="width:${(mp.done / mp.total) * 100}%"></div></div>
    </button>

    <button class="world-card general has-hero" id="w-general">
      ${imgTag('cabina', 'hero-img', 'Cabina del tiempo')}
      <h2>La Cabina del Tiempo</h2>
      <p>Conocimientos generales: geografía, historia, ciencia, arte y mundo geek.</p>
      <div class="progress-note">🏺 ${gp.done}/${gp.total} reliquias</div>
      <div class="minibar" style="color:var(--purple)"><div style="width:${(gp.done / gp.total) * 100}%"></div></div>
    </button>

    <button class="world-card tech has-hero" id="w-tech">
      ${imgTag('creeper', 'hero-img', 'Creeper')}
      <h2>Mundo Tecnología</h2>
      <p>Entiende cómo piensan las computadoras y domina la inteligencia artificial.</p>
      <div class="progress-note">💎 ${techDone}/${techTotal} logros</div>
      <div class="minibar" style="color:var(--teal)"><div style="width:${(techDone / techTotal) * 100}%"></div></div>
    </button>

    ${couponShelfHTML()}

    <div class="footer-links">
      <button id="go-guide">👨‍👦 Guía para papá</button>
      <button id="go-name">✏️ Cambiar nombre</button>
      ${typeof accountFooterHTML === 'function' ? accountFooterHTML() : ''}
    </div>
  `;
  $('#w-english').addEventListener('click', showEnglishHome);
  $('#w-math').addEventListener('click', showMathHome);
  $('#w-general').addEventListener('click', showGeneralHome);
  $('#w-tech').addEventListener('click', showTechHome);
  $('#go-guide').addEventListener('click', showGuide);
  $('#go-name').addEventListener('click', () => askName(true));
  const wp = $('#w-parent'); if (wp) wp.addEventListener('click', showParentPanel);
  if (typeof bindAccountFooter === 'function') bindAccountFooter();
  bindCouponShelf();
}

/* ---------- Repisa de cupones ganados ---------- */
function couponShelfHTML() {
  if (!S.coupons || !S.coupons.length) {
    return `<p class="center muted coupon-hint">🎟️ Gana cupones de regalo demostrando conocimiento sólido en los exámenes.</p>`;
  }
  return `
    <div class="collection coupon-shelf">
      <span class="c-label">🎟️ TUS CUPONES GANADOS (${S.coupons.length}/${COUPONS.length}) — toca para volver a descargar</span>
      ${S.coupons.slice().sort((a, b) => a - b).map(i =>
        `<button class="coupon-chip" data-coupon="${i}" title="${esc(COUPONS[i].t)}">${COUPONS[i].e}</button>`).join('')}
    </div>`;
}
function bindCouponShelf() {
  document.querySelectorAll('[data-coupon]').forEach(b =>
    b.addEventListener('click', () => awardCoupon(+b.dataset.coupon)));
}

/* ---------- Panel de Papá (perfil dodo) ---------- */
async function showParentPanel() {
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">👨‍👦 Panel de Papá</h1>
    <p class="screen-sub">Progreso de todos los guerreros conectados a la nube.</p>
    <div id="parent-body"><p class="center muted">Cargando datos de la nube… ⏳</p></div>
  `;
  $('#back').addEventListener('click', showHome);

  const body = $('#parent-body');
  if (typeof sb === 'undefined' || !sb) {
    body.innerHTML = `<p class="center muted">El panel necesita conexión a la nube (Supabase).</p>`;
    return;
  }
  let rows;
  try {
    const res = await sb.from('rockademy_progress').select('username,data,updated_at').order('updated_at', { ascending: false });
    if (res.error) throw res.error;
    rows = res.data || [];
  } catch (e) {
    body.innerHTML = `<p class="center muted">No se pudo leer el progreso.<br><span style="font-size:.8rem">${esc(e.message || e)}</span><br><br>¿Ya ejecutaste la versión nueva de <b>supabase/schema.sql</b>? Agrega la columna <b>username</b> y el permiso para “dodo”.</p>`;
    return;
  }
  // dodo no se muestra a sí mismo en la lista de alumnos
  const students = rows.filter(r => (r.username || '') !== PARENT_USER);
  if (!students.length) {
    body.innerHTML = `<p class="center muted">Aún no hay otros perfiles con progreso. Cuando tu hijo cree su cuenta y haga ejercicios, aparecerá aquí.</p>`;
    return;
  }
  body.innerHTML = students.map(r => parentStudentCard(r)).join('');
  body.querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', () => {
    const d = document.getElementById('det-' + b.dataset.toggle);
    if (d) d.classList.toggle('open');
  }));
}

function parentStudentCard(row) {
  const d = row.data || {};
  const name = esc(d.name || row.username || 'guerrero');
  const xp = d.xp || 0;
  const r = rankFor(xp);
  const exams = countExamsFromData(d);
  const days = (d.stats && d.stats.days) || {};
  const dayKeys = Object.keys(days).sort().reverse();
  let totErr = 0, totLec = 0, totEx = 0;
  dayKeys.forEach(k => { totErr += days[k].err || 0; totLec += days[k].lec || 0; totEx += days[k].ex || 0; });
  const coupons = (d.coupons || []).length;
  const streak = (d.streak && d.streak.count) || 0;
  const id = (row.username || name).replace(/[^a-z0-9]/gi, '');

  return `
    <div class="student">
      <button class="student-head" data-toggle="${id}">
        <span class="st-name">${r.e} ${name}</span>
        <span class="st-meta">⚡${(xp * 10).toLocaleString('es-MX')} · 🏆${exams} exámenes · 🔥${streak}d</span>
      </button>
      <div class="student-summary">
        <span class="pill">📚 ${totLec} lecciones</span>
        <span class="pill">📝 ${totEx} intentos de examen</span>
        <span class="pill ${totErr ? 'warn' : ''}">❌ ${totErr} errores</span>
        <span class="pill">🎟️ ${coupons} cupones</span>
      </div>
      <div class="student-detail" id="det-${id}">
        <table class="day-table">
          <thead><tr><th>Día</th><th>Lecc.</th><th>Exám.</th><th>Aprob.</th><th>✔</th><th>✘</th></tr></thead>
          <tbody>
            ${dayKeys.length ? dayKeys.map(k => {
              const v = days[k];
              return `<tr><td>${esc(prettyDay(k))}</td><td>${v.lec || 0}</td><td>${v.ex || 0}</td><td>${v.exOk || 0}</td><td class="ok">${v.ok || 0}</td><td class="err">${v.err || 0}</td></tr>`;
            }).join('') : '<tr><td colspan="6" class="muted">Sin actividad registrada todavía.</td></tr>'}
          </tbody>
        </table>
        <div class="exam-breakdown">${examBreakdownHTML(d)}</div>
      </div>
    </div>`;
}

function prettyDay(k) {
  const today = todayStr();
  if (k === today) return 'Hoy';
  const y = new Date(); y.setDate(y.getDate() - 1);
  if (k === y.toISOString().slice(0, 10)) return 'Ayer';
  const [yr, mo, da] = k.split('-');
  return `${da}/${mo}`;
}

function countExamsFromData(d) {
  let n = 0;
  const scan = (store) => { if (store) Object.values(store).forEach(v => { if (v && v.examDone) n++; }); };
  scan(d.english); scan(d.math); scan(d.general); scan(d.tech);
  if (d.robot && Object.keys(d.robot).length >= 11) n++;
  if (d.claude && d.claude.quizDone) n++;
  return n;
}

function examBreakdownHTML(d) {
  const parts = [];
  const fmt = (store, names) => {
    if (!store) return;
    Object.keys(store).forEach(id => {
      const v = store[id];
      if (v && (v.examTries || v.examDone)) {
        parts.push(`<span class="exam-tag ${v.examDone ? 'pass' : 'fail'}">${esc(names[id] || id)}: ${v.examDone ? '✅' : '⏳'} ${v.examBest || 0}/12 (${v.examTries || 0} intentos)</span>`);
      }
    });
  };
  const enNames = {}, maNames = {}, geNames = {};
  if (typeof ENGLISH_UNITS !== 'undefined') ENGLISH_UNITS.forEach(u => enNames[u.id] = u.title);
  if (typeof MATH_TOPICS !== 'undefined') MATH_TOPICS.forEach(t => maNames[t.id] = t.title);
  if (typeof GENERAL_TOPICS !== 'undefined') GENERAL_TOPICS.forEach(t => geNames[t.id] = t.title);
  fmt(d.english, enNames); fmt(d.math, maNames); fmt(d.general, geNames);
  fmt(d.tech, { complab: 'Compu-Lab' });
  if (d.claude && (d.claude.quizTries || d.claude.quizDone)) {
    parts.push(`<span class="exam-tag ${d.claude.quizDone ? 'pass' : 'fail'}">Academia Claude: ${d.claude.quizDone ? '✅' : '⏳'} ${d.claude.quizBest || 0}/10 (${d.claude.quizTries || 0} intentos)</span>`);
  }
  return parts.length ? '<div class="exam-tags">' + parts.join('') + '</div>' : '';
}

function showGuide() {
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <div class="lesson-body">
      <h2>👨‍👦 Guía para papá / mamá</h2>
      <p>Esta app entrena 5 áreas: <b>inglés desde cero</b>, <b>matemáticas de 1° de secundaria</b> (SEP), <b>conocimientos generales</b>, <b>cómo funcionan las computadoras</b> y <b>uso responsable de la IA</b>.</p>
      <ul>
        <li>📚 <b>Cómo está hecha:</b> cada unidad tiene 3 lecciones interactivas y un <b>examen final</b>. Diseñado con técnicas de aprendizaje comprobadas: práctica de recuperación (los ejercicios SON la lección), intercalado, variedad de formatos y feedback inmediato.</li>
        <li>⏱️ <b>Sesiones cortas:</b> 10–20 minutos diarios funcionan mejor que 2 horas un sábado. La racha 🔥 premia la constancia.</li>
        <li>🎟️ <b>Cupones de regalo:</b> al acumular exámenes aprobados, la app desbloquea cupones (Sándwich de Nutella → … → Disney) y los <b>descarga como imagen</b>. En iPhone se guardan manteniendo presionada la imagen → "Guardar en Fotos".</li>
        <li>👀 <b>Panel de Papá:</b> entra con el perfil <b>${PARENT_USER}</b> para ver, de cada hijo, las lecciones por día, errores, exámenes aprobados e intentos.</li>
        <li>🔊 <b>Inglés:</b> anímalo a repetir EN VOZ ALTA lo que escuche con 🔊.</li>
        <li>✨ <b>Misiones Claude:</b> pensadas para hacerlas JUNTOS en claude.ai.</li>
        <li>💾 <b>Con cuenta</b>, el avance se guarda en la nube y lo sigue a cualquier dispositivo. No hay recuperación de contraseña — anótenla.</li>
      </ul>
      <p class="muted">Zona de peligro:</p>
      <button class="btn small secondary" id="reset-all" style="border-color:var(--red);color:var(--red)">🗑️ Borrar todo el progreso</button>
    </div>
  `;
  $('#back').addEventListener('click', showHome);
  $('#reset-all').addEventListener('click', () => {
    showModal(`
      <h2>⚠️ ¿Borrar TODO?</h2>
      <p>Se perderán el XP, las colecciones y los cupones. No se puede deshacer.</p>
      <div class="btn-row" style="justify-content:center">
        <button class="btn secondary" data-close>Cancelar</button>
        <button class="btn" id="confirm-reset" style="background:var(--red);color:#fff">Sí, borrar todo</button>
      </div>
    `);
    $('#confirm-reset').addEventListener('click', () => {
      localStorage.removeItem(STORE_KEY);
      S = loadState();
      closeModal();
      renderHeader();
      askName(false);
    });
  });
}

function askName(canCancel) {
  showModal(`
    <h2>🌌 ¡Bienvenido a la Academia Multiverso!</h2>
    <p>¿Cómo te llamas, guerrero?</p>
    <input id="name-input" maxlength="20" placeholder="Tu nombre" value="${esc(S.name)}" autocomplete="off">
    <div class="btn-row" style="justify-content:center">
      ${canCancel ? '<button class="btn secondary" data-close>Cancelar</button>' : ''}
      <button class="btn" id="name-ok">¡Comenzar! 🚀</button>
    </div>
  `, {
    onMount() {
      const input = $('#name-input');
      input.focus();
      function submit() {
        const v = input.value.trim();
        if (v) S.name = v;
        else if (!S.name) S.name = 'Guerrero';
        save();
        closeModal();
        showHome();
      }
      $('#name-ok').addEventListener('click', submit);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    },
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  $('#btn-home').addEventListener('click', showHome);
  if (typeof initCloud === 'function') initCloud();
  else { showHome(); if (!S.name) askName(false); }
});
