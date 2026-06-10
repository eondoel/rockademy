-- Rockademy / Academia Multiverso
-- Pega TODO este archivo en: Supabase Dashboard → SQL Editor → Run
--
-- Además, en Authentication → Sign In / Providers → Email:
--   desactiva "Confirm email" (los perfiles usan correos sintéticos
--   usuario@rockademy.app que no pueden recibir correos).

create table if not exists public.rockademy_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.rockademy_progress enable row level security;

-- Cada quien solo puede ver y editar SU propio progreso
create policy "leer mi progreso"
  on public.rockademy_progress for select
  using (auth.uid() = user_id);

create policy "crear mi progreso"
  on public.rockademy_progress for insert
  with check (auth.uid() = user_id);

create policy "actualizar mi progreso"
  on public.rockademy_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
