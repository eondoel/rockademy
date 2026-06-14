'use strict';
/* ===== Conocimientos Generales: La Cabina del Tiempo 🚀☎️ =====
   Como Bill & Ted: viaja por el tiempo y el espacio respondiendo
   lo que un guerrero de secundaria debe saber.
   Cada tema: 3 expediciones (10 preguntas al azar del banco) + EXAMEN.
   Aprobar el examen = una reliquia del tiempo. */

function gq(q, a, wrong, extra) {
  return Object.assign({ type: 'mc', text: q, answer: a, options: shuffle([a, ...wrong]) }, extra || {});
}
function gtf(text, isTrue, extra) { return Object.assign({ _tf: true, text, isTrue }, extra || {}); }

const GENERAL_TOPICS = [
  {
    id: 'geografia', title: 'Geografía', emoji: '🌎', img: 'merry', relic: 'merry',
    desc: 'Mapas, países y maravillas del planeta',
    bank: [
      gq('¿Cuál es la capital de Francia?', 'París', ['Londres', 'Roma', 'Madrid']),
      gq('¿Cuál es el río más caudaloso del mundo?', 'Amazonas', ['Nilo', 'Bravo', 'Misisipi']),
      gq('¿Cuál es el continente más grande?', 'Asia', ['África', 'América', 'Europa']),
      gq('¿Cuántos estados tiene México?', '32', ['31', '30', '33']),
      gq('¿Cuál es el océano más grande?', 'Pacífico', ['Atlántico', 'Índico', 'Ártico']),
      gq('¿Cuál es el desierto cálido más grande del mundo?', 'Sahara', ['Atacama', 'Gobi', 'Sonora']),
      gq('¿Cuál es la capital de Japón?', 'Tokio', ['Pekín', 'Seúl', 'Osaka']),
      gq('¿Cuál es la montaña más alta del mundo?', 'Everest', ['Popocatépetl', 'Aconcagua', 'K2']),
      gq('¿Qué país tiene MÁS habitantes?', 'India', ['China', 'Estados Unidos', 'Brasil']),
      gq('¿En qué continente está Egipto?', 'África', ['Asia', 'Europa', 'Oceanía']),
      gq('¿Qué península está en el sureste de México?', 'Yucatán', ['Baja California', 'Ibérica', 'Itálica']),
      gtf('Australia es un país y también un continente', true),
      gtf('El río Bravo separa a México de Guatemala', false, { note: 'Separa a México de Estados Unidos' }),
      gq('¿Cuál es el idioma con más hablantes nativos?', 'Chino mandarín', ['Inglés', 'Español', 'Árabe']),
      gq('¿Qué país tiene forma de bota?', 'Italia', ['Chile', 'Francia', 'Portugal']),
      gq('¿Cómo se llama el volcán que vigila al Valle de México?', 'Popocatépetl', ['Everest', 'Vesubio', 'Fuji']),
      gq('¿Qué línea imaginaria divide la Tierra en norte y sur?', 'El ecuador', ['El meridiano de Greenwich', 'El trópico de Cáncer', 'La línea del horizonte']),
      gq('¿Cuál es el país más grande del mundo?', 'Rusia', ['Canadá', 'China', 'Estados Unidos']),
      gtf('México está en América del Norte', true),
      gq('¿Qué golfo baña la costa este de México?', 'Golfo de México', ['Golfo Pérsico', 'Golfo de California', 'Golfo de Vizcaya']),
      gq('¿Cuál es la capital de Italia?', 'Roma', ['Venecia', 'Milán', 'Florencia']),
      gtf('Hay más agua que tierra en la superficie del planeta', true, { note: 'Cerca del 70% es agua' }),
    ],
  },
  {
    id: 'historia', title: 'Historia', emoji: '🏛️', img: 'cabina', relic: 'cabina',
    desc: 'Viajes al pasado, como Bill & Ted',
    bank: [
      gq('¿En qué año inició la Independencia de México?', '1810', ['1821', '1910', '1492']),
      gq('¿Quién dio el Grito de Dolores?', 'Miguel Hidalgo', ['Benito Juárez', 'Emiliano Zapata', 'Porfirio Díaz']),
      gq('¿En qué año inició la Revolución Mexicana?', '1910', ['1810', '1917', '1900']),
      gq('¿Qué civilización construyó las pirámides de Giza?', 'La egipcia', ['La maya', 'La romana', 'La china']),
      gq('¿Quién llegó a América en 1492?', 'Cristóbal Colón', ['Hernán Cortés', 'Marco Polo', 'Magallanes']),
      gtf('Los aztecas (mexicas) fundaron Tenochtitlan', true),
      gq('¿Quién conquistó Tenochtitlan?', 'Hernán Cortés', ['Cristóbal Colón', 'Francisco Pizarro', 'Moctezuma']),
      gq('¿Por qué luchaba Emiliano Zapata?', 'Tierra para los campesinos', ['Ser presidente', 'El oro de México', 'Expandir el imperio']),
      gq('¿Quién fue la primera persona en pisar la Luna?', 'Neil Armstrong', ['Buzz Aldrin', 'Yuri Gagarin', 'Elon Musk'], { img: 'buzz', note: '¡Buzz Lightyear se llama así por Buzz Aldrin!' }),
      gq('¿En qué año llegó el ser humano a la Luna?', '1969', ['1959', '1979', '1989']),
      gq('¿Qué guerra mundial terminó en 1945?', 'La Segunda', ['La Primera', 'La Tercera', 'La Fría']),
      gtf('Benito Juárez fue presidente de México', true),
      gq('Completa la frase de Juárez: "El respeto al derecho ajeno es…"', 'la paz', ['la guerra', 'la ley', 'la libertad']),
      gq('¿Dónde vivía la civilización maya?', 'Sureste de México y Centroamérica', ['Norte de México', 'Sudamérica', 'El Caribe']),
      gq('¿Qué inventó Gutenberg?', 'La imprenta', ['El teléfono', 'La brújula', 'El telescopio']),
      gtf('Los vikingos venían de Escandinavia', true),
      gq('¿En qué país está la Gran Muralla?', 'China', ['Japón', 'India', 'Egipto']),
      gq('¿Dónde peleaban los gladiadores romanos?', 'En el Coliseo', ['En el Partenón', 'En la pirámide', 'En el castillo']),
      gtf('La Independencia de México se consumó en 1821', true),
      gq('¿En qué guerra usaron un caballo gigante de madera?', 'La guerra de Troya', ['La Revolución', 'La guerra de los pasteles', 'Las cruzadas']),
      gq('¿Cómo se llamaba el emperador mexica cuando llegó Cortés?', 'Moctezuma', ['Cuauhtémoc', 'Nezahualcóyotl', 'Atahualpa']),
      gtf('Las pirámides de Teotihuacán están en México', true),
    ],
  },
  {
    id: 'ciencia', title: 'Ciencia', emoji: '🔬', img: 'r2d2', relic: 'r2d2',
    desc: 'El universo, la vida y cómo funciona todo',
    bank: [
      gq('¿Cuál es el planeta rojo?', 'Marte', ['Venus', 'Júpiter', 'Mercurio']),
      gq('¿Cuál es el planeta más grande del sistema solar?', 'Júpiter', ['Saturno', 'la Tierra', 'Neptuno']),
      gq('¿Cuántos planetas tiene el sistema solar?', '8', ['9', '7', '10'], { note: 'Plutón ya no cuenta como planeta' }),
      gq('¿Cuál es la unidad básica de los seres vivos?', 'La célula', ['El átomo', 'El órgano', 'La molécula']),
      gq('¿Qué gas necesitamos respirar para vivir?', 'Oxígeno', ['Dióxido de carbono', 'Helio', 'Nitrógeno puro']),
      gq('¿Cuáles son los 3 estados clásicos del agua?', 'Sólido, líquido y gaseoso', ['Frío, tibio y caliente', 'Hielo, nieve y vapor', 'Duro, suave y mojado']),
      gtf('El agua hierve a 100 °C al nivel del mar', true),
      gq('¿Qué órgano bombea la sangre?', 'El corazón', ['El cerebro', 'Los pulmones', 'El hígado']),
      gq('¿Cuántos huesos tiene un adulto (aprox.)?', '206', ['100', '350', '500']),
      gq('¿Qué seres vivos hacen la fotosíntesis?', 'Las plantas', ['Los hongos', 'Los peces', 'Los virus']),
      gq('¿Qué fuerza nos mantiene pegados a la Tierra?', 'La gravedad', ['El magnetismo', 'La fricción', 'La electricidad']),
      gtf('El sonido viaja más rápido que la luz', false, { note: 'Por eso ves el rayo antes de oír el trueno' }),
      gq('¿Cuál es el animal terrestre más rápido?', 'El guepardo', ['El león', 'El caballo', 'El avestruz'], { img: 'blue' }),
      gq('¿Qué estudia la astronomía?', 'Los astros y el universo', ['Los animales', 'Las rocas', 'El clima']),
      gq('H₂O es la fórmula química de…', 'El agua', ['El oxígeno', 'La sal', 'El azúcar']),
      gq('La Tierra tarda 365 días en…', 'Dar la vuelta al Sol', ['Girar sobre sí misma', 'Dar la vuelta a la Luna', 'Cambiar de estación']),
      gtf('Los dinosaurios y los humanos vivieron al mismo tiempo', false, { img: 'trex', note: '¡Aunque Jurassic Park diga otra cosa!' }),
      gq('¿Qué metal es líquido a temperatura ambiente?', 'Mercurio', ['Hierro', 'Oro', 'Aluminio']),
      gq('¿Cuál es el animal más grande del planeta?', 'La ballena azul', ['El elefante', 'El T-Rex', 'El tiburón blanco'], { img: 'mosasaurus' }),
      gtf('El Sol es una estrella', true),
      gq('¿Qué producen las abejas?', 'Miel', ['Leche', 'Seda', 'Azúcar']),
      gq('¿Qué mide un termómetro?', 'La temperatura', ['La presión', 'El peso', 'La velocidad']),
    ],
  },
  {
    id: 'letras', title: 'Letras y arte', emoji: '🎭', img: 'woody', relic: 'woody',
    desc: 'Libros, música y obras que debes conocer',
    bank: [
      gq('¿Quién escribió Don Quijote de la Mancha?', 'Miguel de Cervantes', ['Shakespeare', 'Octavio Paz', 'Juan Rulfo']),
      gq('Don Quijote confundía los molinos de viento con…', 'Gigantes', ['Dragones', 'Castillos', 'Caballeros']),
      gq('¿Quién escribió Romeo y Julieta?', 'William Shakespeare', ['Cervantes', 'Dante', 'Dickens']),
      gq('¿Qué pintor mexicano es famoso por sus murales?', 'Diego Rivera', ['Pablo Picasso', 'Salvador Dalí', 'Van Gogh']),
      gq('¿Qué pintora mexicana es famosa por sus autorretratos?', 'Frida Kahlo', ['Remedios Varo', 'María Izquierdo', 'Mona Lisa']),
      gtf('Un haiku es un poema japonés muy corto', true),
      gq('¿Quién escribió El Principito?', 'Antoine de Saint-Exupéry', ['Julio Verne', 'Hans C. Andersen', 'Lewis Carroll']),
      gq('¿Qué instrumento tiene 88 teclas?', 'El piano', ['La guitarra', 'El violín', 'La batería']),
      gq('¿Cuántas cuerdas tiene una guitarra clásica?', '6', ['4', '5', '8']),
      gtf('Una fábula termina con una moraleja', true),
      gq('¿Quién pintó La noche estrellada?', 'Vincent van Gogh', ['Picasso', 'Da Vinci', 'Monet']),
      gq('¿Quién pintó la Mona Lisa?', 'Leonardo da Vinci', ['Miguel Ángel', 'Rafael', 'Botticelli']),
      gq('¿Qué mexicano ganó el Premio Nobel de Literatura?', 'Octavio Paz', ['Juan Rulfo', 'Carlos Fuentes', 'Chespirito']),
      gq('¿Qué es una metáfora?', 'Comparar dos cosas sin usar "como"', ['Un poema largo', 'Una rima', 'Un cuento corto']),
      gq('¿Cuántas notas musicales existen?', '7', ['5', '8', '10']),
      gtf('Cri-Cri, "el grillito cantor", fue creado por Francisco Gabilondo Soler', true),
      gq('¿Cómo se llama el cómic japonés?', 'Manga', ['Anime', 'Cómic-san', 'Manhwa'], { img: 'luffy' }),
      gq('¿Quién escribió Cien años de soledad?', 'Gabriel García Márquez', ['Pablo Neruda', 'Borges', 'Vargas Llosa']),
      gq('Cenicienta y La Bella Durmiente son…', 'Cuentos de hadas', ['Fábulas', 'Leyendas mexicanas', 'Novelas']),
      gq('¿Quién es el autor de los dinosaurios de Jurassic Park (la novela)?', 'Michael Crichton', ['Stephen King', 'J.K. Rowling', 'Tolkien'], { img: 'trex' }),
      gtf('La batería es un instrumento de percusión', true, { note: '¡Como tus futuras baquetas!' }),
    ],
  },
  {
    id: 'geek', title: 'Mundo geek', emoji: '🚀', img: 'estrella', relic: 'estrella',
    desc: 'Tus sagas favoritas a examen',
    bank: [
      gq('¿Cómo se llama el dragón de Hipo?', 'Chimuelo', ['Colmillo', 'Tormenta', 'Desdentado Jr.'], { img: 'chimuelo' }),
      gq('¿Qué clase de dragón es Chimuelo?', 'Furia Nocturna', ['Nadder Mortífero', 'Pesadilla Monstruosa', 'Gronckle'], { img: 'chimuelo' }),
      gq('¿Quién es el maestro Jedi de Anakin?', 'Obi-Wan Kenobi', ['Yoda', 'Mace Windu', 'Qui-Gon Jinn'], { img: 'obiwan' }),
      gq('¿De qué color es el sable de Darth Maul?', 'Rojo (¡y doble!)', ['Verde', 'Azul', 'Morado'], { img: 'maul' }),
      gq('¿Cómo habla el maestro Yoda?', 'Con las palabras en otro orden', ['Gritando', 'En clave secreta', 'Solo con señas'], { img: 'yoda' }),
      gtf('Anakin Skywalker se convierte en Darth Vader', true, { img: 'anakin' }),
      gq('¿Quién es la reina de Naboo?', 'Padmé Amidala', ['Leia', 'Rey', 'Ahsoka'], { img: 'padme' }),
      gtf('R2-D2 es un droide', true, { img: 'r2d2' }),
      gq('¿Qué busca Luffy en One Piece?', 'El tesoro One Piece', ['Una espada mágica', 'A su papá', 'Un mapa estelar'], { img: 'luffy' }),
      gq('¿Qué le dio poderes a Luffy?', 'Una fruta del diablo', ['Un rayo', 'Una poción', 'Un entrenamiento'], { img: 'luffy' }),
      gq('¿Quién es el espadachín de los Sombrero de Paja?', 'Zoro', ['Sanji', 'Usopp', 'Franky'], { img: 'zoro' }),
      gq('¿Qué animal es Chopper?', 'Un reno', ['Un mapache', 'Un oso', 'Un zorro'], { img: 'chopper' }),
      gq('¿Cómo se llama el primer barco de Luffy?', 'Going Merry', ['Thousand Sunny', 'Perla Negra', 'Titanic'], { img: 'merry' }),
      gq('¿Qué número lleva el Rayo McQueen?', '95', ['66', '43', '7'], { img: 'mcqueen' }),
      gq('¿Quién es el mejor amigo (grúa) de McQueen?', 'Mate', ['Doc Hudson', 'Sally', 'Chick Hicks'], { img: 'mate_cars' }),
      gq('¿Cómo se llama el dueño de Woody y Buzz?', 'Andy', ['Sid', 'Bonnie', 'Carl'], { img: 'woody' }),
      gq('Completa la frase de Buzz: "Al infinito…"', '¡y más allá!', ['¡y al espacio!', '¡y a la Luna!', '¡y de regreso!'], { img: 'buzz' }),
      gq('¿En qué viajan por el tiempo Bill y Ted?', 'En una cabina telefónica', ['En un DeLorean', 'En un cohete', 'En un tren'], { img: 'cabina' }),
      gq('¿Cómo se llama el hermano de Mario?', 'Luigi', ['Wario', 'Toad', 'Koopa'], { img: 'luigi' }),
      gq('¿Quién secuestra a la princesa Peach?', 'Bowser', ['Goomba', 'Donkey Kong', 'Waluigi'], { img: 'bowser' }),
      gq('¿Qué dinosaurio monta Mario?', 'Yoshi', ['Rex', 'Birdo', 'Barney'], { img: 'yoshi' }),
      gq('¿Qué le da la estrella a Mario?', 'Invencibilidad', ['Vuelo', 'Fuego', 'Vida extra'], { img: 'estrella' }),
      gtf('Los goombas son amigos de Mario', false, { img: 'goomba' }),
      gq('¿Qué hace el hongo rojo en Mario Bros?', 'Lo hace crecer', ['Lo hace volar', 'Lo encoge', 'Lo duerme'], { img: 'hongo' }),
    ],
  },
];

/* normaliza una entrada del banco al formato del motor */
function generalQ(b) {
  if (b._tf) return tfQ(b.text, b.isTrue, { img: b.img || motivador(), note: b.note });
  const q = Object.assign({}, b);
  q.options = shuffle(b.options.slice());
  q.img = q.img || motivador();
  return q;
}

function buildGeneralQuiz(topic, count) {
  return shuffle(topic.bank).slice(0, count).map(generalQ);
}

function generalProgress() {
  const done = GENERAL_TOPICS.filter(t => unitState(S.general, t.id).examDone).length;
  return { done, total: GENERAL_TOPICS.length };
}

function showGeneralHome() {
  const app = $('#app');
  const p = generalProgress();
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">🚀 La Cabina del Tiempo</h1>
    <p class="screen-sub">Como Bill & Ted: viaja por el tiempo y el espacio. Cada tema dominado te da una reliquia del tiempo.</p>
    <div class="collection">
      <span class="c-label">🏺 RELIQUIAS DEL TIEMPO (${p.done}/${p.total})</span>
      ${GENERAL_TOPICS.map(t => {
        const done = unitState(S.general, t.id).examDone;
        return `<span class="c-item" title="${esc(t.title)}">${imgTag(t.relic, 'status-img' + (done ? '' : ' pending'), t.title)}</span>`;
      }).join('')}
    </div>
    <div class="spacer"></div>
    ${GENERAL_TOPICS.map((t, idx) => {
      const st = unitState(S.general, t.id);
      const subsOk = [0, 1, 2].filter(i => subIsDone(st, i)).length;
      return `
        <button class="item-card" data-topic="${idx}">
          ${imgTag(t.img, 'item-img', t.title)}
          <span class="item-body">
            <span class="item-title">${t.emoji} ${esc(t.title)}</span>
            <span class="item-sub">${esc(t.desc)} · ${st.examDone ? '✅ Examen aprobado' : `${subsOk}/3 expediciones`}</span>
          </span>
          <span class="item-status">${st.examDone ? '🏺' : '▶️'}</span>
        </button>`;
    }).join('')}
    <p class="center muted" style="margin-top:10px">🎲 Las preguntas salen al azar de un banco gigante: cada expedición es distinta.</p>
  `;
  $('#back').addEventListener('click', showHome);
  app.querySelectorAll('[data-topic]').forEach(b =>
    b.addEventListener('click', () => showGeneralTopic(+b.dataset.topic)));
}

function showGeneralTopic(idx) {
  const t = GENERAL_TOPICS[idx];
  const st = unitState(S.general, t.id);
  const examReady = allSubsDone(st, 3);
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← La Cabina</button>
    <h1 class="screen-title">${t.emoji} ${esc(t.title)}</h1>
    <p class="screen-sub">${esc(t.desc)} · Banco de ${t.bank.length} preguntas</p>
    ${[0, 1, 2].map(i => {
      const done = subIsDone(st, i);
      const locked = i > 0 && !subIsDone(st, i - 1) && !done;
      return `
        <button class="item-card" data-sub="${i}" ${locked ? 'disabled' : ''}>
          <span class="item-emoji">${locked ? '🔒' : (done ? '✅' : '🚀')}</span>
          <span class="item-body">
            <span class="item-title">Expedición ${i + 1}</span>
            <span class="item-sub">10 preguntas al azar · acierta 8</span>
          </span>
          <span class="item-status">${done ? '⭐' : (locked ? '' : '▶️')}</span>
        </button>`;
    }).join('')}
    <button class="item-card exam-card" id="go-exam" ${examReady ? '' : 'disabled'}>
      ${imgTag(t.relic, 'item-img', 'reliquia')}
      <span class="item-body">
        <span class="item-title">🏆 EXAMEN FINAL</span>
        <span class="item-sub">${examReady
          ? (st.examDone ? `Aprobado · Mejor: ${st.examBest}/12 · Intentos: ${st.examTries}` : `12 preguntas sorpresa${st.examTries ? ` · Intentos: ${st.examTries}` : ''}`)
          : 'Completa las 3 expediciones para desbloquearlo'}</span>
      </span>
      <span class="item-status">${st.examDone ? '🏆' : (examReady ? '🔥' : '🔒')}</span>
    </button>
  `;
  $('#back').addEventListener('click', showGeneralHome);
  app.querySelectorAll('[data-sub]').forEach(b =>
    b.addEventListener('click', () => startGeneralLesson(idx, +b.dataset.sub)));
  $('#go-exam').addEventListener('click', () => startGeneralExam(idx));
}

function startGeneralLesson(idx, subIdx) {
  const t = GENERAL_TOPICS[idx];
  startQuiz({
    qs: buildGeneralQuiz(t, 10),
    onBack: () => showGeneralTopic(idx),
    onDone: (score, total, passed) => {
      if (passed) {
        const st = unitState(S.general, t.id);
        st.subDone[subIdx] = true;
        save();
      }
    },
  });
}

function startGeneralExam(idx) {
  const t = GENERAL_TOPICS[idx];
  const st = unitState(S.general, t.id);
  st.examTries++;
  save();
  startQuiz({
    qs: buildGeneralQuiz(t, 12),
    isExam: true,
    onBack: () => showGeneralTopic(idx),
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
            ${imgTag(t.relic, 'r-img', 'reliquia')}
            🏺 ¡Nueva reliquia del tiempo: ${esc(t.title)}!
          </div>`;
        checkCoupons();
      }
    },
  });
}
