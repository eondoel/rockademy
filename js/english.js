'use strict';
/* ===== Mundo Inglés: Isla Jurásica 🦖 =====
   Inglés desde cero: tarjetas con audio + misiones (quiz).
   Cada unidad completada hace eclosionar un dino. */

const ENGLISH_UNITS = [
  {
    id: 'saludos', title: 'Saludos', emoji: '👋', dinoImg: 'triceratops', img: 'mrdna',
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
    id: 'numeros', title: 'Números', emoji: '🔢', dinoImg: 'mosasaurus', img: 'vbucks',
    desc: 'One, two, three… ¡a contar V-monedas!',
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
    id: 'colores', title: 'Colores', emoji: '🎨', dinoImg: 'dilophosaurus', img: 'peely',
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
    id: 'criaturas', title: 'Criaturas', emoji: '🐾', dinoImg: 'spinosaurus', img: 'raptor',
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
    id: 'familia', title: 'La familia', emoji: '👨‍👩‍👦', dinoImg: 'brachiosaurus', img: 'malcolm',
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
    id: 'comida', title: 'Comida', emoji: '🍕', dinoImg: 'trex', img: 'mc_cake',
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
    id: 'acciones', title: 'Acciones gamer', emoji: '🎮', dinoImg: 'blue', img: 'llama',
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
    id: 'frases', title: 'Frases de batalla', emoji: '⚡', dinoImg: 'pteranodon', img: 'goku',
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
  {
    id: 'adjetivos', title: 'Adjetivos épicos', emoji: '💪', dinoImg: 'stegosaurus', img: 'vegeta',
    desc: 'Describe a tus personajes',
    items: [
      { en: 'big', es: 'grande', e: '🐘' },
      { en: 'small', es: 'pequeño', e: '🐜' },
      { en: 'fast', es: 'rápido', e: '⚡' },
      { en: 'slow', es: 'lento', e: '🐌' },
      { en: 'strong', es: 'fuerte', e: '💪' },
      { en: 'weak', es: 'débil', e: '🥀' },
      { en: 'easy', es: 'fácil', e: '👌' },
      { en: 'hard', es: 'difícil', e: '🧗' },
      { en: 'new', es: 'nuevo', e: '✨' },
      { en: 'old', es: 'viejo', e: '🏚️' },
      { en: 'happy', es: 'feliz', e: '😄' },
      { en: 'angry', es: 'enojado', e: '😠' },
    ],
  },
  {
    id: 'lugares', title: 'Lugares del mapa', emoji: '🗺️', dinoImg: 'ankylosaurus', img: 'battlebus',
    desc: 'Explora el mundo en inglés',
    items: [
      { en: 'house', es: 'casa', e: '🏠' },
      { en: 'school', es: 'escuela', e: '🏫' },
      { en: 'city', es: 'ciudad', e: '🌆' },
      { en: 'beach', es: 'playa', e: '🏖️' },
      { en: 'mountain', es: 'montaña', e: '⛰️' },
      { en: 'river', es: 'río', e: '🏞️' },
      { en: 'forest', es: 'bosque', e: '🌲' },
      { en: 'island', es: 'isla', e: '🏝️' },
      { en: 'cave', es: 'cueva', e: '🕳️' },
      { en: 'castle', es: 'castillo', e: '🏰' },
    ],
  },
  {
    id: 'preguntas', title: 'Preguntas mágicas', emoji: '❓', dinoImg: 'compy', img: 'enderman',
    desc: 'What, where, who… pregunta todo',
    items: [
      { en: 'what', es: 'qué', e: '❓' },
      { en: 'where', es: 'dónde', e: '🗺️' },
      { en: 'who', es: 'quién', e: '👤' },
      { en: 'when', es: 'cuándo', e: '⏰' },
      { en: 'why', es: 'por qué', e: '🤔' },
      { en: 'how', es: 'cómo', e: '🛠️' },
      { en: 'how many', es: 'cuántos', e: '🔢' },
      { en: 'what is this', es: 'qué es esto', e: '👀' },
      { en: 'where is the dragon', es: 'dónde está el dragón', e: '🐉' },
      { en: 'who are you', es: 'quién eres tú', e: '🪪' },
    ],
  },
  {
    id: 'oraciones', title: 'Oraciones completas', emoji: '🗣️', dinoImg: 'indominus', img: 'llama',
    desc: 'Tu primer nivel de conversación',
    items: [
      { en: 'I play Minecraft', es: 'yo juego Minecraft', e: '🎮' },
      { en: 'he runs fast', es: 'él corre rápido', e: '🏃' },
      { en: 'she is my sister', es: 'ella es mi hermana', e: '👧' },
      { en: 'we are friends', es: 'somos amigos', e: '🤝' },
      { en: 'I can fly', es: 'yo puedo volar', e: '🛸' },
      { en: 'I have ten diamonds', es: 'tengo diez diamantes', e: '💎' },
      { en: 'do you like pizza', es: 'te gusta la pizza', e: '🍕' },
      { en: 'the dragon is very strong', es: 'el dragón es muy fuerte', e: '🐉' },
      { en: "let's build a house", es: 'construyamos una casa', e: '🏠' },
      { en: 'good luck, have fun', es: 'buena suerte, diviértete', e: '🍀' },
    ],
  },
];

/* Imagen "motivadora" por palabra (cuando existe en el catálogo) */
const WORD_IMG = {
  // saludos
  'hello': 'mrdna', 'friend': 'peely', 'my name is': 'steve',
  // números
  'ten': 'diamond', 'twenty': 'emerald', 'one hundred': 'vbucks',
  // colores
  'red': 'mc_apple', 'green': 'creeper', 'yellow': 'peely', 'black': 'enderman',
  'white': 'skeleton', 'purple': 'boogie', 'pink': 'pig', 'brown': 'horse', 'orange': 'esfera_bola', 'blue': 'diamond',
  // criaturas
  'dinosaur': 'trex', 'dragon': 'shenron', 'wolf': 'wolf', 'spider': 'spider',
  'snake': 'dilophosaurus', 'horse': 'horse', 'chicken': 'mc_chicken', 'cow': 'cow', 'pig': 'pig',
  // familia
  'family': 'malcolm', 'mother': 'lois', 'father': 'hal', 'brother': 'reese',
  'boy': 'dewey', 'grandpa': 'roshi',
  // comida
  'apple': 'mc_apple', 'bread': 'mc_bread', 'water': 'mc_water', 'milk': 'mc_milk',
  'egg': 'mc_egg', 'cake': 'mc_cake', 'cookie': 'mc_cookie',
  // acciones
  'run': 'blue', 'mine': 'pickaxe', 'build': 'grass', 'dance': 'boogie',
  'fight': 'vegeta', 'fly': 'pteranodon', 'win': 'gold', 'lose': 'zombie', 'eat': 'mc_cake',
  // frases
  "let's go": 'battlebus', 'help': 'creeper', 'I have': 'chest', 'I want': 'diamond',
  'I am ready': 'goku', 'I am hungry': 'mc_bread',
  // adjetivos
  'big': 'brachiosaurus', 'small': 'compy', 'fast': 'blue', 'slow': 'mosasaurus',
  'strong': 'vegeta', 'weak': 'skeleton', 'old': 'roshi', 'happy': 'peely', 'angry': 'indominus',
  // lugares
  'house': 'mc_bed', 'island': 'mosasaurus', 'cave': 'spider', 'forest': 'wolf', 'river': 'mc_water',
  // preguntas
  'what is this': 'mrdna', 'where is the dragon': 'shenron', 'who are you': 'enderman',
  // oraciones
  'I play Minecraft': 'steve', 'he runs fast': 'blue', 'she is my sister': 'lois',
  'we are friends': 'peely', 'I can fly': 'pteranodon', 'I have ten diamonds': 'diamond',
  'do you like pizza': 'reese', 'the dragon is very strong': 'shenron',
  "let's build a house": 'grass', 'good luck, have fun': 'battlebus',
};


/* ================= LECCIONES Y EXAMEN =================
   Cada unidad: 3 lecciones (palabras nuevas + 10 ejercicios variados)
   y un examen final que hace nacer al dino. */

const ENGLISH_SUBS = 3;

function chunkItems(items) {
  const per = Math.ceil(items.length / ENGLISH_SUBS);
  return [items.slice(0, per), items.slice(per, per * 2), items.slice(per * 2)];
}

/* --- fábrica de ejercicios (intercalado + variedad) --- */
function exTrad(item, pool) {
  const others = shuffle(pool.filter(x => x.en !== item.en)).slice(0, 3);
  return {
    type: 'mc', emoji: item.e, img: WORD_IMG[item.en] || motivador(), say: item.en,
    text: `¿Qué significa <b style="color:var(--teal)">${esc(item.en)}</b>?`,
    options: shuffle([item.es, ...others.map(o => o.es)]),
    answer: item.es,
  };
}
function exRev(item, pool) {
  const others = shuffle(pool.filter(x => x.en !== item.en)).slice(0, 3);
  return {
    type: 'mc', emoji: item.e, img: WORD_IMG[item.en] || motivador(),
    text: `¿Cómo se dice <b style="color:var(--accent)">${esc(item.es)}</b> en inglés?`,
    options: shuffle([item.en, ...others.map(o => o.en)]),
    answer: item.en,
  };
}
function exListen(item, pool, fallbackImg) {
  const others = shuffle(pool.filter(x => x.en !== item.en)).slice(0, 3);
  return {
    type: 'mc', emoji: '🎧', img: fallbackImg, say: item.en,
    text: 'Escucha con atención… ¿qué dice?',
    options: shuffle([item.en, ...others.map(o => o.en)]),
    answer: item.en,
  };
}
function exSpellEn(item) {
  return { type: 'spell', es: item.es, emoji: item.e, img: WORD_IMG[item.en], word: item.en };
}
function exTFEn(item, pool) {
  const isTrue = Math.random() < 0.5;
  const shown = isTrue ? item.es : pick(pool.filter(x => x.en !== item.en)).es;
  return tfQ(`“<b>${esc(item.en)}</b>” significa “<b>${esc(shown)}</b>”`, isTrue,
    { say: item.en, img: WORD_IMG[item.en] || motivador(), note: `“${item.en}” = “${item.es}”` });
}
function exPickImgEn(item, pool) {
  const withImg = pool.filter(x => WORD_IMG[x.en] && x.en !== item.en);
  if (!WORD_IMG[item.en] || withImg.length < 3) return null;
  const others = shuffle(withImg).slice(0, 3);
  return {
    type: 'pickimg', say: item.en,
    text: `👆 Toca la imagen de <b style="color:var(--teal)">${esc(item.en)}</b>`,
    options: shuffle([WORD_IMG[item.en], ...others.map(o => WORD_IMG[o.en])]),
    answer: WORD_IMG[item.en],
  };
}
function exOrderEn(item) {
  const words = item.en.split(' ');
  if (words.length < 3) return null;
  return {
    type: 'order', emoji: item.e, img: WORD_IMG[item.en], say: item.en,
    text: `Ordena la frase en inglés:<br>“<b style="color:var(--accent)">${esc(item.es)}</b>”`,
    tokens: words,
  };
}
function exMatchEn(items) {
  return { type: 'match', text: '🔗 Une cada palabra con su significado', pairs: items.map(it => [it.en, it.es]) };
}

function englishExercise(item, pool, unitImg) {
  const makers = [() => exTrad(item, pool), () => exRev(item, pool), () => exListen(item, pool, unitImg)];
  if (/^[a-z]{3,8}$/.test(item.en)) makers.push(() => exSpellEn(item));
  makers.push(() => exTFEn(item, pool));
  const pi = exPickImgEn(item, pool);
  if (pi) makers.push(() => pi);
  const or = exOrderEn(item);
  if (or) makers.push(() => or);
  return pick(makers)();
}

function buildEnglishLesson(u, subIdx) {
  const groups = chunkItems(u.items);
  const focus = groups[subIdx];
  const review = groups.slice(0, subIdx).flat();
  const qs = [];
  // presentación de palabras nuevas (segmentación: una por pantalla)
  focus.forEach(item => qs.push({
    type: 'info', img: WORD_IMG[item.en], emoji: item.e, say: item.en,
    text: `Palabra nueva:<br><span style="font-size:1.8rem;color:var(--teal);font-weight:900">${esc(item.en)}</span><br>= <b>${esc(item.es)}</b><br><span class="muted" style="font-size:.85rem">🔊 Escúchala y repítela en voz alta</span>`,
  }));
  // 9 ejercicios: enfoque en palabras nuevas + 2 de repaso (intercalado)
  const targets = [];
  const cyc = shuffle(focus);
  for (let n = 0; n < (review.length ? 7 : 9); n++) targets.push(cyc[n % cyc.length]);
  if (review.length) { targets.push(pick(review), pick(review)); }
  const exs = shuffle(targets).map(t => englishExercise(t, u.items, u.img));
  // 1 unir-parejas con las palabras del grupo
  const matchPool = shuffle(focus.concat(review)).slice(0, 4);
  exs.splice(ri(2, exs.length), 0, exMatchEn(matchPool));
  return qs.concat(exs);
}

function buildEnglishExam(u) {
  const all = shuffle(u.items);
  const qs = [];
  qs.push(exMatchEn(shuffle(u.items).slice(0, 4)));
  const multi = u.items.filter(x => x.en.split(' ').length >= 3);
  if (multi.length) qs.push(exOrderEn(pick(multi)));
  let n = 0;
  while (qs.length < 12) {
    qs.push(englishExercise(all[n % all.length], u.items, u.img));
    n++;
  }
  return shuffle(qs);
}

/* --- progreso y pantallas --- */
function englishProgress() {
  const done = ENGLISH_UNITS.filter(u => unitState(S.english, u.id).examDone).length;
  return { done, total: ENGLISH_UNITS.length };
}

function showEnglishHome() {
  const app = $('#app');
  const p = englishProgress();
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">🦖 Isla Jurásica: Inglés</h1>
    <p class="screen-sub">3 lecciones por unidad y un examen final. Aprueba el examen y nace tu dino.</p>
    ${imgTag('trex', 'scene-banner contain', 'T-Rex de Jurassic Park')}
    <div class="collection">
      <span class="c-label">🥚 TU COLECCIÓN DE DINOS (${p.done}/${p.total}) — los oscuros aún no nacen</span>
      ${ENGLISH_UNITS.map(u => {
        const done = unitState(S.english, u.id).examDone;
        return `<span class="c-item" title="${esc(u.title)}">${imgTag(u.dinoImg, 'status-img' + (done ? '' : ' pending'), u.title)}</span>`;
      }).join('')}
    </div>
    <div class="spacer"></div>
    ${ENGLISH_UNITS.map((u, idx) => {
      const st = unitState(S.english, u.id);
      const subsOk = [0, 1, 2].filter(i => subIsDone(st, i)).length;
      return `
        <button class="item-card" data-unit="${idx}">
          ${imgTag(u.img, 'item-img', u.title)}
          <span class="item-body">
            <span class="item-title">Unidad ${idx + 1}: ${esc(u.title)}</span>
            <span class="item-sub">${st.examDone ? '✅ Examen aprobado' : `📖 ${subsOk}/3 lecciones${allSubsDone(st, 3) ? ' · ¡examen listo!' : ''}`}</span>
          </span>
          <span class="item-status">${imgTag(u.dinoImg, 'status-img' + (st.examDone ? '' : ' pending'), 'dino')}</span>
        </button>`;
    }).join('')}
  `;
  $('#back').addEventListener('click', showHome);
  app.querySelectorAll('[data-unit]').forEach(b =>
    b.addEventListener('click', () => showEnglishUnit(+b.dataset.unit)));
}

function showEnglishUnit(idx) {
  const u = ENGLISH_UNITS[idx];
  const st = unitState(S.english, u.id);
  const groups = chunkItems(u.items);
  const examReady = allSubsDone(st, 3);
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Isla Jurásica</button>
    <h1 class="screen-title">Unidad ${idx + 1}: ${esc(u.title)}</h1>
    <p class="screen-sub">${esc(u.desc)} · ${u.items.length} palabras en 3 lecciones</p>
    ${groups.map((g, i) => {
      const done = subIsDone(st, i);
      const locked = i > 0 && !subIsDone(st, i - 1) && !done;
      return `
        <button class="item-card" data-sub="${i}" ${locked ? 'disabled' : ''}>
          <span class="item-emoji">${locked ? '🔒' : (done ? '✅' : '📖')}</span>
          <span class="item-body">
            <span class="item-title">Lección ${i + 1}</span>
            <span class="item-sub">${g.map(x => esc(x.en)).join(' · ')}</span>
          </span>
          <span class="item-status">${done ? '⭐' : (locked ? '' : '▶️')}</span>
        </button>`;
    }).join('')}
    <button class="item-card exam-card" id="go-exam" ${examReady ? '' : 'disabled'}>
      ${imgTag(u.dinoImg, 'item-img', 'dino')}
      <span class="item-body">
        <span class="item-title">🏆 EXAMEN FINAL</span>
        <span class="item-sub">${examReady
          ? (st.examDone ? `Aprobado · Mejor: ${st.examBest}/12 · Intentos: ${st.examTries}` : `12 retos de todo lo aprendido${st.examTries ? ` · Intentos: ${st.examTries}` : ''}`)
          : 'Completa las 3 lecciones para desbloquearlo'}</span>
      </span>
      <span class="item-status">${st.examDone ? '🏆' : (examReady ? '🔥' : '🔒')}</span>
    </button>
    <div class="btn-row" style="justify-content:center">
      <button class="btn small secondary" id="go-cards">🃏 Repasar tarjetas con audio</button>
    </div>
  `;
  $('#back').addEventListener('click', showEnglishHome);
  app.querySelectorAll('[data-sub]').forEach(b =>
    b.addEventListener('click', () => startEnglishLesson(idx, +b.dataset.sub)));
  $('#go-exam').addEventListener('click', () => startEnglishExam(idx));
  $('#go-cards').addEventListener('click', () => showFlashcards(idx));
}

function startEnglishLesson(idx, subIdx) {
  const u = ENGLISH_UNITS[idx];
  startQuiz({
    qs: buildEnglishLesson(u, subIdx),
    onBack: () => showEnglishUnit(idx),
    onDone: (score, total, passed) => {
      if (passed) {
        const st = unitState(S.english, u.id);
        st.subDone[subIdx] = true;
        save();
        const slot = $('#reward-slot');
        if (slot && allSubsDone(st, 3) && !st.examDone) {
          slot.innerHTML = `<div class="reward-banner">🔥 ¡Las 3 lecciones dominadas! El EXAMEN FINAL te espera para liberar a tu dino.</div>`;
        }
      }
    },
  });
}

function startEnglishExam(idx) {
  const u = ENGLISH_UNITS[idx];
  const st = unitState(S.english, u.id);
  st.examTries++;
  save();
  startQuiz({
    qs: buildEnglishExam(u),
    isExam: true,
    onBack: () => showEnglishUnit(idx),
    onDone: (score, total, passed) => {
      st.examBest = Math.max(st.examBest || 0, score);
      const firstTime = passed && !st.examDone;
      if (passed) st.examDone = true;
      save();
      if (firstTime) {
        addXP(50);
        const slot = $('#reward-slot');
        if (slot) slot.innerHTML = `
          <div class="reward-banner">
            ${imgTag(u.dinoImg, 'r-img', 'dino nuevo')}
            ¡Tu huevo eclosionó! Nuevo dino en tu colección. 🥚✨
          </div>`;
        checkCoupons();
      }
    },
  });
}

/* --- tarjetas de repaso --- */
function showFlashcards(idx) {
  const u = ENGLISH_UNITS[idx];
  let i = 0;
  const app = $('#app');
  function draw() {
    const item = u.items[i];
    const wimg = WORD_IMG[item.en];
    app.innerHTML = `
      <button class="back-link" id="back">← Unidad ${idx + 1}</button>
      <div class="flash">
        ${wimg ? imgTag(wimg, 'q-img') : `<div class="f-emoji">${item.e}</div>`}
        <div class="f-en">${esc(item.en)}</div>
        <div class="f-es">${esc(item.es)}</div>
        <button class="q-say" id="f-say" title="Escuchar">🔊</button>
      </div>
      <div class="flash-nav">
        <button class="btn secondary" id="f-prev" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
        <span class="flash-count">${i + 1} / ${u.items.length}</span>
        ${i < u.items.length - 1
          ? `<button class="btn green" id="f-next">Siguiente →</button>`
          : `<button class="btn" id="f-end">¡Listo! 🎯</button>`}
      </div>
      <p class="center muted" style="margin-top:14px">💡 Escucha, repite en voz alta y pasa a la siguiente.</p>
    `;
    $('#back').addEventListener('click', () => showEnglishUnit(idx));
    $('#f-say').addEventListener('click', () => sayEN(item.en));
    const prev = $('#f-prev'); if (prev) prev.addEventListener('click', () => { i--; draw(); });
    const next = $('#f-next'); if (next) next.addEventListener('click', () => { i++; draw(); });
    const end = $('#f-end'); if (end) end.addEventListener('click', () => showEnglishUnit(idx));
    setTimeout(() => sayEN(item.en), 300);
  }
  draw();
}
