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
    <button class="world-card tech" id="go-robot">
      <span class="big-emoji">🤖</span>
      <h2>Robo-Steve: lógica de programación</h2>
      <p>Programa al robot para llegar al diamante. Secuencias, funciones y bucles.</p>
      <div class="progress-note">💎 ${rp.done}/${rp.total} niveles</div>
    </button>
    <button class="world-card tech" id="go-claude">
      <span class="big-emoji">✨</span>
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
          <span class="item-emoji">${locked ? '🔒' : (done ? '💎' : '🤖')}</span>
          <span class="item-body">
            <span class="item-title">Nivel ${i + 1}: ${esc(lv.name)}</span>
            <span class="item-sub">${tag}</span>
          </span>
          <span class="item-status">${done ? '✅' : (locked ? '' : '▶️')}</span>
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
        ${hintShown >= 1 ? `<div class="hint-box">💡 ${lv.hint1}</div>` : ''}
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

/* ---------- Academia Claude ---------- */
const CLAUDE_LESSONS = [
  {
    id: 'que-es', title: '¿Qué es Claude?', emoji: '🤔',
    body: `
      <h2>🤔 ¿Qué es Claude?</h2>
      <p><b>Claude es una inteligencia artificial (IA)</b>: un programa de computadora que aprendió leyendo muchísimos textos, y con el que puedes <b>platicar escribiendo</b>, como si fuera un chat.</p>
      <ul>
        <li>Es como un <b>bibliotecario súper rápido</b> que leyó millones de libros.</li>
        <li>Le puedes pedir que te <b>explique cosas, te ayude con la tarea, invente cuentos</b> o hasta que te haga exámenes de práctica.</li>
        <li>No es magia ni una persona: es un programa que <b>predice qué palabras van después</b>, ¡pero lo hace tan bien que parece que piensa!</li>
      </ul>
      <p>💡 Dato curioso: esta app que estás usando… <b>fue construida con ayuda de Claude</b>. Así de poderosa es esta herramienta cuando aprendes a usarla.</p>`,
  },
  {
    id: 'prompt', title: 'El prompt perfecto', emoji: '✍️',
    body: `
      <h2>✍️ El prompt perfecto</h2>
      <p>Un <b>"prompt"</b> es el mensaje que le escribes a Claude. La calidad de la respuesta depende de la calidad de tu prompt. Regla de oro: <b>pídelo como si le explicaras a un amigo nuevo exactamente qué necesitas</b>.</p>
      <p>Los 3 secretos:</p>
      <ul>
        <li><b>1. Sé específico</b> — di exactamente qué quieres.</li>
        <li><b>2. Da contexto</b> — di quién eres o para qué lo necesitas.</li>
        <li><b>3. Pide el formato</b> — ¿lista? ¿5 puntos? ¿corto? ¿con ejemplos?</li>
      </ul>
      <div class="ejemplo malo">❌ <b>Prompt flojo:</b> "dinosaurios"</div>
      <div class="ejemplo bueno">✅ <b>Prompt poderoso:</b> "Tengo 13 años y me encanta Jurassic Park. Explícame en 5 puntos sencillos por qué se extinguieron los dinosaurios."</div>
      <p>¿Ves la diferencia? El segundo le dice <b>quién eres</b>, <b>qué quieres</b> y <b>cómo lo quieres</b>.</p>`,
  },
  {
    id: 'cuidado', title: 'Cuidado: la IA se equivoca', emoji: '⚠️',
    body: `
      <h2>⚠️ La IA también se equivoca</h2>
      <p>Claude es muy listo, pero <b>no es perfecto</b>. A veces se equivoca con mucha seguridad (a eso le dicen "alucinar"). Por eso:</p>
      <ul>
        <li>🔍 <b>Verifica los datos importantes</b> — si es para la escuela, compara con tu libro o pregúntale a un adulto.</li>
        <li>🔒 <b>Nunca compartas datos personales</b>: tu dirección, escuela, contraseñas o fotos.</li>
        <li>🧠 <b>Úsalo para APRENDER, no para copiar</b>: si Claude hace tu tarea por ti, el que no aprende eres tú. Mejor pídele que te EXPLIQUE cómo se hace.</li>
        <li>🗣️ Si algo te confunde o incomoda, <b>cuéntale a tu papá o mamá</b>.</li>
      </ul>
      <p>Un buen gamer conoce las debilidades de sus herramientas. 🎮</p>`,
  },
  {
    id: 'trucos', title: 'Trucos de nivel pro', emoji: '🥋',
    body: `
      <h2>🥋 Trucos de nivel pro</h2>
      <p>Frases mágicas que mejoran cualquier respuesta:</p>
      <ul>
        <li>🗣️ <b>"Explícamelo como si tuviera 13 años"</b> — respuestas claras, sin palabras raras.</li>
        <li>🌰 <b>"Dame un ejemplo"</b> — todo se entiende mejor con ejemplos.</li>
        <li>❓ <b>"Hazme preguntas para ver si entendí"</b> — ¡Claude puede ser tu examinador!</li>
        <li>🔁 <b>Repregunta sin pena</b> — si no entendiste, di "no entendí la parte de…". Claude nunca se enoja.</li>
        <li>🎭 <b>"Actúa como…"</b> — pídele que sea tu maestro de inglés, tu entrenador de mate o un guía de dinosaurios.</li>
      </ul>
      <div class="ejemplo bueno">✅ "Actúa como mi entrenador de inglés. Enséñame 5 frases para usar en Fortnite y hazme un mini examen al final."</div>
      <p>Cuando termines las lecciones, pasa al <b>examen de la Academia</b> y luego a las <b>misiones reales</b>. 🚀</p>`,
  },
];

const CLAUDE_QUIZ = [
  {
    text: '¿Qué es Claude?', emoji: '🤖',
    options: [
      'Una IA con la que platicas y te ayuda a aprender',
      'Un buscador como Google',
      'Un videojuego de peleas',
      'Un robot físico que camina',
    ],
    answer: 'Una IA con la que platicas y te ayuda a aprender',
  },
  {
    text: '¿Qué es un "prompt"?', emoji: '✍️',
    options: [
      'El mensaje o instrucción que le escribes a la IA',
      'Un tipo de virus',
      'El nombre del creador de Claude',
      'Un botón del teclado',
    ],
    answer: 'El mensaje o instrucción que le escribes a la IA',
  },
  {
    text: 'Tienes tarea sobre dinosaurios. ¿Cuál prompt es MEJOR?', emoji: '🦖',
    options: [
      '"Explícame en 5 puntos fáciles por qué se extinguieron los dinosaurios, tengo 13 años"',
      '"dinosaurios"',
      '"haz mi tarea"',
      '"dime todo sobre todo"',
    ],
    answer: '"Explícame en 5 puntos fáciles por qué se extinguieron los dinosaurios, tengo 13 años"',
    note: 'Específico + contexto + formato',
  },
  {
    text: 'Claude te da un dato para tu examen. ¿Qué haces?', emoji: '🔍',
    options: [
      'Lo verifico en mi libro o con un adulto',
      'Lo copio sin leer, la IA nunca falla',
      'Lo publico en internet',
      'Borro la conversación asustado',
    ],
    answer: 'Lo verifico en mi libro o con un adulto',
    note: 'La IA a veces "alucina" datos',
  },
  {
    text: '¿Qué NO debes compartir con una IA?', emoji: '🔒',
    options: [
      'Tu dirección, contraseñas y datos personales',
      'Tus dudas de matemáticas',
      'Preguntas sobre Minecraft',
      'Lo que quieres aprender',
    ],
    answer: 'Tu dirección, contraseñas y datos personales',
  },
  {
    text: 'No entendiste la respuesta de Claude. ¿Qué haces?', emoji: '🤷',
    options: [
      'Le pido que lo explique más fácil o con ejemplos',
      'Me rindo para siempre',
      'Le escribo lo mismo en mayúsculas',
      'Apago la computadora',
    ],
    answer: 'Le pido que lo explique más fácil o con ejemplos',
    note: 'Repreguntar es de pros, Claude nunca se enoja',
  },
  {
    text: 'Quieres aprender inglés con Claude. ¿Cuál prompt es MEJOR?', emoji: '🗣️',
    options: [
      '"Actúa como mi maestro: enséñame 5 palabras de Minecraft en inglés con ejemplos y examíname"',
      '"inglés"',
      '"hola"',
      '"dame todas las palabras en inglés que existen"',
    ],
    answer: '"Actúa como mi maestro: enséñame 5 palabras de Minecraft en inglés con ejemplos y examíname"',
  },
  {
    text: '¿Para qué es mejor usar la IA en la escuela?', emoji: '🎓',
    options: [
      'Para que me EXPLIQUE y practique, y aprender yo',
      'Para que haga mi tarea y yo no aprenda nada',
      'Para hacer trampa en los exámenes',
      'Para nada, está prohibida pensar con ella',
    ],
    answer: 'Para que me EXPLIQUE y practique, y aprender yo',
  },
];

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

function showClaudeHome() {
  const app = $('#app');
  const read = S.claude.read;
  const allRead = read.length >= CLAUDE_LESSONS.length;
  const missionsDone = S.claude.missions.length;
  app.innerHTML = `
    <button class="back-link" id="back">← Mundo Tecnología</button>
    <h1 class="screen-title">✨ Academia Claude</h1>
    <p class="screen-sub">Aprende a usar la IA como un pro: lecciones → examen → misiones reales.</p>
    <h2 style="font-size:1rem;margin-bottom:10px">📖 Lecciones</h2>
    ${CLAUDE_LESSONS.map((l, i) => `
      <button class="item-card" data-lesson="${i}">
        <span class="item-emoji">${l.emoji}</span>
        <span class="item-body"><span class="item-title">${esc(l.title)}</span></span>
        <span class="item-status">${read.includes(l.id) ? '✅' : '▶️'}</span>
      </button>`).join('')}
    <div class="spacer"></div>
    <button class="item-card" id="go-quiz" ${allRead ? '' : 'disabled'}>
      <span class="item-emoji">${allRead ? '📝' : '🔒'}</span>
      <span class="item-body">
        <span class="item-title">Examen de la Academia</span>
        <span class="item-sub">${allRead ? (S.claude.quizDone ? `Aprobado · Mejor: ${S.claude.quizBest}/8` : 'Acierta 7 de 8 para ganar la insignia 🏆') : 'Termina las 4 lecciones para desbloquear'}</span>
      </span>
      <span class="item-status">${S.claude.quizDone ? '🏆' : ''}</span>
    </button>
    <button class="item-card" id="go-missions">
      <span class="item-emoji">🎯</span>
      <span class="item-body">
        <span class="item-title">Misiones reales con Claude</span>
        <span class="item-sub">Para hacer con tu papá o tú solo · ${missionsDone}/${CLAUDE_MISSIONS.length} completadas</span>
      </span>
      <span class="item-status">${missionsDone >= CLAUDE_MISSIONS.length ? '🌟' : ''}</span>
    </button>
  `;
  $('#back').addEventListener('click', showTechHome);
  app.querySelectorAll('[data-lesson]').forEach(b =>
    b.addEventListener('click', () => showClaudeLesson(+b.dataset.lesson)));
  $('#go-quiz').addEventListener('click', startClaudeQuiz);
  $('#go-missions').addEventListener('click', showClaudeMissions);
}

function showClaudeLesson(idx) {
  const l = CLAUDE_LESSONS[idx];
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Academia Claude</button>
    <div class="lesson-body">${l.body}</div>
    <div class="btn-row" style="justify-content:center">
      <button class="btn teal" id="l-done">${S.claude.read.includes(l.id) ? 'Leída de nuevo ✓' : '¡Entendido! ✓ (+15 XP)'}</button>
      ${idx + 1 < CLAUDE_LESSONS.length ? `<button class="btn secondary" id="l-next">Siguiente lección →</button>` : ''}
    </div>
  `;
  $('#back').addEventListener('click', showClaudeHome);
  $('#l-done').addEventListener('click', () => {
    if (!S.claude.read.includes(l.id)) {
      S.claude.read.push(l.id);
      save();
      addXP(15);
      sfxGood();
      touchStreak();
    }
    showClaudeHome();
  });
  const nx = $('#l-next');
  if (nx) nx.addEventListener('click', () => showClaudeLesson(idx + 1));
}

function startClaudeQuiz() {
  if (S.claude.read.length < CLAUDE_LESSONS.length) return;
  const qs = shuffle(CLAUDE_QUIZ).map(q => ({
    type: 'mc', emoji: q.emoji, text: q.text,
    options: shuffle(q.options.slice()), answer: q.answer, note: q.note,
  }));
  startQuiz({
    qs,
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
            <span class="r-emoji">🏆</span>
            ¡Insignia MAESTRO DE LA IA desbloqueada! Ahora ve a las misiones reales.
          </div>`;
      }
    },
  });
}

function showClaudeMissions() {
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Academia Claude</button>
    <h1 class="screen-title">🎯 Misiones reales con Claude</h1>
    <p class="screen-sub">Abre Claude (con tu papá o mamá) y completa estas misiones. Marca cada una cuando la termines: +20 XP por misión.</p>
    ${CLAUDE_MISSIONS.map(m => {
      const done = S.claude.missions.includes(m.id);
      return `
        <button class="mission-item ${done ? 'done' : ''}" data-m="${m.id}">
          <span class="check">${done ? '✅' : '⬜'}</span>
          <span class="m-text"><b>${m.e}</b> ${esc(m.t)}</span>
        </button>`;
    }).join('')}
    <p class="center muted">💡 Tip: usa lo que aprendiste en las lecciones — sé específico, da contexto y pide el formato.</p>
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
