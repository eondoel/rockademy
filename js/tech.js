'use strict';
/* ===== Mundo Tecnología 💎 =====
   1) Robo-Steve: lógica de programación (secuencias, funciones, bucles)
   2) Academia Claude: aprender a usar la IA con buenos prompts */

/* ---------- Robo-Steve ---------- */
/* grid: '.' pasto, '#' TNT (peligro), 'S' inicio, 'D' diamante. dir: N/E/S/W
   Progresión: avanzar → contar → girar → combinar → patrones → funciones → bucles */
const ROBOT_LEVELS = [
  {
    name: 'Primeros pasos', dir: 'E', maxMain: 5, maxF1: 0,
    intro: '🧠 IDEA #1: Un PROGRAMA es una lista de órdenes que la computadora sigue EN ORDEN, una por una. Steve solo hace lo que tú le ordenes. Llévalo al diamante 💎.',
    hint1: 'Cuenta los cuadros de pasto entre Steve y el diamante. Cada ⬆️ lo mueve UN cuadro.',
    hint2: 'La solución es: ⬆️ ⬆️ ⬆️ (tres avances).',
    grid: ['S..D'],
  },
  {
    name: 'Cuenta tus pasos', dir: 'E', maxMain: 7, maxF1: 0,
    intro: '🧮 IDEA #2: Los programadores CUENTAN antes de escribir. Ni un paso de más, ni uno de menos. ¿Cuántos cuadros hay hasta el diamante?',
    hint1: 'Señala con el dedo cada cuadro del camino y cuéntalos en voz alta.',
    hint2: 'Son 5 cuadros: ⬆️ ⬆️ ⬆️ ⬆️ ⬆️.',
    grid: ['S....D'],
  },
  {
    name: 'Aprende a girar', dir: 'E', maxMain: 5, maxF1: 0,
    intro: '🔄 IDEA #3: Girar NO es avanzar. ↻ y ↺ solo cambian hacia dónde MIRA Steve (fíjate en la flechita sobre su cabeza), sin moverlo de su cuadro. Steve mira ➡️… ¡pero el diamante está abajo!',
    hint1: 'Si Steve avanza ⬆️ de inmediato, se sale del mapa y ¡BOOM! 💥 Primero gíralo para que mire hacia abajo ⬇️.',
    hint2: 'La solución es: ↻ (ahora mira abajo) ⬆️ ⬆️.',
    grid: ['S', '.', 'D'],
  },
  {
    name: 'Gira al otro lado', dir: 'E', maxMain: 5, maxF1: 0,
    intro: '🔄 IDEA #4: ↺ gira a la izquierda de STEVE (no la tuya). Ahora el diamante está ARRIBA. ¿Hacia dónde tiene que girar?',
    hint1: 'Steve mira ➡️. Para mirar hacia arriba ⬆️, gira una vez a su izquierda ↺.',
    hint2: 'La solución es: ↺ ⬆️ ⬆️.',
    grid: ['D', '.', 'S'],
  },
  {
    name: 'La primera curva', dir: 'E', maxMain: 7, maxF1: 0,
    intro: '🛤️ IDEA #5: Combina avanzar y girar. Sigue el camino de pasto con el dedo ANTES de programar: ¿cuántos pasos, dónde giras, cuántos pasos más? ¡No pises el TNT! 🧨',
    hint1: 'El camino es: 2 cuadros a la derecha, luego baja 2 cuadros.',
    hint2: 'La solución es: ⬆️ ⬆️ ↻ ⬆️ ⬆️.',
    grid: ['S..', '##.', '..D'],
  },
  {
    name: 'Zigzag jurásico', dir: 'E', maxMain: 12, maxF1: 0,
    intro: '🔍 IDEA #6: Los caminos largos esconden PATRONES. Mira bien: este camino baja como escalera, repitiendo los mismos movimientos. Descubrir patrones es pensar como programador.',
    hint1: 'El patrón que se repite es: avanza, gira derecha, avanza, gira izquierda → ⬆️ ↻ ⬆️ ↺.',
    hint2: 'La solución es: ⬆️ ↻ ⬆️ ↺, otra vez ⬆️ ↻ ⬆️ ↺, y termina con ⬆️ ↻ ⬆️.',
    grid: ['S.##', '#..#', '##..', '###D'],
  },
  {
    name: 'La gran vuelta en U', dir: 'E', maxMain: 14, maxF1: 0,
    intro: '🧮 IDEA #7: Último reto de secuencias: un camino largo con DOS giros para el mismo lado. Planea todo antes de tocar ▶️.',
    hint1: 'Es una U: avanza hasta la esquina, gira a la derecha, baja, vuelve a girar a la derecha y regresa.',
    hint2: 'La solución es: ⬆️×5, ↻, ⬆️×2, ↻, ⬆️×5.',
    grid: ['S.....', '#####.', 'D.....'],
  },
  {
    name: 'El poder de F1', dir: 'E', maxMain: 6, maxF1: 4,
    intro: '✨ IDEA #8: ¡Nuevo poder desbloqueado! F1 es una FUNCIÓN: una cajita donde guardas un mini-programa. Cada vez que pones ✨F1 en tu programa, Steve hace TODO lo que está en la cajita. Es el mismo zigzag de antes… pero ahora solo tienes 6 espacios. Toca el recuadro morado para escribir dentro de F1.',
    hint1: '¿Recuerdas el patrón del zigzag? ⬆️ ↻ ⬆️ ↺. Guárdalo DENTRO de F1 y úsalo varias veces.',
    hint2: 'F1 = ⬆️ ↻ ⬆️ ↺. Programa principal: ✨F1 ✨F1 ⬆️ ↻ ⬆️.',
    grid: ['S.##', '#..#', '##..', '###D'],
  },
  {
    name: 'El bucle infinito', dir: 'E', maxMain: 2, maxF1: 5,
    intro: '🔁 IDEA #9: Truco de pros: si pones ✨F1 AL FINAL de la propia F1, la función se repite una y otra vez. ¡Eso es un BUCLE! Steve repetirá el patrón hasta llegar al diamante. Solo tienes 2 espacios en el programa principal…',
    hint1: 'Mete el patrón de escalera en F1 y haz que F1 se llame a sí misma al final.',
    hint2: 'F1 = ⬆️ ↻ ⬆️ ↺ ✨F1. Programa principal: solo ✨F1.',
    grid: ['S.####', '#..###', '##..##', '###..#', '####..', '#####D'],
  },
  {
    name: 'La vuelta al mundo', dir: 'E', maxMain: 1, maxF1: 5,
    intro: '🌍 IDEA #10: UN solo espacio en el programa principal. Todo el trabajo lo hará tu bucle. Mira el camino: ¿qué patrón se repite en cada lado del cuadrado?',
    hint1: 'Cada lado del camino son 3 avances y un giro a la derecha. Y para repetirlo… F1 se llama a sí misma.',
    hint2: 'F1 = ⬆️ ⬆️ ⬆️ ↻ ✨F1. Programa principal: ✨F1.',
    grid: ['S...', '###.', '###.', 'D...'],
  },
  {
    name: 'NIVEL JEFE 👑', dir: 'E', maxMain: 8, maxF1: 4,
    intro: '👑 RETO FINAL: combina TODO lo que aprendiste: un patrón repetido (función) + una recta final (secuencia). ¡Demuestra que ya piensas como programador!',
    hint1: 'Primera parte: el zigzag de siempre (úsalo con F1 dos veces). Segunda parte: avanza, gira a la derecha y baja derecho.',
    hint2: 'F1 = ⬆️ ↻ ⬆️ ↺. Programa: ✨F1 ✨F1 ⬆️ ↻ ⬆️ ⬆️ ⬆️.',
    grid: ['S.##', '#..#', '##..', '###.', '###.', '###D'],
  },
];

const DIRS = { N: [-1, 0], E: [0, 1], S: [1, 0], W: [0, -1] };
const DIR_ORDER = ['N', 'E', 'S', 'W'];
const DIR_ARROW = { N: '⬆️', E: '➡️', S: '⬇️', W: '⬅️' };

function robotProgress() {
  const done = ROBOT_LEVELS.filter((_, i) => S.robot[i]).length;
  return { done, total: ROBOT_LEVELS.length };
}

function showTechHome() {
  const app = $('#app');
  const rp = robotProgress();
  const claudeDone = (S.claude.read.length >= CLAUDE_LESSONS.length) && S.claude.quizDone;
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">💎 Mundo Tecnología</h1>
    <p class="screen-sub">Aprende a pensar como programador y a usar la inteligencia artificial como un pro.</p>
    <button class="world-card tech has-hero" id="go-robot">
      ${imgTag('steve', 'hero-img', 'Steve')}
      <h2>Robo-Steve: lógica de programación</h2>
      <p>Programa al robot para llegar al diamante. Secuencias, funciones y bucles.</p>
      <div class="progress-note">💎 ${rp.done}/${rp.total} niveles</div>
    </button>
    <button class="world-card tech has-hero" id="go-claude">
      ${imgTag('mrdna', 'hero-img', 'Mr. DNA')}
      <h2>Academia Claude: domina la IA</h2>
      <p>Aprende qué es Claude, cómo pedirle cosas y misiones reales para hacer con tu papá.</p>
      <div class="progress-note">${claudeDone ? '🏆 Maestro de la IA' : `📖 ${S.claude.read.length}/${CLAUDE_LESSONS.length} lecciones`}</div>
    </button>
  `;
  $('#back').addEventListener('click', showHome);
  $('#go-robot').addEventListener('click', showRobotLevels);
  $('#go-claude').addEventListener('click', showClaudeHome);
}

function showRobotLevels() {
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Mundo Tecnología</button>
    <h1 class="screen-title">🤖 Robo-Steve</h1>
    <p class="screen-sub">Cada nivel te enseña una idea real de programación, de lo más fácil a lo más pro. Gana diamantes 💎 completándolos en orden.</p>
    ${ROBOT_LEVELS.map((lv, i) => {
      const done = !!S.robot[i];
      const locked = i > 0 && !S.robot[i - 1];
      const tag = i < 2 ? '🟢 Fácil: avanzar' : i < 5 ? '🟢 Fácil: girar y avanzar'
        : i < 7 ? '🟡 Medio: caminos largos' : i < 8 ? '🟣 Nuevo: funciones'
        : i < 10 ? '🔴 Pro: bucles' : '👑 Reto final';
      return `
        <button class="item-card" data-lv="${i}" ${locked ? 'disabled' : ''}>
          ${imgTag('steve', 'item-img' + (locked ? ' pending' : ''), 'Steve')}
          <span class="item-body">
            <span class="item-title">Nivel ${i + 1}: ${esc(lv.name)}</span>
            <span class="item-sub">${tag}</span>
          </span>
          <span class="item-status">${done ? imgTag('diamond', 'status-img', 'diamante') : (locked ? '🔒' : '▶️')}</span>
        </button>`;
    }).join('')}
  `;
  $('#back').addEventListener('click', showTechHome);
  app.querySelectorAll('[data-lv]').forEach(b =>
    b.addEventListener('click', () => showRobotLevel(+b.dataset.lv)));
}

function showRobotLevel(idx) {
  const lv = ROBOT_LEVELS[idx];
  const rows = lv.grid.length, cols = lv.grid[0].length;
  let startPos = null;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
    if (lv.grid[r][c] === 'S') startPos = [r, c];

  let bot = { r: startPos[0], c: startPos[1], dir: lv.dir, dead: false };
  let mainProg = [], f1Prog = [];
  let activeList = 'main';
  let running = false;
  let hintShown = 0; // 0 = sin pista, 1 = pista general, 2 = casi-solución

  const app = $('#app');

  function cellType(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return '#';
    const ch = lv.grid[r][c];
    return ch === '#' ? '#' : '.';
  }
  function isGoal(r, c) { return lv.grid[r] && lv.grid[r][c] === 'D'; }

  function gridHTML() {
    let html = `<div class="robot-grid" style="--cols:${cols};grid-template-columns:repeat(${cols},auto)">`;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ch = lv.grid[r][c];
        const open = ch !== '#';
        let inner = '';
        if (ch === 'D') inner = `<img class="goalimg" src="${IMG.diamond}" alt="diamante">`;
        if (bot.r === r && bot.c === c) {
          inner += `<span class="bot">${bot.dead ? '💥' : `<img src="${IMG.steve}" alt="Steve">`}</span>` +
                   (bot.dead ? '' : `<span class="dirarrow">${DIR_ARROW[bot.dir]}</span>`);
        }
        html += `<div class="rcell ${open ? 'open' : 'lava'}">${open ? inner : `<img class="cellimg" src="${IMG.tnt}" alt="TNT">`}</div>`;
      }
    }
    return html + '</div>';
  }

  const CMD_ICON = { F: '⬆️', L: '↺', R: '↻', F1: 'F1' };

  function slotsHTML(list, name) {
    if (!list.length) return `<span class="empty-hint">Toca los botones de abajo para agregar órdenes…</span>`;
    return list.map((c, k) =>
      `<button class="chip ${c === 'F1' ? 'f1chip' : ''}" data-list="${name}" data-k="${k}" title="Toca para quitar">${CMD_ICON[c]}</button>`
    ).join('');
  }

  function draw(msg, msgClass) {
    app.innerHTML = `
      <button class="back-link" id="back">← Niveles</button>
      <h1 class="screen-title">🤖 Nivel ${idx + 1}: ${esc(lv.name)}</h1>
      <div class="level-intro">${lv.intro}</div>
      <details class="rules-box" ${idx === 0 ? 'open' : ''}>
        <summary>📜 Reglas del juego (toca aquí)</summary>
        <ul>
          <li>🤖 Steve empieza mirando hacia donde apunta la flechita sobre su cabeza.</li>
          <li>⬆️ <b>Avanza</b>: camina UN cuadro hacia donde está mirando.</li>
          <li>↻ / ↺ <b>Girar</b>: solo lo voltean en su lugar, ¡NO lo mueven de cuadro!</li>
          <li>🧨 Si pisa el TNT o se sale del pasto… ¡BOOM! 💥 (no pasa nada, reintentas).</li>
          <li>📜 Las órdenes se ejecutan EN ORDEN, de la primera a la última.</li>
          <li>🗑️ ¿Te equivocaste? Toca una orden de tu programa para borrarla.</li>
        </ul>
      </details>
      <div class="robot-wrap">
        ${gridHTML()}
        ${hintShown >= 1 ? `<div class="hint-box">${imgTag('mrdna', 'icon-img', 'Mr. DNA')} <b>Mr. DNA dice:</b> ${lv.hint1}</div>` : ''}
        ${hintShown >= 2 ? `<div class="hint-box">🆘 ${lv.hint2}</div>` : ''}
        <div class="robot-msg ${msgClass || ''}" id="r-msg">${msg || ''}</div>
        <div class="prog-section ${activeList === 'main' ? 'active' : ''}" id="sec-main">
          <h3><span>📜 PROGRAMA PRINCIPAL</span><span>${mainProg.length}/${lv.maxMain}</span></h3>
          <div class="prog-slots">${slotsHTML(mainProg, 'main')}</div>
        </div>
        ${lv.maxF1 ? `
        <div class="prog-section ${activeList === 'f1' ? 'active' : ''}" id="sec-f1">
          <h3><span style="color:var(--purple)">✨ FUNCIÓN F1</span><span>${f1Prog.length}/${lv.maxF1}</span></h3>
          <div class="prog-slots">${slotsHTML(f1Prog, 'f1')}</div>
        </div>
        <p class="muted center" style="font-size:.8rem">Toca un recuadro (programa o F1) para elegir dónde agregar órdenes.</p>` : ''}
        <div class="palette">
          <button data-cmd="F" ${running ? 'disabled' : ''}>⬆️ Avanza 1</button>
          <button data-cmd="L" ${running ? 'disabled' : ''}>↺ Gira izq.</button>
          <button data-cmd="R" ${running ? 'disabled' : ''}>↻ Gira der.</button>
          ${lv.maxF1 ? `<button data-cmd="F1" class="f1" ${running ? 'disabled' : ''}>✨ Usa F1</button>` : ''}
        </div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn green" id="r-run" ${running ? 'disabled' : ''}>▶️ ¡EJECUTAR!</button>
          <button class="btn secondary" id="r-hint" ${running || hintShown >= 2 ? 'disabled' : ''}>💡 ${hintShown === 0 ? 'Pista' : 'Otra pista'}</button>
          <button class="btn secondary" id="r-clear" ${running ? 'disabled' : ''}>🗑️ Limpiar</button>
        </div>
      </div>
    `;
    $('#back').addEventListener('click', showRobotLevels);
    app.querySelectorAll('.palette [data-cmd]').forEach(b => b.addEventListener('click', () => {
      const list = activeList === 'f1' ? f1Prog : mainProg;
      const max = activeList === 'f1' ? lv.maxF1 : lv.maxMain;
      if (list.length >= max) {
        sfxBad();
        draw(`¡Ya no caben más órdenes ahí! (máximo ${max})`, 'bad');
        return;
      }
      sfxClick();
      list.push(b.dataset.cmd);
      draw();
    }));
    app.querySelectorAll('.chip').forEach(ch => ch.addEventListener('click', () => {
      if (running) return;
      const list = ch.dataset.list === 'f1' ? f1Prog : mainProg;
      list.splice(+ch.dataset.k, 1);
      draw();
    }));
    const secMain = $('#sec-main');
    if (secMain) secMain.addEventListener('click', (e) => {
      if (e.target.closest('.chip')) return;
      activeList = 'main'; draw();
    });
    const secF1 = $('#sec-f1');
    if (secF1) secF1.addEventListener('click', (e) => {
      if (e.target.closest('.chip')) return;
      activeList = 'f1'; draw();
    });
    $('#r-run').addEventListener('click', run);
    $('#r-hint').addEventListener('click', () => {
      if (hintShown < 2) { hintShown++; sfxClick(); draw(); }
    });
    $('#r-clear').addEventListener('click', () => { mainProg = []; f1Prog = []; resetBot(); draw(); });
  }

  function resetBot() { bot = { r: startPos[0], c: startPos[1], dir: lv.dir, dead: false }; }

  function expand() {
    const out = [];
    function walk(list, depth) {
      for (const c of list) {
        if (out.length >= 200) return;
        if (c === 'F1') { if (depth < 40) walk(f1Prog, depth + 1); }
        else out.push(c);
      }
    }
    walk(mainProg, 0);
    return out;
  }

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  async function run() {
    if (running) return;
    if (!mainProg.length) { draw('Primero agrega órdenes al programa 📜', 'bad'); return; }
    running = true;
    resetBot();
    const steps = expand();
    draw('Ejecutando…');
    await sleep(400);
    let won = false;
    for (const cmd of steps) {
      if (cmd === 'L') bot.dir = DIR_ORDER[(DIR_ORDER.indexOf(bot.dir) + 3) % 4];
      else if (cmd === 'R') bot.dir = DIR_ORDER[(DIR_ORDER.indexOf(bot.dir) + 1) % 4];
      else if (cmd === 'F') {
        const [dr, dc] = DIRS[bot.dir];
        const nr = bot.r + dr, nc = bot.c + dc;
        if (cellType(nr, nc) === '#') {
          bot.r = Math.max(0, Math.min(rows - 1, nr));
          bot.c = Math.max(0, Math.min(cols - 1, nc));
          bot.dead = true;
          sfxBad();
          draw('💥 ¡BOOM! Steve pisó el TNT (o se salió del pasto). Repasa tu programa paso por paso: ¿en qué orden se equivocó?', 'bad');
          beep(100, .4, 'sawtooth', .12);
          running = false;
          await sleep(900);
          resetBot();
          draw('Listo para el siguiente intento 💪');
          return;
        }
        bot.r = nr; bot.c = nc;
        beep(520, .05, 'sine', .06);
      }
      draw('Ejecutando…');
      await sleep(280);
      if (isGoal(bot.r, bot.c)) { won = true; break; }
    }
    running = false;
    if (won) {
      sfxWin();
      confetti(100);
      touchStreak();
      const firstTime = !S.robot[idx];
      S.robot[idx] = true;
      save();
      addXP(firstTime ? 40 : 10);
      if (firstTime && ROBOT_LEVELS.every((_, k) => S.robot[k])) checkCoupons();
      const hasNext = idx + 1 < ROBOT_LEVELS.length;
      draw('💎 ¡DIAMANTE CONSEGUIDO!', 'ok');
      showModal(`
        ${imgTag('diamond', 'r-img', 'diamante')}
        <h2>¡Nivel ${idx + 1} completado!</h2>
        <p>${firstTime ? '+40 XP · Nuevo diamante en tu colección' : '+10 XP · Ya tenías este diamante'}</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn secondary" data-close id="m-stay">🔁 Repetir</button>
          ${hasNext ? `<button class="btn teal" id="m-next">Siguiente nivel ➜</button>` : `<button class="btn" id="m-end">🏆 ¡Terminaste todos!</button>`}
        </div>
      `);
      const mn = $('#m-next');
      if (mn) mn.addEventListener('click', () => { closeModal(); showRobotLevel(idx + 1); });
      const me = $('#m-end');
      if (me) me.addEventListener('click', () => { closeModal(); showRobotLevels(); });
    } else {
      sfxBad();
      draw('El programa terminó pero no llegaste al 💎. ¿Faltan pasos?', 'bad');
    }
  }

  draw();
}


/* ================= COMPU-LAB 🔌 =================
   ¿Cómo piensa una computadora? Binario, algoritmos y hardware,
   aprendido por asociación y con las manos. */

const COMPLAB_SUBS = [
  { t: '💡 El idioma de los focos (binario)', build: buildBinaryLesson },
  { t: '📜 Recetas para robots (algoritmos)', build: buildAlgoLesson },
  { t: '🧠 Las piezas de la bestia (hardware)', build: buildHardwareLesson },
];

function buildBinaryLesson() {
  return [
    { type: 'info', img: 'r2d2', text: 'Las computadoras solo entienden DOS cosas:<br><b>prendido (1)</b> y <b>apagado (0)</b>.<br>Como focos. 💡⚫<br><br>Tus fotos, Minecraft, la música… TODO son millones de foquitos prendidos y apagados.' },
    { type: 'info', img: 'steve', text: 'Cada foco vale el DOBLE que el anterior:<br><b style="font-size:1.4rem">8 · 4 · 2 · 1</b><br><br>Para formar un número, enciendes los focos que SUMEN ese número.<br>¡Eso es el BINARIO!' },
    { type: 'bits', target: 5 },
    { type: 'bits', target: 3 },
    { type: 'mc', img: 'bulma', text: 'Si los focos están así: 💡⚫💡⚫ (8-4-2-1)<br>¿qué número forman?', options: ['10', '12', '5', '8'], answer: '10', note: '8 + 2 = 10' },
    { type: 'bits', target: 10 },
    tfQ('Con los focos 8-4-2-1 puedes formar el número 15 encendiendo TODOS', true, { img: 'r2d2', note: '8+4+2+1 = 15' }),
    { type: 'bits', target: 13 },
    { type: 'mc', img: 'vbucks', text: '¿Por qué las compus usan binario?', options: ['Porque sus circuitos solo tienen prendido y apagado', 'Porque es más bonito', 'Porque no saben contar hasta 10', 'Por tradición'], answer: 'Porque sus circuitos solo tienen prendido y apagado' },
    { type: 'bits', target: 7 },
  ];
}

function buildAlgoLesson() {
  return [
    { type: 'info', img: 'steve', text: 'Un <b>ALGORITMO</b> es una RECETA:<br>pasos en orden para lograr algo.<br><br>Las compus siguen recetas al pie de la letra, sin imaginación y sin saltarse nada.' },
    { type: 'info', img: 'mc_bread', text: 'Si la receta está en desorden… ¡DESASTRE! 🤯<br><br>Primero el pan, LUEGO la Nutella y al final muerdes.<br>Ordenar pasos = programar.' },
    { type: 'order', img: 'mc_bread', text: '🥪 Ordena el algoritmo del sándwich de Nutella:', tokens: ['Saca el pan', 'Úntale Nutella', 'Junta las tapas', '¡Muérdelo!'] },
    tfQ('En un algoritmo, el orden de los pasos no importa', false, { img: 'steve', note: 'El orden lo es TODO' }),
    { type: 'order', img: 'diamond', text: '⚔️ Ordena el algoritmo para craftear una espada:', tokens: ['Consigue madera y diamantes', 'Haz una mesa de crafteo', 'Acomoda el material', 'Craftea la espada'] },
    { type: 'mc', img: 'mrdna', text: '¿Qué es un algoritmo?', options: ['Una receta de pasos en orden', 'Un tipo de robot', 'Un lenguaje secreto', 'Una marca de computadora'], answer: 'Una receta de pasos en orden' },
    { type: 'order', img: 'mc_bed', text: '🌅 Ordena tu algoritmo de la mañana:', tokens: ['Suena la alarma', 'Te levantas', 'Te vistes', 'Vas a la escuela'] },
    tfQ('Los robots y las compus adivinan lo que quieres aunque te saltes pasos', false, { img: 'r2d2' }),
    { type: 'order', text: '🦷 Ordena el algoritmo de lavarte los dientes:', tokens: ['Pon pasta en el cepillo', 'Cepilla 2 minutos', 'Enjuaga tu boca', 'Sonríe al espejo'] },
    { type: 'mc', img: 'goomba', text: 'Si un paso de la receta está mal, la computadora…', options: ['Lo ejecuta mal tal cual, sin avisar', 'Lo corrige sola', 'Te pregunta qué querías', 'Se apaga'], answer: 'Lo ejecuta mal tal cual, sin avisar', note: 'Por eso los programadores revisan paso por paso' },
  ];
}

function buildHardwareLesson() {
  return [
    { type: 'info', img: 'bulma', text: 'Una compu es como un CUERPO:<br>🧠 el <b>CPU</b> es el cerebro que piensa<br>📝 la <b>RAM</b> es la mesa de trabajo<br>📦 el <b>disco</b> es el baúl que guarda todo' },
    { type: 'info', img: 'creeper', text: '<b>Hardware</b> = lo que puedes TOCAR (teclado, pantalla).<br><b>Software</b> = los programas (Minecraft, esta app).<br><br>El software vive dentro del hardware, como tú dentro de tu casa.' },
    { type: 'match', text: '🔗 Une cada pieza con lo que hace', pairs: [['CPU', 'El cerebro que piensa'], ['RAM', 'La mesa de trabajo'], ['Disco duro', 'El baúl que guarda todo'], ['Pantalla', 'Muestra lo que pasa']] },
    { type: 'mc', img: 'steve', text: '¿Cuál de estas cosas es HARDWARE?', options: ['El teclado', 'Minecraft', 'Un video de YouTube', 'Una canción'], answer: 'El teclado' },
    { type: 'mc', img: 'creeper', text: '¿Cuál de estas cosas es SOFTWARE?', options: ['Minecraft', 'El ratón', 'La pantalla', 'Los cables'], answer: 'Minecraft' },
    tfQ('El software se puede tocar con las manos', false, { img: 'mrdna', note: 'Los programas son como ideas: no se tocan' }),
    { type: 'mc', img: 'chest', text: '¿Dónde se guardan tus mundos de Minecraft cuando apagas la compu?', options: ['En el disco duro', 'En la RAM', 'En la pantalla', 'En el teclado'], answer: 'En el disco duro' },
    { type: 'match', text: '🔗 Une cada aparato con su trabajo', pairs: [['Teclado', 'Para escribir'], ['Ratón', 'Para apuntar'], ['Bocinas', 'Para escuchar'], ['Micrófono', 'Para hablar']] },
    tfQ('La RAM recuerda todo aunque apagues la computadora', false, { img: 'bulma', note: 'La RAM se borra al apagar; el disco sí recuerda' }),
  ];
}

function buildComplabExam() {
  const qs = [];
  qs.push({ type: 'bits', target: ri(3, 15) });
  qs.push({ type: 'bits', target: ri(3, 15) });
  const orders = [
    { type: 'order', text: '🥪 Ordena el algoritmo del sándwich:', tokens: ['Saca el pan', 'Úntale Nutella', 'Junta las tapas', '¡Muérdelo!'] },
    { type: 'order', text: '⚔️ Ordena el crafteo de la espada:', tokens: ['Consigue madera y diamantes', 'Haz una mesa de crafteo', 'Acomoda el material', 'Craftea la espada'] },
  ];
  qs.push(pick(orders));
  qs.push({ type: 'match', text: '🔗 Une cada pieza con lo que hace', pairs: [['CPU', 'El cerebro que piensa'], ['RAM', 'La mesa de trabajo'], ['Disco duro', 'El baúl que guarda todo'], ['Pantalla', 'Muestra lo que pasa']] });
  const mcs = shuffle([
    { type: 'mc', img: 'r2d2', text: 'Las computadoras, en el fondo, solo entienden…', options: ['Unos y ceros', 'Español', 'Inglés', 'Emojis'], answer: 'Unos y ceros' },
    { type: 'mc', img: 'mrdna', text: '¿Qué es un algoritmo?', options: ['Una receta de pasos en orden', 'Un virus', 'Una pieza de la compu', 'Un videojuego'], answer: 'Una receta de pasos en orden' },
    { type: 'mc', img: 'steve', text: '¿Cuál es el "cerebro" de la computadora?', options: ['El CPU', 'La pantalla', 'El teclado', 'El cable'], answer: 'El CPU' },
    { type: 'mc', img: 'chest', text: 'Para que algo se guarde aunque apagues la compu, debe estar en…', options: ['El disco duro', 'La RAM', 'La pantalla', 'El aire'], answer: 'El disco duro' },
    tfQ('Con los focos 8-4-2-1, el número 9 se forma con 💡⚫⚫💡', true, { note: '8 + 1 = 9' }),
    tfQ('Minecraft es hardware', false, { img: 'creeper', note: 'Es software: un programa' }),
    tfQ('El orden de los pasos en un algoritmo no importa', false),
    { type: 'mc', img: 'bulma', text: '¿Cuánto vale 💡💡⚫⚫ (8-4-2-1)?', options: ['12', '10', '3', '14'], answer: '12', note: '8 + 4 = 12' },
  ]).slice(0, 8);
  return shuffle(qs.concat(mcs));
}

/* ================= ACADEMIA CLAUDE ✨ =================
   Poco texto, asociaciones y práctica inmediata. */

const CLAUDE_LESSONS = [
  {
    id: 'que-es', title: '¿Qué es Claude?', emoji: '🤖',
    build: () => [
      { type: 'info', img: 'mrdna', text: '<b>Claude es una INTELIGENCIA ARTIFICIAL.</b><br><br>Un programa con el que platicas escribiendo… como chatear con un amigo que se leyó millones de libros. 📚' },
      { type: 'info', img: 'steve', text: '¿Cómo aprendió?<br><br>Como tú en Minecraft: pico y pala MILLONES de veces. ⛏️<br>Claude "entrenó" leyendo textos hasta aprender a responder.' },
      tfQ('Claude es una persona real contestando mensajes', false, { img: 'mrdna', note: 'Es un programa de computadora' }),
      { type: 'mc', img: 'goku', text: '¿Qué puede hacer Claude por ti?', options: ['Explicarte la tarea, inventar cuentos y hacerte quizzes', 'Hacer tu cama', 'Jugar Fortnite contigo', 'Cocinar pizza'], answer: 'Explicarte la tarea, inventar cuentos y hacerte quizzes' },
      tfQ('Claude aprendió leyendo muchísimos textos', true),
      { type: 'info', img: 'creeper', text: 'Claude no es magia: es buenísimo adivinando qué palabras siguen.<br><br>Dato curioso: <b>esta app fue construida con ayuda de Claude</b>. 🤯' },
      tfQ('Esta app fue construida con ayuda de una IA', true, { img: 'mrdna' }),
      { type: 'mc', img: 'r2d2', text: 'Claude se parece más a…', options: ['Un bibliotecario súper rápido', 'Un robot que camina', 'Una consola de videojuegos', 'Un teléfono'], answer: 'Un bibliotecario súper rápido' },
    ],
  },
  {
    id: 'prompt', title: 'El deseo perfecto (prompts)', emoji: '🐉',
    build: () => [
      { type: 'info', img: 'shenron', text: 'Pedirle algo a Claude es como pedirle un deseo a <b>SHENLONG</b>:<br><br>si pides mal… ¡el deseo sale raro! 😅<br>Tu mensaje se llama <b>PROMPT</b>.' },
      { type: 'info', img: 'esfera_bola', text: 'Los 3 secretos del deseo perfecto:<br><br>1️⃣ Di EXACTAMENTE qué quieres<br>2️⃣ Cuenta quién eres (contexto)<br>3️⃣ Pide el formato (lista, 5 puntos, fácil…)' },
      { type: 'mc', img: 'trex', text: 'Para tu tarea de dinosaurios, ¿cuál deseo está mejor pedido?', options: ['"Tengo 13 años: explícame en 5 puntos fáciles por qué se extinguieron los dinosaurios"', '"dinosaurios"', '"haz mi tarea"', '"dime todo"'], answer: '"Tengo 13 años: explícame en 5 puntos fáciles por qué se extinguieron los dinosaurios"' },
      { type: 'mc', img: 'shenron', text: '¿Qué es un "prompt"?', options: ['El mensaje que le escribes a la IA', 'Un botón del teclado', 'Un virus', 'El nombre del creador'], answer: 'El mensaje que le escribes a la IA' },
      tfQ('"dinosaurios" es un buen prompt', false, { img: 'trex', note: 'Demasiado vago: dile qué, para qué y cómo' }),
      { type: 'mc', img: 'grass', text: 'Quieres ayuda para construir en Minecraft. ¿Cuál prompt es mejor?', options: ['"Dame pasos para construir un castillo medieval pequeño en Minecraft survival"', '"minecraft"', '"castillo"', '"ayúdame"'], answer: '"Dame pasos para construir un castillo medieval pequeño en Minecraft survival"' },
      tfQ('Si pides "explícamelo fácil, tengo 13 años", la respuesta será más clara', true, { img: 'mrdna' }),
    ],
  },
  {
    id: 'cuidado', title: 'La IA también falla', emoji: '⚠️',
    build: () => [
      { type: 'info', img: 'tnt', text: 'Claude a veces se equivoca MUY seguro de sí mismo.<br>(A eso le dicen <b>"alucinar"</b>.)<br><br>Es como un mapa glitcheado: se ve bien… pero te manda a la lava. 🌋' },
      { type: 'info', img: 'creeper', text: 'Reglas de supervivencia:<br><br>🔍 Verifica los datos importantes en tu libro o con papá<br>🔒 NUNCA compartas contraseñas, dirección o fotos<br>🧠 Úsalo para APRENDER, no para copiar' },
      tfQ('La IA nunca se equivoca', false, { img: 'tnt', note: 'Se equivoca con mucha confianza: verifica' }),
      { type: 'mc', img: 'mrdna', text: 'Claude te da un dato para tu examen. ¿Qué haces?', options: ['Lo verifico en mi libro o con un adulto', 'Lo copio sin leer', 'Lo publico en internet', 'Lo tatúo'], answer: 'Lo verifico en mi libro o con un adulto' },
      { type: 'mc', img: 'creeper', text: '¿Qué NO debes compartir con una IA?', options: ['Contraseñas, dirección y datos personales', 'Tus dudas de mate', 'Preguntas de Minecraft', 'Lo que quieres aprender'], answer: 'Contraseñas, dirección y datos personales' },
      tfQ('Dejar que la IA haga tu tarea te ayuda a aprender más', false, { note: 'El que no aprende eres tú: pídele que te EXPLIQUE' }),
      { type: 'mc', img: 'malcolm', text: 'Si algo de la conversación te confunde o incomoda…', options: ['Se lo cuento a papá o mamá', 'Lo ignoro para siempre', 'Sigo como si nada', 'Apago la compu asustado'], answer: 'Se lo cuento a papá o mamá' },
    ],
  },
  {
    id: 'trucos', title: 'Trucos de nivel pro', emoji: '🥋',
    build: () => [
      { type: 'info', img: 'yoda', text: 'Frases mágicas, aprender debes:<br><br>🗣️ "Explícamelo como si tuviera 13 años"<br>🌰 "Dame un ejemplo"<br>❓ "Hazme preguntas para ver si entendí"' },
      { type: 'info', img: 'obiwan', text: 'El truco maestro: <b>"Actúa como…"</b><br><br>"Actúa como mi maestro de inglés" y Claude se transforma, como un actor. 🎭<br><br>Y si no entiendes: REPREGUNTA. Nunca se enoja.' },
      { type: 'mc', img: 'steve', text: 'Quieres aprender inglés. ¿Cuál prompt es mejor?', options: ['"Actúa como mi maestro: enséñame 5 palabras de Minecraft en inglés y examíname"', '"inglés"', '"hola"', '"dame todas las palabras que existen"'], answer: '"Actúa como mi maestro: enséñame 5 palabras de Minecraft en inglés y examíname"' },
      tfQ('Claude se enoja si le preguntas lo mismo dos veces', false, { img: 'yoda', note: 'Repreguntar es de pros' }),
      { type: 'mc', img: 'mrdna', text: '¿Qué frase mágica pide que TODO se entienda mejor?', options: ['"Dame un ejemplo"', '"Escribe más largo"', '"Usa palabras difíciles"', '"Responde en chino"'], answer: '"Dame un ejemplo"' },
      { type: 'mc', img: 'goku', text: 'Para que Claude sea tu entrenador de mate, le dices…', options: ['"Actúa como mi entrenador de matemáticas"', '"matemáticas"', '"entrena"', '"hola mate"'], answer: '"Actúa como mi entrenador de matemáticas"' },
      tfQ('"Hazme preguntas para ver si entendí" es un buen truco para estudiar', true, { img: 'obiwan' }),
    ],
  },
];

const CLAUDE_EXAM_BANK = [
  { text: '¿Qué es Claude?', img: 'mrdna', options: ['Una IA con la que platicas y te ayuda a aprender', 'Un buscador como Google', 'Un videojuego', 'Un robot físico'], answer: 'Una IA con la que platicas y te ayuda a aprender' },
  { text: '¿Qué es un "prompt"?', img: 'shenron', options: ['El mensaje o instrucción que le escribes a la IA', 'Un tipo de virus', 'El creador de Claude', 'Un botón del teclado'], answer: 'El mensaje o instrucción que le escribes a la IA' },
  { text: 'Para la tarea de dinosaurios, ¿cuál prompt es MEJOR?', img: 'trex', options: ['"Explícame en 5 puntos fáciles por qué se extinguieron, tengo 13 años"', '"dinosaurios"', '"haz mi tarea"', '"dime todo sobre todo"'], answer: '"Explícame en 5 puntos fáciles por qué se extinguieron, tengo 13 años"' },
  { text: 'Claude te da un dato para tu examen. ¿Qué haces?', img: 'mrdna', options: ['Lo verifico en mi libro o con un adulto', 'Lo copio sin leer', 'Lo publico en internet', 'Borro todo asustado'], answer: 'Lo verifico en mi libro o con un adulto' },
  { text: '¿Qué NO debes compartir con una IA?', img: 'creeper', options: ['Tu dirección, contraseñas y datos personales', 'Tus dudas de matemáticas', 'Preguntas sobre Minecraft', 'Lo que quieres aprender'], answer: 'Tu dirección, contraseñas y datos personales' },
  { text: 'No entendiste la respuesta. ¿Qué haces?', img: 'yoda', options: ['Le pido que lo explique más fácil o con ejemplos', 'Me rindo', 'Escribo lo mismo en mayúsculas', 'Apago la computadora'], answer: 'Le pido que lo explique más fácil o con ejemplos' },
  { text: 'Quieres aprender inglés con Claude. ¿Cuál prompt es MEJOR?', img: 'steve', options: ['"Actúa como mi maestro: 5 palabras de Minecraft en inglés con ejemplos y examíname"', '"inglés"', '"hola"', '"dame todas las palabras"'], answer: '"Actúa como mi maestro: 5 palabras de Minecraft en inglés con ejemplos y examíname"' },
  { text: '¿Para qué es mejor usar la IA en la escuela?', img: 'gohan', options: ['Para que me EXPLIQUE y practique, y aprender yo', 'Para que haga mi tarea', 'Para hacer trampa', 'Para nada'], answer: 'Para que me EXPLIQUE y practique, y aprender yo' },
  { text: 'Cuando la IA inventa un dato con mucha seguridad, se dice que…', img: 'tnt', options: ['Alucina', 'Sueña', 'Glitchea', 'Lagea'], answer: 'Alucina' },
  { text: 'El truco "Actúa como mi entrenador" sirve para…', img: 'obiwan', options: ['Que Claude tome un papel y te enseñe así', 'Activar un modo secreto', 'Hacerlo más rápido', 'Nada'], answer: 'Que Claude tome un papel y te enseñe así' },
  { text: 'Pedir el deseo a Shenlong sin detalles es como un prompt…', img: 'shenron', options: ['Vago: el resultado sale raro', 'Perfecto', 'Ilegal', 'Mágico'], answer: 'Vago: el resultado sale raro' },
  { text: '¿Cuál de estas peticiones trae el FORMATO pedido?', img: 'esfera_bola', options: ['"…explícamelo en una lista de 5 puntos"', '"…explícamelo"', '"…dime"', '"…ayuda"'], answer: '"…explícamelo en una lista de 5 puntos"' },
];
const CLAUDE_EXAM_TF = [
  ['Claude es una persona real', false],
  ['Repreguntar a la IA es de buenos estudiantes', true],
  ['La IA puede equivocarse aunque suene muy segura', true],
  ['Compartir tu contraseña con una IA es seguro', false],
];

function buildClaudeExam() {
  const mc = shuffle(CLAUDE_EXAM_BANK).slice(0, 8).map(q => ({
    type: 'mc', text: q.text, img: q.img, options: shuffle(q.options.slice()), answer: q.answer,
  }));
  const tfs = shuffle(CLAUDE_EXAM_TF).slice(0, 2).map(([t, v]) => tfQ(t, v, { img: motivador() }));
  return shuffle(mc.concat(tfs));
}

const CLAUDE_MISSIONS = [
  { id: 'm1', e: '🐉', t: 'Pídele a Claude que te explique qué es una inteligencia artificial usando ejemplos de Dragon Ball.' },
  { id: 'm2', e: '⛏️', t: 'Pídele 5 palabras en inglés sobre Minecraft, con pronunciación, y practícalas en voz alta.' },
  { id: 'm3', e: '🦖', t: 'Pídele un cuento corto donde Goku visita Jurassic Park… y léelo completo.' },
  { id: 'm4', e: '🧮', t: 'Pídele que te haga un quiz de 5 preguntas de matemáticas de 1° de secundaria y respóndelo.' },
  { id: 'm5', e: '🎮', t: 'Pregúntale cómo funciona un videojuego por dentro (¡pídele que lo explique fácil!).' },
  { id: 'm6', e: '🏰', t: 'Pídele ayuda para planear una construcción épica de Minecraft, paso a paso.' },
  { id: 'm7', e: '🗣️', t: 'Pídele que actúe como tu maestro de inglés por 10 minutos, solo con frases fáciles.' },
  { id: 'm8', e: '🚀', t: 'JEFE FINAL: inventa tu propio prompt épico (específico + contexto + formato) y muéstraselo a tu papá.' },
];

/* ================= PANTALLAS ================= */

function showTechHome() {
  const app = $('#app');
  const rp = robotProgress();
  const cl = unitState(S.tech, 'complab');
  const clSubsOk = [0, 1, 2].filter(i => subIsDone(cl, i)).length;
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">💎 Mundo Tecnología</h1>
    <p class="screen-sub">Entiende cómo piensan las computadoras y domina la inteligencia artificial.</p>
    <button class="world-card tech has-hero" id="go-robot">
      ${imgTag('steve', 'hero-img', 'Steve')}
      <h2>Robo-Steve: programa al robot</h2>
      <p>Secuencias, funciones y bucles con las manos en el teclado.</p>
      <div class="progress-note">💎 ${rp.done}/${rp.total} niveles</div>
    </button>
    <button class="world-card tech has-hero" id="go-complab">
      ${imgTag('r2d2', 'hero-img', 'R2-D2')}
      <h2>Compu-Lab: ¿cómo piensa una compu?</h2>
      <p>Binario con focos 💡, algoritmos como recetas y las piezas de la bestia.</p>
      <div class="progress-note">${cl.examDone ? '🏆 Examen aprobado' : `🔌 ${clSubsOk}/3 lecciones`}</div>
    </button>
    <button class="world-card tech has-hero" id="go-claude">
      ${imgTag('mrdna', 'hero-img', 'Mr. DNA')}
      <h2>Academia Claude: domina la IA</h2>
      <p>Lecciones cortas y prácticas + misiones reales con tu papá.</p>
      <div class="progress-note">${S.claude.quizDone ? '🏆 Maestro de la IA' : `✨ ${S.claude.read.length}/${CLAUDE_LESSONS.length} lecciones`}</div>
    </button>
  `;
  $('#back').addEventListener('click', showHome);
  $('#go-robot').addEventListener('click', showRobotLevels);
  $('#go-complab').addEventListener('click', showComplab);
  $('#go-claude').addEventListener('click', showClaudeHome);
}

/* --- Compu-Lab --- */
function showComplab() {
  const st = unitState(S.tech, 'complab');
  const examReady = allSubsDone(st, 3);
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Mundo Tecnología</button>
    <h1 class="screen-title">🔌 Compu-Lab</h1>
    <p class="screen-sub">Tres lecciones para entender cómo "piensa" una computadora, y el examen para demostrarlo.</p>
    ${COMPLAB_SUBS.map((sub, i) => {
      const done = subIsDone(st, i);
      const locked = i > 0 && !subIsDone(st, i - 1) && !done;
      return `
        <button class="item-card" data-sub="${i}" ${locked ? 'disabled' : ''}>
          <span class="item-emoji">${locked ? '🔒' : (done ? '✅' : '🔬')}</span>
          <span class="item-body">
            <span class="item-title">Lección ${i + 1}: ${esc(sub.t)}</span>
            <span class="item-sub">Interactiva · acierta el 80% para dominarla</span>
          </span>
          <span class="item-status">${done ? '⭐' : (locked ? '' : '▶️')}</span>
        </button>`;
    }).join('')}
    <button class="item-card exam-card" id="go-exam" ${examReady ? '' : 'disabled'}>
      ${imgTag('diamond', 'item-img', 'examen')}
      <span class="item-body">
        <span class="item-title">🏆 EXAMEN FINAL</span>
        <span class="item-sub">${examReady
          ? (st.examDone ? `Aprobado · Mejor: ${st.examBest}/12 · Intentos: ${st.examTries}` : `Binario + algoritmos + hardware${st.examTries ? ` · Intentos: ${st.examTries}` : ''}`)
          : 'Completa las 3 lecciones para desbloquearlo'}</span>
      </span>
      <span class="item-status">${st.examDone ? '🏆' : (examReady ? '🔥' : '🔒')}</span>
    </button>
  `;
  $('#back').addEventListener('click', showTechHome);
  app.querySelectorAll('[data-sub]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.sub;
    startQuiz({
      qs: COMPLAB_SUBS[i].build(),
      onBack: showComplab,
      onDone: (s, t, passed) => {
        if (passed) {
          const st2 = unitState(S.tech, 'complab');
          st2.subDone[i] = true;
          save();
        }
      },
    });
  }));
  $('#go-exam').addEventListener('click', () => {
    const st2 = unitState(S.tech, 'complab');
    st2.examTries++;
    save();
    startQuiz({
      qs: buildComplabExam(),
      isExam: true,
      onBack: showComplab,
      onDone: (score, total, passed) => {
        st2.examBest = Math.max(st2.examBest || 0, score);
        const firstTime = passed && !st2.examDone;
        if (passed) st2.examDone = true;
        save();
        if (firstTime) {
          addXP(60);
          const slot = $('#reward-slot');
          if (slot) slot.innerHTML = `<div class="reward-banner">${imgTag('r2d2', 'r-img', 'R2-D2')}🔌 ¡Ya piensas como una computadora! Insignia de Compu-Lab ganada.</div>`;
          checkCoupons();
        }
      },
    });
  });
}

/* --- Academia Claude --- */
function showClaudeHome() {
  const app = $('#app');
  const read = S.claude.read;
  const allRead = read.length >= CLAUDE_LESSONS.length;
  const missionsDone = S.claude.missions.length;
  app.innerHTML = `
    <button class="back-link" id="back">← Mundo Tecnología</button>
    <h1 class="screen-title">✨ Academia Claude</h1>
    <p class="screen-sub">Lecciones cortas y prácticas: aprendes respondiendo, no leyendo choros.</p>
    ${CLAUDE_LESSONS.map((l, i) => `
      <button class="item-card" data-lesson="${i}">
        <span class="item-emoji">${l.emoji}</span>
        <span class="item-body">
          <span class="item-title">${esc(l.title)}</span>
          <span class="item-sub">Mini-lección interactiva</span>
        </span>
        <span class="item-status">${read.includes(l.id) ? '✅' : '▶️'}</span>
      </button>`).join('')}
    <button class="item-card exam-card" id="go-quiz" ${allRead ? '' : 'disabled'}>
      ${imgTag('mrdna', 'item-img', 'examen')}
      <span class="item-body">
        <span class="item-title">🏆 EXAMEN DE LA ACADEMIA</span>
        <span class="item-sub">${allRead ? (S.claude.quizDone ? `Aprobado · Mejor: ${S.claude.quizBest}/10 · Intentos: ${S.claude.quizTries || 0}` : 'Preguntas al azar del banco · acierta 8 de 10') : 'Termina las 4 lecciones para desbloquearlo'}</span>
      </span>
      <span class="item-status">${S.claude.quizDone ? '🏆' : (allRead ? '🔥' : '🔒')}</span>
    </button>
    <button class="item-card" id="go-missions">
      <span class="item-emoji">🎯</span>
      <span class="item-body">
        <span class="item-title">Misiones reales con Claude</span>
        <span class="item-sub">Para hacer con tu papá · ${missionsDone}/${CLAUDE_MISSIONS.length} completadas</span>
      </span>
      <span class="item-status">${missionsDone >= CLAUDE_MISSIONS.length ? '🌟' : ''}</span>
    </button>
  `;
  $('#back').addEventListener('click', showTechHome);
  app.querySelectorAll('[data-lesson]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.lesson;
    const l = CLAUDE_LESSONS[i];
    startQuiz({
      qs: l.build(),
      onBack: showClaudeHome,
      onDone: (s, t, passed) => {
        if (passed && !S.claude.read.includes(l.id)) {
          S.claude.read.push(l.id);
          addXP(15);
          save();
        }
      },
    });
  }));
  $('#go-quiz').addEventListener('click', () => {
    if (S.claude.read.length < CLAUDE_LESSONS.length) return;
    S.claude.quizTries = (S.claude.quizTries || 0) + 1;
    save();
    startQuiz({
      qs: buildClaudeExam(),
      isExam: true,
      onBack: showClaudeHome,
      onDone: (score, total, passed) => {
        S.claude.quizBest = Math.max(S.claude.quizBest, score);
        const firstTime = passed && !S.claude.quizDone;
        if (passed) S.claude.quizDone = true;
        save();
        if (firstTime) {
          addXP(60);
          const slot = $('#reward-slot');
          if (slot) slot.innerHTML = `
            <div class="reward-banner">
              ${imgTag('mrdna', 'r-img', 'Mr. DNA')}
              🏆 ¡Insignia MAESTRO DE LA IA! Ahora ve a las misiones reales.
            </div>`;
          checkCoupons();
        }
      },
    });
  });
  $('#go-missions').addEventListener('click', showClaudeMissions);
}

function showClaudeMissions() {
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Academia Claude</button>
    <h1 class="screen-title">🎯 Misiones reales con Claude</h1>
    <p class="screen-sub">Abre Claude (con tu papá o mamá) y completa estas misiones. Marca cada una al terminarla: +20 XP.</p>
    ${CLAUDE_MISSIONS.map(m => {
      const done = S.claude.missions.includes(m.id);
      return `
        <button class="mission-item ${done ? 'done' : ''}" data-m="${m.id}">
          <span class="check">${done ? '✅' : '⬜'}</span>
          <span class="m-text"><b>${m.e}</b> ${esc(m.t)}</span>
        </button>`;
    }).join('')}
    <p class="center muted">💡 Tip: sé específico, da contexto y pide el formato — como un deseo bien pedido a Shenlong.</p>
  `;
  $('#back').addEventListener('click', showClaudeHome);
  app.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.m;
    const i = S.claude.missions.indexOf(id);
    if (i >= 0) {
      S.claude.missions.splice(i, 1);
    } else {
      S.claude.missions.push(id);
      addXP(20);
      sfxGood();
      touchStreak();
      if (S.claude.missions.length === CLAUDE_MISSIONS.length) {
        confetti(120);
        sfxWin();
      }
    }
    save();
    showClaudeMissions();
  }));
}
