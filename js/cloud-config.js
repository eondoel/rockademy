'use strict';
/* Configuración de Supabase (Settings → API en tu proyecto).
   La "anon/publishable key" es pública por diseño: la seguridad
   la ponen las políticas RLS de supabase/schema.sql.
   Si dejas los campos vacíos, la app funciona en modo local. */
const CLOUD_CONFIG = {
  url: 'https://ddajosklxoqknrdswyos.supabase.co',
  anonKey: 'sb_publishable_1cLt-xzAhNi2mAiz1voaVw_w0jIpInh',
};
