// Edge Function "admin" — gestión de cuentas SOLO para el perfil de papá (dodo).
//
// La llave service_role vive aquí en el servidor de Supabase (variable de entorno
// inyectada automáticamente), nunca en la app ni en el repo. La función verifica
// que quien llama esté autenticado como dodo@rockademy.app antes de hacer nada.
//
// Desplegar: ver supabase/DEPLOY-FUNCION.md

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const PARENT_EMAIL = 'dodo@rockademy.app';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization') || '';

    // 1) ¿Quién llama? Debe ser dodo, autenticado.
    const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: uerr } = await userClient.auth.getUser();
    if (uerr || !user) return json({ ok: false, error: 'Sesión no válida. Vuelve a entrar como dodo.' }, 401);
    if (user.email !== PARENT_EMAIL) return json({ ok: false, error: 'Solo el perfil de papá (dodo) puede gestionar cuentas.' }, 403);

    // 2) Acción solicitada
    const { action, userId, password } = await req.json();
    if (!userId) return json({ ok: false, error: 'Falta indicar el usuario.' });
    if (userId === user.id) return json({ ok: false, error: 'No puedes borrar ni cambiar tu propia cuenta de papá desde aquí.' });

    const admin = createClient(url, service);

    if (action === 'delete') {
      const { error } = await admin.auth.admin.deleteUser(userId);
      if (error) return json({ ok: false, error: error.message });
      await admin.from('rockademy_progress').delete().eq('user_id', userId);
      return json({ ok: true });
    }

    if (action === 'setPassword') {
      if (!password || String(password).length < 6) {
        return json({ ok: false, error: 'La contraseña debe tener al menos 6 caracteres.' });
      }
      const { error } = await admin.auth.admin.updateUserById(userId, { password: String(password) });
      if (error) return json({ ok: false, error: error.message });
      return json({ ok: true });
    }

    return json({ ok: false, error: 'Acción desconocida.' });
  } catch (e) {
    return json({ ok: false, error: String((e as Error)?.message || e) }, 500);
  }
});
