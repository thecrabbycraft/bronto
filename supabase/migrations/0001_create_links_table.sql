drop table public.links;
create table public.links (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug varchar(200) unique not null,
  original_url text not null,
  total_clicks integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone,
  constraint slug_length check (char_length(slug) >= 3)
);
alter table links enable row level security;
create policy "Allow public read access" on links for select using (true);
create policy "Allow insert access" on links for insert with check (true);
create policy "Allow update access for total_clicks by everyone"
  on links for update to authenticated, anon using (true);

-- Set up Realtime for links table!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table links;

-- Insert initial data
insert into public.links (title, original_url, slug, total_clicks) values
    ('Feelantera Services Status', 'https://status.feel.co.id', 'status', 0),
    ('Test your internet speeds', 'https://fltr.speedtestcustom.com', 'speedtest', 6),
    ('Feelantera Media Kit', 'https://drive.google.com/drive/folders/1TzS7dn5oHpLrJh3eLZa40zSwjiFEQbSL?usp=sharing', 'mediakit', 9),
    ('Supabase Expert Partner Listing - Google Docs', 'https://docs.google.com/document/d/18HhSlI7fRYvUVBWKaveM3Y15L8YOyaoCIVptA6TeAXY/edit?usp=sharing', 'JHNHkt', 6),
    ('Feelantera at Twitter', 'https://twitter.com/feelantera', 'twitter', 0),
    ('Feelantera at Github', 'https://github.com/feelantera', 'github', 0),
    ('Feelantera at LinkedIn', 'https://www.linkedin.com/company/feelantera', 'linkedin', 3),
    ('Feelantera at Instagram', 'https://www.instagram.com/feelantera', 'instagram', 0),
    ('Feelantera at Facebook', 'https://www.facebook.com/feelantera', 'facebook', 0),
    ('Apps by Feelantera on Google Play', 'https://play.google.com/store/apps/dev?id=6084870988135655379', 'playstore', 1);
