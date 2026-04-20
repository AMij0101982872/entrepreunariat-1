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

alter table products enable row level security;
drop policy if exists "public_all" on products;
create policy "public_all" on products for all using (true) with check (true);
alter publication supabase_realtime add table products;

-- Table messages (historique persistant)
create table if not exists messages (
  id bigserial primary key,
  from_name text not null,
  to_name text,
  text text not null,
  created_at timestamptz default now()
);

alter table messages enable row level security;
drop policy if exists "msgs_all" on messages;
create policy "msgs_all" on messages for all using (true) with check (true);
alter publication supabase_realtime add table messages;
