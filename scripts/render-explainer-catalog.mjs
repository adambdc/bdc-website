#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = resolve(root, "explainers/catalog.json");
const landingPath = resolve(root, "explainers/index.html");
const sitemapPath = resolve(root, "sitemap.xml");
const checkOnly = process.argv.includes("--check");
const allowedVisibility = new Set(["internal", "restricted", "public_review", "public"]);
const publicCatalogVisibility = new Set(["restricted", "public"]);

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const requiredString = (entry, field) => {
  if (typeof entry[field] !== "string" || !entry[field].trim()) {
    throw new Error(`${entry.id || "catalog entry"}: ${field} must be a non-empty string`);
  }
};

const source = JSON.parse(await readFile(catalogPath, "utf8"));
if (source.schema_version !== "bdc/explainer-catalog/v1" || !Array.isArray(source.entries)) {
  throw new Error("Unsupported or malformed explainer catalog");
}

const ids = new Set();
for (const entry of source.entries) {
  for (const field of ["id", "slug", "title", "summary", "href", "visibility", "status", "status_label", "updated", "audience"]) {
    requiredString(entry, field);
  }
  if (ids.has(entry.id)) throw new Error(`Duplicate explainer id: ${entry.id}`);
  ids.add(entry.id);
  if (!allowedVisibility.has(entry.visibility)) throw new Error(`${entry.id}: invalid visibility`);
  if (typeof entry.promoted !== "boolean") throw new Error(`${entry.id}: promoted must be boolean`);
  if (!Array.isArray(entry.topics) || !entry.topics.every((topic) => typeof topic === "string" && topic.trim())) {
    throw new Error(`${entry.id}: topics must be an array of non-empty strings`);
  }
  if (entry.href !== `/explainers/${entry.slug}/`) throw new Error(`${entry.id}: href must match slug`);
}

// Safety invariant: Internal and Public review items are never listed on the public hub.
const promoted = source.entries.filter((entry) => entry.promoted && publicCatalogVisibility.has(entry.visibility));
const publicEntries = source.entries.filter((entry) => entry.visibility === "public");
const restrictedEntries = promoted.filter((entry) => entry.visibility === "restricted");

const visibilityLabel = {
  restricted: "Restricted",
  public: "Public"
};

function renderCard(entry) {
  const restricted = entry.visibility === "restricted";
  const topics = entry.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("\n                ");
  return `        <article class="explainer-card explainer-card--${escapeHtml(entry.visibility)}">
          <div class="explainer-card__topline">
            <span class="status-pill">${escapeHtml(visibilityLabel[entry.visibility])}</span>
            <span class="explainer-card__state">${escapeHtml(entry.status_label)}</span>
          </div>
          <h3>${escapeHtml(entry.title)}</h3>
          <p class="explainer-card__summary">${escapeHtml(entry.summary)}</p>
          <ul class="explainer-card__topics" aria-label="Topics">
                ${topics}
          </ul>
          <div class="explainer-card__meta">
            <span>Updated ${escapeHtml(entry.updated)}</span>
            <span>${escapeHtml(entry.audience)}</span>
          </div>
          <div class="explainer-card__footer">
            <p class="explainer-card__access-note">${restricted ? "Authentication is required. Access is limited to BDC and named partners." : "Available without sign-in and cleared for public discovery."}</p>
            <a class="btn btn--primary" href="${escapeHtml(entry.href)}">${restricted ? "Partner sign-in" : "Open explainer"} &rarr;</a>
          </div>
        </article>`;
}

const cards = promoted.length
  ? promoted.map(renderCard).join("\n")
  : `        <div class="explainer-card"><h3>No promoted explainers yet</h3><p>New explainers will appear here when their promotion and visibility metadata allow listing.</p></div>`;

const landing = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0A0A0A">
  <meta name="description" content="Promoted interactive explainers from Bamboo Digital Consulting, with current access and publication status.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://bdcllc.io/explainers/">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="explainers.css">
  <title>BDC Explainers | Bamboo Digital Consulting</title>
</head>
<body class="explainer-page">
  <nav class="nav" aria-label="Primary navigation">
    <div class="container">
      <a href="../" class="nav__logo-link"><img src="../assets/logo.png" alt="Bamboo Digital Consulting" height="72"></a>
      <ul class="nav__links">
        <li><a href="../services.html">Services</a></li>
        <li><a href="../products.html">TEMPO</a></li>
        <li><a href="../insights.html">Insights</a></li>
        <li><a href="./" class="active" aria-current="page">Explainers</a></li>
        <li><a href="../contact.html">Contact</a></li>
      </ul>
      <div class="nav__actions">
        <a href="../contact.html" class="btn btn--primary">Book a Call</a>
        <button class="nav__mobile-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <main>
    <section class="explainer-hero">
      <div class="container explainer-hero__grid">
        <div>
          <p class="eyebrow">BDC Explainers</p>
          <h1>See the system,<br>not the slideware.</h1>
          <p class="explainer-hero__intro">Interactive, evidence-connected views of the operating models, architectures, and governed workflows behind durable AI and data programs.</p>
        </div>
        <div class="catalog-summary" aria-label="Explainer catalog summary">
          <div class="catalog-summary__item">
            <span class="catalog-summary__number">${promoted.length}</span>
            <span class="catalog-summary__label">Promoted</span>
          </div>
          <div class="catalog-summary__item">
            <span class="catalog-summary__number">${restrictedEntries.length}</span>
            <span class="catalog-summary__label">Partner access</span>
          </div>
        </div>
      </div>
    </section>

    <section class="explainer-catalog" aria-labelledby="catalog-heading">
      <div class="container">
        <div class="catalog-header">
          <div>
            <p class="section-eyebrow">Promoted now</p>
            <h2 id="catalog-heading">Explore the current catalog.</h2>
          </div>
          <p class="catalog-header__note">Every listing shows its current release state. Restricted explainers require an approved identity before any explainer content is served.</p>
        </div>
        <div class="explainer-grid">
${cards}
        </div>
      </div>
    </section>

    <section class="visibility-section" aria-labelledby="visibility-heading">
      <div class="container">
        <div class="visibility-intro">
          <div>
            <p class="section-eyebrow">Visibility model</p>
            <h2 id="visibility-heading">Status has consequences.</h2>
          </div>
          <p class="body-large">Promotion does not override access. A single metadata record controls whether an explainer is listed, authenticated, unlisted, or discoverable by search engines.</p>
        </div>
        <div class="visibility-grid">
          <article class="visibility-card">
            <span class="visibility-card__marker">Not listed</span>
            <h3>Internal</h3>
            <p>Not published externally.</p>
          </article>
          <article class="visibility-card visibility-card--active">
            <span class="visibility-card__marker">May be promoted</span>
            <h3>Restricted</h3>
            <p>Authenticated preview for BDC or named clients.</p>
          </article>
          <article class="visibility-card">
            <span class="visibility-card__marker">Never listed</span>
            <h3>Public review</h3>
            <p>Unlisted and noindex, only for material already cleared for public exposure.</p>
          </article>
          <article class="visibility-card">
            <span class="visibility-card__marker">May be promoted</span>
            <h3>Public</h3>
            <p>Listed on this hub and available to search engines.</p>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="../assets/logo.png" alt="Bamboo Digital Consulting" height="64">
          <p class="footer-tagline">AI and Data Trust. Delivered.</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="../services.html">Services</a></li>
              <li><a href="../products.html">TEMPO Framework</a></li>
              <li><a href="../insights.html">Insights</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="../contact.html">Book a Call</a></li>
              <li><a href="mailto:info@bdcllc.io">info@bdcllc.io</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="text-subtle">&copy; 2026 Bamboo Digital Consulting, LLC. All rights reserved.</p>
        <div class="footer-legal"><a href="../privacy.html">Privacy</a><a href="../terms.html">Terms</a></div>
      </div>
    </div>
  </footer>
  <script src="../js/main.js"></script>
</body>
</html>
`;

const publicUrls = publicEntries.map((entry) => `  <url><loc>https://bdcllc.io${escapeHtml(entry.href)}</loc></url>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://bdcllc.io/</loc></url>
  <url><loc>https://bdcllc.io/explainers/</loc></url>${publicUrls ? `\n${publicUrls}` : ""}
</urlset>
`;

async function writeOrCheck(path, content) {
  if (!checkOnly) {
    await writeFile(path, content, "utf8");
    return;
  }
  const current = await readFile(path, "utf8");
  if (current !== content) throw new Error(`${path} is stale; run the catalog renderer`);
}

await writeOrCheck(landingPath, landing);
await writeOrCheck(sitemapPath, sitemap);
console.log(`${checkOnly ? "Verified" : "Rendered"} ${promoted.length} promoted explainer(s); ${publicEntries.length} public sitemap entr${publicEntries.length === 1 ? "y" : "ies"}.`);
