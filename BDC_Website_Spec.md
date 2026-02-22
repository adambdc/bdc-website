# BDC Website — Build Spec v1.0
**For:** AntiGravity Gemini Pro 3.1
**Date:** 2026-02-22
**Status:** Ready to build
**Confidential — Internal Use Only**

---

## 1. Overview

Build a 4-page static HTML/CSS/JS marketing website for Bamboo Digital Consulting (BDC). No CMS, no framework, no build step. Pure HTML + CSS + vanilla JS. Must be deployable to Netlify, Cloudflare Pages, or GitHub Pages by dropping the folder.

**4 pages:**
- `index.html` — Homepage
- `services.html` — Services
- `products.html` — Products
- `contact.html` — Contact / Book a Call

**Shared assets:**
- `css/style.css` — All styles (single shared stylesheet)
- `js/main.js` — Minimal JS (mobile nav toggle only)
- `../logos/BAMBOO Consulting add-10.png` — T1 logo (relative path from website/ folder)

---

## 2. Design Tokens

### 2.1 Colors

```css
:root {
  /* Backgrounds */
  --bg:           #0A0A0A;   /* Page background */
  --bg-section:   #0F0F1A;   /* Alternate section background */
  --bg-card:      #111128;   /* Card background */
  --bg-deep:      #1E0A3C;   /* Deep purple — hero accents */

  /* Brand */
  --purple:       #7B2FBE;   /* Vivid purple — CTAs, highlights */
  --pink:         #E91E8C;   /* Hot pink — AI accent, eyebrows */
  --crimson:      #D42B4F;   /* Crimson — urgency, risk */
  --coral:        #FF4D6A;   /* Coral — hover states, accents */
  --blue:         #3B82F6;   /* Blue — D2 domain color only */
  --soft-purple:  #8B5CF6;   /* Soft purple — D5 domain color */
  --gray:         #6B7280;   /* Gray — D6 domain color */

  /* Text */
  --text:         #F8F8FA;   /* Primary text */
  --text-muted:   #9CA3AF;   /* Secondary text */
  --text-subtle:  #6B7280;   /* Tertiary text, footer */

  /* Borders */
  --border:       rgba(123, 47, 190, 0.25);   /* Purple-tinted border */
  --border-subtle: rgba(255, 255, 255, 0.08); /* Subtle white border */

  /* Gradients */
  --grad-accent:  linear-gradient(135deg, #7B2FBE, #E91E8C);
  --grad-hero:    linear-gradient(135deg, #1E0A3C 0%, #7B2FBE 60%, #E91E8C 100%);
  --grad-urgency: linear-gradient(135deg, #D42B4F, #FF4D6A);
  --grad-full:    linear-gradient(90deg, #1E0A3C, #7B2FBE, #E91E8C);
  --grad-button:  linear-gradient(135deg, #7B2FBE, #E91E8C);

  /* Domain colors */
  --d0: #E91E8C;  /* Strategy & Value */
  --d1: #7B2FBE;  /* Governance Core */
  --d2: #3B82F6;  /* Data Quality */
  --d3: #FF4D6A;  /* AI & ML Governance */
  --d4: #D42B4F;  /* Regulatory & Compliance */
  --d5: #8B5CF6;  /* Architecture & Enablement */
  --d6: #6B7280;  /* Operations & Change */
}
```

### 2.2 Typography

```css
/* Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

/* Usage */
--font:      'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Type scale:**

| Role | Size | Weight | Color | Font |
|------|------|--------|-------|------|
| Hero H1 | clamp(42px, 6vw, 80px) | 800 | Gradient (see below) | Inter |
| Page H1 | clamp(32px, 4vw, 56px) | 700 | `--text` | Inter |
| Section H2 | clamp(28px, 4vw, 48px) | 700 | `--text` | Inter |
| Card H3 | 20px | 700 | `--text` | Inter |
| Eyebrow | 11px | 500 | `--pink` | JetBrains Mono |
| Body | 16px | 400 | `--text-muted` | Inter |
| Body large | 17–20px | 400 | `--text-muted` | Inter |
| Caption / label | 13–14px | 500 | varies | Inter |
| Mono data | 12–14px | 400–500 | `--purple` or `--pink` | JetBrains Mono |

**Hero title gradient:**
```css
background: linear-gradient(135deg, #F8F8FA 20%, #7B2FBE 60%, #E91E8C 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

**Eyebrow style (used on all sections):**
```css
font-family: var(--font-mono);
font-size: 11px;
font-weight: 500;
color: var(--pink);
letter-spacing: 0.15em;
text-transform: uppercase;
margin-bottom: 16px;
```

### 2.3 Spacing & Layout

```css
--nav-h:       72px;
--max-w:       1200px;
--section-pad: 96px;       /* top + bottom padding per section */
--card-pad:    32px;
--container:   0 24px;     /* horizontal container padding */
```

**Responsive breakpoints:**
- Desktop: > 1024px
- Tablet: 768px – 1024px
- Mobile: < 768px
- Small: < 480px

### 2.4 Borders & Radius

```css
--radius-sm:  6px;
--radius-md:  10px;
--radius-lg:  16px;
--radius-xl:  24px;
```

Cards: `border-radius: 12px`
Buttons: `border-radius: 8px`
Badges/pills: `border-radius: 20px`
Domain pills: `border-radius: 8px`

---

## 3. File Structure

```
website/
├── index.html
├── services.html
├── products.html
├── contact.html
├── css/
│   └── style.css
└── js/
    └── main.js

../logos/
└── BAMBOO Consulting add-10.png   ← T1 logo (path relative to website/)
```

---

## 4. Shared Components

### 4.1 Navigation

**Behavior:** Fixed/sticky top, full width. `z-index: 100`. Frosted glass effect on scroll (backdrop-filter blur).

**Layout:** Logo left → nav links center/right → CTA button right → mobile toggle (hidden on desktop)

**Logo:** `<img src="../logos/BAMBOO Consulting add-10.png" alt="Bamboo Digital Consulting" height="36">`

**Nav links:** Services · Products · Contact
**Link style:** 14px, weight 500, color `--text-muted`, hover `--text`, active page = `--pink`

**CTA button:** "Book a Call" → `contact.html` — use `.btn--primary` style

**CSS:**
```css
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 72px;
  z-index: 100;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}
```

**Mobile (< 768px):** Hide nav links. Show hamburger toggle (3 bars). Clicking toggle shows a full-width dropdown panel below the nav with the links stacked vertically. JS handles open/close toggle.

### 4.2 Buttons

```css
/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  text-decoration: none;
}

/* Primary — gradient fill */
.btn--primary {
  background: var(--grad-button);  /* linear-gradient(135deg, #7B2FBE, #E91E8C) */
  color: #fff;
}
.btn--primary:hover { opacity: 0.9; transform: translateY(-1px); }

/* Ghost — transparent with purple border */
.btn--ghost {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}
.btn--ghost:hover { border-color: var(--purple); }

/* Outline — pink border */
.btn--outline {
  background: transparent;
  color: var(--pink);
  border: 1px solid var(--pink);
}
.btn--outline:hover { background: rgba(233, 30, 140, 0.1); }

/* Large modifier */
.btn--lg { font-size: 16px; padding: 16px 32px; }
```

### 4.3 Footer

Appears on all 4 pages. Identical across all pages.

**Layout:** Two rows
- Row 1: Brand block left (logo + tagline) + link columns right
- Row 2: Copyright left + legal links right

**Brand tagline:** "AI and Data Trust consultancy. Hawaii-based, async-first, outcomes-focused."

**Link columns:**

| Column: Services | Column: Company |
|-----------------|-----------------|
| Unified Governance → `services.html#governance` | Products → `products.html` |
| AI Adoption → `services.html#enablement` | Book a Call → `contact.html` |
| Custom AI Solutions → `services.html#custom` | adam@bdcllc.io → `mailto:adam@bdcllc.io` |
| Transformation → `services.html#transformation` | |

**Copyright:** © 2026 Bamboo Digital Consulting, LLC. All rights reserved.
**Legal links:** Privacy · Terms (href="#" placeholder)

**CSS:**
```css
.footer {
  background: #050505;
  border-top: 1px solid var(--border-subtle);
  padding: 48px 0 0;
}
```

### 4.4 Section Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

Every section's content wraps in `.container`. Sections alternate between `--bg` and `--bg-section` backgrounds.

### 4.5 Section Header (centered, used on most sections)

```html
<div class="section-header">
  <p class="section-eyebrow">EYEBROW TEXT</p>
  <h2 class="section-title">Headline</h2>
  <p class="section-sub">Supporting copy.</p>
</div>
```

```css
.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 64px;
}
```

### 4.6 Cards

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 32px;
  transition: border-color 0.2s, transform 0.2s;
}
.card:hover {
  border-color: var(--border);
  transform: translateY(-2px);
}
```

**Card icon:** 48×48px div, rounded 10px, background tinted from domain/accent color at ~10–15% opacity. Contains an inline SVG icon (see icon spec below).

### 4.7 Accent Bar

A 3px tall, 48px wide, `--grad-accent` gradient bar. Used above section titles on left-aligned sections.

```css
.accent-bar {
  height: 3px;
  width: 48px;
  background: var(--grad-accent);
  border-radius: 2px;
  margin-bottom: 24px;
}
```

### 4.8 Feature List (inside cards and capability sections)

```html
<ul class="feature-list">
  <li>Item one</li>
  <li>Item two</li>
</ul>
```

```css
.feature-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
.feature-list li { font-size: 14px; color: var(--text-muted); display: flex; align-items: flex-start; gap: 10px; }
.feature-list li::before { content: '→'; color: var(--pink); font-weight: 600; flex-shrink: 0; }
```

### 4.9 Domain Pills

Used in the Nexus Framework section on homepage and services page.

```html
<div class="domain-pill">
  <div class="domain-pill__dot" style="background: #E91E8C;"></div>
  <span class="domain-pill__name">D0 · Strategy & Value</span>
  <span class="domain-pill__count">3 artifacts</span>
</div>
```

```css
.domain-pill {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px 16px;
  transition: background 0.2s;
}
.domain-pill:hover { background: rgba(255, 255, 255, 0.07); }
.domain-pill__dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.domain-pill__name { font-size: 13px; font-weight: 600; color: var(--text); }
.domain-pill__count { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); margin-left: auto; }
```

### 4.10 Icons (inline SVG)

Use inline SVG for all icons. No external icon library. Stroke-based, 24×24 viewBox, stroke-width 1.5–2.

| Context | Icon | SVG path suggestion |
|---------|------|-------------------|
| Unified Governance | Hexagon / grid | Hexagon outline |
| AI Adoption | Lightning bolt / zap | Zap shape |
| Custom AI | Gear / cog | Simple gear |
| Transformation | Arrow up-right | Diagonal arrow |
| Products | Box / package | Package box |
| Pain point: AI on bad data | Warning triangle | Triangle + ! |
| Pain point: Governance paperwork | Document | Doc outline |
| Pain point: Shadow AI | Eye with slash | Eye + line |
| Calibration Call | Clock / calendar | Calendar icon |

---

## 5. Page Specs

---

### 5.1 Homepage — `index.html`

**`<title>`:** Bamboo Digital Consulting — Trusted Data. Trusted AI. Trusted Outcomes.
**`<meta description>`:** BDC helps organizations build the trust infrastructure their AI strategy requires. AI and data governance, enablement, and transformation — operationalized.

**Active nav link:** none (homepage)

---

#### Section 1: Hero

**Background:** `--bg` with two radial gradient overlays:
- Top-left: `radial-gradient(ellipse at 20% 60%, rgba(30,10,60,0.9) 0%, transparent 55%)`
- Top-right: `radial-gradient(ellipse at 80% 40%, rgba(123,47,190,0.12) 0%, transparent 50%)`
- Plus a subtle `radial-gradient(circle at 75% 20%, rgba(233,30,140,0.07) 0%, transparent 40%)` for depth

**Layout:** Full viewport height (`min-height: 100vh`), centered content, padding-top = `--nav-h`

**Content (centered, max-width 860px):**

```
[EYEBROW] AI + Data Trust Consultancy

[H1 — gradient text]
Trusted data.
Trusted AI.
Trusted outcomes.

[SUBHEAD — 20px, --text-muted, max-width 620px, centered]
Most organizations want AI. Few trust what it's built on.
BDC closes that gap — with a methodology designed to
operationalize trust, not document it.

[CTA ROW]
[btn--primary btn--lg]  Book a Calibration Call →   → href: contact.html
[btn--ghost btn--lg]    Explore Services            → href: services.html
```

---

#### Section 2: The Trust Gap

**Background:** `--bg-section`
**Padding:** `--section-pad`

**Header:**
- Eyebrow: `The Problem`
- H2: `The trust gap is real.`
- Sub: `Your organization is deploying AI on data that wasn't built for it. Governance frameworks sit in SharePoint. The risk isn't theoretical — it's compounding.`

**Layout:** 3-column card grid (1 column on mobile)

**Cards:**

Card 1:
- Icon bg: `rgba(233, 30, 140, 0.1)` · Icon: warning triangle · Icon color: `--pink`
- Label: `AI on bad data` (color: `--pink`)
- Title: `Models you can't trust`
- Body: `AI models making decisions on unvalidated, undocumented, ungoverned data. The output is only as trustworthy as what goes in.`

Card 2:
- Icon bg: `rgba(212, 43, 79, 0.1)` · Icon: document · Icon color: `--crimson`
- Label: `Governance as paperwork` (color: `--crimson`)
- Title: `Frameworks that don't run`
- Body: `Policies exist. Nobody follows them. Governance frameworks are built, presented, and shelved. Six months later, nothing has changed.`

Card 3:
- Icon bg: `rgba(255, 77, 106, 0.1)` · Icon: eye with slash · Icon color: `--coral`
- Label: `AI risk without oversight` (color: `--coral`)
- Title: `Shadow AI proliferating`
- Body: `AI projects running outside any review process. No visibility. No accountability. No way to answer your board's questions about AI risk.`

---

#### Section 3: Why BDC

**Background:** `--bg`
**Padding:** `--section-pad`

**Header:**
- Eyebrow: `Why BDC`
- H2: `Governance that sticks. AI you can trust.`

**Layout:** 3-column stat/diff cards (1 column on mobile)

**Cards (`.diff-card` style — different from standard .card):**

```css
.diff-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 32px;
}
.diff-card__number {
  font-family: var(--font-mono);
  font-size: 48px;
  font-weight: 700;
  background: var(--grad-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 12px;
}
```

Card 1:
- Number: `Days`
- Title: `Not quarters.`
- Body: `Governing-grade frameworks, RACI matrices, and implementation runbooks delivered in days. AI handles the scale. Expert judgment governs every decision.`

Card 2:
- Number: `48+`
- Title: `Operationalized, not documented`
- Body: `48+ deliverable artifacts designed for adoption. Implementation plans, RACI matrices, runbooks — not policy documents that end up in SharePoint.`

Card 3:
- Number: `Fixed`
- Title: `Scope. Price. Timeline.`
- Body: `Every engagement has a fixed scope, a fixed price, and a defined outcome. No hourly billing. No scope creep surprises. You know exactly what you're buying.`

---

#### Section 3b: Social Proof

**Background:** `--bg`
**Padding:** 64px 0 (half of `--section-pad` — intentionally compact, transitional feel)

**No section header.** Let the quotes speak without eyebrow/title framing.

**Layout:** 3-column card grid, max-width 900px, centered. 1 column on mobile.

**Card style (`.quote-card`):**
```css
.quote-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  border-top: 2px solid var(--pink);
  border-radius: 10px;
  padding: 28px 32px;
}
.quote-card__text {
  font-size: 16px;
  color: var(--text);
  line-height: 1.75;
  margin-bottom: 20px;
  font-style: italic;
}
.quote-card__attribution {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}
```

**3 cards — swap with real quotes before launch:**

Card 1:
- Quote: `"We'd been through two governance initiatives that went nowhere. BDC delivered a working council structure and a complete RACI framework in under two weeks. For the first time, our data owners actually know what they own."`
- Attribution: `— VP of Data, Regional Healthcare System`

Card 2:
- Quote: `"Our board started asking hard questions about AI risk. BDC gave us the answers — and the documentation to back them up. The AI governance framework they built became our standard for every model deployment."`
- Attribution: `— Chief Data Officer, Financial Services`

Card 3:
- Quote: `"I've worked with the big firms. The difference with BDC is you get senior judgment on every deliverable. The work is faster and sharper than anything I've seen from a team ten times the size."`
- Attribution: `— Director of Enterprise Data, Mid-Market Technology`

> **Build note:** These are placeholder quotes. Adam will supply verified quotes before launch. Build the component in full — do not stub or comment out.

---

#### Section 4: Capabilities

**Background:** `--bg-section`
**Padding:** `--section-pad`

**Header:**
- Eyebrow: `Capabilities`
- H2: `Five ways we build trust.`
- Sub: `From governance foundations to AI enablement to strategic transformation — BDC works across the full spectrum of data and AI trust.`

**Layout:** CSS grid, `repeat(auto-fill, minmax(280px, 1fr))`, gap 24px. 5 cards — renders as 3+2 on desktop, 2+2+1 on tablet, 1 column on mobile.

**Cards:**

Card 1 — Unified Governance:
- Icon bg: `rgba(123, 47, 190, 0.15)` · Icon: hexagon · Icon color: `--purple`
- Label: `The Nexus Framework` (color: `--purple`)
- Title: `Unified Governance`
- Body: `7 domains. 48+ artifacts. 8 diagnostics. The Nexus Framework is governance built to run — not governance built to sit in a document.`

Card 2 — AI Adoption & Enablement:
- Icon bg: `rgba(233, 30, 140, 0.1)` · Icon: lightning bolt · Icon color: `--pink`
- Label: `Workshops + Enablement` (color: `--pink`)
- Title: `AI Adoption & Enablement`
- Body: `Close the gap between AI investment and AI outcomes. Readiness assessments, use case prioritization, and AI literacy programs that change how teams work.`

Card 3 — Custom AI Solutions:
- Icon bg: `rgba(255, 77, 106, 0.1)` · Icon: gear · Icon color: `--coral`
- Label: `Tailored + Custom Build` (color: `--coral`)
- Title: `Custom AI Solutions`
- Body: `Tailored Nexus implementations for your industry and context. Or a full custom AI build delivered with trusted engineering partners. BDC provides the trust layer.`

Card 4 — Transformation:
- Icon bg: `rgba(59, 130, 246, 0.1)` · Icon: arrow up-right · Icon color: `--blue`
- Label: `Strategic Advisory` (color: `--blue`)
- Title: `AI & Digital Transformation`
- Body: `For senior leaders navigating AI-driven transformation. Roadmaps that connect vision to execution. Governance design that scales with your ambition.`

Card 5 — Products:
- Icon bg: `rgba(139, 92, 246, 0.1)` · Icon: box/package · Icon color: `--soft-purple`
- Label: `Artifacts + Tools` (color: `--soft-purple`)
- Title: `Products`
- Body: `Productized frameworks and AI tools you can deploy today. From the Nexus Artifact Library to Claude Skills built for data and AI practitioners.`

---

#### Section 5: Nexus Framework Teaser

**Background:** `--bg`
**Padding:** `--section-pad`

**Layout:** 2-column grid (50/50), gap 64px, align-items center. Single column on mobile (text first, domains below).

**Left column:**
- Eyebrow: `Our Methodology`
- H2 (left-aligned): `The Nexus Framework`
- Accent bar (`.accent-bar`)
- Body: `A proprietary, modular methodology for operationalizing trust across the data and AI stack. Seven interconnected domains — from strategy through operations — that compound across every engagement.`
- CTA: `[btn--ghost] See the full framework →` → href: `services.html`

**Right column — domain pills (flex-wrap):**

| Dot Color | Label | Count |
|-----------|-------|-------|
| `--d0` #E91E8C | D0 · Strategy & Value | 3 artifacts |
| `--d1` #7B2FBE | D1 · Governance Core | 8 artifacts |
| `--d2` #3B82F6 | D2 · Data Quality | 8 artifacts |
| `--d3` #FF4D6A | D3 · AI & ML Governance | 15 artifacts |
| `--d4` #D42B4F | D4 · Regulatory & Compliance | 5 artifacts |
| `--d5` #8B5CF6 | D5 · Architecture & Enablement | 7 artifacts |
| `--d6` #6B7280 | D6 · Operations & Change | 6 artifacts |

---

#### Section 6: CTA Banner

**Background:** `linear-gradient(135deg, rgba(30,10,60,0.95), rgba(10,10,10,0.98))`
**Border-top:** `1px solid var(--border-subtle)`
**Padding:** 96px 24px
**Text alignment:** center

Add a radial gradient glow behind the content:
```css
/* Pseudo-element: centered radial glow */
background: radial-gradient(ellipse, rgba(123,47,190,0.15) 0%, transparent 70%);
```

**Content:**
- Eyebrow: `Get Started`
- H2: `Start with a conversation.`
- Body: `The Calibration Call is a 45-minute session with BDC's principal. You walk away with a clear map of your current trust gaps and a prioritized set of first steps.`
- CTA: `[btn--primary btn--lg] Book a Calibration Call →` → href: `contact.html`

---

### 5.2 Services Page — `services.html`

**`<title>`:** Services — Bamboo Digital Consulting
**`<meta description>`:** Five capability lines built around AI and data trust. Unified governance, AI adoption, custom solutions, transformation advisory, and productized tools.

**Active nav link:** Services

---

#### Page Header

**Background:** `--bg` with subtle radial glow top-left (same as hero but smaller — 30% opacity)
**Padding-top:** `--nav-h` + 64px

**Content (left-aligned, max-width 720px):**
```
[EYEBROW] What We Do

[H1]
Five capabilities.
One mission: trust.

[BODY — 18px]
BDC works across five interconnected capability lines — all built around a single outcome: organizations that trust their data and AI move faster, make better decisions, and carry less risk.
```

---

#### Five Capability Sections

Each capability is a full-width section with alternating `--bg` / `--bg-section` backgrounds. Each has an `id` attribute for anchor linking.

**Shared capability section layout:**
- Top: badge + H2 headline
- Bottom: 2-column grid (60% left body text / 40% right "what you get" panel)
- Single column on tablet/mobile

**Badge style (`.capability-badge`):**
```css
.capability-badge {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 4px;
  background: rgba(123,47,190,0.15);
  color: var(--purple);
  border: 1px solid rgba(123,47,190,0.3);
  display: inline-block; margin-bottom: 20px;
}
```

**"What you get" panel:**
```css
.what-you-get {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 28px;
}
.what-you-get h4 {
  font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--text-muted); margin-bottom: 16px;
}
```

---

**Capability 1 — Unified Governance**
`id="governance"` · Background: `--bg-section`

Badge: `The Nexus Framework`

H2: `Governance built to run — not to sit in a document.`

Body:
> The Nexus Framework is BDC's core methodology. Seven domains covering every dimension of data and AI governance — from strategy and ownership through data quality, AI risk, regulatory compliance, and operational sustainability.
>
> 48+ deliverable artifacts, 8 diagnostic assessments, and an AI-powered delivery engine that produces governing-grade work in days, not months. Every deliverable is designed for adoption: implementation-ready, RACI-mapped, and built to outlast the engagement.

**What you get:**
- Governance Maturity Diagnostic (entry point assessment)
- Domain-specific deliverables from the artifact library
- Implementation-ready frameworks — not policy documents
- RACI matrices, runbooks, and council operating models
- Ongoing governance operations support

---

**Capability 2 — AI Adoption & Enablement**
`id="enablement"` · Background: `--bg`

Badge: `Workshops + Enablement`

H2: `You bought the tools. Now make your organization actually use them.`

Body:
> AI adoption fails when the technology moves faster than the people and processes around it. BDC's enablement practice closes that gap — through structured workshops, readiness assessments, and use-case prioritization that connects AI investment to measurable outcomes.
>
> We start with workshops. Prompt libraries, internal AI toolkits, and custom enablement tools follow as your organization matures.

**What you get:**
- AI Readiness Assessment — current state, blockers, opportunity map
- Use Case Prioritization Workshop — identify and rank AI opportunities by value and feasibility
- AI Literacy Programs — for data teams and leadership
- Internal AI standards and usage guidelines
- Enablement roadmap with sequenced next steps

---

**Capability 3 — Custom AI Solutions**
`id="custom"` · Background: `--bg-section`

Badge: `Tailored + Custom Build`

H2: `The Nexus Framework, adapted. Or something built from the ground up.`

Body:
> Not every organization fits a standard engagement. BDC offers two paths for organizations that need more than an off-the-shelf approach.
>
> **Tailored Nexus** — The standard Nexus Framework adapted to your industry, regulatory context, and maturity level. Same artifact library and methodology, calibrated to your environment.
>
> **Custom AI Build** — Bespoke AI agents, pipelines, and applications built for your specific use case. BDC designs the governance and trust layer. Our trusted engineering partners handle the implementation. Custom scope, custom bid.

**What you get:**
- For Tailored: industry-specific regulatory mappings, calibrated artifact library, adjusted maturity benchmarks
- For Custom Build: trust architecture design, AI governance framework for the solution, partner-delivered engineering, BDC as ongoing trust advisor

---

**Capability 4 — AI & Digital Transformation**
`id="transformation"` · Background: `--bg`

Badge: `Strategic Advisory`

H2: `Where AI strategy meets organizational reality.`

Body:
> For senior leaders and CDOs navigating the intersection of AI ambition and operational readiness. BDC provides strategic advisory, transformation roadmapping, and governance design for organizations modernizing their data and AI stack.
>
> This is the entry point for organizations that know they need to change — but need a clear map of where to start, what it will cost, and how to sequence the work without destabilizing what's running today.

**What you get:**
- AI strategy and transformation roadmap
- Data platform governance design
- M&A data integration advisory
- Executive briefings and board-ready risk summaries
- Sequenced implementation plan with dependencies mapped

---

**Capability 5 — Products**
`id="products"` · Background: `--bg-section`

Badge: `Artifacts + Tools`

H2: `Productized tools built for practitioners.`

Body:
> The Nexus Artifact Library and BDC's growing suite of Claude Skills bring our methodology to you in self-serve, fixed-price packages. Built for data and AI professionals who need governing-grade outputs without a full engagement.
>
> Every artifact is AI-generated, expert-reviewed, and delivered in days. Every Claude Skill is a production-ready prompt package designed for immediate deployment.

**What you get:**
- Nexus Artifact Library — 48+ deliverables, menu-priced by complexity
- Claude Skills for consultants and knowledge workers
- Instruction decks and AI usage guides
- All purchases include future updates

→ Link: `[btn--ghost] Browse Products →` href: `products.html`

---

#### Nexus Framework Domain Breakdown

**Background:** `--bg`
**Padding:** `--section-pad`

**Header (left-aligned):**
- Eyebrow: `The Nexus Framework`
- H2: `Seven domains. Full coverage.`
- Accent bar
- Body: `The Nexus Framework covers every dimension of data and AI governance — from the strategic foundation through operational sustainability. Domains are modular: start where your pain is, build out from there.`

**Layout:** 7 domain cards in a grid (`repeat(auto-fill, minmax(300px, 1fr))`), gap 16px

**Domain card style:**
```css
.domain-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-left: 3px solid [domain-color];
  border-radius: 10px;
  padding: 24px;
}
```

**Domain cards:**

| Domain | Color | Name | Artifacts | 1-line description |
|--------|-------|------|-----------|-------------------|
| D0 | #E91E8C | Strategy & Value | 3 | Business case, ROI measurement, governance charter |
| D1 | #7B2FBE | Governance Core | 8 | Ownership, decision rights, policy, stewardship, council design |
| D2 | #3B82F6 | Data Quality | 8 | Measuring, managing, and improving data quality. Includes MDM strategy |
| D3 | #FF4D6A | AI & ML Governance | 15 | Model governance, AI risk, responsible AI, operations, and strategy |
| D4 | #D42B4F | Regulatory & Compliance | 5 | Privacy, classification, regulatory mapping |
| D5 | #8B5CF6 | Architecture & Enablement | 7 | Data mesh governance, data products, findable and trustworthy data |
| D6 | #6B7280 | Operations & Change | 6 | Deployment, adoption, and ongoing governance sustainability |

**Domain card content:**
- Colored left border (3px, domain color)
- Domain ID monotype label: e.g. `D0` in `--font-mono`, domain color
- Domain name: 16px bold
- Artifact count: `X artifacts` in `--text-muted`, `--font-mono` 12px
- 1-line description: 14px, `--text-muted`

---

#### Services Page CTA

Same `.cta-section` component as homepage.

Copy:
- Eyebrow: `Ready to start?`
- H2: `Not sure where to begin?`
- Body: `The Calibration Call is a 45-minute session that maps your current state and points you to the right entry point — whether that's a diagnostic, a specific artifact, or a broader engagement.`
- CTA: `[btn--primary btn--lg] Book a Calibration Call →` → `contact.html`

---

### 5.3 Products Page — `products.html`

**`<title>`:** Products — Bamboo Digital Consulting
**`<meta description>`:** Studio Deck Free and Studio Deck Pro — Claude Skills for consulting-grade presentations. Plus the Nexus Artifact Library for data and AI governance practitioners.

**Active nav link:** Products

---

#### Page Header

**Background:** `--bg` with radial glow (same treatment as services page header)

```
[EYEBROW] Tools & Resources

[H1]
Built for practitioners
who move fast.

[BODY — 18px]
Productized frameworks and AI tools you can deploy today.
No engagement required.
```

---

#### Studio Deck Section

**Background:** `--bg-section`
**Padding:** `--section-pad`

**Section header:**
- Eyebrow: `Claude Skill`
- H2: `Studio Deck`
- Body: `A Claude skill for building consulting-grade presentations. Professional structure, smart prompting, polished output — built for consultants and knowledge workers who need decks that look like they took 8 hours.`

**Layout:** 2-column grid (equal width), gap 32px. Single column on mobile. Free card left, Pro card right.

---

**Free Card (`id="studio-deck-free"`):**

Badge: `Free` (style: gray/muted tones)
```css
.product-badge--free {
  background: rgba(107,114,128,0.2);
  color: var(--text-muted);
  border: 1px solid rgba(107,114,128,0.3);
}
```

Title: `Studio Deck`

Body: `The foundation. Smart deck prompting for Claude with standard layouts, structured output, and professional formatting. Get started immediately.`

Includes:
- Core deck prompting skill
- Standard slide layouts and structures
- Basic output templates
- One-time download, yours to keep

CTA: `[btn--ghost] Download Free →`
→ **Action:** Opens email capture form / Mailchimp embed (placeholder: `href="#"`, add `data-action="email-gate"`)
→ Note in code comment: `<!-- TODO: Replace href with email gate / Mailchimp embed -->`

---

**Pro Card (`id="studio-deck-pro"`):**

Card style: `.product-card--pro` — distinct from free card:
```css
.product-card--pro {
  background: linear-gradient(135deg, rgba(30,10,60,0.8), rgba(10,10,10,0.95));
  border: 1px solid rgba(233,30,140,0.3);
  border-radius: 16px;
  padding: 40px;
  position: relative;
  overflow: hidden;
}
/* Top accent line */
.product-card--pro::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--grad-accent);
}
```

Badge: `Pro` (style: pink tones)
```css
.product-badge--pro {
  background: rgba(233,30,140,0.15);
  color: var(--pink);
  border: 1px solid rgba(233,30,140,0.3);
}
```

Title: `Studio Deck Pro`

Body: `Everything in Studio Deck, plus AI-generated visual assets, advanced layout controls, premium slide templates, and nano-banana Pro integration for Gemini image generation. Purchase includes all future updates as the skill expands.`

Includes:
- Everything in Studio Deck (Free)
- AI visual asset generation via Gemini
- Premium template library
- nano-banana Pro integration
- Advanced layout and composition controls
- All future feature drops included

Price block:
```html
<div class="price-block">
  <span class="price-amount">$49</span>
  <span class="price-note">One-time · Includes all future updates</span>
</div>
```
```css
.price-amount { font-size: 40px; font-weight: 800; color: var(--text); display: block; line-height: 1; margin-bottom: 4px; }
.price-note { font-size: 13px; color: var(--text-muted); }
```

CTA: `[btn--primary btn--lg] Buy Studio Deck Pro — $49 →`
→ **Action:** Lemon Squeezy checkout link
→ Note in code comment: `<!-- TODO: Replace href with Lemon Squeezy checkout link -->`

**"Launch price" note below CTA:**
Small text (12px, `--text-muted`): *Launch pricing. Price increases as the skill expands.*

---

#### Coming Soon Section

**Background:** `--bg`
**Padding:** 64px 0

**Layout:** centered, max-width 640px

```
[EYEBROW] Coming Soon

[H2] More tools on the way.

[BODY]
The Nexus Artifact Library — 48+ governance and AI deliverables,
menu-priced and ready to deploy. Additional Claude Skills for
data governance, AI policy, and regulatory compliance practitioners.

[Small text — --text-subtle, --font-mono, 12px]
Get notified when new products drop.

[CTA btn--outline] Stay in the loop → href: contact.html
```

---

#### Products Page CTA

Eyebrow: `Not sure which product fits?`
H2: `Start with a conversation.`
Body: `The Calibration Call is the fastest path to clarity. 45 minutes. Walk away knowing exactly where to start.`
CTA: `[btn--primary btn--lg] Book a Calibration Call →` → `contact.html`

---

### 5.4 Contact Page — `contact.html`

**`<title>`:** Book a Call — Bamboo Digital Consulting
**`<meta description>`:** Book a Calibration Call with BDC. 45 minutes. Walk away with a clear map of your data and AI trust gaps and a prioritized set of next steps.

**Active nav link:** Contact

---

#### Page Header

```
[EYEBROW] Get Started

[H1]
Start the conversation.

[BODY — 18px, max-width 560px]
Every engagement begins with clarity.
The Calibration Call is how we get there.
```

---

#### Calibration Call Section

**Background:** `--bg-section`
**Padding:** `--section-pad`

**Layout:** 2-column (60% left content / 40% right panel), gap 64px. Single column on mobile.

**Left side:**

Badge (`.capability-badge`): `Entry Point`

H2: `The Calibration Call`

Body:
> A 45-minute diagnostic session with BDC's principal. You come with your challenges. We come with a framework for understanding them.
>
> No pre-work required. No RFP. No procurement process. Just a conversation that produces clarity.

**What you walk away with:**
- An honest assessment of your current data and AI trust posture
- Identification of your highest-risk gaps across the Nexus Framework domains
- A concrete set of prioritized first steps — whether that's a deeper diagnostic, a specific artifact, or a broader engagement
- No obligation. If BDC isn't the right fit, you'll know that too.

**Right side — booking panel:**

```css
.booking-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
}
```

Content in booking panel:
```
[Small label — --font-mono, 12px, --text-muted]
Schedule a time

[H3 — 20px]
Book your Calibration Call

[Body — 14px, --text-muted, margin-bottom 32px]
Select a time that works for you.
Available Tuesday & Thursday mornings (Hawaii Time).

[CALENDLY EMBED PLACEHOLDER]
<!-- TODO: Replace this div with Calendly inline embed -->
<div class="calendly-placeholder">
  [Placeholder: centered icon + "Calendar loading..." text, 200px height, dashed border]
</div>

[Divider — "or" with lines on each side]

[Body — 14px, --text-muted]
Prefer email?

[Link — pink, 16px]
adam@bdcllc.io
```

**Calendly placeholder styling:**
```css
.calendly-placeholder {
  height: 200px;
  border: 1px dashed var(--border);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted); font-size: 14px;
  margin-bottom: 24px;
}
```

---

#### What to Expect Section

**Background:** `--bg`
**Padding:** 64px 0

**Header:**
- Eyebrow: `The Process`
- H2: `What happens after you book.`

**Layout:** 3-step horizontal flow (numbered steps in a row), single column on mobile

**Steps:**

Step 1:
- Number: `01` (large, gradient text)
- Title: `Book`
- Body: `Select any open Tuesday or Thursday morning slot. You'll receive a confirmation with a short context form — 5 questions, 3 minutes.`

Step 2:
- Number: `02` (large, gradient text)
- Title: `Talk`
- Body: `45 minutes. We cover your current state, your goals, and the biggest gaps between them. No pitch. No deck.`

Step 3:
- Number: `03` (large, gradient text)
- Title: `Decide`
- Body: `You walk away with a written summary of findings and a clear set of recommended next steps. Zero obligation.`

**Step number style:**
```css
.step-number {
  font-family: var(--font-mono);
  font-size: 56px; font-weight: 700;
  background: var(--grad-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1; margin-bottom: 16px;
  opacity: 0.7;
}
```

---

#### Contact Page CTA

Eyebrow: `Other questions?`
H2: `Reach out directly.`
Body: `Prefer to start with an email? Send a note to adam@bdcllc.io and expect a response within one business day.`
CTA: `[btn--outline btn--lg] adam@bdcllc.io` → `href: mailto:adam@bdcllc.io`

---

## 6. JavaScript — `js/main.js`

Minimal. Two behaviors only:

**1. Mobile nav toggle:**
```javascript
// Toggle mobile nav open/close
const toggle = document.querySelector('.nav__mobile-toggle');
const navLinks = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav__links--open');
  toggle.classList.toggle('is-open');
});
// Close on link click
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
    toggle.classList.remove('is-open');
  });
});
```

**2. Active nav link:**
```javascript
// Set active class based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
```

---

## 7. Mobile Nav Styles

```css
/* Mobile links panel (hidden by default) */
.nav__links {
  /* Desktop: flex row */
}
@media (max-width: 768px) {
  .nav__links {
    display: none;
    position: fixed;
    top: 72px; left: 0; right: 0;
    background: rgba(10,10,10,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-subtle);
    flex-direction: column;
    padding: 24px;
    gap: 0;
  }
  .nav__links--open { display: flex; }
  .nav__links li { border-bottom: 1px solid var(--border-subtle); }
  .nav__links a { display: block; padding: 16px 0; font-size: 16px; }
  /* Hamburger animation */
  .nav__mobile-toggle.is-open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .nav__mobile-toggle.is-open span:nth-child(2) { opacity: 0; }
  .nav__mobile-toggle.is-open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
}
```

---

## 8. Responsive Rules Summary

| Element | Desktop (>1024px) | Tablet (768–1024px) | Mobile (<768px) |
|---------|------------------|--------------------|--------------------|
| Nav links | Visible, horizontal | Visible, horizontal | Hidden, toggle shows vertical panel |
| Hero H1 | 80px | 56px | 42px |
| Pain/capability cards | 3 columns | 2 columns | 1 column |
| Diff cards | 3 columns | 3 columns | 1 column |
| Nexus Framework section | 2 columns | 1 column | 1 column |
| Capability sections | 2 columns (60/40) | 1 column | 1 column |
| Domain cards | auto-fill ~3 col | auto-fill ~2 col | 1 column |
| Product cards | 2 columns | 2 columns | 1 column |
| Process steps | 3 columns horizontal | 3 columns horizontal | 1 column |
| Booking panel | 2 columns (60/40) | 1 column | 1 column |
| Footer links | Side by side | Side by side | Stacked |
| Hero CTAs | Row | Row | Column, full width |

---

## 9. SEO & Meta

All pages include:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0A0A0A">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Bamboo Digital Consulting">
<meta property="og:image" content="[path to og-image.png — TBD]">
```

**Page-specific titles:**
- Home: `Bamboo Digital Consulting — Trusted Data. Trusted AI. Trusted Outcomes.`
- Services: `Services — Bamboo Digital Consulting`
- Products: `Products — Bamboo Digital Consulting`
- Contact: `Book a Call — Bamboo Digital Consulting`

---

## 10. TODOs (Placeholders to Swap Post-Build)

| Location | What to replace | Notes |
|----------|----------------|-------|
| All pages — nav logo | Logo path `../logos/BAMBOO Consulting add-10.png` | Confirm path resolves correctly after deploy |
| `products.html` — Free CTA | `href="#"` | Replace with email gate / Mailchimp embed |
| `products.html` — Pro CTA | Lemon Squeezy checkout link | Get from Lemon Squeezy after setting up product |
| `contact.html` — Calendly | `<div class="calendly-placeholder">` | Replace with Calendly inline embed script |
| All pages — Privacy/Terms | `href="#"` | Add real pages or remove links pre-launch |
| All pages — OG image | `og:image` meta | Create a 1200×630 OG card image |

---

## 11. Hard Rules (Do Not Violate)

1. **No prices anywhere.** Not on homepage, not on services, not on products — except Studio Deck Pro's `$49` on the products page. That is the only number.
2. **No teal. No amber.** These colors are explicitly rejected. If you're choosing a color and reach for teal or amber, stop and use a brand color instead.
3. **Dark backgrounds on all pages.** `--bg` or `--bg-section` only. Never white or light gray backgrounds.
4. **Inter + JetBrains Mono only.** No other typefaces.
5. **Gradient text on hero H1 only.** Section H2s are plain `--text`. No gradient text elsewhere except `.diff-card__number` and `.step-number`.
6. **No external JS libraries.** No jQuery, no Lodash, no Alpine, no HTMX. Vanilla JS only.
7. **No placeholder copy.** Every `Lorem ipsum` is a bug. All copy is specified in this document — use it verbatim. Exception: the 3 social proof quote cards are intentionally left as `<!-- TODO -->` comments for Adam to fill in.
8. **Logo is always `add-10.png`** on dark backgrounds (all pages use dark backgrounds). Never swap the logo.
9. **WCAG 4.5:1 minimum contrast on all text.** Priority checks: `--text-muted` (#9CA3AF) over `--bg-card` (#111128), pink/crimson eyebrow labels over `--bg-section` (#0F0F1A), and gradient text at small sizes. Fail = fix before shipping.
10. **No audience narrowing.** BDC serves any client interested in data and AI — individuals, small teams, mid-market, enterprise, any role or title. Do not add "For CDOs," "For Enterprise," or role-gated language anywhere in the copy or navigation.
