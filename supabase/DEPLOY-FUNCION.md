# Desplegar la función "admin" (gestión de cuentas desde el Panel de Papá)

Esta función permite que el perfil **dodo** cambie contraseñas y borre cuentas
de forma segura. La llave maestra vive en el servidor de Supabase, nunca en la app.

Solo hay que hacerlo **una vez**. Dos caminos: el del Dashboard (sin instalar nada)
o el de la terminal (CLI).

## Opción A — Desde el Dashboard (recomendada, sin instalar nada)

1. Entra a tu proyecto en [supabase.com/dashboard](https://supabase.com/dashboard).
2. Menú izquierdo → **Edge Functions**.
3. Botón **"Deploy a new function"** (o **"Create a new function"** → editor).
4. Nombre exacto de la función: **`admin`**
5. Borra el código de ejemplo y pega TODO el contenido de
   [`supabase/functions/admin/index.ts`](functions/admin/index.ts).
6. Si te pregunta por **"Verify JWT"**, déjalo **activado** (ON). 
7. Botón **Deploy**. Espera a que diga que quedó activa.

> Las llaves `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`
> ya existen automáticamente en las Edge Functions: no tienes que configurar nada más.

## Opción B — Desde la terminal (CLI)

```bash
# instalar la CLI (una vez)
brew install supabase/tap/supabase     # en Mac
# iniciar sesión y enlazar el proyecto
supabase login
supabase link --project-ref ddajosklxoqknrdswyos
# desplegar
supabase functions deploy admin
```

## Probar que funcionó

1. Entra a la app como **dodo**.
2. Ve a **Panel de Papá** → toca una tarjeta de un alumno para expandirla.
3. Abajo verás **🔑 Cambiar contraseña** y **🗑️ Borrar cuenta**.
4. Si al usarlos sale "Falta desplegar la función admin…", revisa que el nombre
   de la función sea exactamente `admin` y que el deploy haya terminado.

## Seguridad

- La función rechaza a cualquiera que no sea `dodo@rockademy.app`.
- No permite que dodo se borre o cambie a sí mismo.
- La llave `service_role` solo existe dentro de la función (servidor), nunca en el
  navegador ni en el repositorio.
