# Singapore SME AI Impact Showcase

An evidence-graded case-study library of the 30 winners of the **SME AI Impact Awards 2026**, organised by IMDA and the Singapore Business Federation.

Independent research project. Not affiliated with, endorsed by, or sponsored by IMDA, SBF, or any winning company.

## What is here

| Path | Contents |
|---|---|
| `data/winners-raw.json` | Canonical extraction from the official awards page, with provenance and completeness checks |
| `data/sources.json` | Source registry: 28 records across evidence tiers T0–T3 |
| `data/content/batch*.json` | Authored case-study content, five winners per file |
| `data/winners.json` | Built dataset consumed by the application |
| `lib/schema.mjs` | Zod schema used for runtime validation |
| `scripts/build_data.py` | Merges raw extraction, authored content and sources; computes coverage |
| `scripts/validate.mjs` | Schema, reference, inventory and route validation |
| `scripts/check-links.mjs` | External link checker that separates blocked from broken |
| `app/` | Next.js App Router pages, static export |
| `components/` | UI primitives, directory explorer, SVG diagrams, charts |

## Commands

```bash
npm install
npm run build          # next build (static export to out/)
npm run validate       # dataset + route validation
npm run check-links    # external source link check
```

Regenerate the dataset after editing content or sources:

```bash
python3 scripts/build_data.py
```

## Data model

Each winner record carries:

- the official citation (profile, three challenges, named solution, components)
- three published metrics, each with a source reference and attribution
- an original SCQA narrative of 350–600 words
- a claim list with per-claim evidence status and source ids
- a technology stack table with per-layer evidence status
- a documented workflow and a separate illustrative reference architecture
- an optional, labelled technical inference with known evidence, basis, alternatives and unverified items
- an SME replication playbook with three implementation levels
- numbered sources, research gaps, an evidence grade and a computed coverage score

## Evidence rules

- **STATED** — a source names the technology in connection with the implementation.
- **CORROBORATED** — more than one source supports the claim, at least one not the winner.
- **INFERRED** — a plausible mechanism, always with a written basis. Never used for a vendor, a metric or a timeline.

Grades measure available evidence, not the quality of an implementation. Coverage is computed from ten evidence dimensions and is never presented as an AI maturity rating.

## Deployment

Static export (`output: 'export'`). No backend, no database.
