// Validador de contenido (uso interno, no se carga en la app)
// node validate.mjs
import fs from 'fs';

global.window = { addEventListener() {} };
try { Object.defineProperty(global, 'navigator', { value: { userAgent: 'node' }, configurable: true }); } catch (e) {}
global.document = { querySelector: () => null, addEventListener: () => {}, createElement: () => ({ getContext: () => ({}) }) };
global.localStorage = { getItem: () => null, setItem: () => {} };
global.speechSynthesis = undefined;

const src = ['js/core.js', 'js/english.js', 'js/math.js', 'js/general.js', 'js/tech.js']
  .map(f => fs.readFileSync(f, 'utf8').replace(/'use strict';/, ''))
  .join('\n');

const test = `
const issues = [];
const IMG_KEYS = Object.keys(IMG);

// valida que toda imagen referida exista en IMG y que las MC sean correctas
function checkQ(q, ctx) {
  if (q.img && !IMG[q.img]) issues.push(ctx + ': img inexistente "' + q.img + '"');
  if (q.type === 'pickimg') {
    q.options.forEach(k => { if (!IMG[k]) issues.push(ctx + ': pickimg opción "' + k + '" no existe'); });
    if (!q.options.includes(q.answer)) issues.push(ctx + ': pickimg sin respuesta');
  }
  if (q.type === 'mc') {
    if (!q.options.includes(q.answer)) issues.push(ctx + ': mc respuesta "' + q.answer + '" fuera de [' + q.options + ']');
    if (new Set(q.options).size !== q.options.length) issues.push(ctx + ': mc opciones duplicadas [' + q.options + ']');
  }
  if (q.type === 'order') {
    if (!Array.isArray(q.tokens) || q.tokens.length < 2) issues.push(ctx + ': order sin tokens');
  }
  if (q.type === 'match') {
    if (!Array.isArray(q.pairs) || q.pairs.length < 2) issues.push(ctx + ': match sin pares');
  }
  if (q.type === 'bits') {
    if (q.target < 0 || q.target > 15) issues.push(ctx + ': bits fuera de 0-15 (' + q.target + ')');
  }
}

// ===== INGLÉS =====
for (const u of ENGLISH_UNITS) {
  if (!IMG[u.img]) issues.push('english ' + u.id + ': img unidad inexistente ' + u.img);
  if (!IMG[u.dinoImg]) issues.push('english ' + u.id + ': dinoImg inexistente ' + u.dinoImg);
  for (let s = 0; s < 3; s++) {
    for (let r = 0; r < 20; r++) {
      const qs = buildEnglishLesson(u, s);
      const scored = qs.filter(q => q.type !== 'info').length;
      if (scored < 8) issues.push('english ' + u.id + ' L' + s + ': solo ' + scored + ' ejercicios');
      qs.forEach(q => checkQ(q, 'english ' + u.id + ' L' + s));
    }
  }
  for (let r = 0; r < 30; r++) {
    const ex = buildEnglishExam(u);
    if (ex.length < 12) issues.push('english ' + u.id + ' examen: ' + ex.length + ' preguntas');
    ex.forEach(q => checkQ(q, 'english ' + u.id + ' examen'));
  }
}

// ===== GRAMÁTICA =====
for (const u of GRAMMAR_UNITS) {
  if (!IMG[u.img]) issues.push('grammar ' + u.id + ': img inexistente ' + u.img);
  if (!IMG[u.ally]) issues.push('grammar ' + u.id + ': ally inexistente ' + u.ally);
  for (let s = 0; s < u.subs.length; s++) {
    for (let r = 0; r < 30; r++) {
      const qs = buildGrammarLesson(u, s);
      const scored = qs.filter(q => q.type !== 'info').length;
      if (scored < 9) issues.push('grammar ' + u.id + ' L' + s + ': solo ' + scored + ' ejercicios');
      qs.forEach(q => checkQ(q, 'grammar ' + u.id + ' L' + s));
    }
  }
  for (let r = 0; r < 40; r++) {
    const ex = buildGrammarExam(u);
    if (ex.length < 12) issues.push('grammar ' + u.id + ' examen: ' + ex.length);
    ex.forEach(q => checkQ(q, 'grammar ' + u.id + ' examen'));
  }
}

// ===== MATEMÁTICAS =====
for (const t of MATH_TOPICS) {
  if (!IMG[t.img]) issues.push('math ' + t.id + ': img inexistente ' + t.img);
  for (let s = 0; s < t.subs.length; s++) {
    for (let r = 0; r < 30; r++) {
      const qs = buildMathQuiz(t, t.subs[s].vs, 10);
      if (qs.length < 10) issues.push('math ' + t.id + ' L' + s + ': ' + qs.length + ' problemas');
      qs.forEach(q => checkQ(q, 'math ' + t.id + ' L' + s));
    }
  }
  for (let r = 0; r < 40; r++) {
    const ex = buildMathQuiz(t, t.subs[t.subs.length-1].vs, 12);
    if (ex.length < 12) issues.push('math ' + t.id + ' examen: ' + ex.length);
    ex.forEach(q => checkQ(q, 'math ' + t.id + ' examen'));
  }
}

// ===== CONOCIMIENTOS GENERALES =====
let bankTotal = 0;
for (const t of GENERAL_TOPICS) {
  if (!IMG[t.img]) issues.push('general ' + t.id + ': img inexistente ' + t.img);
  if (!IMG[t.relic]) issues.push('general ' + t.id + ': relic inexistente ' + t.relic);
  if (t.bank.length < 18) issues.push('general ' + t.id + ': banco pequeño (' + t.bank.length + ')');
  bankTotal += t.bank.length;
  for (let r = 0; r < 30; r++) {
    buildGeneralQuiz(t, 10).forEach(q => checkQ(q, 'general ' + t.id));
    buildGeneralQuiz(t, 12).forEach(q => checkQ(q, 'general ' + t.id + ' examen'));
  }
}

// ===== TECNOLOGÍA: Compu-Lab + Claude =====
for (const sub of COMPLAB_SUBS) sub.build().forEach(q => checkQ(q, 'complab ' + sub.t));
for (let r = 0; r < 30; r++) buildComplabExam().forEach(q => checkQ(q, 'complab examen'));
for (const l of CLAUDE_LESSONS) l.build().forEach(q => checkQ(q, 'claude ' + l.id));
for (let r = 0; r < 30; r++) buildClaudeExam().forEach(q => checkQ(q, 'claude examen'));

// ===== ROBOT (solubilidad) =====
const SOLS = [
  { m: ['F','F','F'] }, { m: ['F','F','F','F','F'] }, { m: ['R','F','F'] }, { m: ['L','F','F'] },
  { m: ['F','F','R','F','F'] }, { m: ['F','R','F','L','F','R','F','L','F','R','F'] },
  { m: ['F','F','F','F','F','R','F','F','R','F','F','F','F','F'] },
  { m: ['F1','F1','F','R','F'], f1: ['F','R','F','L'] },
  { m: ['F1'], f1: ['F','R','F','L','F1'] }, { m: ['F1'], f1: ['F','F','F','R','F1'] },
  { m: ['F1','F1','F','R','F','F','F'], f1: ['F','R','F','L'] },
];
if (SOLS.length !== ROBOT_LEVELS.length) issues.push('robot: faltan soluciones (' + SOLS.length + '/' + ROBOT_LEVELS.length + ')');
ROBOT_LEVELS.forEach((lv, i) => {
  const sol = SOLS[i] || {}, f1 = sol.f1 || [];
  if (!sol.m) return;
  const rows = lv.grid.length, cols = lv.grid[0].length;
  let pos = null;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (lv.grid[r][c] === 'S') pos = [r, c];
  const steps = [];
  (function walk(list, depth) {
    for (const cm of list) { if (steps.length >= 200) return; if (cm === 'F1') { if (depth < 40) walk(f1, depth+1); } else steps.push(cm); }
  })(sol.m, 0);
  let [r, c] = pos, dir = lv.dir, won = false, dead = false;
  const ORD = ['N','E','S','W'], DV = { N:[-1,0], E:[0,1], S:[1,0], W:[0,-1] };
  for (const cm of steps) {
    if (cm === 'L') dir = ORD[(ORD.indexOf(dir)+3)%4];
    else if (cm === 'R') dir = ORD[(ORD.indexOf(dir)+1)%4];
    else { const [dr,dc] = DV[dir]; r += dr; c += dc; if (r<0||c<0||r>=rows||c>=cols||lv.grid[r][c]==='#') { dead = true; break; } }
    if (lv.grid[r] && lv.grid[r][c] === 'D') { won = true; break; }
  }
  if (dead) issues.push('robot L' + (i+1) + ': MUERE');
  else if (!won) issues.push('robot L' + (i+1) + ': no llega');
});

if (issues.length) { console.log('❌ ' + issues.length + ' PROBLEMAS:\\n' + issues.slice(0, 30).join('\\n')); process.exit(1); }
const totalQ = ENGLISH_UNITS.length + MATH_TOPICS.length + GENERAL_TOPICS.length;
console.log('✅ TODO OK · ' + ENGLISH_UNITS.length + ' unidades inglés + ' + GRAMMAR_UNITS.length + ' de gramática, ' + MATH_TOPICS.length + ' temas mate, '
  + GENERAL_TOPICS.length + ' temas generales (' + bankTotal + ' preguntas de banco), Compu-Lab + Claude, '
  + ROBOT_LEVELS.length + ' niveles robot resolubles');
`;

(0, eval)(src + test);
