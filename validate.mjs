// Validador de contenido (uso interno, no se carga en la app)
import fs from 'fs';

global.window = {};
global.document = { querySelector: () => null, addEventListener: () => {} };
global.localStorage = { getItem: () => null, setItem: () => {} };

const src = ['js/core.js', 'js/english.js', 'js/math.js', 'js/tech.js']
  .map(f => fs.readFileSync(f, 'utf8').replace(/'use strict';/, ''))
  .join('\n');

const test = `
const issues = [];
// Matemáticas: 300 preguntas por tema
for (const t of MATH_TOPICS) {
  for (let i = 0; i < 300; i++) {
    const q = t.gen();
    if (!q.options.includes(String(q.answer))) issues.push(t.id + ': respuesta fuera de opciones: ' + q.answer + ' | [' + q.options + '] | ' + q.text);
    if (new Set(q.options).size !== 4) issues.push(t.id + ': opciones no únicas: [' + q.options + ']');
  }
}
// Inglés: 50 rondas por unidad
for (const u of ENGLISH_UNITS) {
  for (let r = 0; r < 50; r++) {
    const qs = buildEnglishQuestions(u);
    if (qs.length !== 10) issues.push(u.id + ': ' + qs.length + ' preguntas');
    for (const q of qs) {
      if (q.type === 'mc' && (!q.options.includes(q.answer) || new Set(q.options).size !== q.options.length)) issues.push(u.id + ': mc inválida [' + q.options + ']');
      if (q.type === 'spell' && !/^[a-z]{3,8}$/.test(q.word)) issues.push(u.id + ': spell ' + q.word);
    }
  }
}
// Robot: simular soluciones conocidas
const SOLS = [
  { m: ['F','F','F'] },
  { m: ['F','F','F','F','F'] },
  { m: ['R','F','F'] },
  { m: ['L','F','F'] },
  { m: ['F','F','R','F','F'] },
  { m: ['F','R','F','L','F','R','F','L','F','R','F'] },
  { m: ['F','F','F','F','F','R','F','F','R','F','F','F','F','F'] },
  { m: ['F1','F1','F','R','F'], f1: ['F','R','F','L'] },
  { m: ['F1'], f1: ['F','R','F','L','F1'] },
  { m: ['F1'], f1: ['F','F','F','R','F1'] },
  { m: ['F1','F1','F','R','F','F','F'], f1: ['F','R','F','L'] },
];
if (SOLS.length !== ROBOT_LEVELS.length) issues.push('robot: faltan soluciones de prueba (' + SOLS.length + ' vs ' + ROBOT_LEVELS.length + ' niveles)');
ROBOT_LEVELS.forEach((lv, i) => {
  const sol = SOLS[i], f1 = sol.f1 || [];
  if (sol.m.length > lv.maxMain) issues.push('robot L' + (i+1) + ': solución no cabe en main (' + sol.m.length + '>' + lv.maxMain + ')');
  if (f1.length > lv.maxF1) issues.push('robot L' + (i+1) + ': solución no cabe en F1');
  const rows = lv.grid.length, cols = lv.grid[0].length;
  let pos = null;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (lv.grid[r][c] === 'S') pos = [r, c];
  const steps = [];
  (function walk(list, depth) {
    for (const cm of list) {
      if (steps.length >= 200) return;
      if (cm === 'F1') { if (depth < 40) walk(f1, depth + 1); }
      else steps.push(cm);
    }
  })(sol.m, 0);
  let [r, c] = pos, dir = lv.dir, won = false, dead = false;
  const ORD = ['N','E','S','W'], DV = { N: [-1,0], E: [0,1], S: [1,0], W: [0,-1] };
  for (const cm of steps) {
    if (cm === 'L') dir = ORD[(ORD.indexOf(dir)+3)%4];
    else if (cm === 'R') dir = ORD[(ORD.indexOf(dir)+1)%4];
    else { const [dr,dc] = DV[dir]; r += dr; c += dc;
      if (r<0||c<0||r>=rows||c>=cols||lv.grid[r][c]==='#') { dead = true; break; } }
    if (lv.grid[r] && lv.grid[r][c] === 'D') { won = true; break; }
  }
  if (dead) issues.push('robot L' + (i+1) + ': la solución MUERE en (' + r + ',' + c + ')');
  else if (!won) issues.push('robot L' + (i+1) + ': la solución no llega al diamante');
});
if (issues.length) { console.log(issues.slice(0, 20).join('\\n')); process.exit(1); }
console.log('TODO OK: ' + MATH_TOPICS.length * 300 + ' preguntas de mate, ' + ENGLISH_UNITS.length * 50 + ' rondas de inglés, ' + ROBOT_LEVELS.length + ' niveles de robot resolubles');
`;

(0, eval)(src + test);
