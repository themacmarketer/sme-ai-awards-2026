# Delivery report — Singapore SME AI Impact Showcase

**Production URL:** https://sme-ai-awards-2026.vercel.app
**Vercel project:** `maplecommerce-projects/sme-ai-awards-2026`
**Local project:** `/Users/ivanwong/WorkBuddy AI/2026-10-18-16-07-26`
**Deployed:** 18 October 2026, from source (no prebuilt upload)
**Canonical source retrieved:** 18 October 2026, 16:15 SGT

---

## 1. Published winners

| Item | Verified value |
|---|---|
| Total winners | **30** |
| Innovation Excellence | **15** |
| Adoption Excellence | **15** |
| Duplicate or missing records | **0** |
| Winners with 3 published challenges | 30 / 30 |
| Winners with 3 published metrics | 30 / 30 |
| Winners with a named AI solution | 30 / 30 |
| Winners with 3+ solution components | 30 / 30 |

The 30/30/15-15 claim in the brief is confirmed by the canonical page. No adjustment to the headline
was needed.

## 2. Evidence grades

| Grade | Meaning | Count |
|---|---|---|
| A | Independently supported | **1** (Greenphyto) |
| B | Canonical source supported | **29** |
| C | Limited public evidence | **0** |

Grade A requires a source from a party other than the winner that addresses the implementation
itself. Only Greenphyto clears that bar, through Bloomberg-syndicated coverage of its facility and
its AI-controlled growing environment.

Every other winner rests on the official citation. Nine of the thirty name a technology vendor at
any layer; the rest describe what the system does without naming what it runs on. That is a limit
of public evidence, not of the implementations.

## 3. Research completeness

- Coverage range: **85–100**, mean **94** (ten evidence dimensions, computed from the record).
- SCQA narratives: **350–438 words**, mean **365** — inside the 350–600 target.
- Claims with source references: **113**.
- Stack rows with per-layer evidence status: **159**.
- Labelled inference blocks: **1** (Accountingbpo only, where the workflow is described precisely
  enough to justify one).
- Distinct sources cited: **37** of 43 in the registry (up from 19 of 27).
- Winners with verified company URLs: **30 / 30** (100%).
- Winners with verified desktop screenshots: **30 / 30** (100%).

## 4. Source and hyperlink validation

`scripts/check-links.mjs`, run 19 October 2026 against all 37 cited sources:

| Verdict | Count |
|---|---|
| OK (2xx) | 31 |
| Blocked (403 to automated client) | 3 — accountingbpo.com, glints.com, ihubsolutions.com |
| Rate-limited (429) | 1 — prnasia.com |
| Unreachable from Node fetch | 2 — group.ong-ong.com, goodstuph.com |
| Definitively broken (404/410) | **0** |

All non-OK sources are live, accessible in a real browser, and documented.

## 5. Lighthouse

**Not run.** Lighthouse could not be installed in this environment: the npm cache is not writable
by the current user and the host blocks the temp-file deletes npm requires. Rather than report a
score I could not produce, here are the measurements I did take.

Measured on the live homepage, cold load, headless Chromium, 1440×900:

| Metric | Value |
|---|---|
| TTFB | 12 ms |
| First Contentful Paint | 624 ms |
| DOMContentLoaded | 614 ms |
| Load | 888 ms |
| Requests | 17 |
| JavaScript transferred | 291 KB (12 files) |
| CSS transferred | 6 KB |
| Total transferred | 394 KB |

LCP was not captured (the observer was registered after load, so the entry was empty). I am not
reporting an LCP figure I did not measure.

## 6. Accessibility checks

Run against the live homepage DOM:

- Exactly one `h1`; no heading-level jumps.
- 5 form controls, all with programmatic labels.
- 0 images without `alt` (no raster images are used in content).
- 0 buttons or links without an accessible name.
- Landmarks: one `header`, one `main`, one `footer`, two `nav`.
- Contrast: body text **17.66:1**, muted text **5.32:1** (both exceed WCAG AA 4.5:1).
- Skip link, visible focus rings, `prefers-reduced-motion` handling, and `aria-live` on the filter
  result count are implemented.

These are DOM assertions, not an automated WCAG audit. A full audit is outstanding.

## 7. Functional tests (live deployment)

| Test | Result |
|---|---|
| Search ("invoice") | 30 → 1 result |
| Industry filter (Education) | 30 → 3 results |
| Industry + search combined | 3 → 1 result |
| Clear all filters | back to 30 |
| Outcome filter (Revenue) | 30 → 9 results |
| Sort control | present, three modes |
| Compare: default selection | 2 columns, 11 attribute rows |
| Compare: add third case | 3 columns |
| Mobile navigation (390 px) | opens, all 5 links present |
| Horizontal overflow at 390 px | none on home, winner, insights |

## 8. Build and deployment

Build runs on Vercel from source. Final build log tail:

```
▲ Next.js 15.5.28
Creating an optimized production build ...
✓ Compiled successfully in 8.7s
Linting and checking validity of types ...
Collecting page data ...
Generating static pages (0/40) ...
✓ Generating static pages (40/40)
Finalizing page optimization ...
Collecting build traces ...
✓ Ready in 31s
▲ Aliased  https://sme-ai-awards-2026.vercel.app
```

Local gates: `tsc --noEmit` clean; `scripts/validate.mjs` passes with **0 errors and 0 warnings**.

Verification on the live deployment: `/`, `/winners/[slug]`, `/insights`, `/compare`, `/about`,
`/research-gaps` all return 200. `sitemap.xml` lists 35 URLs (5 static + 30 case studies).
`robots.txt` references the sitemap. Case-study pages carry canonical URLs, descriptions, OG tags
and `Article` + `BreadcrumbList` JSON-LD.

## 9. Deviations and outstanding gaps

1. **Lighthouse not run** — environment blocked installation. Measured web vitals reported above.
2. **One Grade A** — independent coverage of a five-day-old award is genuinely thin. General web
   search also returned a high proportion of irrelevant results for small-company queries.
3. **No winner was contacted** — no company confirmed or corrected its case study.
4. **Vendor disclosure is sparse** — 19 of 30 winners name no vendor at any layer (11 now have
   independently corroborated or company-disclosed vendors). Nothing has been guessed to fill the gap.
5. **No paired baselines** — every citation reports relative change without before-and-after
   values, so no improvement percentage has been calculated from an assumed baseline.
6. **Diagrams scroll horizontally below 560 px** rather than shrinking, because scaling a 680 px
   diagram to 390 px would drop label text below legible size.
7. **shadcn/ui not used.** Equivalent accessible primitives were written directly to avoid pulling a
   Radix dependency tree into a static export. Same for Mermaid: diagrams are deterministic SVG
   generated from the structured record, which is lighter and accessible.

## 10. Repository layout

```
data/winners-raw.json      canonical extraction + provenance
data/sources.json          43-record source registry (T0–T3)
data/content/batch1-6.json authored case studies
data/winners.json          built dataset (consumed by the app)
lib/schema.mjs             Zod schema (runtime validation)
lib/types.ts               TypeScript types
scripts/build_data.py      merge + coverage computation
scripts/validate.mjs       schema, reference, inventory, route checks
scripts/check-links.mjs    link checker (broken vs blocked)
app/                       Next.js App Router, static export
components/                UI, directory, diagrams, charts
qa/                        screenshots (1440 px and 390 px)
```

## 11. Update log

**18 October 2026 — Catalyst Performance case study strengthened.**
Added `T1-CATALYST-PR`, a GlobeNewswire release distributed on Business Insider Markets
(16 October 2026). The page states that Markets Insider and Business Insider editorial teams were
not involved in its creation, so it is a company-issued primary source, not independent reporting.
The evidence grade therefore stays at **B**.

What the source added:

- Founder and operator detail: Bervin Manoharan, Jeremy Soh and Dr Luqman Haris; 25+ years of
  combined coaching experience; studio at Manulife Tower.
- Named models: DeepSeek and "Fable, the latest Claude model from Anthropic". The stack is now
  recorded as model-agnostic rather than Claude-only.
- Systems built in-house: website, marketing systems, operations panel, WhatsApp and Instagram
  assistants, client nutrition log.
- A dated Search Console comparison: 60 days to 12 October 2026 against 9 March to 8 May 2026,
  with clicks up more than 1,500%, impressions eight times higher, and page four to page one.
- Confirmation that SBF verified the nomination figures at the studio in August 2026.
- The stated next step: hosting its own models and infrastructure.

Coverage for this case rose from 80 to 90. The case is still listed on `/research-gaps` as having
no independent corroboration, because a self-issued release does not satisfy that test.

Two claims in the release are recorded as company claims rather than established facts: that
Catalyst is the first fitness brand to win, and the identity of the model named "Fable".

**19 October 2026 — Missing details researched and complete screenshots populated across all 30 winners.**
- Researched and populated official company URLs for all 9 previously unlinked winners:
  - Limteh Project (`https://limtehproject.com/`)
  - Agape CP Holdings (`https://agape-cp.com/`)
  - Brew Interactive (`https://brewinteractive.com/`)
  - IYLA Collective (`https://iylacollective.com/`)
  - Kopi Near Me (`https://kopinearme.com/`)
  - Linksworkz Design Studio (`https://www.linksworkz.com/`)
  - McLink Asia (`https://www.mclink.com.sg/`)
  - Nami Japanese Academy (`https://www.namijapaneseacademy.com/`)
  - The Gourmet Factor (`https://thegourmetfactor.com/`)
- Corrected Kyanon Digital's domain to its active home (`https://kyanon.digital/`).
- Captured, verified, and formatted 1280×800 desktop screenshots for all 30 winners (30/30, 100%), resolving previous Cloudflare/tunnel rejections for Accountingbpo, Glints Singapore, and Kyanon Digital.
- Added 16 new authoritative sources to `data/sources.json`, including the official IMDA ceremony release (`T1-IMDA-DAY2026`), third-party vendor case study (`T2-FOCALSCOPE-AGAPE`), and primary company documentation across all winners.
- Enriched implementation timelines and technology stacks across all sparse entries (multi-event timelines for all 30 winners, technology vendor attributions, and clarified integration layers).
- Mean coverage score across the 30 winners increased from 85 to **94** (range 85–100).
- Passed full validation suite (`validate.mjs`, `check-links.mjs`, Next.js static export build 40/40 pages) with zero errors.
