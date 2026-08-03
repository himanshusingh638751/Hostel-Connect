-- Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar TEXT,
  year TEXT,
  role TEXT,
  hostel_block TEXT,
  room_number TEXT,
  department TEXT,
  phone TEXT,
  bio TEXT,
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  verified_student BOOLEAN DEFAULT false,
  badges TEXT[],
  password TEXT 
);

-- Enable RLS and create public policies (since we are not using Supabase Auth)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on users" ON public.users;
CREATE POLICY "Allow public read access on users" ON public.users FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on users" ON public.users;
CREATE POLICY "Allow public insert access on users" ON public.users FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on users" ON public.users;
CREATE POLICY "Allow public update access on users" ON public.users FOR UPDATE USING (true);

-- Create Conversations Table
CREATE TABLE IF NOT EXISTS public.conversations (
  id TEXT PRIMARY KEY,
  participant_ids TEXT[],
  last_message TEXT,
  last_message_timestamp TIMESTAMPTZ DEFAULT NOW(),
  unread_count JSONB DEFAULT '{}'::jsonb,
  related_item_id TEXT,
  related_item_title TEXT
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on conversations" ON public.conversations;
CREATE POLICY "Allow public read access on conversations" ON public.conversations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on conversations" ON public.conversations;
CREATE POLICY "Allow public insert access on conversations" ON public.conversations FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on conversations" ON public.conversations;
CREATE POLICY "Allow public update access on conversations" ON public.conversations FOR UPDATE USING (true);

-- Create Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  item_id TEXT,
  item_snapshot JSONB
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public read access on chat_messages" ON public.chat_messages FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public insert access on chat_messages" ON public.chat_messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public update access on chat_messages" ON public.chat_messages FOR UPDATE USING (true);

-- Seed initial mock data
INSERT INTO public.users (id, name, email, avatar, year, role, hostel_block, room_number, department, phone, bio, rating, review_count, verified_student, badges, password)
VALUES
('usr_rohan', 'Rohan Sharma', 'rohan.s@hostel.edu', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', '4th Year (Senior)', 'Senior', 'Block B4 (Boys)', '302', 'Computer Science & Engg', '+91 98765 43210', '4th Year CS Major.', 4.9, 24, true, ARRAY['Top Seller', 'Senior Mentor'], 'password123'),
('usr_aarav', 'Aarav Patel', 'aarav.p@hostel.edu', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200', '1st Year (Junior)', 'Junior', 'Block B1 (Boys)', '105', 'Electrical Engineering', '+91 91234 56789', 'Freshie in Electrical Engg.', 5.0, 3, true, ARRAY['Freshie 2026'], 'password123'),
('usr_ananya', 'Ananya Verma', 'ananya.v@hostel.edu', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', '3rd Year (Senior)', 'Hostel Rep', 'Block G2 (Girls)', '204', 'Mechanical Engineering', '+91 99887 76655', 'G2 Girls Hostel Rep.', 4.8, 19, true, ARRAY['Hostel Rep'], 'password123')
ON CONFLICT (id) DO NOTHING;

-- Create Marketplace Items Table
CREATE TABLE IF NOT EXISTS public.marketplace_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  category TEXT,
  condition TEXT,
  description TEXT,
  images TEXT[],
  seller_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT,
  tags TEXT[],
  views_count INTEGER DEFAULT 0,
  wishlist_count INTEGER DEFAULT 0
);

ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on marketplace_items" ON public.marketplace_items;
CREATE POLICY "Allow public read access on marketplace_items" ON public.marketplace_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on marketplace_items" ON public.marketplace_items;
CREATE POLICY "Allow public insert access on marketplace_items" ON public.marketplace_items FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on marketplace_items" ON public.marketplace_items;
CREATE POLICY "Allow public update access on marketplace_items" ON public.marketplace_items FOR UPDATE USING (true);
