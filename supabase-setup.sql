-- ============================================
-- SUPABASE DATABASE SETUP FOR PORTFOLIO
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. LEADS TABLE (Contact Form Submissions)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT DEFAULT 'General',
  budget TEXT DEFAULT 'Not specified',
  details TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- 2. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  lead_magnet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- ============================================
-- 3. BOOKINGS TABLE (Meeting Reservations)
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  meeting_type TEXT NOT NULL,
  meeting_date DATE NOT NULL,
  meeting_time TIME NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(meeting_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ============================================
-- 4. CHAT MESSAGES TABLE (Live Chat)
-- ============================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID NOT NULL,
  message TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_messages(created_at DESC);

-- ============================================
-- 5. ACTIVITIES TABLE (Portfolio Updates)
-- ============================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  project TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_created ON activities(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Leads: Allow anyone to insert, only authenticated users can read
CREATE POLICY "Allow public insert for leads" 
  ON leads FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read for leads" 
  ON leads FOR SELECT 
  TO authenticated 
  USING (true);

-- Newsletter: Allow anyone to subscribe
CREATE POLICY "Allow public insert for newsletter" 
  ON newsletter_subscribers FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read for newsletter" 
  ON newsletter_subscribers FOR SELECT 
  TO authenticated 
  USING (true);

-- Bookings: Allow anyone to book, authenticated can manage
CREATE POLICY "Allow public insert for bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read for bookings" 
  ON bookings FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated update for bookings" 
  ON bookings FOR UPDATE 
  TO authenticated 
  USING (true);

-- Chat: Allow anyone to send messages
CREATE POLICY "Allow public insert for chat" 
  ON chat_messages FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read for chat" 
  ON chat_messages FOR SELECT 
  TO authenticated 
  USING (true);

-- Activities: Only authenticated users can manage
CREATE POLICY "Allow authenticated read for activities" 
  ON activities FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated insert for activities" 
  ON activities FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update for activities" 
  ON activities FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated delete for activities" 
  ON activities FOR DELETE 
  TO authenticated 
  USING (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment to insert sample data
/*
INSERT INTO activities (type, project, description, link) VALUES
  ('project', 'SaaS Dashboard', 'Launched new analytics dashboard', 'https://example.com'),
  ('article', 'Performance Tips', 'Published article on web performance', 'https://example.com/blog'),
  ('achievement', '100 Projects', 'Reached 100 completed projects milestone', NULL);
*/

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all tables exist
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
