'use strict';
/* ===== Inicio, navegación y guía ===== */

function showHome() {
  const app = $('#app');
  const ep = englishProgress();
  const mp = mathProgress();
  const rp = robotProgress();
  const techTotal = rp.total + 1; // niveles robot + insignia Claude
  const techDone = rp.done + (S.claude.quizDone ? 1 : 0);
  const hello = S.name ? `¡Hola, ${esc(S.name)}!` : '¡Hola, guerrero!';

  app.innerHTML = `
    <h1 class="screen-title">${hello} 👊</h1>
    <p class="screen-sub">Elige tu mundo de entrenamiento de hoy. Cada misión te da XP y sube tu nivel de poder. ⚡</p>

    <button class="world-card english" id="w-english">
      <span class="big-emoji">🦖</span>
      <h2>Isla Jurásica — Inglés</h2>
      <p>Aprende inglés desde cero con audio. Colecciona dinos completando unidades.</p>
      <div class="progress-note">🥚 ${ep.done}/${ep.total} dinos</div>
      <div class="minibar" style="color:var(--green)"><div style="width:${(ep.done / ep.total) * 100}%"></div></div>
    </button>

    <button class="world-card math" id="w-math">
      <span class="big-emoji">🐉</span>
      <h2>Torre Z — Matemáticas</h2>
      <p>Entrena con problemas de 1° de secundaria. Junta las 7 esferas del dragón.</p>
      <div class="progress-note">🟠 ${mp.done}/7 esferas</div>
      <div class="minibar" style="color:var(--accent)"><div style="width:${(mp.done / mp.total) * 100}%"></div></div>
    </button>

    <button class="world-card tech" id="w-tech">
      <span class="big-emoji">💎</span>
      <h2>Mundo Tecnología</h2>
      <p>Programa a Robo-Steve y conviértete en Maestro de la IA con Claude.</p>
      <div class="progress-note">💎 ${techDone}/${techTotal} logros</div>
      <div class="minibar" style="color:var(--teal)"><div style="width:${(techDone / techTotal) * 100}%"></div></div>
    </button>

    <div class="footer-links">
      <button id="go-guide">👨‍👦 Guía para papá</button>
      <button id="go-name">✏️ Cambiar nombre</button>
    </div>
  `;
  $('#w-english').addEventListener('click', showEnglishHome);
  $('#w-math').addEventListener('click', showMathHome);
  $('#w-tech').addEventListener('click', showTechHome);
  $('#go-guide').addEventListener('click', showGuide);
  $('#go-name').addEventListener('click', () => askName(true));
}

function showGuide() {
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <div class="lesson-body">
      <h2>👨‍👦 Guía para papá / mamá</h2>
      <p>Esta app entrena 3 áreas: <b>inglés desde cero</b>, <b>matemáticas de 1° de secundaria</b> (temario SEP) y <b>tecnología</b> (lógica de programación + uso responsable de la IA).</p>
      <ul>
        <li>⏱️ <b>Sesiones cortas:</b> 10–20 minutos diarios funcionan mejor que 2 horas un sábado. La racha 🔥 premia la constancia.</li>
        <li>🔊 <b>Inglés:</b> anímalo a repetir EN VOZ ALTA cada palabra que escuche. El botón 🔊 usa la voz del navegador.</li>
        <li>🧮 <b>Matemáticas:</b> los problemas se generan al azar — puede repetir un tema infinitas veces. Si falla, la app le muestra el porqué.</li>
        <li>🤖 <b>Robo-Steve:</b> enseña ideas reales de programación (secuencias, funciones, bucles). Si se atora, pregúntale: "¿qué hace el robot paso por paso?"</li>
        <li>✨ <b>Misiones Claude:</b> están pensadas para hacerlas JUNTOS en claude.ai. Él marca la casilla cuando las completa. Es el puente entre la app y la IA real.</li>
        <li>🏆 <b>Recompensas:</b> dinos (inglés), esferas del dragón (mate) y diamantes (tecnología). Pregúntale por su colección: presumirla es parte de la motivación.</li>
        <li>💾 El progreso se guarda en este navegador (localStorage). Usen siempre el mismo dispositivo y navegador.</li>
      </ul>
      <p class="muted">Zona de peligro:</p>
      <button class="btn small secondary" id="reset-all" style="border-color:var(--red);color:var(--red)">🗑️ Borrar todo el progreso</button>
    </div>
  `;
  $('#back').addEventListener('click', showHome);
  $('#reset-all').addEventListener('click', () => {
    showModal(`
      <h2>⚠️ ¿Borrar TODO?</h2>
      <p>Se perderán el XP, los dinos, las esferas y los diamantes. No se puede deshacer.</p>
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
  showHome();
  if (!S.name) askName(false);
});
