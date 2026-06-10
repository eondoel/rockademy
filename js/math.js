'use strict';
/* ===== Mundo Matemáticas: Torre de Entrenamiento Z 🐉 =====
   Temario de 1° de secundaria (SEP, México).
   Problemas generados al azar: práctica infinita.
   Cada tema dominado = 1 esfera del dragón. Junta las 7. */

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
function genEnteros() {
  const v = ri(1, 4);
  if (v === 1) {
    const a = ri(-20, 20), b = ri(-20, 20);
    const ans = a + b;
    return {
      text: `${fmtNeg(a)} + ${fmtNeg(b)} = ?`, emoji: '🧮',
      answer: String(ans), options: numOptions(ans, 6),
      note: 'Recuerda: sumar un negativo es restar',
    };
  }
  if (v === 2) {
    const a = ri(-15, 15), b = ri(1, 20);
    const ans = a - b;
    return {
      text: `${fmtNeg(a)} − ${b} = ?`, emoji: '🧮',
      answer: String(ans), options: numOptions(ans, 6),
      note: 'En la recta numérica, restar es moverse a la izquierda',
    };
  }
  if (v === 3) {
    const t = ri(2, 12), drop = ri(5, 20);
    const ans = t - drop;
    return {
      text: `En la Isla Nublar la temperatura era de ${t} °C. En la noche bajó ${drop} °C. ¿Cuál es la temperatura ahora?`,
      emoji: '🦖🌡️', answer: String(ans), options: numOptions(ans, 5),
      note: 'Bajar de temperatura = restar',
    };
  }
  const nivel = ri(5, 30), sube = ri(3, nivel + 15);
  const ans = -nivel + sube;
  return {
    text: `Steve está en el nivel −${nivel} de la mina y sube ${sube} niveles con su escalera. ¿En qué nivel queda?`,
    emoji: '⛏️', answer: String(ans), options: numOptions(ans, 5),
    note: 'Subir = sumar',
  };
}

/* --- 2. Fracciones --- */
function fracStr(n, d) { return `${n}/${d}`; }
function genFracciones() {
  const v = ri(1, 4);
  if (v === 1) {
    const d = pick([4, 6, 8, 10, 12]), mult = d / pick([2]);
    const ans = mult; // 1/2 = x/d
    return {
      text: `Fracciones equivalentes: 1/2 = ?/${d}`, emoji: '🍕',
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
      text: `${fracStr(a, d)} + ${fracStr(b, d)} = ?`, emoji: '➕',
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
      text: `¿Cuál fracción es MAYOR?`, emoji: '⚖️',
      answer: bigger,
      options: shuffle([fracStr(n1, d1), fracStr(n2, d2), 'son iguales', 'no se puede saber']),
      note: 'Compara multiplicando cruzado',
    };
  }
  const d = pick([4, 6, 8]), eaten = ri(1, d - 1);
  const ans = fracStr(d - eaten, d);
  return {
    text: `Reese se comió ${fracStr(eaten, d)} de la pizza. ¿Qué fracción queda para Malcolm?`,
    emoji: '🍕', answer: ans,
    options: optSet(ans, [fracStr(eaten, d), fracStr(d - eaten + 1 > d ? 1 : d - eaten + 1, d), '1/2', fracStr(1, d), fracStr(d - 1, d)]),
    note: 'El total de la pizza es ' + fracStr(d, d),
  };
}

/* --- 3. Decimales --- */
function dec(n) { return (n / 100).toFixed(2).replace(/\.?0+$/, m => m.includes('.') ? '' : m); }
function genDecimales() {
  const v = ri(1, 3);
  if (v === 1) {
    const a = ri(100, 2000), b = ri(100, 2000); // centésimos
    const ans = (a + b) / 100;
    return {
      text: `Una skin cuesta ${a / 100} monedas y un baile ${b / 100}. ¿Cuánto gastas en total?`,
      emoji: '🕺💰', answer: String(ans),
      options: shuffle([String(ans), String((a + b + 100) / 100), String((a + b - 50) / 100), String((a + b) / 10)]),
      note: 'Alinea los puntos decimales para sumar',
    };
  }
  if (v === 2) {
    const a = ri(11, 99) / 10, mult = pick([10, 100]);
    const ans = Math.round(a * mult * 100) / 100;
    return {
      text: `${a} × ${mult} = ?`, emoji: '✖️',
      answer: String(ans),
      options: shuffle([String(ans), String(ans / 10), String(ans * 10), String(ans + 1)]),
      note: `Multiplicar por ${mult} mueve el punto ${mult === 10 ? '1 lugar' : '2 lugares'} a la derecha`,
    };
  }
  const pay = pick([50, 100, 200]), cost = ri(100, pay * 100 - 100);
  const ans = (pay * 100 - cost) / 100;
  return {
    text: `Compras un elixir de ${cost / 100} monedas y pagas con un billete de ${pay}. ¿Cuánto te dan de cambio?`,
    emoji: '🧪', answer: String(ans),
    options: shuffle([String(ans), String(ans + 1), String(Math.max(0.5, ans - 1)), String((pay * 100 - cost + 50) / 100)]),
    note: 'Cambio = lo que pagas − lo que cuesta',
  };
}

/* --- 4. Porcentajes --- */
function genPorcentajes() {
  const v = ri(1, 3);
  const pcts = [10, 20, 25, 50, 75];
  if (v === 1) {
    const p = pick(pcts), base = pick([40, 60, 80, 120, 200, 400]);
    const ans = base * p / 100;
    return {
      text: `¿Cuánto es el ${p}% de ${base}?`, emoji: '📊',
      answer: String(ans), options: numOptions(ans, Math.max(4, Math.round(ans / 4))),
      note: `${p}% = ${p}/100. Multiplica y divide`,
    };
  }
  if (v === 2) {
    const p = pick([10, 25, 50]), base = pick([200, 400, 800, 1200]);
    const ans = base - base * p / 100;
    return {
      text: `Una skin legendaria cuesta ${base} V-monedas y tiene ${p}% de descuento. ¿Cuánto pagas?`,
      emoji: '🛒', answer: String(ans), options: numOptions(ans, Math.round(base / 8)),
      note: 'Calcula el descuento y réstalo al precio',
    };
  }
  const total = pick([10, 20, 50]), parte = ri(1, total - 1);
  const ans = parte * 100 / total;
  return {
    text: `Goku lanzó ${total} ráfagas de ki y ${parte} dieron en el blanco. ¿Qué porcentaje acertó?`,
    emoji: '💥', answer: ans + '%',
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
function genEcuaciones() {
  const v = ri(1, 4);
  const x = ri(2, 12);
  if (v === 1) {
    const a = ri(3, 25);
    return {
      text: `x + ${a} = ${x + a}<br>¿Cuánto vale x?`, emoji: '🧩',
      answer: String(x), options: numOptions(x, 4),
      note: `Resta ${a} de los dos lados`,
    };
  }
  if (v === 2) {
    const a = ri(2, 9);
    return {
      text: `${a}x = ${a * x}<br>¿Cuánto vale x?`, emoji: '🧩',
      answer: String(x), options: numOptions(x, 4),
      note: `Divide los dos lados entre ${a}`,
    };
  }
  if (v === 3) {
    const a = ri(2, 6), b = ri(1, 15);
    return {
      text: `${a}x + ${b} = ${a * x + b}<br>¿Cuánto vale x?`, emoji: '🧩',
      answer: String(x), options: numOptions(x, 4),
      note: `Primero resta ${b}, luego divide entre ${a}`,
    };
  }
  const tarde = ri(10, 30), total = x * 10 + tarde;
  return {
    text: `Goku hizo 10 series de x lagartijas en la mañana y ${tarde} en la tarde. En total hizo ${total}. ¿Cuánto vale x?`,
    emoji: '💪', answer: String(x), options: numOptions(x, 4),
    note: `La ecuación es: 10x + ${tarde} = ${total}`,
  };
}

/* --- 6. Geometría --- */
function genGeometria() {
  const v = ri(1, 4);
  if (v === 1) {
    const a = ri(4, 12), b = ri(3, 9);
    const ans = a * b;
    return {
      text: `Construyes un muro en Minecraft de ${a} bloques de largo y ${b} de alto. ¿Cuántos bloques necesitas?`,
      emoji: '🧱', answer: String(ans), options: numOptions(ans, 8),
      note: 'Área del rectángulo = largo × alto',
    };
  }
  if (v === 2) {
    const a = ri(5, 15), b = ri(4, 12);
    const ans = 2 * (a + b);
    return {
      text: `Pones una cerca alrededor de un corral de ${a} m por ${b} m. ¿Cuántos metros de cerca necesitas?`,
      emoji: '🐮', answer: String(ans), options: numOptions(ans, 6),
      note: 'Perímetro = 2 × (largo + ancho)',
    };
  }
  if (v === 3) {
    const b = pick([4, 6, 8, 10, 12]), h = ri(3, 9);
    const ans = b * h / 2;
    return {
      text: `La vela triangular de tu barco mide ${b} m de base y ${h} m de altura. ¿Cuál es su área?`,
      emoji: '⛵', answer: String(ans) + ' m²',
      options: shuffle([ans + ' m²', (b * h) + ' m²', (ans + 4) + ' m²', Math.max(2, ans - 3) + ' m²']),
      note: 'Área del triángulo = (base × altura) ÷ 2',
    };
  }
  const l = ri(2, 6), w = ri(2, 5), h = ri(2, 4);
  const ans = l * w * h;
  return {
    text: `Un cofre gigante mide ${l} × ${w} × ${h} bloques. ¿Cuántos bloques caben dentro (volumen)?`,
    emoji: '📦', answer: String(ans), options: numOptions(ans, 8),
    note: 'Volumen = largo × ancho × alto',
  };
}

/* --- 7. Probabilidad --- */
function genProbabilidad() {
  const v = ri(1, 3);
  if (v === 1) {
    const casos = pick([
      { q: 'un número PAR', n: 3 },
      { q: 'un número mayor que 4', n: 2 },
      { q: 'el número 6', n: 1 },
      { q: 'un número menor que 3', n: 2 },
    ]);
    const ans = `${casos.n}/6`;
    return {
      text: `Lanzas un dado. ¿Cuál es la probabilidad de sacar ${casos.q}?`,
      emoji: '🎲', answer: ans,
      options: optSet(ans, [`${casos.n + 1}/6`, `${Math.max(1, casos.n - 1)}/6`, `${casos.n}/12`, `${casos.n + 2}/6`, '5/6']),
      note: 'Probabilidad = casos favorables / casos posibles (6)',
    };
  }
  if (v === 2) {
    const esm = ri(2, 5), piedra = ri(3, 7);
    const total = esm + piedra;
    const ans = `${esm}/${total}`;
    return {
      text: `En un cofre hay ${esm} esmeraldas y ${piedra} piedras. Sacas una sin ver. ¿Probabilidad de que sea esmeralda?`,
      emoji: '💚', answer: ans,
      options: optSet(ans, [`${piedra}/${total}`, `${esm}/${piedra}`, `1/${total}`, `${esm + 1}/${total}`, `${esm}/${total + 1}`]),
      note: `Total de objetos: ${total}`,
    };
  }
  const ans = '1/2';
  return {
    text: `Lanzas una moneda para ver quién escoge primero en Fortnite. ¿Probabilidad de que caiga águila?`,
    emoji: '🪙', answer: ans,
    options: shuffle([ans, '1/4', '2/3', '1']),
    note: 'Dos resultados posibles, uno favorable',
  };
}

const MATH_TOPICS = [
  { id: 'enteros', title: 'Números enteros', emoji: '🌡️', desc: 'Positivos y negativos', gen: genEnteros },
  { id: 'fracciones', title: 'Fracciones', emoji: '🍕', desc: 'Partes de un todo', gen: genFracciones },
  { id: 'decimales', title: 'Decimales', emoji: '💰', desc: 'Puntos y monedas', gen: genDecimales },
  { id: 'porcentajes', title: 'Porcentajes', emoji: '📊', desc: 'Descuentos y puntería', gen: genPorcentajes },
  { id: 'ecuaciones', title: 'Ecuaciones', emoji: '🧩', desc: 'Encuentra el valor de x', gen: genEcuaciones },
  { id: 'geometria', title: 'Geometría', emoji: '📐', desc: 'Áreas, perímetros y volumen', gen: genGeometria },
  { id: 'probabilidad', title: 'Probabilidad', emoji: '🎲', desc: '¿Qué tan posible es?', gen: genProbabilidad },
];

function mathProgress() {
  const done = MATH_TOPICS.filter(t => S.math[t.id] && S.math[t.id].done).length;
  return { done, total: MATH_TOPICS.length };
}

function showMathHome() {
  const app = $('#app');
  const p = mathProgress();
  const allDone = p.done === p.total;
  app.innerHTML = `
    <button class="back-link" id="back">← Inicio</button>
    <h1 class="screen-title">🐉 Torre de Entrenamiento Z: Matemáticas</h1>
    <p class="screen-sub">Domina cada tema (8 de 10 aciertos) para ganar una esfera del dragón. ¡Junta las 7 e invoca a Shenlong!</p>
    <div class="collection">
      <span class="c-label">🔮 ESFERAS DEL DRAGÓN (${p.done}/7)</span>
      ${MATH_TOPICS.map((t, i) => {
        const done = S.math[t.id] && S.math[t.id].done;
        return `<span class="c-item ${done ? '' : 'locked'}" title="${esc(t.title)}">${done ? '🟠' : '⚫'}</span>`;
      }).join('')}
      ${allDone ? '<span class="c-item">🐉✨</span>' : ''}
    </div>
    ${allDone ? `<div class="reward-banner"><span class="r-emoji">🐉</span>¡SHENLONG HA SIDO INVOCADO! Dominaste las matemáticas de tu grado. Sigue entrenando para mantener tu poder.</div>` : ''}
    <div class="spacer"></div>
    ${MATH_TOPICS.map((t, idx) => {
      const st = S.math[t.id] || {};
      return `
        <button class="item-card" data-topic="${idx}">
          <span class="item-emoji">${t.emoji}</span>
          <span class="item-body">
            <span class="item-title">${esc(t.title)}</span>
            <span class="item-sub">${esc(t.desc)}${st.best ? ` · Mejor: ${st.best}/10` : ''}</span>
          </span>
          <span class="item-status">${st.done ? '🟠' : '⚫'}</span>
        </button>`;
    }).join('')}
    <p class="center muted" style="margin-top:10px">♾️ Los problemas cambian cada vez: puedes entrenar sin límite.</p>
  `;
  $('#back').addEventListener('click', showHome);
  app.querySelectorAll('[data-topic]').forEach(b =>
    b.addEventListener('click', () => startMathQuiz(+b.dataset.topic)));
}

function startMathQuiz(idx) {
  const t = MATH_TOPICS[idx];
  const qs = [];
  const seen = new Set();
  let guard = 0;
  while (qs.length < 10 && guard++ < 80) {
    const q = t.gen();
    if (seen.has(q.text)) continue; // evitar repetidas en la misma ronda
    seen.add(q.text);
    q.type = 'mc';
    qs.push(q);
  }
  startQuiz({
    qs,
    onBack: showMathHome,
    onDone: (score, total, passed) => {
      const st = S.math[t.id] || { best: 0, done: false };
      st.best = Math.max(st.best || 0, score);
      const firstTime = passed && !st.done;
      if (passed) st.done = true;
      S.math[t.id] = st;
      save();
      if (firstTime) {
        addXP(50);
        const slot = $('#reward-slot');
        if (slot) {
          const p = mathProgress();
          slot.innerHTML = `
            <div class="reward-banner">
              <span class="r-emoji">🟠</span>
              ¡Ganaste la esfera de ${esc(t.title)}! Llevas ${p.done} de 7.
              ${p.done === 7 ? '<br>🐉 ¡¡JUNTASTE LAS 7!! Ve a la Torre a invocar a Shenlong.' : ''}
            </div>`;
        }
      }
    },
  });
}
