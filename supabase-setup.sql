-- Colle ce SQL dans Supabase > SQL Editor > New query > Run

-- Table produits (boutique)
create table if not exists products (
  id bigserial primary key,
  name text not null,
  price text,
  description text,
  emoji text default '📦',
  owner text,
  created_at timestamptz default now()
);

-- Activer RLS + autoriser tout (demo)
alter table products enable row level security;
drop policy if exists "public_all" on products;
create policy "public_all" on products for all using (true) with check (true);

-- Activer Realtime sur la table
alter publication supabase_realtime add table products;
