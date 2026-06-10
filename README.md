# 🌌 Rockademy — Academia Multiverso

App web educativa y gamificada para aprender **inglés desde cero**, **matemáticas de 1° de secundaria (SEP)** y **tecnología** (lógica de programación + uso responsable de la IA), con temática de Dragon Ball, Jurassic Park, Minecraft, Fortnite y Malcolm el de enmedio. Proyecto personal sin fines de lucro.

## Cómo funciona

- **🦖 Isla Jurásica (inglés):** 12 unidades con audio (voz del navegador), tarjetas y misiones. Cada unidad ganada hace nacer un dino.
- **🐉 Torre Z (matemáticas):** 7 temas con problemas generados al azar. Cada tema dominado da una esfera del dragón.
- **💎 Mundo Tecnología:** Robo-Steve (11 niveles de lógica: secuencias → funciones → bucles) y la Academia Claude (prompts, seguridad y misiones reales con IA).
- **Gamificación:** XP, rangos, nivel de poder, racha diaria, colecciones.

## Correr en local

Es un sitio 100% estático (sin build):

```bash
npx http-server . -p 4173
# abre http://localhost:4173
```

Validar el contenido (generadores de problemas y niveles del robot):

```bash
node validate.mjs
```

## Cuentas y guardado en la nube (Supabase)

Sin configurar nada, la app guarda el progreso en el navegador (localStorage). Para tener **perfiles con usuario y contraseña** sincronizados entre dispositivos:

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, pega y ejecuta [`supabase/schema.sql`](supabase/schema.sql).
3. En **Authentication → Sign In / Providers → Email**, desactiva **"Confirm email"** (los perfiles usan correos sintéticos `usuario@rockademy.app`).
4. Copia de **Settings → API** la URL del proyecto y la *anon/publishable key*, y pégalas en [`js/cloud-config.js`](js/cloud-config.js).

La anon key es pública por diseño; la seguridad la dan las políticas RLS (cada usuario solo puede leer/escribir su propio progreso). Sin internet, la app sigue funcionando con el respaldo local y sincroniza al volver.

> Nota: no hay recuperación de contraseña (no hay correos reales). Papá/mamá: guarden las contraseñas en un lugar seguro.

## Desplegar en Vercel

Es estático, así que: **Add New → Project → importar este repo**, framework preset **Other**, sin build command, output directory `./`. Cada push a `main` redespliega.
