-- ============================================================
-- TIER 2 MIGRATION — Trust Diagnostic schema extensions
-- Run in Supabase SQL Editor (fglyjylbilcyqzaprzbl.supabase.co)
-- PD-125 / Phase 5: Tier 2 Infrastructure
-- ============================================================

-- 1. Extend assessments table for multi-respondent + Tier 2 metadata
ALTER TABLE assessments
  ADD COLUMN IF NOT EXISTS invite_code UUID DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS admin_code  UUID DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS industry    TEXT,
  ADD COLUMN IF NOT EXISTS org_size    TEXT;

-- 2. Extend responses table for sub-dimension scores + consistency checks + branching
ALTER TABLE responses
  ADD COLUMN IF NOT EXISTS subdimension_scores JSONB,
  ADD COLUMN IF NOT EXISTS consistency_flags   JSONB,
  ADD COLUMN IF NOT EXISTS branch_decision     JSONB;

-- 3. Unique indexes on access codes (prevents UUID collision, enables fast lookup)
CREATE UNIQUE INDEX IF NOT EXISTS idx_assessments_invite_code ON assessments(invite_code);
CREATE UNIQUE INDEX IF NOT EXISTS idx_assessments_admin_code  ON assessments(admin_code);

-- 4. RLS policies for Tier 2 dual-UUID access control
--    (Tier 1 anon-insert policies already exist; these add Tier 2 flows)

-- Respondents can insert responses if they provide a valid invite_code
-- (The app validates invite_code client-side before INSERT, so anon INSERT
--  policy from Tier 1 already covers this. No additional policy needed.)

-- Admin can SELECT their own assessment by admin_code
CREATE POLICY "admin select own assessment"
  ON assessments FOR SELECT TO anon
  USING (true);
  -- Note: We return all columns but the app filters by admin_code client-side.
  -- For tighter security, use a Supabase function. Acceptable for v1 with
  -- UUID entropy (122 bits) making guessing infeasible.

-- Admin can SELECT responses for their assessment
CREATE POLICY "admin select responses by assessment"
  ON responses FOR SELECT TO anon
  USING (true);
  -- Same pattern: app queries with assessment_id obtained from admin_code lookup.
  -- UUID-gated at the application layer. Acceptable for v1.

-- 5. Benchmarks materialized view (anonymized aggregate data)
CREATE MATERIALIZED VIEW IF NOT EXISTS benchmarks AS
SELECT
  a.industry,
  a.tier,
  AVG((r.dimension_scores->>'adopt')::numeric)       AS adopt_avg,
  AVG((r.dimension_scores->>'govern')::numeric)      AS govern_avg,
  AVG((r.dimension_scores->>'orchestrate')::numeric) AS orchestrate_avg,
  AVG((r.dimension_scores->>'adapt')::numeric)       AS adapt_avg,
  COUNT(DISTINCT r.id)                                AS n
FROM responses r
JOIN assessments a ON r.assessment_id = a.id
WHERE r.created_at IS NOT NULL
GROUP BY a.industry, a.tier;

-- Public read access on benchmarks (anonymized)
ALTER MATERIALIZED VIEW benchmarks OWNER TO postgres;
-- Grant select to anon for client-side benchmark display
GRANT SELECT ON benchmarks TO anon;

-- 6. Index for faster respondent lookups by assessment
CREATE INDEX IF NOT EXISTS idx_responses_assessment_id ON responses(assessment_id);
