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

/* ================= GRAMÁTICA: "La Fuerza del Inglés" 🌌 =================
   Gramática y construcción de oraciones con generadores (variedad infinita).
   Cada unidad dominada gana un aliado Jedi. Tema Star Wars. */

function gmc(text, answer, wrong, extra) {
  const opts = [answer];
  for (const w of wrong) { if (opts.length >= 4) break; if (!opts.includes(w)) opts.push(w); }
  return Object.assign({ type: 'mc', text, answer, options: shuffle(opts) }, extra || {});
}
function gorder(tokens, es, img, sayArr) {
  return { type: 'order', img: img || motivador(), say: (sayArr || tokens).join(' '),
    text: `Ordena en inglés:<br>“<b style="color:var(--accent)">${esc(es)}</b>”`, tokens };
}

/* --- 1. Pronombres --- */
const G_PRON1 = [
  ['Mario', 'He', 'mario'], ['Luigi', 'He', 'luigi'], ['Goku', 'He', 'goku'], ['Yoda', 'He', 'yoda'],
  ['Anakin', 'He', 'anakin'], ['Steve', 'He', 'steve'], ['Luffy', 'He', 'luffy'], ['Bowser', 'He', 'bowser'],
  ['Peach', 'She', 'peach'], ['Padmé', 'She', 'padme'], ['Lois', 'She', 'lois'], ['Bulma', 'She', 'bulma'],
  ['The dragon', 'It', 'shenron'], ['The creeper', 'It', 'creeper'], ['The diamond', 'It', 'diamond'],
  ['The dog', 'It', 'wolf'], ['The star', 'It', 'estrella'],
];
const G_PRON2 = [
  ['Mario and Luigi', 'They', 'luigi'], ['Goku and Vegeta', 'They', 'goku'], ['The Goombas', 'They', 'goomba'],
  ['Zoro and Luffy', 'They', 'luffy'], ['Anakin and Padmé', 'They', 'padme'], ['The dinosaurs', 'They', 'trex'],
  ['Woody and Buzz', 'They', 'woody'], ['You and I', 'We', 'peely'], ['My friends and I', 'We', 'peely'],
  ['Steve and I', 'We', 'steve'], ['Mario and I', 'We', 'mario'],
];
function genPronSingle() {
  const [ph, pr, img] = pick(G_PRON1);
  const v = pick(['is strong', 'runs fast', 'is here', 'is my friend', 'jumps high']);
  return gmc(`Cambia el nombre por su pronombre:<br><b>${ph}</b> ${v}. → ___ ${v}.`, pr,
    ['He', 'She', 'It', 'They'].filter(x => x !== pr), { img, note: `${ph} → ${pr}` });
}
function genPronGroup() {
  const [ph, pr, img] = pick(G_PRON2);
  const v = pick(['are strong', 'run fast', 'are here', 'are ready', 'play together']);
  return gmc(`Cambia por su pronombre:<br><b>${ph}</b> ${v}. → ___ ${v}.`, pr,
    ['We', 'They', 'He', 'She'].filter(x => x !== pr), { img, note: `${ph} → ${pr}` });
}
function genPronMix() {
  if (Math.random() < 0.4) return pick([
    gorder(['She', 'is', 'fast'], 'Ella es rápida', 'peach'),
    gorder(['He', 'is', 'strong'], 'Él es fuerte', 'goku'),
    gorder(['They', 'are', 'here'], 'Ellos están aquí', 'goomba'),
    gorder(['We', 'are', 'friends'], 'Nosotros somos amigos', 'peely'),
    gorder(['It', 'is', 'big'], 'Eso es grande', 'shenron'),
  ]);
  return Math.random() < 0.5 ? genPronSingle() : genPronGroup();
}

/* --- 2. Verbo TO BE --- */
const G_BE = [
  ['I', 'am', null], ['You', 'are', null], ['He', 'is', null], ['She', 'is', null], ['It', 'is', 'shenron'],
  ['We', 'are', null], ['They', 'are', 'goomba'], ['Mario', 'is', 'mario'], ['Peach', 'is', 'peach'],
  ['Mario and Luigi', 'are', 'luigi'], ['The dragon', 'is', 'shenron'], ['The dinosaurs', 'are', 'trex'],
  ['Goku', 'is', 'goku'], ['You and I', 'are', null],
];
function genBeFill() {
  const [subj, be, img] = pick(G_BE);
  const comp = pick(['a hero', 'ready', 'strong', 'here', 'my friend', 'fast']);
  return gmc(`Completa con el verbo <b>to be</b> (am/is/are):<br><b>${subj}</b> ___ ${comp}.`, be,
    ['am', 'is', 'are'].filter(x => x !== be), { note: `${subj} → ${be}`, img: img || motivador() });
}
const G_BE_NEG = [['I', 'am'], ['You', 'are'], ['He', 'is'], ['She', 'is'], ['We', 'are'], ['They', 'are'], ['Mario', 'is'], ['Goku', 'is'], ['The dragon', 'is']];
function genBeNeg() {
  if (Math.random() < 0.7) {
    const [subj, be] = pick(G_BE_NEG);
    const comp = pick(['ready', 'here', 'tired', 'afraid', 'alone', 'sad', 'my enemy']);
    return gmc(`Para negar, agrega <b>not</b>:<br><b>${subj} ${be}</b> ___ ${comp}.`, 'not',
      ['no', "don't", 'never', 'nothing'], { note: `${subj} ${be} not ${comp}` });
  }
  return pick([
    gmc('La forma corta de "is not" es…', "isn't", ["amn't", "aren't", 'not is']),
    gmc('La forma corta de "are not" es…', "aren't", ["isn't", 'not are', "am'nt"]),
    gmc('"I am NOT a robot" significa…', 'Yo NO soy un robot', ['Yo soy un robot', 'Tú eres un robot', 'Yo era un robot'], { img: 'r2d2' }),
    gmc('"You are not alone" significa…', 'No estás solo', ['Estás solo', 'Estamos solos', 'No estoy solo']),
  ]);
}
function genBeMix() {
  const r = Math.random();
  if (r < 0.35) return pick([
    gorder(['Are', 'you', 'ready'], '¿Estás listo?', 'goku'),
    gorder(['Is', 'he', 'strong'], '¿Es él fuerte?', 'vegeta'),
    gorder(['I', 'am', 'a', 'warrior'], 'Yo soy un guerrero', 'anakin'),
    gorder(['We', 'are', 'friends'], 'Somos amigos', 'peely'),
  ]);
  if (r < 0.6) return pick([
    tfQ('"Are you ready?" es una PREGUNTA', true, { img: 'goku' }),
    tfQ('"He is" se puede acortar a "He’s"', true),
    tfQ('Para "I" se usa "is" (I is)', false, { note: 'Lo correcto: I am' }),
    tfQ('Para preguntar, el verbo to be va ANTES del sujeto: "Is he…?"', true),
  ]);
  return genBeFill();
}

/* --- 3. Artículos y plurales --- */
const G_AN = [
  ['apple', 'an', 'mc_apple'], ['egg', 'an', 'mc_egg'], ['orange', 'an', 'esfera_bola'], ['island', 'an', 'mosasaurus'],
  ['umbrella', 'an', null], ['hour', 'an', null], ['elephant', 'an', null],
  ['dragon', 'a', 'shenron'], ['house', 'a', 'mc_bed'], ['cookie', 'a', 'mc_cookie'], ['star', 'a', 'estrella'],
  ['dog', 'a', 'wolf'], ['ball', 'a', null], ['banana', 'a', null], ['castle', 'a', 'mc_bed'], ['sword', 'a', 'zoro'],
];
function genArticle() {
  const [w, art, img] = pick(G_AN);
  return gmc(`¿"a" o "an"?<br>___ <b>${w}</b>`, art, [art === 'a' ? 'an' : 'a'],
    { img: img || motivador(), note: `"an" va antes de sonido de vocal (a,e,i,o,u). ${w} → ${art} ${w}` });
}
const G_PL = [
  ['cat', 'cats'], ['dog', 'dogs'], ['book', 'books'], ['star', 'stars'], ['friend', 'friends'], ['diamond', 'diamonds'],
  ['box', 'boxes'], ['fox', 'foxes'], ['glass', 'glasses'], ['watch', 'watches'], ['brush', 'brushes'], ['dish', 'dishes'],
  ['baby', 'babies'], ['city', 'cities'], ['story', 'stories'], ['enemy', 'enemies'], ['candy', 'candies'],
];
function genPlural() {
  const [s, p] = pick(G_PL);
  const cand = [s + 's', s + 'es', s.replace(/y$/, 'ies'), s.slice(0, -1) + 'ies', s];
  const wrong = [];
  for (const c of cand) { if (c !== p && !wrong.includes(c) && wrong.length < 3) wrong.push(c); }
  return gmc(`¿Cuál es el plural de <b>${s}</b>?`, p, wrong,
    { note: '+s normal · +es tras s,x,ch,sh · y→ies' });
}
function genMixAP() {
  const r = Math.random();
  if (r < 0.4) return genArticle();
  if (r < 0.75) return genPlural();
  return pick([
    gmc('Usa "the" para algo ESPECÍFICO o único:<br>"___ sun is hot." (el sol)', 'The', ['A', 'An'], { note: 'El sol es único → the' }),
    tfQ('"an apple" es correcto', true, { img: 'mc_apple' }),
    tfQ('El plural de "box" es "boxs"', false, { note: 'box → boxes' }),
    tfQ('El plural de "baby" es "babies"', true),
  ]);
}

/* --- 4. Presente simple --- */
function genVerbS() {
  const thirdSubs = [['He', null], ['She', null], ['It', 'shenron'], ['Mario', 'mario'], ['Goku', 'goku'], ['Peach', 'peach'], ['Steve', 'steve']];
  const plainSubs = [['I', null], ['You', null], ['We', null], ['They', 'goomba']];
  const useThird = Math.random() < 0.55;
  const [subj, img] = useThird ? pick(thirdSubs) : pick(plainSubs);
  const [base, plus] = pick([['play', 'plays'], ['run', 'runs'], ['eat', 'eats'], ['jump', 'jumps'], ['like', 'likes'], ['build', 'builds'], ['win', 'wins']]);
  const ans = useThird ? plus : base;
  const wrong = [...new Set([base, plus, base + 'ing', base + 'es'].filter(w => w !== ans))].slice(0, 3);
  return gmc(`Presente simple:<br><b>${subj}</b> ___ every day.`, ans, wrong,
    { img: img || motivador(), note: useThird ? `Con he/she/it se agrega -s → ${plus}` : `Sin -s → ${base}` });
}
function genDont() {
  if (Math.random() < 0.75) {
    const third = Math.random() < 0.5;
    const subj = third ? pick(['He', 'She', 'It', 'Mario', 'Goku', 'Peach']) : pick(['I', 'You', 'We', 'They']);
    const verb = pick(['like', 'play', 'eat', 'want', 'watch', 'have']);
    const obj = pick(['spiders', 'soccer', 'meat', 'to lose', 'TV', 'enemies']);
    const ans = third ? "doesn't" : "don't";
    return gmc(`Niega en presente:<br><b>${subj}</b> ___ ${verb} ${obj}.`, ans,
      [third ? "don't" : "doesn't", 'not', "isn't", 'no'],
      { note: third ? 'he/she/it → doesn’t' : 'I/you/we/they → don’t' });
  }
  return pick([
    gmc('Con he / she / it, la negación usa…', "doesn't", ["don't", 'not', 'no'], { note: 'He/She/It → doesn’t' }),
    tfQ('"I don’t know" significa "No sé"', true),
    tfQ('Con "He" se usa "don’t" (He don’t)', false, { note: 'Lo correcto: He doesn’t' }),
  ]);
}
function genPresentMix() {
  const r = Math.random();
  if (r < 0.4) return pick([
    gorder(['Do', 'you', 'like', 'pizza'], '¿Te gusta la pizza?', 'reese'),
    gorder(['Does', 'he', 'play', 'Minecraft'], '¿Él juega Minecraft?', 'steve'),
    gorder(['I', 'play', 'every', 'day'], 'Yo juego todos los días', 'peely'),
    gorder(['She', 'runs', 'fast'], 'Ella corre rápido', 'peach'),
  ]);
  if (r < 0.65) return pick([
    gmc('Pregunta:<br>"___ you like games?"', 'Do', ['Does', 'Are', 'Is'], { note: 'I/you/we/they → Do' }),
    gmc('Pregunta:<br>"___ she play?"', 'Does', ['Do', 'Is', 'Are'], { img: 'peach', note: 'he/she/it → Does' }),
  ]);
  return Math.random() < 0.5 ? genVerbS() : genDont();
}

/* --- 5. Construye oraciones --- */
const G_SENT_SHORT = [
  [['I', 'have', 'a', 'sword'], 'Yo tengo una espada', 'zoro'],
  [['He', 'is', 'my', 'friend'], 'Él es mi amigo', 'peely'],
  [['We', 'play', 'together'], 'Jugamos juntos', 'steve'],
  [['She', 'has', 'a', 'car'], 'Ella tiene un carro', 'mcqueen'],
  [['They', 'are', 'strong'], 'Ellos son fuertes', 'trex'],
  [['I', 'want', 'to', 'win'], 'Quiero ganar', 'goku'],
  [['You', 'are', 'my', 'friend'], 'Tú eres mi amigo', 'peely'],
  [['I', 'like', 'pizza'], 'Me gusta la pizza', 'reese'],
  [['He', 'can', 'fly'], 'Él puede volar', 'pteranodon'],
  [['We', 'are', 'ready'], 'Estamos listos', 'goku'],
  [['She', 'is', 'happy'], 'Ella está feliz', 'peach'],
  [['They', 'have', 'gold'], 'Ellos tienen oro', 'gold'],
];
const G_SENT_LONG = [
  [['I', 'have', 'three', 'diamonds'], 'Yo tengo tres diamantes', 'diamond'],
  [['He', 'is', 'my', 'best', 'friend'], 'Él es mi mejor amigo', 'peely'],
  [['We', 'play', 'Minecraft', 'together'], 'Jugamos Minecraft juntos', 'steve'],
  [['The', 'dragon', 'is', 'very', 'strong'], 'El dragón es muy fuerte', 'shenron'],
  [['She', 'has', 'a', 'red', 'car'], 'Ella tiene un carro rojo', 'mcqueen'],
  [['They', 'are', 'my', 'family'], 'Ellos son mi familia', 'malcolm'],
];
const G_TRANS = [
  ['I am hungry', 'Tengo hambre', ['Estoy cansado', 'Tengo sed', 'Soy fuerte'], 'mc_bread'],
  ['He is fast', 'Él es rápido', ['Ella es rápida', 'Él es lento', 'Yo soy rápido'], 'blue'],
  ['We are friends', 'Somos amigos', ['Soy tu amigo', 'Ellos son amigos', 'Tú eres mi amigo'], 'peely'],
  ['She has a sword', 'Ella tiene una espada', ['Él tiene una espada', 'Ella quiere una espada', 'Ella es una espada'], 'zoro'],
  ['They like pizza', 'A ellos les gusta la pizza', ['Me gusta la pizza', 'A él le gusta la pizza', 'Ellos hacen pizza'], 'reese'],
  ['I can fly', 'Yo puedo volar', ['Yo quiero volar', 'Tú puedes volar', 'Yo vuelo'], 'pteranodon'],
];
const G_Q = [
  [['Where', 'are', 'you'], '¿Dónde estás?', null],
  [['What', 'is', 'your', 'name'], '¿Cuál es tu nombre?', null],
  [['I', 'do', 'not', 'like', 'it'], 'No me gusta', null],
  [['Do', 'you', 'want', 'to', 'play'], '¿Quieres jugar?', 'peely'],
  [['He', 'does', 'not', 'run'], 'Él no corre', null],
  [['Are', 'they', 'your', 'friends'], '¿Son ellos tus amigos?', null],
];
function genOrderSimple() { const [t, es, img] = pick(G_SENT_SHORT); return gorder(t, es, img); }
function genTranslateSentence() {
  const [en, es, wrong, img] = pick(G_TRANS);
  if (Math.random() < 0.5) return gmc(`¿Qué significa?<br><b>${en}</b>`, es, wrong, { img, say: en });
  return gorder(en.split(' '), es, img);
}
function genOrderLong() {
  if (Math.random() < 0.5) { const [t, es, img] = pick(G_SENT_LONG); return gorder(t, es, img); }
  const [t, es, img] = pick(G_Q); return gorder(t, es, img);
}

const GRAMMAR_UNITS = [
  {
    id: 'g_pron', title: 'Pronombres', emoji: '👤', img: 'mario', ally: 'r2d2',
    desc: 'I, you, he, she, we, they',
    subs: [
      { t: 'Una persona o cosa', gen: genPronSingle, intro: [
        { text: 'Los <b>PRONOMBRES</b> reemplazan nombres. En vez de repetir "Mario, Mario, Mario", dices <b>he</b> (él). 🏎️', img: 'mario' },
        { text: '<b>I</b> = yo · <b>you</b> = tú<br><b>he</b> = él · <b>she</b> = ella · <b>it</b> = eso (cosas y animales)', img: 'r2d2' },
      ] },
      { t: 'Grupos: we, they', gen: genPronGroup, intro: [
        { text: 'Para grupos:<br><b>we</b> = nosotros<br><b>they</b> = ellos / ellas', img: 'goomba' },
      ] },
      { t: 'Combo de pronombres', gen: genPronMix, intro: [
        { text: 'Truco: ¿de quién hablas?<br>Una persona → he / she<br>Una cosa → it<br>Un grupo → we / they', img: 'yoda' },
      ] },
    ],
  },
  {
    id: 'g_tobe', title: 'El verbo To Be', emoji: '⚡', img: 'yoda', ally: 'yoda',
    desc: 'am, is, are (ser y estar)',
    subs: [
      { t: 'am / is / are', gen: genBeFill, intro: [
        { text: 'El verbo <b>to be</b> = ser/estar. Cambia según el sujeto:<br><b>I am</b> · <b>he/she/it is</b> · <b>you/we/they are</b>', img: 'yoda' },
        { text: 'Ejemplos:<br>I <b>am</b> a warrior 💪<br>Mario <b>is</b> Italian<br>We <b>are</b> friends', img: 'mario' },
      ] },
      { t: 'Negar con to be', gen: genBeNeg, intro: [
        { text: 'Para negar, agrega <b>not</b>:<br>I am <b>not</b> · He is <b>not</b> (isn’t) · They are <b>not</b> (aren’t)', img: 'maul' },
      ] },
      { t: 'Preguntas con to be', gen: genBeMix, intro: [
        { text: 'Para preguntar, el verbo va <b>ANTES</b> del sujeto:<br>You are ready → <b>Are</b> you ready?', img: 'goku' },
      ] },
    ],
  },
  {
    id: 'g_art', title: 'Artículos y plurales', emoji: '🔢', img: 'padme', ally: 'padme',
    desc: 'a, an, the y los plurales',
    subs: [
      { t: 'a / an', gen: genArticle, intro: [
        { text: '<b>a</b> y <b>an</b> = un / una.<br>Usa <b>an</b> antes de sonido de vocal:<br><b>an</b> apple 🍎 · <b>a</b> dragon 🐉', img: 'mc_apple' },
      ] },
      { t: 'Plurales', gen: genPlural, intro: [
        { text: 'Plural = más de uno:<br>+s normal (cat→cats)<br>+es tras s,x,ch,sh (box→boxes)<br>y→ies (baby→babies)', img: 'diamond' },
      ] },
      { t: 'the + repaso', gen: genMixAP, intro: [
        { text: '<b>the</b> = el / la / los, para algo ESPECÍFICO o único:<br><b>the</b> sun ☀️ (solo hay uno)', img: 'estrella' },
      ] },
    ],
  },
  {
    id: 'g_present', title: 'Presente simple', emoji: '🏃', img: 'obiwan', ally: 'obiwan',
    desc: 'I play, he plays… (rutinas)',
    subs: [
      { t: 'La regla del -s', gen: genVerbS, intro: [
        { text: 'El presente simple habla de rutinas.<br>Con <b>he/she/it</b> el verbo lleva <b>-s</b>:<br>I play → He <b>plays</b> 🎮', img: 'steve' },
      ] },
      { t: 'Negar: don’t / doesn’t', gen: genDont, intro: [
        { text: 'Para negar:<br>I/you/we/they → <b>don’t</b><br>he/she/it → <b>doesn’t</b><br>"He <b>doesn’t</b> like spiders" 🕷️', img: 'spider' },
      ] },
      { t: 'Preguntar: do / does', gen: genPresentMix, intro: [
        { text: 'Para preguntar:<br><b>Do</b> you like pizza?<br><b>Does</b> she play? (he/she/it → does)', img: 'reese' },
      ] },
    ],
  },
  {
    id: 'g_build', title: 'Construye oraciones', emoji: '🧩', img: 'anakin', ally: 'anakin',
    desc: 'Arma frases completas',
    subs: [
      { t: 'Sujeto + verbo + resto', gen: genOrderSimple, intro: [
        { text: 'El orden en inglés es:<br><b>QUIÉN + QUÉ HACE + RESTO</b><br>I (quién) + have (qué) + a sword (resto) ⚔️', img: 'zoro' },
      ] },
      { t: 'Traduce frases', gen: genTranslateSentence, intro: [
        { text: 'Lee la frase completa y capta la idea, no palabra por palabra. 🧠', img: 'anakin' },
      ] },
      { t: 'Preguntas y frases largas', gen: genOrderLong, intro: [
        { text: 'Reto final: arma preguntas y frases más largas.<br>"Do you want to play?" 🎮', img: 'peely' },
      ] },
    ],
  },
];

function buildGrammarLesson(u, subIdx) {
  const sub = u.subs[subIdx];
  const qs = [];
  (sub.intro || []).forEach(card => qs.push({ type: 'info', img: card.img || u.img, text: card.text }));
  const seen = new Set();
  let guard = 0;
  while (qs.filter(q => q.type !== 'info').length < 9 && guard++ < 140) {
    const q = sub.gen();
    const key = q.text + '|' + (q.tokens ? q.tokens.join() : q.answer);
    if (seen.has(key)) continue;
    seen.add(key);
    qs.push(q);
  }
  return qs;
}
function buildGrammarExam(u) {
  const qs = [];
  const seen = new Set();
  let guard = 0;
  while (qs.length < 12 && guard++ < 240) {
    const q = pick(u.subs).gen();
    const key = q.text + '|' + (q.tokens ? q.tokens.join() : q.answer);
    if (seen.has(key)) continue;
    seen.add(key);
    qs.push(q);
  }
  return shuffle(qs);
}


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

function grammarProgress() {
  const done = GRAMMAR_UNITS.filter(u => unitState(S.grammar, u.id).examDone).length;
  return { done, total: GRAMMAR_UNITS.length };
}

function showEnglishHome() {
  const app = $('#app');
  const p = englishProgress();
  const gp = grammarProgress();
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">🦖 Isla Jurásica: Inglés</h1>
    <p class="screen-sub">Vocabulario (3 lecciones + examen por unidad) y gramática para construir oraciones.</p>
    ${imgTag('trex', 'scene-banner contain', 'T-Rex de Jurassic Park')}
    <button class="world-card english has-hero" id="go-grammar">
      ${imgTag('yoda', 'hero-img', 'Yoda')}
      <h2>📖 La Fuerza del Inglés</h2>
      <p>Gramática y construcción de oraciones: pronombres, verbo to be, plurales, presente simple…</p>
      <div class="progress-note">🌌 ${gp.done}/${gp.total} aliados Jedi</div>
    </button>
    <h2 style="font-size:1.05rem;margin:18px 0 10px">🦕 Vocabulario</h2>
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
  $('#go-grammar').addEventListener('click', showGrammarHome);
  app.querySelectorAll('[data-unit]').forEach(b =>
    b.addEventListener('click', () => showEnglishUnit(+b.dataset.unit)));
}

/* ===== Pantallas de gramática ===== */
function showGrammarHome() {
  const app = $('#app');
  const gp = grammarProgress();
  app.innerHTML = `
    <button class="back-link" id="back">← Isla Jurásica</button>
    <h1 class="screen-title">📖 La Fuerza del Inglés</h1>
    <p class="screen-sub">Gramática y construcción de oraciones. Domina cada unidad y gana un aliado Jedi.</p>
    <div class="collection">
      <span class="c-label">🌌 ALIADOS JEDI (${gp.done}/${gp.total})</span>
      ${GRAMMAR_UNITS.map(u => {
        const done = unitState(S.grammar, u.id).examDone;
        return `<span class="c-item" title="${esc(u.title)}">${imgTag(u.ally, 'status-img' + (done ? '' : ' pending'), u.title)}</span>`;
      }).join('')}
    </div>
    <div class="spacer"></div>
    ${GRAMMAR_UNITS.map((u, idx) => {
      const st = unitState(S.grammar, u.id);
      const subsOk = [0, 1, 2].filter(i => subIsDone(st, i)).length;
      return `
        <button class="item-card" data-gram="${idx}">
          ${imgTag(u.img, 'item-img', u.title)}
          <span class="item-body">
            <span class="item-title">${u.emoji} ${esc(u.title)}</span>
            <span class="item-sub">${st.examDone ? '✅ Examen aprobado' : `${esc(u.desc)} · ${subsOk}/3 lecciones`}</span>
          </span>
          <span class="item-status">${imgTag(u.ally, 'status-img' + (st.examDone ? '' : ' pending'), 'aliado')}</span>
        </button>`;
    }).join('')}
  `;
  $('#back').addEventListener('click', showEnglishHome);
  app.querySelectorAll('[data-gram]').forEach(b =>
    b.addEventListener('click', () => showGrammarUnit(+b.dataset.gram)));
}

function showGrammarUnit(idx) {
  const u = GRAMMAR_UNITS[idx];
  const st = unitState(S.grammar, u.id);
  const examReady = allSubsDone(st, 3);
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← La Fuerza del Inglés</button>
    <h1 class="screen-title">${u.emoji} ${esc(u.title)}</h1>
    <p class="screen-sub">${esc(u.desc)}</p>
    ${u.subs.map((sub, i) => {
      const done = subIsDone(st, i);
      const locked = i > 0 && !subIsDone(st, i - 1) && !done;
      return `
        <button class="item-card" data-sub="${i}" ${locked ? 'disabled' : ''}>
          <span class="item-emoji">${locked ? '🔒' : (done ? '✅' : '📖')}</span>
          <span class="item-body">
            <span class="item-title">Lección ${i + 1}: ${esc(sub.t)}</span>
            <span class="item-sub">Explicación + ejercicios · acierta el 80%</span>
          </span>
          <span class="item-status">${done ? '⭐' : (locked ? '' : '▶️')}</span>
        </button>`;
    }).join('')}
    <button class="item-card exam-card" id="go-exam" ${examReady ? '' : 'disabled'}>
      ${imgTag(u.ally, 'item-img', 'aliado')}
      <span class="item-body">
        <span class="item-title">🏆 EXAMEN FINAL</span>
        <span class="item-sub">${examReady
          ? (st.examDone ? `Aprobado · Mejor: ${st.examBest}/12 · Intentos: ${st.examTries}` : `12 retos mezclados${st.examTries ? ` · Intentos: ${st.examTries}` : ''}`)
          : 'Completa las 3 lecciones para desbloquearlo'}</span>
      </span>
      <span class="item-status">${st.examDone ? '🏆' : (examReady ? '🔥' : '🔒')}</span>
    </button>
  `;
  $('#back').addEventListener('click', showGrammarHome);
  app.querySelectorAll('[data-sub]').forEach(b =>
    b.addEventListener('click', () => startGrammarLesson(idx, +b.dataset.sub)));
  $('#go-exam').addEventListener('click', () => startGrammarExam(idx));
}

function startGrammarLesson(idx, subIdx) {
  const u = GRAMMAR_UNITS[idx];
  startQuiz({
    qs: buildGrammarLesson(u, subIdx),
    onBack: () => showGrammarUnit(idx),
    onDone: (score, total, passed) => {
      if (passed) {
        const st = unitState(S.grammar, u.id);
        st.subDone[subIdx] = true;
        save();
        const slot = $('#reward-slot');
        if (slot && allSubsDone(st, 3) && !st.examDone) {
          slot.innerHTML = `<div class="reward-banner">🔥 ¡Las 3 lecciones dominadas! El EXAMEN FINAL te espera para ganar a tu aliado Jedi.</div>`;
        }
      }
    },
  });
}

function startGrammarExam(idx) {
  const u = GRAMMAR_UNITS[idx];
  const st = unitState(S.grammar, u.id);
  st.examTries++;
  save();
  startQuiz({
    qs: buildGrammarExam(u),
    isExam: true,
    onBack: () => showGrammarUnit(idx),
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
            ${imgTag(u.ally, 'r-img', 'aliado Jedi')}
            🌌 ¡Nuevo aliado Jedi! Dominaste: ${esc(u.title)}.
          </div>`;
        checkCoupons();
      }
    },
  });
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
