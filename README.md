# Bamboo Digital Consulting — Website

Live: [bdcllc.io](https://bdcllc.io)

AI governance, data trust, and AI enablement consulting for health plans and regulated enterprises.

## What BDC Does

Bamboo Digital Consulting helps healthcare and regulated-industry organizations build AI and data governance programs that are audit-ready, adaptable to shifting regulation (NIST AI RMF, EU AI Act, HIPAA), and operationally grounded. Core service areas: AI governance, data governance, AI enablement, and regulatory compliance.

## TEMPO Framework

TEMPO (Trust-Engineered Model for Production Operations) is BDC's proprietary AI operating model. It provides a structured approach to deploying AI in regulated environments — governing model selection, monitoring, audit trails, and risk escalation. The `products.html` page covers TEMPO positioning. Detailed framework documentation is internal.

## Pages & Tools

| File | Purpose |
|------|---------|
| `index.html` | Homepage — positioning, TEMPO intro, research ticker, CTA |
| `services.html` | Service offerings: AI governance, data governance, AI enablement |
| `products.html` | TEMPO framework product page |
| `tools.html` | Client-facing tools index |
| `diagnostic.html` | AI readiness diagnostic (interactive) |
| `assessment.html` | Maturity assessment tool |
| `assessment-preview.html` | Assessment preview/landing |
| `calculator.html` | ROI / value calculator |
| `insights.html` | Research and insights index |
| `contact.html` | Book a call / contact form |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |

Research assets in `research/` are published PDFs (double-gap analysis, AI spend inversion).

## Deployment

Deployed on Netlify. No build step — pure static HTML/CSS/JS.

- **Publish directory:** `.` (repo root)
- **Config:** `netlify.toml`
- **Headers:** `_headers` (security headers)

Deploy by pushing to `main`. Netlify auto-deploys on push.

## Newsletter & Database

`supabase-newsletter-migration.sql` and `supabase-tier2-migration.sql` contain the Supabase schema for newsletter signups and tier-2 user management. `js/newsletter.js` handles the frontend integration.

## What's Proprietary

- TEMPO framework methodology and scoring
- Client assessment instruments (`diagnostic.html`, `assessment.html`)
- Research papers in `research/`

The HTML/CSS shell is reusable. The framework content is not.
