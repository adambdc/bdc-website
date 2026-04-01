-- ============================================================
-- NEWSLETTER SUBSCRIBERS — Supabase migration
-- Run in Supabase SQL Editor (fglyjylbilcyqzaprzbl.supabase.co)
-- Replaces Netlify Forms for newsletter signups
-- ============================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  source     TEXT DEFAULT 'website'
);

-- 2. Unique constraint on email (prevents duplicates)
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- 3. Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 4. Anon can INSERT only (no SELECT, no UPDATE, no DELETE)
CREATE POLICY "anon can subscribe"
  ON newsletter_subscribers FOR INSERT TO anon
  WITH CHECK (true);

-- 5. Only authenticated/service role can read subscribers
CREATE POLICY "service can read subscribers"
  ON newsletter_subscribers FOR SELECT TO authenticated
  USING (true);

-- ============================================================
-- CALCULATOR LEADS — email-gated savings calculator
-- ============================================================

-- 6. Create table
CREATE TABLE IF NOT EXISTS calculator_leads (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email          TEXT NOT NULL,
  headcount      TEXT,
  tools          TEXT,
  regulatory     TEXT,
  dq_cost        TEXT,
  total_savings  TEXT,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- 7. Enable RLS
ALTER TABLE calculator_leads ENABLE ROW LEVEL SECURITY;

-- 8. Anon can INSERT only
CREATE POLICY "anon can submit calculator"
  ON calculator_leads FOR INSERT TO anon
  WITH CHECK (true);

-- 9. Only authenticated/service role can read leads
CREATE POLICY "service can read calculator leads"
  ON calculator_leads FOR SELECT TO authenticated
  USING (true);
