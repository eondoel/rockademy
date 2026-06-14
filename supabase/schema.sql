-- Rockademy / Academia Multiverso
-- Pega TODO este archivo en: Supabase Dashboard → SQL Editor → Run
-- (Es seguro correrlo de nuevo aunque ya lo hayas ejecutado antes.)
--
-- Además, en Authentication → Sign In / Providers → Email:
--   desactiva "Confirm email" (los perfiles usan correos sintéticos
--   usuario@rockademy.app que no pueden recibir correos).

create table if not exists public.rockademy_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  username   text,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- columna username para identificar perfiles en el Panel de Papá
alter table public.rockademy_progress add column if not exists username text;

alter table public.rockademy_progress enable row level security;

-- Cada quien solo puede ver y editar SU propio progreso
drop policy if exists "leer mi progreso" on public.rockademy_progress;
create policy "leer mi progreso"
  on public.rockademy_progress for select
  using (auth.uid() = user_id);

drop policy if exists "crear mi progreso" on public.rockademy_progress;
create policy "crear mi progreso"
  on public.rockademy_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "actualizar mi progreso" on public.rockademy_progress;
create policy "actualizar mi progreso"
  on public.rockademy_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- El perfil de papá (dodo@rockademy.app) puede LEER el progreso de todos
-- para el Panel de Papá. Sigue sin poder modificar el de nadie más.
drop policy if exists "dodo ve todo" on public.rockademy_progress;
create policy "dodo ve todo"
  on public.rockademy_progress for select
  using ( (auth.jwt() ->> 'email') = 'dodo@rockademy.app' );
