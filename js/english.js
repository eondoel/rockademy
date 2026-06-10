'use strict';
/* ===== Mundo Inglés: Isla Jurásica 🦖 =====
   Inglés desde cero: tarjetas con audio + misiones (quiz).
   Cada unidad completada hace eclosionar un dino. */

const ENGLISH_UNITS = [
  {
    id: 'saludos', title: 'Saludos', emoji: '👋', dino: '🦕',
    desc: 'Hello! Tus primeras palabras',
    items: [
      { en: 'hello', es: 'hola', e: '👋' },
      { en: 'goodbye', es: 'adiós', e: '🚪' },
      { en: 'good morning', es: 'buenos días', e: '🌅' },
      { en: 'good night', es: 'buenas noches', e: '🌙' },
      { en: 'please', es: 'por favor', e: '🙏' },
      { en: 'thank you', es: 'gracias', e: '💛' },
      { en: 'yes', es: 'sí', e: '✅' },
      { en: 'no', es: 'no', e: '❌' },
      { en: 'friend', es: 'amigo', e: '🤝' },
      { en: 'my name is', es: 'me llamo', e: '🪪' },
    ],
  },
  {
    id: 'numeros', title: 'Números', emoji: '🔢', dino: '🦖',
    desc: 'One, two, three… ¡a contar!',
    items: [
      { en: 'one', es: 'uno', e: '1️⃣' },
      { en: 'two', es: 'dos', e: '2️⃣' },
      { en: 'three', es: 'tres', e: '3️⃣' },
      { en: 'four', es: 'cuatro', e: '4️⃣' },
      { en: 'five', es: 'cinco', e: '5️⃣' },
      { en: 'six', es: 'seis', e: '6️⃣' },
      { en: 'seven', es: 'siete', e: '7️⃣' },
      { en: 'eight', es: 'ocho', e: '8️⃣' },
      { en: 'nine', es: 'nueve', e: '9️⃣' },
      { en: 'ten', es: 'diez', e: '🔟' },
      { en: 'twenty', es: 'veinte', e: '🎯' },
      { en: 'one hundred', es: 'cien', e: '💯' },
    ],
  },
  {
    id: 'colores', title: 'Colores', emoji: '🎨', dino: '🐊',
    desc: 'Pinta tu mundo en inglés',
    items: [
      { en: 'red', es: 'rojo', e: '🔴' },
      { en: 'blue', es: 'azul', e: '🔵' },
      { en: 'green', es: 'verde', e: '🟢' },
      { en: 'yellow', es: 'amarillo', e: '🟡' },
      { en: 'black', es: 'negro', e: '⚫' },
      { en: 'white', es: 'blanco', e: '⚪' },
      { en: 'orange', es: 'naranja', e: '🟠' },
      { en: 'purple', es: 'morado', e: '🟣' },
      { en: 'pink', es: 'rosa', e: '🌸' },
      { en: 'brown', es: 'café', e: '🟤' },
    ],
  },
  {
    id: 'criaturas', title: 'Criaturas', emoji: '🐾', dino: '🐢',
    desc: 'Los mobs y bestias del multiverso',
    items: [
      { en: 'dinosaur', es: 'dinosaurio', e: '🦖' },
      { en: 'dragon', es: 'dragón', e: '🐉' },
      { en: 'wolf', es: 'lobo', e: '🐺' },
      { en: 'spider', es: 'araña', e: '🕷️' },
      { en: 'snake', es: 'serpiente', e: '🐍' },
      { en: 'horse', es: 'caballo', e: '🐴' },
      { en: 'chicken', es: 'gallina', e: '🐔' },
      { en: 'cow', es: 'vaca', e: '🐮' },
      { en: 'pig', es: 'cerdo', e: '🐷' },
      { en: 'monkey', es: 'mono', e: '🐵' },
    ],
  },
  {
    id: 'familia', title: 'La familia', emoji: '👨‍👩‍👦', dino: '🦎',
    desc: 'Como en Malcolm: toda la familia',
    items: [
      { en: 'family', es: 'familia', e: '👨‍👩‍👧‍👦' },
      { en: 'mother', es: 'mamá', e: '👩' },
      { en: 'father', es: 'papá', e: '👨' },
      { en: 'brother', es: 'hermano', e: '👦' },
      { en: 'sister', es: 'hermana', e: '👧' },
      { en: 'baby', es: 'bebé', e: '👶' },
      { en: 'grandma', es: 'abuela', e: '👵' },
      { en: 'grandpa', es: 'abuelo', e: '👴' },
      { en: 'boy', es: 'niño', e: '🧒' },
      { en: 'girl', es: 'niña', e: '👧🏽' },
    ],
  },
  {
    id: 'comida', title: 'Comida', emoji: '🍕', dino: '🐍',
    desc: 'Recarga energía como Goku',
    items: [
      { en: 'apple', es: 'manzana', e: '🍎' },
      { en: 'bread', es: 'pan', e: '🍞' },
      { en: 'water', es: 'agua', e: '💧' },
      { en: 'milk', es: 'leche', e: '🥛' },
      { en: 'egg', es: 'huevo', e: '🥚' },
      { en: 'meat', es: 'carne', e: '🍖' },
      { en: 'fish', es: 'pescado', e: '🐟' },
      { en: 'cake', es: 'pastel', e: '🍰' },
      { en: 'pizza', es: 'pizza', e: '🍕' },
      { en: 'cookie', es: 'galleta', e: '🍪' },
    ],
  },
  {
    id: 'acciones', title: 'Acciones gamer', emoji: '🎮', dino: '🦂',
    desc: 'Run, jump, build, mine…',
    items: [
      { en: 'run', es: 'correr', e: '🏃' },
      { en: 'jump', es: 'saltar', e: '🦘' },
      { en: 'build', es: 'construir', e: '🧱' },
      { en: 'mine', es: 'minar', e: '⛏️' },
      { en: 'craft', es: 'fabricar', e: '🛠️' },
      { en: 'dance', es: 'bailar', e: '🕺' },
      { en: 'play', es: 'jugar', e: '🎮' },
      { en: 'win', es: 'ganar', e: '🏆' },
      { en: 'lose', es: 'perder', e: '😵' },
      { en: 'fly', es: 'volar', e: '🛸' },
      { en: 'fight', es: 'pelear', e: '🥊' },
      { en: 'eat', es: 'comer', e: '😋' },
    ],
  },
  {
    id: 'frases', title: 'Frases de batalla', emoji: '⚡', dino: '🐉',
    desc: 'Frases completas para sonar pro',
    items: [
      { en: "let's go", es: 'vamos', e: '🚀' },
      { en: 'help', es: 'ayuda', e: '🆘' },
      { en: 'I like it', es: 'me gusta', e: '👍' },
      { en: 'I have', es: 'yo tengo', e: '🎒' },
      { en: 'I want', es: 'yo quiero', e: '🌟' },
      { en: 'where is', es: 'dónde está', e: '🗺️' },
      { en: 'I am ready', es: 'estoy listo', e: '💪' },
      { en: 'I am hungry', es: 'tengo hambre', e: '🍗' },
      { en: 'good game', es: 'buen juego', e: '🤜🤛' },
      { en: 'see you later', es: 'nos vemos luego', e: '👋' },
    ],
  },
];

function englishProgress() {
  const done = ENGLISH_UNITS.filter(u => S.english[u.id] && S.english[u.id].done).length;
  return { done, total: ENGLISH_UNITS.length };
}

/* ---------- Pantallas ---------- */
function showEnglishHome() {
  const app = $('#app');
  const p = englishProgress();
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">🦖 Isla Jurásica: Inglés</h1>
    <p class="screen-sub">Aprende palabras, escúchalas y gana misiones. Cada unidad ganada hace nacer un dino para tu colección.</p>
    <div class="collection">
      <span class="c-label">🥚 TU COLECCIÓN DE DINOS (${p.done}/${p.total})</span>
      ${ENGLISH_UNITS.map(u => {
        const done = S.english[u.id] && S.english[u.id].done;
        return `<span class="c-item ${done ? '' : 'locked'}" title="${esc(u.title)}">${done ? u.dino : '🥚'}</span>`;
      }).join('')}
    </div>
    <div class="spacer"></div>
    ${ENGLISH_UNITS.map((u, idx) => {
      const st = S.english[u.id] || {};
      return `
        <button class="item-card" data-unit="${idx}">
          <span class="item-emoji">${u.emoji}</span>
          <span class="item-body">
            <span class="item-title">Unidad ${idx + 1}: ${esc(u.title)}</span>
            <span class="item-sub">${esc(u.desc)}${st.best ? ` · Mejor: ${st.best}/10` : ''}</span>
          </span>
          <span class="item-status">${st.done ? u.dino : '🥚'}</span>
        </button>`;
    }).join('')}
  `;
  $('#back').addEventListener('click', showHome);
  app.querySelectorAll('[data-unit]').forEach(b =>
    b.addEventListener('click', () => showEnglishUnit(+b.dataset.unit)));
}

function showEnglishUnit(idx) {
  const u = ENGLISH_UNITS[idx];
  const st = S.english[u.id] || {};
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Isla Jurásica</button>
    <h1 class="screen-title">${u.emoji} Unidad ${idx + 1}: ${esc(u.title)}</h1>
    <p class="screen-sub">${esc(u.desc)} · ${u.items.length} palabras</p>
    <button class="world-card english" id="go-learn">
      <span class="big-emoji">📖</span>
      <h2>1. Aprende las palabras</h2>
      <p>Tarjetas con sonido. Toca 🔊 y repite en voz alta cada palabra.</p>
    </button>
    <button class="world-card english" id="go-quiz">
      <span class="big-emoji">🎯</span>
      <h2>2. Misión: ¡demuestra tu poder!</h2>
      <p>10 retos. Acierta 8 o más y nace tu dino ${u.dino}${st.done ? ' (¡ya lo tienes!)' : ''}.</p>
      ${st.best ? `<div class="progress-note">Mejor puntaje: ${st.best}/10</div>` : ''}
    </button>
  `;
  $('#back').addEventListener('click', showEnglishHome);
  $('#go-learn').addEventListener('click', () => showFlashcards(idx));
  $('#go-quiz').addEventListener('click', () => startEnglishQuiz(idx));
}

function showFlashcards(idx) {
  const u = ENGLISH_UNITS[idx];
  let i = 0;
  const app = $('#app');
  function draw() {
    const item = u.items[i];
    app.innerHTML = `
      <button class="back-link" id="back">← Unidad ${idx + 1}</button>
      <div class="flash">
        <div class="f-emoji">${item.e}</div>
        <div class="f-en">${esc(item.en)}</div>
        <div class="f-es">${esc(item.es)}</div>
        <button class="q-say" id="f-say" title="Escuchar">🔊</button>
      </div>
      <div class="flash-nav">
        <button class="btn secondary" id="f-prev" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
        <span class="flash-count">${i + 1} / ${u.items.length}</span>
        ${i < u.items.length - 1
          ? `<button class="btn green" id="f-next">Siguiente →</button>`
          : `<button class="btn" id="f-quiz">¡A la misión! 🎯</button>`}
      </div>
      <p class="center muted" style="margin-top:14px">💡 Escucha, repite en voz alta y luego pasa a la siguiente.</p>
    `;
    $('#back').addEventListener('click', () => showEnglishUnit(idx));
    $('#f-say').addEventListener('click', () => sayEN(item.en));
    const prev = $('#f-prev'); if (prev) prev.addEventListener('click', () => { i--; draw(); });
    const next = $('#f-next'); if (next) next.addEventListener('click', () => { i++; draw(); });
    const quiz = $('#f-quiz'); if (quiz) quiz.addEventListener('click', () => startEnglishQuiz(idx));
    setTimeout(() => sayEN(item.en), 300);
  }
  draw();
}

function buildEnglishQuestions(u) {
  const pool = shuffle(u.items);
  const qs = [];
  for (let n = 0; n < 10; n++) {
    const item = pool[n % pool.length];
    const others = shuffle(u.items.filter(x => x.en !== item.en)).slice(0, 3);
    const types = ['trad', 'rev', 'listen'];
    if (/^[a-z]{3,8}$/.test(item.en)) types.push('spell', 'spell');
    const t = pick(types);
    if (t === 'spell') {
      qs.push({ type: 'spell', es: item.es, emoji: item.e, word: item.en });
    } else if (t === 'trad') {
      qs.push({
        type: 'mc', emoji: item.e, say: item.en,
        text: `¿Qué significa <b style="color:var(--teal)">${esc(item.en)}</b>?`,
        options: shuffle([item.es, ...others.map(o => o.es)]),
        answer: item.es,
      });
    } else if (t === 'rev') {
      qs.push({
        type: 'mc', emoji: item.e,
        text: `¿Cómo se dice <b style="color:var(--accent)">${esc(item.es)}</b> en inglés?`,
        options: shuffle([item.en, ...others.map(o => o.en)]),
        answer: item.en,
      });
    } else {
      qs.push({
        type: 'mc', emoji: '🎧', say: item.en,
        text: 'Escucha con atención… ¿qué palabra es?',
        options: shuffle([item.en, ...others.map(o => o.en)]),
        answer: item.en,
      });
    }
  }
  return qs;
}

function startEnglishQuiz(idx) {
  const u = ENGLISH_UNITS[idx];
  startQuiz({
    qs: buildEnglishQuestions(u),
    onBack: () => showEnglishUnit(idx),
    onDone: (score, total, passed) => {
      const st = S.english[u.id] || { best: 0, done: false };
      st.best = Math.max(st.best || 0, score);
      const firstTime = passed && !st.done;
      if (passed) st.done = true;
      S.english[u.id] = st;
      save();
      if (firstTime) {
        addXP(50);
        const slot = $('#reward-slot');
        if (slot) slot.innerHTML = `
          <div class="reward-banner">
            <span class="r-emoji">🥚 → ${u.dino}</span>
            ¡Tu huevo eclosionó! Nuevo dino en tu colección.
          </div>`;
      }
    },
  });
}
