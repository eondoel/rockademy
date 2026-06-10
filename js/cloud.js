'use strict';
/* ===== Nube: cuentas y guardado en Supabase =====
   Cada perfil tiene usuario + contraseña. El usuario se convierte en un
   correo sintético (usuario@rockademy.app) para Supabase Auth.
   El progreso completo (S) se guarda como JSON en rockademy_progress. */

const CLOUD_EMAIL_DOMAIN = 'rockademy.app';
const GUEST_FLAG = 'rockademy-guest';

let sb = null;
let cloudUser = null;   // { id, username }
let cloudTimer = null;

function cloudConfigured() {
  return typeof CLOUD_CONFIG !== 'undefined' && !!CLOUD_CONFIG.url && !!CLOUD_CONFIG.anonKey
    && typeof supabase !== 'undefined';
}

async function initCloud() {
  if (!cloudConfigured()) return startLocal();
  sb = supabase.createClient(CLOUD_CONFIG.url, CLOUD_CONFIG.anonKey);
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session) {
      setCloudUser(session.user);
      await pullProgress();
      showHome();
      return;
    }
  } catch (e) { /* sin red: seguir local */ }
  if (localStorage.getItem(GUEST_FLAG) === '1') return startLocal();
  showLoginScreen();
}

function startLocal() {
  showHome();
  if (!S.name) askName(false);
}

function setCloudUser(u) {
  cloudUser = { id: u.id, username: (u.email || '').split('@')[0] };
}

function applyCloudData(data) {
  S = Object.assign(structuredClone(DEFAULT_STATE), data);
  S.claude = Object.assign(structuredClone(DEFAULT_STATE.claude), data.claude || {});
  S.streak = Object.assign(structuredClone(DEFAULT_STATE.streak), data.streak || {});
  localStorage.setItem(STORE_KEY, JSON.stringify(S));
  renderHeader();
}

async function pullProgress() {
  const { data, error } = await sb.from('rockademy_progress')
    .select('data').eq('user_id', cloudUser.id).maybeSingle();
  if (error) return;
  if (data && data.data && typeof data.data === 'object') {
    applyCloudData(data.data);
  } else {
    await pushProgress(); // cuenta nueva en este dispositivo: sube lo local
  }
}

async function pushProgress() {
  if (!sb || !cloudUser) return;
  try {
    await sb.from('rockademy_progress')
      .upsert({ user_id: cloudUser.id, data: S, updated_at: new Date().toISOString() });
  } catch (e) { /* sin red: queda el respaldo local */ }
}

/* core.js llama esto en cada save() */
function scheduleCloudSave() {
  if (!sb || !cloudUser) return;
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(pushProgress, 1200);
}
window.addEventListener('beforeunload', () => {
  if (cloudTimer) { clearTimeout(cloudTimer); pushProgress(); }
});

function usernameToEmail(u) { return u.toLowerCase() + '@' + CLOUD_EMAIL_DOMAIN; }

const CLOUD_ERRORS = [
  [/invalid login credentials/i, 'Usuario o contraseña incorrectos'],
  [/already registered|already exists/i, 'Ese nombre de guerrero ya existe. Elige otro o inicia sesión.'],
  [/at least 6|password should be/i, 'La contraseña debe tener al menos 6 letras o números'],
  [/rate limit|too many/i, 'Demasiados intentos. Espera un minuto e inténtalo de nuevo.'],
  [/failed to fetch|network/i, 'Sin conexión a internet. Revisa tu red.'],
];
function friendlyError(msg) {
  for (const [re, t] of CLOUD_ERRORS) if (re.test(msg)) return t;
  return 'Algo salió mal: ' + msg;
}

async function cloudRegister(username, password) {
  const { data, error } = await sb.auth.signUp({ email: usernameToEmail(username), password });
  if (error) throw new Error(friendlyError(error.message));
  if (!data.session) {
    throw new Error('El proyecto de Supabase pide confirmar correo. Desactiva "Confirm email" en Authentication → Sign In / Providers.');
  }
  setCloudUser(data.session.user);
  if (!S.name) { S.name = username; }
  localStorage.removeItem(GUEST_FLAG);
  await pushProgress(); // el avance local (modo invitado) pasa a la cuenta nueva
  save();
}

async function cloudLogin(username, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email: usernameToEmail(username), password });
  if (error) throw new Error(friendlyError(error.message));
  setCloudUser(data.user);
  localStorage.removeItem(GUEST_FLAG);
  await pullProgress();
}

async function cloudLogout() {
  try { clearTimeout(cloudTimer); await pushProgress(); await sb.auth.signOut(); } catch (e) { }
  cloudUser = null;
  localStorage.removeItem(STORE_KEY);
  S = loadState();
  renderHeader();
  showLoginScreen();
}

/* ---------- Pantalla de entrada ---------- */
function showLoginScreen(msg) {
  const app = $('#app');
  app.innerHTML = `
    <div class="end-card" style="max-width:440px;margin:24px auto">
      <div style="font-size:3rem">🌌</div>
      <h2>Academia Multiverso</h2>
      <p class="muted" style="margin:6px 0 18px">Entra con tu perfil de guerrero para que tu poder te siga a cualquier dispositivo. ⚡</p>
      <input id="lg-user" class="login-input" maxlength="16" placeholder="Nombre de guerrero" autocomplete="username">
      <input id="lg-pass" class="login-input" type="password" maxlength="40" placeholder="Contraseña" autocomplete="current-password">
      <div class="q-note" id="lg-msg" style="color:var(--red)">${msg ? esc(msg) : ''}</div>
      <div class="btn-row" style="justify-content:center">
        <button class="btn" id="lg-in">🚪 Entrar</button>
        <button class="btn teal" id="lg-new">✨ Crear cuenta</button>
      </div>
      <div class="footer-links" style="margin-top:14px">
        <button id="lg-guest">Jugar sin cuenta (solo en este dispositivo)</button>
      </div>
    </div>
  `;
  const userEl = $('#lg-user'), passEl = $('#lg-pass'), msgEl = $('#lg-msg');
  userEl.focus();

  function setMsg(t, ok) {
    msgEl.style.color = ok ? 'var(--green)' : 'var(--red)';
    msgEl.textContent = t;
  }
  function validate() {
    const u = userEl.value.trim();
    if (!/^[a-zA-Z0-9_]{3,16}$/.test(u)) {
      setMsg('El nombre: de 3 a 16 letras, números o _ (sin espacios ni acentos)');
      return null;
    }
    if (passEl.value.length < 6) {
      setMsg('La contraseña debe tener al menos 6 letras o números');
      return null;
    }
    return { u, p: passEl.value };
  }
  async function go(fn, label) {
    const v = validate();
    if (!v) return;
    setMsg(label + '…', true);
    try {
      await fn(v.u, v.p);
      sfxWin();
      showHome();
    } catch (e) {
      setMsg(e.message);
      sfxBad();
    }
  }
  $('#lg-in').addEventListener('click', () => go(cloudLogin, 'Entrando'));
  $('#lg-new').addEventListener('click', () => go(cloudRegister, 'Creando tu cuenta'));
  passEl.addEventListener('keydown', e => { if (e.key === 'Enter') go(cloudLogin, 'Entrando'); });
  $('#lg-guest').addEventListener('click', () => {
    localStorage.setItem(GUEST_FLAG, '1');
    startLocal();
  });
}

/* Botón de cuenta para el pie de la pantalla de inicio */
function accountFooterHTML() {
  if (!cloudConfigured()) return '';
  return cloudUser
    ? `<button id="go-account">👤 ${esc(cloudUser.username)} · cerrar sesión</button>`
    : `<button id="go-account">☁️ Entrar / crear cuenta</button>`;
}
function bindAccountFooter() {
  const b = $('#go-account');
  if (!b) return;
  b.addEventListener('click', () => {
    if (!cloudUser) { localStorage.removeItem(GUEST_FLAG); showLoginScreen(); return; }
    showModal(`
      <h2>👤 ${esc(cloudUser.username)}</h2>
      <p>Tu avance ya está guardado en la nube. ¿Cerrar sesión en este dispositivo?</p>
      <div class="btn-row" style="justify-content:center">
        <button class="btn secondary" data-close>Cancelar</button>
        <button class="btn" id="acc-out">Cerrar sesión</button>
      </div>
    `);
    $('#acc-out').addEventListener('click', () => { closeModal(); cloudLogout(); });
  });
}
