# AI and Data Trust Maturity Assessment — Product Spec

**Version:** 3.0
**Date:** 2026-03-30
**Status:** Draft
**PD Case:** PD-117
**Location:** bdcllc.io (assessment, diagnostic pages)
**Research:** Ahab run UGF.9 (24 nodes, avg 4.3) at `research/unified-frameworks/ahab/maturity-assessment-design/`

---

## 1. Product Architecture

Four assessment tiers forming a data flywheel. Same instrument at four fidelity levels. Same four TEMPO dimensions. Same maturity model. Different depth, different audience, different output.

| Tier | Product Name | Entry | Questions | Respondents | Tech | Revenue |
|------|-------------|-------|-----------|-------------|------|---------|
| 1 | **Trust Pulse** | bdcllc.io/assessment | 20 | Single | Static HTML/JS + Supabase | Free (lead gen) |
| 2 | **Trust Diagnostic** | bdcllc.io/diagnostic | 40 | Multi (up to 5) | Static HTML/JS + Supabase | Free or low-cost |
| 2.5 | **Trust Blueprint** | bdcllc.io/blueprint | 40 + 20 AI follow-ups | Multi (organizer + up to 4) | Static HTML/JS + Claude API + Supabase | $95/assessment (launch) |
| 3 | **Trust Assessment** | Consulting engagement | Dynamic | Multi-stakeholder + consultant | Consultant toolkit | Paid engagement |

### 1.1 The Flywheel

Tier 2.5 and Tier 3 generate data that makes all tiers progressively better:

```
Tier 2.5 (AI-Guided)              Tier 3 (Human + AI)
  │                                  │
  ├── Follow-up response data        ├── Calibrated behavioral anchors
  │     Reveals what customers        │     Consultant observations vs.
  │     actually mean when they       │     self-report divergence feeds
  │     select a behavioral anchor    │     question refinement for Tier 1/2
  │                                  │
  ├── Score revision patterns        ├── Industry benchmark data
  │     Quantifies overrating         │     Verified maturity scores anchor
  │     deflation effect, validates   │     Tier 1/2 benchmarks (known-groups)
  │     the instrument               │
  │                                  ├── Multi-respondent disagreement norms
  ├── Findings quality ratings       │     Expected disagreement ranges by role
  │     Post-assessment survey        │     (CIO vs. data steward)
  │     feeds prompt refinement      │
  │                                  ├── Question discrimination analysis
  ├── Conversation transcripts       │     Ceiling effects, floor effects,
  │     Training data for follow-up   │     poor discrimination detection
  │     improvement                  │
  │                                  └── Validation data
  ├── Cross-dimensional patterns           Every Tier 3 engagement = data point
  │     AI-surfaced themes inform          for Phase 2/3 validation
  │     question bank evolution
  │
  └── Completion + drop-off data
        By question and dimension,
        informs assessment length
```

Tier 2.5 generates flywheel data from launch (no consulting engagement required). Tier 3 generates higher-fidelity calibration data but only once consulting engagements begin. Until then, Tier 1/2 benchmarks are self-report only; Tier 2.5 follow-up data provides partial calibration (acknowledged limitation: the AI cannot verify claims, only elicit them).

### 1.2 Question Bank Architecture

Tier 1's 20 questions are a **proper subset** of Tier 2's 40. Same wording, same behavioral anchors. Tier 2 adds 20 sub-dimension depth questions. Tier 2.5 uses the identical 40-question bank as Tier 2 (no additional scored questions) but adds AI-driven selective follow-ups that collect free-text context without changing scores. Tier 3 uses the full Tier 2/2.5 bank as intake, then adds evidence-based scoring and interview protocol.

Changes to behavioral anchors must propagate across all tiers. Changes to follow-up banks affect Tier 2.5 only.

### 1.3 Key Differentiator

No competitor offers a combined AI + Data governance maturity assessment in a single tool at any tier (confirmed B1 grade, Ahab UGF.9). At least 15 tools exist across the two domains, all siloed. Only MITRE uses behavioral framing consistently; all others use aspirational yes/no or Likert scales.

---

## 2. Shared Foundation (All Tiers)

### 2.1 Dimensions (mapped to TEMPO engines)

Four primary dimensions, each with five sub-dimensions:

**Dimension 1: Adopt** (TEMPO Engine 1)
- AI tool inventory and shadow AI visibility
- Use case evaluation and approval processes
- AI adoption strategy and roadmap maturity
- Data readiness for AI (quality, accessibility, documentation)
- Agentic AI readiness (forward-looking indicator)

**Dimension 2: Govern** (TEMPO Engine 2)
- Data governance operating model (councils, RACI, decision rights)
- AI risk and ethics frameworks
- Policy and standards maturity
- Data quality measurement and management
- Regulatory alignment (NIST AI RMF, state AI laws, industry-specific)

**Dimension 3: Orchestrate** (TEMPO Engine 3)
- Cross-functional governance coordination
- AI/data literacy and training programs
- Change management and adoption metrics
- Governance champion network
- Role clarity for AI and data ownership

**Dimension 4: Adapt** (TEMPO Engine 4)
- Governance review cadence and update frequency
- Regulatory horizon scanning
- Technology change absorption capability
- Continuous improvement mechanisms
- Feedback loops between governance and operations

### 2.2 Maturity Model (4 levels)

All tiers use the same maturity model. Empirically supported across 12+ independent frameworks (CMMI, DCAM, NIST CSF, McKinsey, PwC, Deloitte, CSA, Gartner, Stanford, DAMA-DMBOK). Levels 4-5 in five-level models are rarely occupied and functionally collapse; the 4-level compression is defensible.

| TEMPO Level | Label | Behavioral Character | Boundary Test |
|---|---|---|---|
| Metronome (L1) | Initial / Ad Hoc | Chaotic, reactive, person-dependent. No inventory, no formal process. Issues discovered by downstream consumers or external parties. | Does a formal inventory of AI systems or governed data assets exist? (No = L1) |
| Score (L2) | Developing / Formalized | Policies exist on paper. Project-level governance. Repeatable within teams but not across the organization. Governance is advisory. | Has governance ever delayed, modified, or blocked a deployment/decision? (No = still L2) |
| Ensemble (L3) | Established / Operational | Enterprise-wide standards enforced. Governance has veto authority and has exercised it. Cross-functional coordination is routine. Stewardship roles are active, not nominal. | Are governance outcomes measured quantitatively and used to improve the program? (No = still L3) |
| Symphony (L4) | Optimized / Adaptive | Quantitative evidence of effectiveness. Continuous improvement cycles. Governance survives personnel and system changes. Proactive risk detection before external discovery. | Does the governance program adapt autonomously to new risk categories (e.g., agentic AI) without executive mandate? |

### 2.3 Scoring Algorithm

**Per-dimension scoring is primary output.** Each dimension produces an independent score from 1-4. The radar chart displays four dimension scores. A single composite is secondary.

- **Per-dimension score:** Mean of question scores within that dimension, rounded to one decimal
- **Composite score:** Weighted average of four dimension scores
- **Floor rule:** If any dimension scores below 1.5, cap the composite at one level above the lowest dimension score. Prevents a {4, 4, 4, 1} profile from presenting as Level 3.25.
- **Equal weights for v1.0.** AHP-derived weights (6 pairwise comparisons) are the validated upgrade path once response data accumulates.

**Stage mapping (all tiers):**
- 1.0-1.7: **Metronome** — Establishing the beat
- 1.8-2.5: **Score** — Writing the rules
- 2.6-3.3: **Ensemble** — Playing together
- 3.4-4.0: **Symphony** — Full orchestration

### 2.4 Question Design Principles

From Ahab UGF.9 synthesis (HIGH confidence findings):

1. **Behavioral anchoring is mandatory.** Every question describes observable organizational behaviors at each maturity level, not aspirational states. Replace "Does your organization have X?" with "When was the last time X was invoked/produced/updated?" Addresses the documented 2:1 self-assessment overrating gap.

2. **Single-select, 4-option graduated response format.** Each question presents four behaviorally anchored descriptions, one per TEMPO level. Respondent selects the best match. No Likert scales. No neutral midpoint.

3. **Qualitatively distinct levels.** Each level represents a different type of capability, not more of the same. Guttman cumulative scaling: higher levels predict possession of all lower-level capabilities.

4. **Time-bounded recall windows.** "In the last 6 months" rather than abstract or hyper-specific framing.

5. **Non-threatening framing.** "Development roadmap" language, not "scorecard." Normalize lower scores.

### 2.5 Design Tokens (from existing site)

```css
--bg: #0A0A0A
--green: #059669
--chartreuse: #6B9E1E
--green-hover: #10B981
--blue: #3B82F6
--text: #F5F5F5
--text-muted: #A0A0A0
--font-primary: 'Inter', sans-serif
--font-mono: 'JetBrains Mono', monospace
```

Radar chart colors by dimension:
- Adopt: var(--chartreuse) #6B9E1E
- Govern: var(--green) #059669
- Orchestrate: var(--green-hover) #10B981
- Adapt: var(--blue) #3B82F6

Filled polygon: rgba version of overall stage color at 20% opacity
Polygon border: solid version of overall stage color

---

## 3. Tier 1: Trust Pulse (Free Website Assessment)

### 3.1 Purpose

Top-of-funnel lead generation and TEMPO positioning. The 5-minute taste. Single respondent gets "your perspective" on organizational maturity. Feeds Calibration Call pipeline and Tier 2 upsell.

### 3.2 Assessment Structure

- **Total questions:** 20 (5 per dimension)
- **Format:** Multiple choice, 4 options per question (behavioral anchors)
- **Time to complete:** 5-7 minutes
- **No skip:** All 20 questions required
- **Single respondent**

Each question's four options correspond to TEMPO maturity stages:
- **Option A (1 pt):** Metronome — basic awareness, ad hoc, reactive
- **Option B (2 pts):** Score — documented, structured, beginning to operationalize
- **Option C (3 pts):** Ensemble — cross-functional, embedded in workflows, measured
- **Option D (4 pts):** Symphony — adaptive, continuous, self-improving

Questions are written in plain business language. The respondent should recognize their organization in the options without needing domain expertise.

### 3.3 Sample Questions (one per dimension)

**Adopt:** "How does your organization evaluate and approve new AI tools?"
- A: No formal process. Teams adopt AI tools independently.
- B: There is a review process, but it is not consistently followed.
- C: All AI tools go through a defined evaluation and approval workflow.
- D: AI tool evaluation is automated with risk-tiered approval paths that adapt as the technology landscape changes.

**Govern:** "In the last 12 months, has your AI governance process resulted in any of the following?"
- A: We do not have a formal AI governance process.
- B: Governance reviewed AI projects but did not modify or block any.
- C: Governance delayed, modified, or blocked at least one AI deployment.
- D: Governance proactively identified and mitigated risks before projects reached deployment review.

**Orchestrate:** "How widely is AI governance understood across your organization?"
- A: Governance is handled by a single team. Most of the organization is unaware.
- B: Leadership is aware of governance initiatives, but frontline teams are not engaged.
- C: Governance training is delivered role-by-role, and teams actively participate in governance processes.
- D: Governance is embedded in how every team works. Champions exist across functions, and adoption metrics are tracked.

**Adapt:** "How does your governance respond when regulations or AI capabilities change?"
- A: We react when regulators or auditors raise issues.
- B: We review governance periodically (annually or less) and update as needed.
- C: We monitor the regulatory landscape actively and update frameworks quarterly.
- D: Governance evolves continuously. Regulatory and technology changes are absorbed automatically through established update mechanisms.

### 3.4 Results Design

**Primary visual: Radar/spider chart** showing all four dimensions on axes.

Design requirements:
- Dark background (#0A0A0A) matching site design system
- Four axes labeled: Adopt, Govern, Orchestrate, Adapt
- Color-coded to TEMPO engine colors
- Filled polygon showing the respondent's profile shape
- Reference overlay showing "Symphony" (max) as a faint outer boundary
- Overall TEMPO stage label prominently displayed
- BDC logo watermark (subtle, bottom-right)
- Dimensions labeled with score (e.g., "Govern: 2.8 / 4.0")

**The shape tells the story.** A balanced diamond means uniform maturity. A lopsided shape reveals which engines need work. Screenshot-friendly, LinkedIn-ready.

**Secondary visual: Stage progression bar** on the Metronome to Symphony path.

**Results content:**

1. **Overall stage name and description** — one paragraph
2. **Per-dimension breakdown** — score, stage, one-sentence strength, one-sentence gap, recommended BDC service
3. **"What's next" section** — branching CTA:
   - "Want deeper insight? Take the Trust Diagnostic" (links to Tier 2)
   - "Ready for a full assessment? Book a Trust Assessment" (links to Calibration Call / Tier 3)
4. **Single-respondent acknowledgment:** "This profile reflects your perspective. Organizational maturity conclusions benefit from multiple viewpoints."
5. **Positioning line:** "Governance is the engine. Trust is the destination. Here's your map."

### 3.5 Email Gate Strategy

**Flow:**
1. User answers 20 questions (no gate, no friction)
2. Results page loads with **blurred results**
3. Radar chart visible but blurred. Stage name visible but blurred.
4. Clear CTA: "Enter your email to unlock your full Trust Profile."
5. On email submit: Supabase INSERT (assessments row with tier=1 + responses row with scores), results unblur, download button appears, tier upgrade CTAs appear
6. Supabase captures: email, name, organization, role, overall score, per-dimension scores, stage name, full answer set

**Supabase Write (on email submit):**
```
assessments INSERT:
  - tier: 1
  - creator_email: <email>
  - industry: null (Tier 1 does not collect)
  - org_size: null (Tier 1 does not collect)

responses INSERT:
  - assessment_id: <from above>
  - respondent_email: <email>
  - respondent_role: <role if provided, else null>
  - answers: {q1: 3, q2: 1, ...}  (full answer set)
  - dimension_scores: {adopt: 2.4, govern: 1.8, ...}
  - overall_score: 2.1
  - stage: "score"

Email gate form fields (visible):
  - email (required)
  - name (optional)
  - organization (optional)
  - role (optional)
```

**Post-Submission:**
- Results unblur immediately
- "Download Your Trust Profile" button (client-side PDF)
- "Take the Trust Diagnostic for deeper insight" CTA
- "Book a Trust Assessment" CTA
- "Share Your Results" (copy link with encoded scores)

### 3.6 Technical Architecture

- **Stack:** HTML/CSS/JS, vanilla, no framework (matches calculator.html pattern)
- **Radar chart:** Canvas API or Chart.js (~80KB)
- **PDF generation:** html2canvas + jsPDF (client-side only)
- **Backend:** Supabase (shared schema with Tier 2). supabase-js via CDN (~45KB). On email submit: INSERT to assessments (tier=1) + responses. Reuses same assessments/responses tables as Tier 2 with `tier: 1` flag. Tier 1 responses contribute to benchmarks materialized view from day one.
- **Hosting:** Same Netlify deployment as rest of site
- **Page:** `assessment.html`
- **URL:** `bdcllc.io/assessment`
- **Shareable results:** `bdcllc.io/assessment?r=BASE64_ENCODED_SCORES`

**Page structure:**
```
assessment.html
+-- Nav (consistent with all pages)
+-- Hero (title, "Trust Pulse", "5-7 minutes")
+-- Assessment Section
|   +-- Progress bar (Question X of 20)
|   +-- Dimension indicator (which TEMPO engine)
|   +-- Question card (question text + 4 options)
|   +-- Navigation (Back / Next, Next disabled until selection)
+-- Results Section (hidden until complete)
|   +-- Radar chart (blurred pre-gate)
|   +-- Stage badge (blurred pre-gate)
|   +-- Email gate form
|   +-- Per-dimension breakdown (blurred pre-gate)
|   +-- Recommendations with service links
|   +-- Tier 2/3 upsell CTAs (post-gate)
|   +-- Download button (post-gate)
+-- Footer (consistent)
+-- JS
    +-- Question engine (state management, scoring)
    +-- Radar chart renderer
    +-- Email gate logic
    +-- PDF generator
    +-- Shareable URL encoder/decoder
```

**Responsive design:**
- Desktop: Question card centered, max-width 720px, radar chart 480x480
- Tablet: Same layout, radar chart scales to 360x360
- Mobile: Full-width question card, radar chart 300x300, stacked breakdowns

### 3.7 Success Metrics

- **Completion rate:** >70% of starters finish all 20 questions
- **Email conversion:** >40% of completers submit email
- **Tier 2 upgrade rate:** tracked (baseline TBD)
- **Calibration Call conversion:** >10% of email submissions book a call
- **Time to complete:** median 5-7 minutes
- **Social sharing:** track shareable URL usage

---

## 4. Tier 2: Trust Diagnostic (Deep AI Assessment)

### 4.1 Purpose

The serious tool. Multi-respondent, sub-dimension depth, adaptive branching. Surfaces what the free tool cannot: disagreement between roles, sub-dimensional gaps, consistency of self-report, and industry benchmarking. Gives away the full diagnosis; reserves the implementation roadmap for Tier 3.

### 4.2 Assessment Structure

- **Total questions:** 40 (10 per dimension)
- **Core subset:** First 5 questions per dimension are identical to Tier 1 (Trust Pulse)
- **Depth questions:** Additional 5 per dimension add sub-dimension detail
- **Format:** Same 4-option behavioral anchors
- **Adaptive branching:** If a dimension scores below 1.5 on the core 5 questions, skip advanced questions for that dimension and route to foundational probes
- **Consistency checks:** 3-4 rephrased question pairs placed 15+ questions apart
- **Multi-respondent:** Organizer invites up to 5 colleagues via shareable link
- **Time to complete:** 12-18 minutes per respondent

**Sub-dimension expansion (5 additional questions per dimension):**

| Dimension | Additional Sub-dimensions |
|-----------|--------------------------|
| **Adopt** | Shadow AI detection, vendor AI governance, agentic AI readiness, data readiness depth, adoption ROI tracking |
| **Govern** | Governance veto test (direct behavioral probe), regulatory mapping, ethics framework operationalization, incident response, policy enforcement verification |
| **Orchestrate** | Stewardship behavior verification, cross-functional coordination depth, champion network health, training effectiveness measurement, role clarity enforcement |
| **Adapt** | Regulatory horizon scanning mechanics, technology change absorption evidence, continuous improvement documentation, feedback loop verification, governance resilience (survives personnel change) |

### 4.3 Multi-Respondent Flow

1. **Organizer** creates a Tier 2 assessment, provides email + industry + org size
2. System generates two UUIDs: `invite_code` (share with team) and `admin_code` (organizer keeps)
3. Organizer completes their 40 questions
4. Organizer shares invite link: `bdcllc.io/diagnostic?invite=<invite_code>`
5. Each respondent provides their email + role, answers 40 questions independently
6. Respondents cannot see each other's answers (independent responses)
7. Organizer views results at `bdcllc.io/diagnostic?admin=<admin_code>`
8. Results show: individual scores by role, team median + spread, disagreement analysis

**Disagreement is a finding, not noise.** When the CIO rates governance at L3 and the data steward rates it at L1, neither is wrong. The gap itself is the diagnosis. Role-stratified comparison is more informative than a blended average.

### 4.4 Results Design

All of Tier 1 results, plus:

- **Sub-dimension scores:** 2 questions per sub-dimension, 5 sub-dimensions per dimension
- **Disagreement analysis:** (when multi-respondent) median + spread per dimension, role-stratified comparison, "consensus" vs. "contested" labels per dimension
- **Industry cohort benchmarking:** "Organizations in your industry typically score X" (shown after self-rating to avoid anchoring bias)
- **Gap quantification:** cost-of-inaction framing per dimension gap
- **Consistency score:** flagged if rephrased question pairs diverge by >1 level
- **Prioritized gap list:** ranked by severity, with directional recommendations (diagnosis given away, remediation roadmap reserved for Tier 3)

**Results labeled:** "Your team's perspective" (multi-respondent) or "Your perspective" (single respondent) with explicit note that organizational conclusions benefit from multiple viewpoints and evidence review (Tier 3).

**CTA:** "Get Your Remediation Roadmap" (links to Tier 3 / Calibration Call). Contextual CTAs after each gap finding, not just at the end.

**Output:** Downloadable diagnostic report (client-side PDF).

### 4.5 Scoring Additions (beyond base algorithm)

- **Sub-dimension scores:** Mean of 2 questions per sub-dimension
- **Consistency score:** Per respondent, from rephrased pairs. Flagged in output if delta > 1 level.
- **Agreement index:** When multi-respondent, report median + spread (not mean, to resist outlier pull). If all respondents agree within 1 level: report with confidence. If spread spans 2+ levels: flag as "contested."
- **Adaptive branch scoring:** Skipped questions scored as N/A. Dimension score computed from answered questions only, with explicit notation of reduced question count.

### 4.6 Technical Architecture

**Stack:** Static HTML/CSS/JS + Supabase (Option A+ architecture, PD-117)

```
bdcllc.io/diagnostic.html  (static, Netlify)
     |
     +-- supabase-js via CDN (~45KB)
     |       |
     |       +-- INSERT responses (each respondent)
     |       +-- SELECT aggregate (results page, admin_code required)
     |       +-- RLS policies enforce dual-UUID access control
     |
     +-- Question engine (vanilla JS, extends Tier 1 pattern)
     |       +-- Branching logic = client-side conditionals
     |       +-- Consistency check tracking
     |
     +-- Scoring + Charts (client-side)
     +-- PDF generation (client-side)
```

**Supabase schema:**

```sql
-- assessments: one per team assessment session
CREATE TABLE assessments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier        INTEGER NOT NULL DEFAULT 2,
  creator_email TEXT,
  industry    TEXT,
  org_size    TEXT,
  invite_code UUID DEFAULT gen_random_uuid(),  -- share with respondents
  admin_code  UUID DEFAULT gen_random_uuid(),   -- organizer keeps
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- responses: one per respondent per assessment
CREATE TABLE responses (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id    UUID REFERENCES assessments(id),
  respondent_email TEXT,
  respondent_role  TEXT,     -- 'executive', 'operational', 'technical'
  answers          JSONB,   -- {q1: 3, q2: 1, q3: 4, ...}
  dimension_scores JSONB,   -- {adopt: 2.4, govern: 1.8, ...}
  subdimension_scores JSONB, -- {adopt_shadow_ai: 2.0, adopt_vendor_gov: 3.0, ...}
  overall_score    NUMERIC(3,1),
  stage            TEXT,
  consistency_flags JSONB,  -- [{pair: [12,27], delta: 2, flagged: true}]
  completed_at     TIMESTAMPTZ DEFAULT now()
);

-- benchmarks: materialized view, refreshed periodically
CREATE MATERIALIZED VIEW benchmarks AS
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
WHERE r.completed_at IS NOT NULL
GROUP BY a.industry, a.tier;
```

**RLS policies (dual-UUID access control):**
```
INSERT responses: anyone with valid invite_code can insert
SELECT responses: only admin_code holder can read (for their assessment)
UPDATE/DELETE: disabled (responses are immutable)
SELECT benchmarks: public (anonymized aggregate data)
```

**URL scheme:**
- Assessment page: `bdcllc.io/diagnostic`
- Create assessment: `bdcllc.io/diagnostic` (no params = new assessment)
- Invite link: `bdcllc.io/diagnostic?invite=<invite_code>`
- Results (organizer): `bdcllc.io/diagnostic?admin=<admin_code>`

### 4.7 Success Metrics

- **Completion rate:** >60% per respondent (longer assessment, expect lower than Tier 1)
- **Multi-respondent adoption:** >60% of assessments invite at least 1 colleague
- **Disagreement surfacing:** disagreement spans 2+ levels in at least 1 dimension for >50% of multi-respondent assessments
- **Adaptive branching efficiency:** reduces average completion time by 15-20% for low-maturity respondents
- **Tier 3 conversion:** tracked (baseline TBD)
- **Consistency check flag rate:** <20% of respondents flagged (if higher, questions need refinement)

---

## 4B. Tier 2.5: Trust Blueprint (AI-Guided Assessment)

**Status:** Spec finalized 2026-03-30. Bureau review complete (Holmes, Ego, Ender, Draper, Sparky). Ready for implementation.

### 4B.1 Purpose

The premium automated assessment. Same 40-question scored instrument as Tier 2, but with an AI layer that draws out organizational context through selective follow-up questions, captures nuance in free-text, and generates custom per-dimension findings based on the full conversation. The customer gets a maturity report with scores AND a narrative that reflects their specific situation, not template paragraphs keyed to a number.

This is what a human consultant does in Tier 3, minus the document review and evidence-based overrides. The AI cannot verify claims, but it can elicit them in a way that a static form cannot.

**Positioning:** Tier 2 is free or low-cost (diagnostic). Tier 2.5 is paid (premium diagnostic with AI-generated custom findings). Tier 3 is a consulting engagement (human-verified assessment with remediation roadmap).

**Naming:** Trust Blueprint. The four-tier ladder is: Pulse / Diagnostic / Blueprint / Assessment.

### 4B.2 The Interaction Model

**Model: Scored form + selective AI follow-ups.** The structured assessment remains the spine. After the customer selects a behavioral anchor for each question, the AI selects 20 of the 40 questions for follow-up. The follow-up does NOT change the score. It feeds the findings engine.

**Flow per question (when selected for follow-up):**
```
1. Customer sees question + 4 behavioral anchors (same as Tier 2)
2. Customer selects an option -> score recorded
3. AI asks ONE follow-up question: one sentence, one question mark
4. Customer provides free-text response via inline text area
   - No character limit
   - Placeholder text: "1-3 sentences is plenty"
   - Skip button visible at all times
5. AI acknowledges in one sentence (content-neutral, never evaluative)
6. Next question
```

**Flow per question (not selected for follow-up):**
```
1. Customer sees question + 4 behavioral anchors (same as Tier 2)
2. Customer selects an option -> score recorded
3. Next question (no AI interaction)
```

**The AI selects which 20 of 40 questions to follow up based on:**
- Where the scored answer seems most surprising given prior context
- Where cross-dimensional patterns are emerging
- Where coverage across the four dimensions is thinnest
- Dimension order is randomized per assessment to distribute fatigue effects

This selective approach addresses fatigue (20 follow-ups, not 40), reduces API cost, and focuses depth where it matters most.

**The AI's tone:** A genuinely curious colleague. Non-reactive. No surprise, no approval, no concern. The follow-up should feel like the question a good listener would naturally ask next. Not a structured probe from a bank. Not a consultant in discovery mode. Not a cross-examiner testing answers. A good listener who asks the right next question.

The AI's job is to ask the question behind the question. The deflation effect (where customers self-correct overrated scores) is a byproduct of specificity, not a goal of the interaction. The AI never says "are you sure?" It says "tell me more about that." If the customer's story reveals the behavioral anchor does not match, the customer will self-correct. The AI collects the evidence. The findings engine does the diagnosis.

**The AI does NOT:**
- Suggest a different answer
- Explain what a "better" answer would look like
- Coach the customer toward higher scores
- Provide advice, recommendations, or frameworks during the assessment
- Evaluate or judge the customer's responses
- Use language like "you might want to consider" or "best practice suggests"
- Ask compound or multi-part questions
- Summarize what the customer just said in the acknowledgment

**The AI DOES:**
- Ask for specifics: "You mentioned a governance council. How often has it met in the last 6 months?"
- Draw out context: "Can you describe what happened the last time governance weighed in on an AI project?"
- Cross-reference prior answers: "Earlier you said your AI inventory is partial. When you say your governance council reviews all AI projects, does that include the ones not in the inventory?"
- Acknowledge without judging: "Got it." or "That's helpful context."
- Remember everything: context accumulates across all 40 questions

**Acknowledgment constraint:** One sentence. Content-neutral. Never evaluative. Never summarizes what the customer said. Examples: "Got it." / "That's helpful context." / "Understood." Anti-examples: "That sounds like a strong program." / "So you're saying governance is mostly reactive."

**Follow-up length constraint:** Every AI follow-up must be ONE question, ONE sentence. Not compound. Not multi-part. Anti-example: "How often does your council meet, and when it meets, what's the typical agenda?" Correct: "How often has the council met in the last six months?"

### 4B.3 Follow-Up Question Design

**Design principles:**

1. **Draw out context, do not test answers.** The follow-up asks for the story, not for proof. "Tell me more about how that works" is correct. "Can you prove that?" is not.

2. **Time-bounded and behavioral.** "When was the last time...?" "Can you describe a specific instance...?" "Who was involved when...?"

3. **Flat difficulty gradient.** Do not make L1 follow-ups warm and L4 follow-ups hard. Mix the difficulty so the pattern is not perceptible. An L1 respondent might get "What happened the last time an AI concern came up?" and an L4 respondent might get "Tell me about one of those automated responses." Both are neutral, specific, and non-threatening.

4. **Normalizing framing at all levels.** "That's common" works for L1. But L3/L4 also get normalizing framing: "Many organizations at that stage..." The customer should never feel tested.

5. **One question, one sentence.** No compound questions. No multi-part asks. The customer should be able to answer in 1-3 sentences.

**Follow-up bank structure (per question):**
```json
{
  "question_id": "govern_veto_test",
  "follow_ups": {
    "L1": "When an AI-related concern has come up, how has it typically been handled?",
    "L2": "Can you describe what happened the last time governance raised a concern about an AI project?",
    "L3": "Tell me about the most recent initiative that governance stopped or changed.",
    "L4": "How many initiatives were stopped or redesigned in the last 12 months, roughly?"
  }
}
```

The AI can deviate from the bank when context warrants it. The bank is a floor, not a ceiling. If the customer's answer to question 8 reveals something relevant to question 22, the AI should note it and reference it later.

**Contradiction protocol:** When a follow-up response contradicts the scored answer, the AI surfaces it neutrally: "I want to make sure I have this right. You selected [X], but your description sounds more like [Y]. Which better matches?" This is not confrontational. It is clarifying. The customer revises or confirms. Either outcome is data.

**Score revision:** After being probed, the customer can change their scored answer. If the follow-up reveals that the customer's initial selection does not match their described reality, letting them revise is a feature. It deflates overrating. The revision and the original selection are both recorded.

### 4B.4 Engagement Safeguards

**Minimum engagement threshold:** If fewer than 10 of 20 follow-ups receive substantive responses (5+ words), the system warns the customer: "Your follow-up responses are what make the Trust Blueprint findings specific to your organization. With limited context, the findings will be more general. Would you like to continue, or go back and add detail to some of your responses?"

If the customer proceeds, findings are generated with explicit acknowledgment of thin data: "Based on limited follow-up context, these findings are directional rather than specific."

**Skip mechanism:** Every follow-up has a visible Skip button. Customer can skip any individual follow-up. If customer skips 5+ consecutive follow-ups, the system offers: "Would you like to complete the assessment without further follow-ups? Your scored answers will still produce a full maturity profile." If accepted, remaining questions proceed as Tier 2 (no AI interaction). Report notes which sections had AI context and which did not.

**Session lifecycle:** Customer CAN close browser and resume. State persists in Supabase. Access token in URL grants re-entry. Conversation context is reconstructed from stored transcript on resume. No account creation required.

**Time estimate:** 25-35 minutes for the full assessment with follow-ups.

### 4B.5 Findings Generation

After all 40 questions (and 20 follow-ups) are complete, the AI generates custom findings for each dimension. This is the premium deliverable.

**Findings structure per dimension:**
```
Dimension: Govern
Score: 2.1 (Score: Writing the Rules)

Finding: Your governance council meets quarterly and has formal decision
rights documented, but it has not exercised veto authority over an AI
initiative in the last 12 months. You described a case where the council
raised ethical concerns about a customer-facing AI tool but chose to
proceed with modifications rather than blocking deployment. This pattern
(formal authority without enforcement precedent) is the defining
characteristic of Score-level governance. The gap between documented
authority and behavioral exercise is the single most impactful lever for
advancing to Ensemble-level maturity.

Your finance department's independent adoption of AI tools without
governance review, which you mentioned during the Adopt section,
compounds this gap: the council cannot exercise authority over initiatives
it does not know about.

Key observation: Governance has the structural authority to operate at
Level 3 but the behavioral pattern of Level 2.
```

**Findings generation guardrails:**
- Findings reference specific things the customer said during follow-ups
- Findings do NOT recommend actions (that is Tier 3)
- Findings DO identify gaps, patterns, and contradictions
- Findings use the customer's own language where possible
- Findings cross-reference across dimensions (adopt shadow AI and govern veto authority)
- Findings are diagnosis, not prescription

**Findings quality variance:** If follow-up data for a dimension is thin (fewer than 3 substantive responses), findings say so explicitly: "Limited follow-up context was available for this dimension. The finding below is based primarily on your scored responses." Findings never fabricate specificity from thin data.

### 4B.6 Assessment Context Management

The AI needs the full conversation history to generate good follow-ups and findings. Context window management is critical.

**System prompt contains:**
- TEMPO framework overview (4 dimensions, 4 levels, behavioral character per level)
- All 40 questions with their behavioral anchors
- Follow-up bank (all follow-ups for all questions)
- Persona instructions (curious colleague, no advice, no coaching, no evaluation)
- Findings generation instructions (reference specifics, no recommendations)
- Bias mitigation instructions (do not lead, do not approve, do not react with concern)
- Acknowledgment and length constraints

**Conversation context accumulates:**
- Each scored answer + the customer's free-text response
- Running summary of key themes, contradictions, and notable details
- Cross-reference flags (e.g., "customer mentioned shadow AI in Q3, relevant to Q26")

**Estimated token usage per assessment:**
- System prompt: ~4,000 tokens (cached after first API call)
- 20 follow-up interactions: ~500 input + ~80 output tokens each = ~11,600 tokens
- Findings generation: ~15,000 input + ~3,000 output tokens
- Total: ~30,000 input tokens + ~4,600 output tokens
- Estimated cost with prompt caching: ~$0.44 per assessment
- Well within context window for a single session

### 4B.7 The Report

The Trust Blueprint report combines the Tier 2 quantitative output with AI-generated custom findings. The report is the product. The form is the input mechanism. The conversation is the data collection. The report is what the customer pays for.

**Report structure (PDF, 12-18 pages):**

1. **Branded cover page** with organization name, date, Trust Blueprint mark
2. **Executive summary** (1 page): AI-generated, 3-4 paragraphs, references specific organizational context from follow-up responses
3. **Methodology note** (half page): Brief explanation of the four-dimension model, scoring approach, and how follow-up context informs findings. No mention of "AI" in this section. Language: "structured interview" and "contextual follow-up."
4. **Maturity radar chart** (1 page): Same design as Tier 2, full-page, screenshot-ready
5. **Dimension findings** (2-3 pages each, 4 dimensions = 8-12 pages):
   - Score and stage label
   - AI-generated custom finding referencing the customer's specific context
   - Sub-dimension breakdown
   - Cross-reference to other dimensions where relevant
6. **Cross-dimensional patterns** (1 page): AI-identified themes that span dimensions (e.g., "shadow AI undermines governance authority, which weakens orchestration metrics")
7. **What's next CTA** (half page): "Get Your Remediation Roadmap" (Tier 3 / Calibration Call). Contextual CTAs after each gap finding, not just at the end.

**Multi-respondent report additions (when applicable):**
- Disagreement analysis: median + spread per dimension, role-stratified comparison
- Consensus vs. contested dimension labels
- Note: Only the organizer's responses include AI follow-up context. Additional respondents complete Tier 2 scoring only. Findings are generated from the organizer's follow-up data, scored answers from all respondents.

**Report format:** Server-side PDF generated via Playwright from branded HTML template. Not client-side. Delivered via download link in the results page.

### 4B.8 Bias Mitigation (Assessment-Specific)

The AI layer introduces bias risks beyond what the static form has:

1. **Social desirability with AI.** Respondents may inflate answers when they know follow-up questions will draw out context. Mitigation: the AI normalizes all levels and never reacts with approval or concern. Follow-ups are neutral regardless of the answer selected. The experience feels like a conversation, not an examination.

2. **Follow-up-induced score revision.** After a follow-up, the customer might want to change their scored answer. Decision: ALLOW revisions. If the follow-up reveals that the customer's initial selection does not match their described reality, letting them revise is a feature. It deflates overrating. Both original and revised scores are recorded.

3. **AI confirmation bias.** The AI might frame follow-ups in ways that confirm the selected answer rather than exploring it. Mitigation: the follow-up bank is designed with flat difficulty. Higher-level selections do not get systematically harder questions. The AI asks for specifics at all levels.

4. **Leading through acknowledgment.** "That's great that your governance council has blocked projects" is leading. The AI acknowledgment must be content-neutral: "Got it." Never evaluative. Never summarizing.

5. **Dual-use instrument effect.** The follow-up questions serve two purposes: they collect data for findings, and they cause the customer to think more carefully about their answers, which can change those answers. This is acknowledged. The Trust Blueprint is both a measurement instrument and an intervention. The act of being asked specific questions about governance practices causes reflection that a static form does not. This is a feature of the product experience, but it means Tier 2.5 scores and Tier 2 scores should never be compared as equivalent. The follow-up interaction itself changes the measurement context.

6. **Dimension order randomization.** Dimension order is randomized per assessment to distribute fatigue effects. Early dimensions get more cognitive energy; randomization ensures no single dimension is systematically advantaged.

### 4B.9 Pricing Model

**Launch price:** $95 per assessment.

**Price ladder:**
- Months 0-12: $95 per assessment. Goal: 50 assessments to build benchmark dataset.
- Month 12+: $295-$395 per assessment once benchmarks and case studies exist. Exact price set based on completion rates, findings ratings, and conversion data.
- Month 18+: $495 target once the dataset and brand support it.

**Multi-respondent pricing (v1):** $95 covers the organizer + up to 4 additional respondents. Only the organizer receives AI follow-ups. Additional respondents complete standard Tier 2 scoring. Additional seat pricing TBD based on v1 adoption data.

**Payment flow:** Stripe Checkout at $95 generates a unique assessment URL with a 32-byte access token. No account creation. No login. The URL is the credential.

**Revenue per assessment:**
- Gross: $95.00
- Stripe fee (~2.9% + $0.30): -$3.06
- Claude API cost (~$0.44): -$0.44
- Net margin: ~$91.50 (96.3%)

### 4B.10 Technical Architecture

**Stack:**
```
bdcllc.io/blueprint  (static HTML/CSS/JS, Netlify)
     |
     +-- Stripe Checkout ($95)
     |       |
     |       +-- On success: generate 32-byte access token
     |       +-- Redirect to bdcllc.io/blueprint?token=<access_token>
     |       +-- Webhook creates assessment record in Supabase
     |
     +-- Serverless proxy (Cloudflare Worker or Netlify Function)
     |       |
     |       +-- Claude Messages API (server-side, API key never exposed)
     |       +-- SSE streaming to client for follow-up responses
     |       +-- One REST endpoint per question interaction
     |       +-- Accumulated conversation sent with each request
     |       +-- Prompt caching enabled (system prompt reuse)
     |
     +-- Supabase (extends existing schema)
     |       |
     |       +-- assessments table: tier=2.5, access_token, stripe_session_id
     |       +-- responses table: + follow_up_responses JSONB, + findings JSONB
     |       +-- conversation_log: full transcript for audit/improvement
     |       +-- RLS: access_token holder can read/write their assessment
     |
     +-- Question engine (vanilla JS, extends Tier 2 pattern)
     |       |
     |       +-- Same scoring, branching, consistency logic
     |       +-- Selective follow-up display (20 of 40 questions)
     |       +-- Inline text area below AI question (no modal)
     |       +-- Skip button per follow-up
     |       +-- Dimension order randomization
     |       +-- Score revision UI (customer can change selection after follow-up)
     |
     +-- Report generator (server-side)
             +-- Branded HTML template
             +-- Playwright PDF render (server-side)
             +-- Download link served to client
```

**Model:** Claude Sonnet 4.

**API pattern:** Server-side session. One REST call per follow-up interaction. Each call sends the accumulated conversation (system prompt + all prior Q/A pairs + current question context). Prompt caching reduces cost on the system prompt portion.

**Cost estimate per assessment:**
- System prompt: ~4,000 tokens (cached after first call)
- 20 follow-up interactions: ~500 input + ~80 output tokens each = ~11,600 tokens
- Findings generation: ~15,000 input + ~3,000 output tokens
- Total: ~30,000 input tokens + ~4,600 output tokens
- Estimated cost with prompt caching: ~$0.44 per assessment

**Streaming:** SSE (Server-Sent Events) via the serverless proxy. Client renders AI follow-up text as it streams. Typing indicator while waiting.

**Security:**
- Claude API key: server-side only, never exposed to client
- Supabase: encryption at rest, RLS policies enforce token-based access
- Access tokens: 32-byte cryptographically random, URL parameter
- No PII stored beyond email (provided voluntarily at assessment creation)
- 30-call hard cap per assessment (prevents abuse via token replay)

**API error handling:** If the Claude API fails mid-assessment, degrade gracefully to Tier 2 mode. The question engine continues without follow-ups. Scored answers are saved. When Claude API recovers, the customer can resume with follow-ups from where they left off. If the API is down for the entire session, the customer receives a Tier 2 report with a credit for a future Trust Blueprint session.

**Data retention:**
- Full conversation transcripts: 12 months from assessment completion
- Customer can request deletion via email (within GDPR/CCPA compliance)
- Anonymized scores retained indefinitely for benchmark computation
- Privacy policy additions: data usage for benchmark aggregation (anonymized), transcript retention period, deletion request process

**Supabase schema extensions:**
```sql
-- assessments table additions for Tier 2.5
ALTER TABLE assessments ADD COLUMN access_token TEXT UNIQUE;
ALTER TABLE assessments ADD COLUMN stripe_session_id TEXT;
ALTER TABLE assessments ADD COLUMN ai_status TEXT DEFAULT 'active';
  -- 'active' | 'degraded' (API down) | 'completed'

-- responses table additions for Tier 2.5
ALTER TABLE responses ADD COLUMN follow_up_responses JSONB;
  -- {q3: {ai_question: "...", response: "...", skipped: false}, ...}
ALTER TABLE responses ADD COLUMN findings JSONB;
  -- {adopt: "...", govern: "...", orchestrate: "...", adapt: "...", cross_dimensional: "..."}
ALTER TABLE responses ADD COLUMN original_answers JSONB;
  -- stores pre-revision answers if customer revised after follow-up
ALTER TABLE responses ADD COLUMN follow_up_engagement JSONB;
  -- {total_selected: 20, substantive_responses: 15, skipped: 3, thin_warning: false}

-- conversation log for transcript storage and improvement
CREATE TABLE conversation_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id   UUID REFERENCES assessments(id),
  respondent_id   UUID REFERENCES responses(id),
  transcript      JSONB,   -- [{role: "system"|"assistant"|"user", content: "..."}]
  token_count     INTEGER,
  api_calls       INTEGER,
  created_at      TIMESTAMPTZ DEFAULT now(),
  expires_at      TIMESTAMPTZ DEFAULT now() + INTERVAL '12 months'
);
```

**Implementation sequence (12 steps):**

1. Stripe Checkout integration: payment page, webhook handler, token generation
2. Supabase schema extensions: new columns, conversation_logs table, RLS policies
3. Serverless proxy: Cloudflare Worker or Netlify Function with Claude Messages API
4. System prompt engineering: TEMPO framework, follow-up banks, persona instructions, constraints
5. Question engine extensions: selective follow-up display, inline text area, skip button, dimension randomization
6. SSE streaming: proxy-to-client streaming, typing indicator, error handling
7. Conversation state management: accumulation, persistence, browser-close resume
8. Follow-up selection algorithm: surprise detection, cross-dimensional coverage, fatigue distribution
9. Findings generation: per-dimension findings, cross-dimensional patterns, quality variance handling
10. Report template: branded HTML, Playwright PDF render, server-side generation
11. Degraded mode: API failure detection, Tier 2 fallback, credit mechanism
12. End-to-end testing: full assessment flow, edge cases (skip all, close/resume, API failure, thin data)

### 4B.11 Positioning and Brand Language

**Product name:** Trust Blueprint

**Tagline:** "The maturity assessment that listens"

**The pitch:** Most maturity assessments hand you a form and a score. The Trust Blueprint is different. It asks you 40 questions about how your organization actually handles AI adoption, data governance, cross-functional coordination, and change. Then it listens. For 20 of those questions, it asks a follow-up, drawing out the context that a checkbox can never capture. Your answers shape a findings report that reads like a consultant spent a day with you, because in a sense, one did. The difference is it took 30 minutes, not 30 hours, and it cost $95, not $15,000.

**Premium signals:**
- The AI IS the experience. It is not a side panel, not a chatbot widget, not an add-on. The follow-up conversation is woven into the assessment flow itself.
- The report is a PDF, not a dashboard. It is a document you can hand to your CTO, not a screenshot of a web app.
- The language never says "AI" during the experience. The customer interacts with "the assessment." Follow-ups feel like the assessment is listening, not like a chatbot is interrogating.
- Time investment signals value. 25-35 minutes is long enough to feel substantive, short enough to complete in one sitting.

**Anti-patterns (never do these):**
- Never say "chatbot" in any customer-facing context
- Never make the AI visible as AI during the experience (no "powered by Claude" badges in the assessment flow; attribution goes in the methodology note)
- Never compare to ChatGPT or any consumer AI product
- Never oversell the AI ("our advanced AI engine will transform your governance")
- Never let the AI give advice during the assessment (that is what the findings and Tier 3 are for)

**CTA copy:** "Get My Trust Blueprint"

**Landing page headline:** "The maturity assessment that listens"

**Lean-forward line (for sales conversations and follow-up emails):** "The report reads like a consultant spent a day with you."

### 4B.12 Strategic Context

**The wedge strategy:** Trust Blueprint is a data engine, not just a product. Each completed assessment generates structured behavioral data about how organizations describe their AI and data governance maturity, including the gap between what they select on a form and what they describe in follow-up conversation. No public dataset like this exists.

**90-day launch window:**
- Price: $95
- Target: 50 completed assessments
- At 50 assessments: publish first industry benchmark report, raise price to $295-$395

**18-month play:** Largest proprietary dataset on AI + data governance maturity behaviors. First empirically validated benchmarks in a combined AI/data governance assessment. The dataset is the moat, not the AI pattern.

**Flywheel mechanics:**
- Follow-up response data improves findings quality (prompt refinement from rated outputs)
- Industry segmentation enables benchmark reports by vertical
- Tier 3 pre-qualification: Blueprint completers who score below 2.0 in any dimension are warm leads for consulting engagements
- Score revision data quantifies the deflation effect, validating the instrument

**Competitive moat:** The defensible asset is the combination of follow-up bank quality + findings generation prompts + the behavioral data flywheel. The AI + assessment pattern itself is replicable. The accumulated data and calibrated prompts are not.

**Tier 3 cannibalization is a feature:** Blueprint automates the discovery phase of a consulting engagement. A customer who completes a Blueprint and then engages Tier 3 arrives pre-qualified with structured behavioral data. The consultant skips intake and goes straight to evidence review. This makes Tier 3 more efficient, not less valuable.

**Decision triggers:**
- **Stay-course:** First 10 customers rate findings useful (4+/5 on post-assessment survey). 2+ Blueprint completers convert to Tier 3 conversation within 60 days.
- **Adapt:** Findings get low usefulness ratings. Fix: revise prompts and follow-up banks, not architecture. The interaction model is sound; prompt quality is the variable.
- **Quality alarm:** Completion rates drop below 60%. Diagnosis: engagement problem, not architecture problem. Investigate where customers drop off. If drop-off concentrates in follow-ups, reduce to 15 selective follow-ups or improve follow-up quality.

### 4B.13 Flywheel Contribution

Tier 2.5 generates richer flywheel data than Tier 2:
- **Follow-up responses** reveal what customers actually mean when they select a behavioral anchor
- **Score revisions** show where overrating was caught through specificity, not confrontation
- **Findings quality ratings** (post-assessment survey) feed prompt refinement
- **Conversation transcripts** provide training data for follow-up improvement
- **Cross-dimensional patterns** surfaced by the AI inform question bank evolution
- **Completion rate and drop-off data** by question and dimension inform assessment length decisions

Tier 2.5 scores and Tier 2 scores are NOT directly comparable. The follow-up interaction changes the measurement context (see 4B.8, dual-use instrument effect). Benchmark computations must segment by tier.

### 4B.14 Multi-Respondent (v1 Constraints)

**v1 scope:** Only the organizer receives AI follow-ups. Additional respondents (up to 4) complete standard Tier 2 scoring. This is a deliberate v1 constraint, not a limitation.

**Rationale:** AI follow-ups for all respondents would multiply API cost (5x), extend the implementation timeline, and introduce cross-respondent prompt contamination risks. The organizer's follow-up data, combined with all respondents' scored answers, produces a strong findings report.

**v2 deferral:** All-respondent AI follow-ups. Requires per-seat pricing model, cross-respondent findings synthesis, and cost/value validation from v1 data.

### 4B.15 Adaptive Branching + AI Follow-Ups

When a dimension scores below 1.5 on the core 5 questions and adaptive branching routes to foundational questions (same as Tier 2), the AI still selects follow-ups from those foundational questions. The follow-up bank includes a foundational probe set for each dimension. The interaction model does not change; only the question pool does.

### 4B.16 Success Metrics

- **Completion rate:** >60% of starters finish all 40 questions + follow-ups
- **Follow-up engagement:** >70% of selected follow-ups receive substantive responses (5+ words)
- **Score revision rate:** tracked (expected 10-20% of followed-up questions, based on Ahab UGF.9 overrating data)
- **Findings usefulness:** >4.0/5.0 average on post-assessment survey question
- **Tier 3 conversion:** >15% of Blueprint completers book a Calibration Call within 60 days
- **Time to complete:** median 25-35 minutes
- **API error rate:** <2% of assessments experience degraded mode
- **Customer deletion requests:** tracked for privacy compliance

### 4B.17 Open Items (v2 Deferrals)

All original OPEN questions are now CLOSED or explicitly deferred:

| Item | Status | Resolution |
|------|--------|------------|
| UX pattern | CLOSED | Inline follow-up below scored question. No side panel. No modal. No chat interface. |
| API architecture | CLOSED | Server-side session, one REST call per follow-up, accumulated conversation context. |
| Cost model | CLOSED | ~$0.44 per assessment (20 follow-ups, prompt caching). |
| Authentication | CLOSED | Stripe Checkout generates unique URL with 32-byte access token. No account creation. |
| Multi-respondent AI | CLOSED (v1) | Organizer only gets follow-ups. Additional respondents do Tier 2 scoring. |
| Conversation persistence | CLOSED | State persists in Supabase. Customer can close browser and resume via access token URL. |
| Rate limiting | CLOSED | 30-call hard cap per assessment token. |
| Pricing | CLOSED | $95 launch, $295-$395 at 12 months, $495 at 18 months. |
| Data retention | CLOSED | 12-month transcripts, deletion on request, anonymized scores retained. |
| API failure handling | CLOSED | Graceful degradation to Tier 2. Credit for future Blueprint session. |
| All-respondent AI follow-ups | DEFERRED to v2 | Requires per-seat pricing, cross-respondent synthesis. |
| AHP-derived dimension weights | DEFERRED to v2 | Requires sufficient response volume for pairwise calibration. |

---

## 5. Tier 3: Trust Assessment (Human-Guided AI Assessment)

### 5.1 Purpose

The consulting engagement. A BDC consultant uses the AI assessment as scaffolding but does what no automated tool can: reviews actual documents, interviews actual stakeholders, and overrides self-reported scores with evidence. Produces the remediation roadmap and TEMPO implementation plan. Generates flywheel data that calibrates Tier 1, Tier 2, and Tier 2.5.

### 5.2 Assessment Structure

- **Pre-assessment:** Organization completes Tier 2 (Trust Diagnostic) or Tier 2.5 (Trust Blueprint) as intake. Results pre-populate the consultant's view. Tier 2.5 completers bring richer pre-qualification data: scored answers, follow-up transcripts, and AI-generated findings are available before the engagement starts, allowing the consultant to skip discovery and go straight to evidence review.
- **Document review:** Policies, governance council meeting minutes, incident logs, data catalogs, AI inventories, stewardship records. Consultant reviews against behavioral anchors.
- **Interview protocol:** Structured behavioral interviews with 3-5 stakeholders across roles (executive, operational, technical). STAR-format behavioral probes: "Tell me about the last time governance delayed or blocked an AI deployment. What was the situation? What was the governance team's role? What was the outcome?"
- **Evidence-based scoring:** Consultant can OVERRIDE self-reported scores. "You said L3 on governance veto, but we found no documented instance of a governance block in the last 12 months. Evidence score: L2." Every override requires written justification.
- **Multi-stakeholder disagreement surfacing:** Structured comparison of responses by role. Disagreement is reported as a governance health indicator, not measurement error.

### 5.3 Scoring Additions

- **Evidence confidence weight:** 1.0 (document-verified), 0.8 (interview-confirmed), 0.6 (self-report only)
- **Consultant override:** With mandatory justification per override
- **Gap severity classification:** CRITICAL / SIGNIFICANT / MINOR / DEFERRED
- **Remediation effort tags:** S (under 1 week) / M (1-4 weeks) / L (4+ weeks or requires organizational change)

### 5.4 Output

Comprehensive Trust Assessment Report:
- Executive summary (SCR framework: Situation-Complication-Resolution)
- Maturity heat map: sub-dimension detail, color-coded by evidence confidence
- Dimensional analysis with evidence citations
- "Your Perspective vs. Evidence" comparison (where self-report diverged from observation)
- Multi-stakeholder disagreement map
- Remediation roadmap: prioritized by severity then effort
- TEMPO implementation plan: 90-day quick wins + 12-month strategic arc
- Benchmarking against industry cohort (from Tier 1/2/3 aggregate data)

### 5.5 Consultant Toolkit (Not Customer-Facing)

The "AI-assisted" component is tooling for the consultant:
- Question bank with behavioral anchors (shared with Tier 1/2)
- Evidence scoring template
- Interview protocol with STAR probes per dimension
- Report generator (pre-populated from Tier 2 intake)
- Override justification form
- Flywheel data capture (structured format for calibration data)

### 5.6 Flywheel Data Capture

After each Tier 3 engagement, the consultant records:
1. **Self-report vs. evidence delta per dimension** (feeds question refinement)
2. **Industry + verified maturity scores** (feeds benchmark calibration)
3. **Multi-respondent disagreement by role** (feeds disagreement norms)
4. **Question-level observations** (which questions caused confusion, which discriminated well)
5. **Override justifications** (patterns across engagements inform anchor rewording)

This data feeds a quarterly review cycle: refine Tier 1/2 questions, recalibrate benchmarks, update disagreement norms.

---

## 6. Bias Mitigation (All Tiers)

The 2:1 overrating problem is the single largest threat to assessment validity. Four structural countermeasures, layered:

1. **Behavioral anchors at input** (primary). Externally-defined behavioral descriptions at each level. The single most effective technique across BARS, SCAMPI/CMMI, situational judgment tests, and behavioral interviewing. Present at all tiers.

2. **Consistency check pairs** (Tier 2/3). 3-4 rephrased pairs placed 15+ questions apart. Flag respondents with high inconsistency. Inconsistency itself is diagnostic.

3. **Single-respondent labeling** (Tier 1). Label results as "your perspective." Provide shareable link for colleagues. When multiple respondents complete it (Tier 2), surface disagreement as a finding.

4. **Evidence-based override** (Tier 3). Consultant verifies behavioral claims against documentation and interviews. This is the ultimate deflation mechanism.

**Benchmarks shown after assessment, not before** (all tiers). Peer comparison shown on results page, not during questions, to avoid anchoring bias.

---

## 7. Validation Strategy

Three phases, staged by respondent volume:

**Phase 1 (Pre-launch, n=0): Content validity.** Expert panel of 5-7 judges. CVI scoring per item. Threshold: 0.78+ per item, 0.90+ overall.

**Phase 2 (Early adoption, n=50-200): Known-groups differentiation.** Administer to organizations of known maturity (e.g., pre/post-governance clients). Confirm discriminatory power. Tier 3 engagements are the primary source of known-groups data.

**Phase 3 (Scale, n=200+): Confirmatory factor analysis.** 10:1 respondent-to-item ratio. Confirm 4-dimension structure. Cronbach's alpha per dimension (target: 0.70-0.80; for 5-item subscales, mean inter-item correlation 0.30-0.50). Rasch calibration to verify item difficulty ordering.

**Ongoing:** Track maturity regression. Include at least one regression-detection question per dimension.

---

## 8. Conversion Architecture

### 8.1 Tier 1 to Tier 2

- Post-email-gate CTA: "Want deeper insight? Take the Trust Diagnostic"
- Nurture sequence (post-assessment email): Day 7 email highlights weakest dimension, suggests Trust Diagnostic for sub-dimensional detail
- Shareable results create viral loop (virality coefficient target: 0.3-0.7)

### 8.2 Tier 2 to Tier 3

- Post-results CTA: "Get Your Remediation Roadmap" (contextual, after each gap finding)
- First-person, benefit-driven CTA copy (30-40% lift over generic labels)
- Micro-copy: "45-minute call, no obligation"
- Results-to-consultation booking target: 5-15% (self-serve), 20-40% (human-delivered)

### 8.3 Nurture Sequence (Post-Tier 1)

1. **Immediate:** Full results email (reinforces value exchange)
2. **Day 2-3:** "What your score means" with benchmarking context
3. **Day 7:** Deeper analysis on weakest dimension + Trust Diagnostic upsell
4. **Day 14:** Case study of similar-score organization improvement
5. **Day 21-30:** Trust Assessment consultation offer

---

## 9. Ahab Research Status

Research run UGF.9 is **complete** (24 nodes, avg 4.3, 0 failures). The following research needs from v1.0 spec are resolved:

| Research Need | Status | Key Finding |
|--------------|--------|-------------|
| Assessment question design best practices | Complete | Behavioral anchoring mandatory; 4-option graduated format; time-bounded recall |
| AI governance maturity indicators | Complete | Governance veto test is the L2/L3 discriminator; agentic AI is the universal gap |
| Data governance maturity indicators | Complete | Stewardship behavior is the primary discriminator; consistency + completeness signal governance |
| Self-assessment bias mitigation | Complete | 2:1 overrating confirmed; 4-layer countermeasure architecture designed |
| Assessment-to-engagement conversion | Complete | Post-assessment soft gate (34-42%); diagnosis/cure split; personalized results convert 320-740% better |

Full synthesis: `research/unified-frameworks/ahab/maturity-assessment-design/synthesis.md`

---

## 10. Build Phases

### Phase 1: Tier 1 Content (requires question engineering)
- Write 20 questions with 4 behavioral-anchor options each
- Write 4 stage descriptions
- Write 16 dimension-stage recommendation strings
- Write tier upgrade CTA copy
- Review with Ego

### Phase 2: Tier 1 Core (HTML/CSS/JS)
- Question engine with progress bar
- Scoring logic (base algorithm + floor rule)
- Basic results display
- Email gate with Netlify form

### Phase 3: Tier 1 Visualization + Polish
- Radar chart (Canvas API or Chart.js)
- Stage progression bar
- PDF download generation
- Shareable URL encoding
- Social meta tags
- Responsive design
- Mobile optimization pass

### Phase 4: Tier 1 Launch
- Link from Insights page
- Newsletter announcement
- Track metrics

### Phase 5: Tier 2 Infrastructure
- Provision Supabase tables + RLS policies
- Wire supabase-js client
- Build `diagnostic.html` extending Tier 1 pattern

### Phase 6: Tier 2 Content + Logic
- Write 20 additional depth questions (sub-dimensions)
- Design consistency check pairs
- Implement adaptive branching logic
- Build multi-respondent invite flow (dual-UUID)

### Phase 7: Tier 2 Results + Launch
- Multi-respondent aggregation + disagreement analysis
- Industry benchmark display (from materialized view)
- Diagnostic report PDF
- Ship Tier 2

### Phase 8: Tier 3 Toolkit
- Interview protocol document
- Evidence scoring template
- Report generator
- Flywheel data capture format
- Pilot with first client engagement

### Phase 9: Flywheel Activation
- First quarterly review after 5+ Tier 3 engagements
- Benchmark recalibration
- Question refinement cycle
- Refresh materialized views
