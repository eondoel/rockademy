'use strict';
/* ===== Mundo Matemáticas: Torre de Entrenamiento Z 🐉 =====
   Temario de 1° de secundaria (SEP, México).
   Cada tema: 3 lecciones (básico → misiones → combo) + EXAMEN final.
   Problemas generados al azar: práctica infinita.
   Aprobar el examen del tema = 1 esfera del dragón. */

function fmtNeg(n) { return n < 0 ? `(${n})` : `${n}`; }

/* 4 opciones únicas: respuesta + primeros candidatos no repetidos */
function optSet(answer, candidates) {
  const set = [String(answer)];
  for (const c of candidates) {
    const s = String(c);
    if (!set.includes(s)) set.push(s);
    if (set.length === 4) break;
  }
  return shuffle(set);
}

/* --- 1. Números enteros --- */
function genEnteros(v) {
  v = v || ri(1, 4);
  if (v === 1) {
    const a = ri(-20, 20), b = ri(-20, 20);
    const ans = a + b;
    return {
      text: `${fmtNeg(a)} + ${fmtNeg(b)} = ?`, emoji: '🧮', img: 'vegeta',
      answer: String(ans), options: numOptions(ans, 6),
      note: 'Recuerda: sumar un negativo es restar', plain: `${fmtNeg(a)} + ${fmtNeg(b)}`, val: ans,
    };
  }
  if (v === 2) {
    const a = ri(-15, 15), b = ri(1, 20);
    const ans = a - b;
    return {
      text: `${fmtNeg(a)} − ${b} = ?`, emoji: '🧮', img: 'gohan',
      answer: String(ans), options: numOptions(ans, 6),
      note: 'En la recta numérica, restar es moverse a la izquierda', plain: `${fmtNeg(a)} − ${b}`, val: ans,
    };
  }
  if (v === 3) {
    const t = ri(2, 12), drop = ri(5, 20);
    const ans = t - drop;
    return {
      text: `En la Isla Nublar la temperatura era de ${t} °C. En la noche bajó ${drop} °C. ¿Cuál es la temperatura ahora?`,
      emoji: '🦖🌡️', img: 'trex', answer: String(ans), options: numOptions(ans, 5),
      note: 'Bajar de temperatura = restar',
    };
  }
  const nivel = ri(5, 30), sube = ri(3, nivel + 15);
  const ans = -nivel + sube;
  return {
    text: `Steve está en el nivel −${nivel} de la mina y sube ${sube} niveles con su escalera. ¿En qué nivel queda?`,
    emoji: '⛏️', img: 'steve', answer: String(ans), options: numOptions(ans, 5),
    note: 'Subir = sumar',
  };
}

/* --- 2. Fracciones --- */
function fracStr(n, d) { return `${n}/${d}`; }
function genFracciones(v) {
  v = v || ri(1, 4);
  if (v === 1) {
    const d = pick([4, 6, 8, 10, 12]);
    const ans = d / 2;
    return {
      text: `Fracciones equivalentes: 1/2 = ?/${d}`, emoji: '🍕', img: 'mc_cake',
      answer: fracStr(ans, d),
      options: optSet(fracStr(ans, d), [fracStr(ans + 1, d), fracStr(ans - 1, d), fracStr(d, d), fracStr(ans + 2, d)]),
      note: 'Multiplica arriba y abajo por el mismo número',
    };
  }
  if (v === 2) {
    const d = pick([5, 7, 8, 9, 10]);
    const a = ri(1, d - 2), b = ri(1, d - a - 1);
    const ans = fracStr(a + b, d);
    return {
      text: `${fracStr(a, d)} + ${fracStr(b, d)} = ?`, emoji: '➕', img: 'gohan',
      answer: ans,
      options: optSet(ans, [fracStr(a + b, d * 2), fracStr(a + b + 1, d), fracStr(Math.abs(a - b) || 1, d), fracStr(a + b + 2, d)]),
      note: 'Mismo denominador: solo suma los de arriba',
    };
  }
  if (v === 3) {
    const pairs = [[3, 4, 2, 3], [2, 5, 1, 2], [5, 6, 3, 4], [2, 3, 3, 5], [7, 8, 5, 6]];
    const [n1, d1, n2, d2] = pick(pairs);
    const bigger = (n1 / d1 > n2 / d2) ? fracStr(n1, d1) : fracStr(n2, d2);
    return {
      text: `¿Cuál fracción es MAYOR?`, emoji: '⚖️', img: 'dewey',
      answer: bigger,
      options: shuffle([fracStr(n1, d1), fracStr(n2, d2), 'son iguales', 'no se puede saber']),
      note: 'Compara multiplicando cruzado',
    };
  }
  const d = pick([4, 6, 8]), eaten = ri(1, d - 1);
  const ans = fracStr(d - eaten, d);
  return {
    text: `Reese se comió ${fracStr(eaten, d)} de la pizza. ¿Qué fracción queda para Malcolm?`,
    emoji: '🍕', img: 'reese', answer: ans,
    options: optSet(ans, [fracStr(eaten, d), fracStr(d - eaten + 1 > d ? 1 : d - eaten + 1, d), '1/2', fracStr(1, d), fracStr(d - 1, d)]),
    note: 'El total de la pizza es ' + fracStr(d, d),
  };
}

/* --- 3. Decimales --- */
function genDecimales(v) {
  v = v || ri(1, 3);
  if (v === 1) {
    const a = ri(100, 2000), b = ri(100, 2000);
    const ans = (a + b) / 100;
    return {
      text: `Una skin cuesta ${a / 100} monedas y un baile ${b / 100}. ¿Cuánto gastas en total?`,
      emoji: '🕺💰', img: 'vbucks', answer: String(ans),
      options: shuffle([String(ans), String((a + b + 100) / 100), String((a + b - 50) / 100), String((a + b) / 10)]),
      note: 'Alinea los puntos decimales para sumar',
    };
  }
  if (v === 2) {
    const a = ri(11, 99) / 10, mult = pick([10, 100]);
    const ans = Math.round(a * mult * 100) / 100;
    return {
      text: `${a} × ${mult} = ?`, emoji: '✖️', img: 'bulma',
      answer: String(ans),
      options: shuffle([String(ans), String(ans / 10), String(ans * 10), String(ans + 1)]),
      note: `Multiplicar por ${mult} mueve el punto ${mult === 10 ? '1 lugar' : '2 lugares'} a la derecha`,
      plain: `${a} × ${mult}`, val: ans,
    };
  }
  const pay = pick([50, 100, 200]), cost = ri(100, pay * 100 - 100);
  const ans = (pay * 100 - cost) / 100;
  return {
    text: `Compras un elixir de ${cost / 100} monedas y pagas con un billete de ${pay}. ¿Cuánto te dan de cambio?`,
    emoji: '🧪', img: 'chugjug', answer: String(ans),
    options: shuffle([String(ans), String(ans + 1), String(Math.max(0.5, ans - 1)), String((pay * 100 - cost + 50) / 100)]),
    note: 'Cambio = lo que pagas − lo que cuesta',
  };
}

/* --- 4. Porcentajes --- */
function genPorcentajes(v) {
  v = v || ri(1, 3);
  if (v === 1) {
    const p = pick([10, 20, 25, 50, 75]), base = pick([40, 60, 80, 120, 200, 400]);
    const ans = base * p / 100;
    return {
      text: `¿Cuánto es el ${p}% de ${base}?`, emoji: '📊', img: 'roshi',
      answer: String(ans), options: numOptions(ans, Math.max(4, Math.round(ans / 4))),
      note: `${p}% = ${p}/100. Multiplica y divide`,
      plain: `el ${p}% de ${base}`, val: ans,
    };
  }
  if (v === 2) {
    const p = pick([10, 25, 50]), base = pick([200, 400, 800, 1200]);
    const ans = base - base * p / 100;
    return {
      text: `Una skin legendaria cuesta ${base} V-monedas y tiene ${p}% de descuento. ¿Cuánto pagas?`,
      emoji: '🛒', img: 'vbucks', answer: String(ans), options: numOptions(ans, Math.round(base / 8)),
      note: 'Calcula el descuento y réstalo al precio',
    };
  }
  const total = pick([10, 20, 50]), parte = ri(1, total - 1);
  const ans = parte * 100 / total;
  return {
    text: `Goku lanzó ${total} ráfagas de ki y ${parte} dieron en el blanco. ¿Qué porcentaje acertó?`,
    emoji: '💥', img: 'goku', answer: ans + '%',
    options: optSet(ans + '%', [
      (ans + 10 > 100 ? ans - 20 : ans + 10) + '%',
      Math.max(5, ans - 10) + '%',
      Math.min(100, ans + 25) + '%',
      (ans + 5) + '%',
      Math.max(1, ans - 5) + '%',
    ]),
    note: 'Porcentaje = (parte ÷ total) × 100',
  };
}

/* --- 5. Ecuaciones --- */
function genEcuaciones(v) {
  v = v || ri(1, 4);
  const x = ri(2, 12);
  if (v === 1) {
    const a = ri(3, 25);
    return {
      text: `x + ${a} = ${x + a}<br>¿Cuánto vale x?`, emoji: '🧩', img: 'piccolo',
      answer: String(x), options: numOptions(x, 4),
      note: `Resta ${a} de los dos lados`,
    };
  }
  if (v === 2) {
    const a = ri(2, 9);
    return {
      text: `${a}x = ${a * x}<br>¿Cuánto vale x?`, emoji: '🧩', img: 'vegeta',
      answer: String(x), options: numOptions(x, 4),
      note: `Divide los dos lados entre ${a}`,
    };
  }
  if (v === 3) {
    const a = ri(2, 6), b = ri(1, 15);
    return {
      text: `${a}x + ${b} = ${a * x + b}<br>¿Cuánto vale x?`, emoji: '🧩', img: 'gohan',
      answer: String(x), options: numOptions(x, 4),
      note: `Primero resta ${b}, luego divide entre ${a}`,
    };
  }
  const tarde = ri(10, 30), total = x * 10 + tarde;
  return {
    text: `Goku hizo 10 series de x lagartijas en la mañana y ${tarde} en la tarde. En total hizo ${total}. ¿Cuánto vale x?`,
    emoji: '💪', img: 'goku', answer: String(x), options: numOptions(x, 4),
    note: `La ecuación es: 10x + ${tarde} = ${total}`,
  };
}

/* --- 6. Geometría --- */
function genGeometria(v) {
  v = v || ri(1, 4);
  if (v === 1) {
    const a = ri(4, 12), b = ri(3, 9);
    const ans = a * b;
    return {
      text: `Construyes un muro en Minecraft de ${a} bloques de largo y ${b} de alto. ¿Cuántos bloques necesitas?`,
      emoji: '🧱', img: 'grass', answer: String(ans), options: numOptions(ans, 8),
      note: 'Área del rectángulo = largo × alto',
    };
  }
  if (v === 2) {
    const a = ri(5, 15), b = ri(4, 12);
    const ans = 2 * (a + b);
    return {
      text: `Pones una cerca alrededor de un corral de ${a} m por ${b} m. ¿Cuántos metros de cerca necesitas?`,
      emoji: '🐮', img: 'cow', answer: String(ans), options: numOptions(ans, 6),
      note: 'Perímetro = 2 × (largo + ancho)',
    };
  }
  if (v === 3) {
    const b = pick([4, 6, 8, 10, 12]), h = ri(3, 9);
    const ans = b * h / 2;
    return {
      text: `La vela triangular de tu barco mide ${b} m de base y ${h} m de altura. ¿Cuál es su área? (¡cuidado con el Mosasaurus!)`,
      emoji: '⛵', img: 'mosasaurus', answer: String(ans) + ' m²',
      options: shuffle([ans + ' m²', (b * h) + ' m²', (ans + 4) + ' m²', Math.max(2, ans - 3) + ' m²']),
      note: 'Área del triángulo = (base × altura) ÷ 2',
    };
  }
  const l = ri(2, 6), w = ri(2, 5), h = ri(2, 4);
  const ans = l * w * h;
  return {
    text: `Un cofre gigante mide ${l} × ${w} × ${h} bloques. ¿Cuántos bloques caben dentro (volumen)?`,
    emoji: '📦', img: 'chest', answer: String(ans), options: numOptions(ans, 8),
    note: 'Volumen = largo × ancho × alto',
  };
}

/* --- 7. Probabilidad --- */
function genProbabilidad(v) {
  v = v || ri(1, 3);
  if (v === 1) {
    const casos = pick([
      { q: 'un número PAR', n: 3 },
      { q: 'un número IMPAR', n: 3 },
      { q: 'un número mayor que 4', n: 2 },
      { q: 'un número mayor que 2', n: 4 },
      { q: 'un número menor que 3', n: 2 },
      { q: 'un número menor que 5', n: 4 },
      { q: 'el número 6', n: 1 },
      { q: 'el número 1', n: 1 },
      { q: 'un 3 o un 4', n: 2 },
      { q: 'un número del 1 al 6', n: 6 },
    ]);
    const ans = `${casos.n}/6`;
    return {
      text: `Lanzas un dado. ¿Cuál es la probabilidad de sacar ${casos.q}?`,
      emoji: '🎲', img: 'peely', answer: ans,
      options: optSet(ans, [`${casos.n + 1 > 6 ? casos.n - 2 : casos.n + 1}/6`, `${Math.max(1, casos.n - 1)}/6`, `${casos.n}/12`, `${(casos.n + 2) > 6 ? 1 : casos.n + 2}/6`, '5/6', '0/6']),
      note: 'Probabilidad = casos favorables / casos posibles (6)',
    };
  }
  if (v === 2) {
    const item = pick([
      { a: 'esmeraldas', b: 'piedras', img: 'emerald' },
      { a: 'diamantes', b: 'bloques de tierra', img: 'diamond' },
      { a: 'pociones', b: 'manzanas', img: 'chugjug' },
    ]);
    const esm = ri(2, 5), piedra = ri(3, 7);
    const total = esm + piedra;
    const ans = `${esm}/${total}`;
    return {
      text: `En un cofre hay ${esm} ${item.a} y ${piedra} ${item.b}. Sacas uno sin ver. ¿Probabilidad de que sea ${item.a.slice(0, -1)}a?`,
      emoji: '💚', img: item.img, answer: ans,
      options: optSet(ans, [`${piedra}/${total}`, `${esm}/${piedra}`, `1/${total}`, `${esm + 1}/${total}`, `${esm}/${total + 1}`]),
      note: `Total de objetos: ${total}`,
    };
  }
  const esc = pick([
    { q: 'caiga águila', txt: 'Lanzas una moneda para ver quién escoge primero en Fortnite.', ans: '1/2', img: 'battlebus', w: ['1/4', '2/3', '1'] },
    { q: 'una niña', txt: 'En un sorteo hay 5 niños y 5 niñas. Sacas un nombre al azar.', ans: '1/2', img: 'peely', w: ['1/5', '5/5', '2/5'] },
    { q: 'roja', txt: 'Una ruleta tiene 4 partes iguales: 2 rojas y 2 azules. La giras.', ans: '1/2', img: 'estrella', w: ['1/4', '2/4', '3/4'] },
    { q: 'corazones', txt: 'De una baraja sacas una carta. Hay 4 palos iguales y uno es corazones.', ans: '1/4', img: 'goku', w: ['1/2', '1/3', '4/4'] },
  ]);
  return {
    text: `${esc.txt} ¿Probabilidad de que salga ${esc.q}?`,
    emoji: '🪙', img: esc.img, answer: esc.ans,
    options: shuffle([esc.ans, ...esc.w]),
    note: 'Casos favorables ÷ casos posibles',
  };
}

/* --- temas con sus lecciones --- */
const MATH_TOPICS = [
  { id: 'enteros', title: 'Números enteros', emoji: '🌡️', img: 'pickaxe', desc: 'Positivos y negativos', gen: genEnteros,
    subs: [{ t: '⚡ Entrenamiento básico', vs: [1, 2] }, { t: '🌍 Misiones del multiverso', vs: [3, 4] }, { t: '🔥 Combo total', vs: [1, 2, 3, 4] }] },
  { id: 'fracciones', title: 'Fracciones', emoji: '🍕', img: 'reese', desc: 'Partes de un todo', gen: genFracciones,
    subs: [{ t: '⚡ Entrenamiento básico', vs: [1, 2] }, { t: '🌍 Misiones del multiverso', vs: [3, 4] }, { t: '🔥 Combo total', vs: [1, 2, 3, 4] }] },
  { id: 'decimales', title: 'Decimales', emoji: '💰', img: 'vbucks', desc: 'Puntos y monedas', gen: genDecimales,
    subs: [{ t: '⚡ Entrenamiento básico', vs: [2] }, { t: '🌍 Misiones del multiverso', vs: [1, 3] }, { t: '🔥 Combo total', vs: [1, 2, 3] }] },
  { id: 'porcentajes', title: 'Porcentajes', emoji: '📊', img: 'roshi', desc: 'Descuentos y puntería', gen: genPorcentajes,
    subs: [{ t: '⚡ Entrenamiento básico', vs: [1] }, { t: '🌍 Misiones del multiverso', vs: [2, 3] }, { t: '🔥 Combo total', vs: [1, 2, 3] }] },
  { id: 'ecuaciones', title: 'Ecuaciones', emoji: '🧩', img: 'piccolo', desc: 'Encuentra el valor de x', gen: genEcuaciones,
    subs: [{ t: '⚡ Entrenamiento básico', vs: [1, 2] }, { t: '🌍 Misiones del multiverso', vs: [3, 4] }, { t: '🔥 Combo total', vs: [1, 2, 3, 4] }] },
  { id: 'geometria', title: 'Geometría', emoji: '📐', img: 'grass', desc: 'Áreas, perímetros y volumen', gen: genGeometria,
    subs: [{ t: '⚡ Área y perímetro', vs: [1, 2] }, { t: '🌍 Misiones del multiverso', vs: [3, 4] }, { t: '🔥 Combo total', vs: [1, 2, 3, 4] }] },
  { id: 'probabilidad', title: 'Probabilidad', emoji: '🎲', img: 'chest', desc: '¿Qué tan posible es?', gen: genProbabilidad,
    subs: [{ t: '⚡ Entrenamiento básico', vs: [1, 3] }, { t: '🌍 Misiones del multiverso', vs: [2] }, { t: '🔥 Combo total', vs: [1, 2, 3] }] },
];

/* V/F a partir de un problema "plano" (con campo plain/val) */
function mathTF(t, vs) {
  let guard = 0, q = null;
  while (guard++ < 20) {
    q = t.gen(pick(vs));
    if (q.plain !== undefined) break;
    q = null;
  }
  if (!q) return null;
  const isTrue = Math.random() < 0.5;
  const claim = isTrue ? q.val : q.val + pick([-3, -2, -1, 1, 2, 3]);
  return tfQ(`${q.plain} = <b>${claim}</b>`, isTrue, { img: q.img, note: `${q.plain} = ${q.val}` });
}

function buildMathQuiz(t, vs, count) {
  const qs = [];
  const seen = new Set();
  let guard = 0;
  // 2 de V/F si el tema lo permite (variedad de formato)
  for (let k = 0; k < 2; k++) {
    const tf = mathTF(t, vs);
    if (tf && !seen.has(tf.text)) { seen.add(tf.text); qs.push(tf); }
  }
  while (qs.length < count && guard++ < 120) {
    const q = t.gen(pick(vs));
    if (seen.has(q.text)) continue;
    seen.add(q.text);
    q.type = 'mc';
    q.img = q.img || t.img;
    qs.push(q);
  }
  return shuffle(qs);
}

function mathProgress() {
  const done = MATH_TOPICS.filter(t => unitState(S.math, t.id).examDone).length;
  return { done, total: MATH_TOPICS.length };
}

function showMathHome() {
  const app = $('#app');
  const p = mathProgress();
  const allDone = p.done === p.total;
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">🐉 Torre de Entrenamiento Z: Matemáticas</h1>
    <p class="screen-sub">3 lecciones por tema y un examen final. Aprueba el examen y gana la esfera. ¡Junta las 7 e invoca a Shenlong!</p>
    ${imgTag(allDone ? 'shenron' : 'esfera', 'scene-banner', 'Esferas del dragón')}
    <div class="collection">
      <span class="c-label">🔮 ESFERAS DEL DRAGÓN (${p.done}/7)</span>
      ${MATH_TOPICS.map((t) => {
        const done = unitState(S.math, t.id).examDone;
        return `<span class="c-item" title="${esc(t.title)}">${imgTag('esfera_bola', 'status-img' + (done ? '' : ' gray'), t.title)}</span>`;
      }).join('')}
      ${allDone ? '<span class="c-item">✨</span>' : ''}
    </div>
    ${allDone ? `<div class="reward-banner"><span class="r-emoji">🐉</span>¡SHENLONG HA SIDO INVOCADO! Dominaste las matemáticas de tu grado.</div>` : ''}
    <div class="spacer"></div>
    ${MATH_TOPICS.map((t, idx) => {
      const st = unitState(S.math, t.id);
      const subsOk = [0, 1, 2].filter(i => subIsDone(st, i)).length;
      return `
        <button class="item-card" data-topic="${idx}">
          ${imgTag(t.img, 'item-img', t.title)}
          <span class="item-body">
            <span class="item-title">${esc(t.title)}</span>
            <span class="item-sub">${st.examDone ? '✅ Examen aprobado' : `📖 ${subsOk}/3 lecciones${allSubsDone(st, 3) ? ' · ¡examen listo!' : ''}`}</span>
          </span>
          <span class="item-status">${imgTag('esfera_bola', 'status-img' + (st.examDone ? '' : ' gray'), 'esfera')}</span>
        </button>`;
    }).join('')}
    <p class="center muted" style="margin-top:10px">♾️ Los problemas cambian cada vez: puedes entrenar sin límite.</p>
  `;
  $('#back').addEventListener('click', showHome);
  app.querySelectorAll('[data-topic]').forEach(b =>
    b.addEventListener('click', () => showMathTopic(+b.dataset.topic)));
}

function showMathTopic(idx) {
  const t = MATH_TOPICS[idx];
  const st = unitState(S.math, t.id);
  const examReady = allSubsDone(st, 3);
  const app = $('#app');
  app.innerHTML = `
    <button class="back-link" id="back">← Torre Z</button>
    <h1 class="screen-title">${esc(t.title)}</h1>
    <p class="screen-sub">${esc(t.desc)}</p>
    ${t.subs.map((sub, i) => {
      const done = subIsDone(st, i);
      const locked = i > 0 && !subIsDone(st, i - 1) && !done;
      return `
        <button class="item-card" data-sub="${i}" ${locked ? 'disabled' : ''}>
          <span class="item-emoji">${locked ? '🔒' : (done ? '✅' : '📖')}</span>
          <span class="item-body">
            <span class="item-title">Lección ${i + 1}: ${esc(sub.t)}</span>
            <span class="item-sub">10 problemas · acierta 8 para dominarla</span>
          </span>
          <span class="item-status">${done ? '⭐' : (locked ? '' : '▶️')}</span>
        </button>`;
    }).join('')}
    <button class="item-card exam-card" id="go-exam" ${examReady ? '' : 'disabled'}>
      ${imgTag('esfera_bola', 'item-img', 'esfera')}
      <span class="item-body">
        <span class="item-title">🏆 EXAMEN FINAL</span>
        <span class="item-sub">${examReady
          ? (st.examDone ? `Aprobado · Mejor: ${st.examBest}/12 · Intentos: ${st.examTries}` : `12 problemas de todo el tema${st.examTries ? ` · Intentos: ${st.examTries}` : ''}`)
          : 'Completa las 3 lecciones para desbloquearlo'}</span>
      </span>
      <span class="item-status">${st.examDone ? '🏆' : (examReady ? '🔥' : '🔒')}</span>
    </button>
  `;
  $('#back').addEventListener('click', showMathHome);
  app.querySelectorAll('[data-sub]').forEach(b =>
    b.addEventListener('click', () => startMathLesson(idx, +b.dataset.sub)));
  $('#go-exam').addEventListener('click', () => startMathExam(idx));
}

function startMathLesson(idx, subIdx) {
  const t = MATH_TOPICS[idx];
  startQuiz({
    qs: buildMathQuiz(t, t.subs[subIdx].vs, 10),
    onBack: () => showMathTopic(idx),
    onDone: (score, total, passed) => {
      if (passed) {
        const st = unitState(S.math, t.id);
        st.subDone[subIdx] = true;
        save();
        const slot = $('#reward-slot');
        if (slot && allSubsDone(st, 3) && !st.examDone) {
          slot.innerHTML = `<div class="reward-banner">🔥 ¡Las 3 lecciones dominadas! El EXAMEN FINAL te espera para ganar la esfera.</div>`;
        }
      }
    },
  });
}

function startMathExam(idx) {
  const t = MATH_TOPICS[idx];
  const st = unitState(S.math, t.id);
  st.examTries++;
  save();
  const allVs = t.subs[t.subs.length - 1].vs;
  startQuiz({
    qs: buildMathQuiz(t, allVs, 12),
    isExam: true,
    onBack: () => showMathTopic(idx),
    onDone: (score, total, passed) => {
      st.examBest = Math.max(st.examBest || 0, score);
      const firstTime = passed && !st.examDone;
      if (passed) st.examDone = true;
      save();
      if (firstTime) {
        addXP(50);
        const slot = $('#reward-slot');
        if (slot) {
          const p = mathProgress();
          slot.innerHTML = `
            <div class="reward-banner">
              ${imgTag(p.done === 7 ? 'shenron' : 'esfera_bola', 'r-img', 'Esfera del dragón')}
              ¡Ganaste la esfera de ${esc(t.title)}! Llevas ${p.done} de 7.
              ${p.done === 7 ? '<br>🐉 ¡¡JUNTASTE LAS 7!! SHENLONG TE ESPERA EN LA TORRE.' : ''}
            </div>`;
        }
        checkCoupons();
      }
    },
  });
}
