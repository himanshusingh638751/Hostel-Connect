-- Drop existing tables to ensure a clean slate (optional, but helpful for resetting)
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.mentor_reviews CASCADE;
DROP TABLE IF EXISTS public.seller_reviews CASCADE;
DROP TABLE IF EXISTS public.chat_messages CASCADE;
DROP TABLE IF EXISTS public.conversations CASCADE;
DROP TABLE IF EXISTS public.notices CASCADE;
DROP TABLE IF EXISTS public.forum_answers CASCADE;
DROP TABLE IF EXISTS public.forum_questions CASCADE;
DROP TABLE IF EXISTS public.marketplace_items CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Create users table
CREATE TABLE public.users (
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
  password TEXT -- In production, use hashed passwords!
);

-- Create marketplace_items table
CREATE TABLE public.marketplace_items (
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

-- Create forum_questions table
CREATE TABLE public.forum_questions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  author_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  upvotes INTEGER DEFAULT 0,
  upvoted_user_ids TEXT[],
  answers_count INTEGER DEFAULT 0,
  solved BOOLEAN DEFAULT false,
  tags TEXT[],
  target_year TEXT
);

-- Create forum_answers table
CREATE TABLE public.forum_answers (
  id TEXT PRIMARY KEY,
  question_id TEXT REFERENCES public.forum_questions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  upvotes INTEGER DEFAULT 0,
  upvoted_user_ids TEXT[],
  is_best_answer BOOLEAN DEFAULT false,
  is_senior_answer BOOLEAN DEFAULT false
);

-- Create notices table
CREATE TABLE public.notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  author_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  event_date TEXT,
  location TEXT,
  pinned BOOLEAN DEFAULT false,
  attendees_count INTEGER DEFAULT 0,
  attendee_user_ids TEXT[],
  important BOOLEAN DEFAULT false
);

-- Create conversations table
CREATE TABLE public.conversations (
  id TEXT PRIMARY KEY,
  participant_ids TEXT[],
  last_message TEXT,
  last_message_timestamp TIMESTAMPTZ DEFAULT NOW(),
  unread_count JSONB DEFAULT '{}'::jsonb,
  related_item_id TEXT,
  related_item_title TEXT
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  item_id TEXT,
  item_snapshot JSONB
);

-- Create seller_reviews table
CREATE TABLE public.seller_reviews (
  id TEXT PRIMARY KEY,
  seller_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  reviewer_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  rating NUMERIC NOT NULL,
  comment TEXT,
  item_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mentor_reviews table
CREATE TABLE public.mentor_reviews (
  id TEXT PRIMARY KEY,
  mentor_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  mentee_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  rating NUMERIC NOT NULL,
  testimonial TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT false,
  link_tab TEXT,
  target_id TEXT
);
