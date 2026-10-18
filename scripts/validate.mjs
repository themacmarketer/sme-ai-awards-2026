#!/usr/bin/env node
/**
 * Dataset validation.
 * Structural checks run through Zod; semantic checks run below it.
 * Exits non-zero on any blocking error.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { DatasetSchema } from '../lib/schema.mjs';

const ROOT = process.cwd();
const raw = JSON.parse(readFileSync(join(ROOT, 'data/winners.json'), 'utf8'));

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// 1. Structural validation
const parsed = DatasetSchema.safeParse(raw);
if (!parsed.success) {
  for (const issue of parsed.error.issues.slice(0, 40)) {
    fail(`schema: ${issue.path.join('.')} — ${issue.message}`);
  }
}

const winners = raw.winners ?? [];

// 2. Inventory
const slugs = winners.map((w) => w.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) fail(`duplicate slugs: ${[...new Set(dupes)].join(', ')}`);
if (winners.length !== 30) fail(`expected 30 winners, found ${winners.length}`);

const innovation = winners.filter((w) => w.category === 'innovation').length;
const adoption = winners.filter((w) => w.category === 'adoption').length;
if (innovation !== 15) fail(`expected 15 innovation winners, found ${innovation}`);
if (adoption !== 15) fail(`expected 15 adoption winners, found ${adoption}`);

// 3. Per-winner semantic checks
for (const w of winners) {
  const where = w.slug || '(missing slug)';

  if (!w.name || w.name.trim().length < 2) fail(`${where}: missing company name`);
  if (!['innovation', 'adoption'].includes(w.category)) fail(`${where}: invalid category`);

  const sourceIds = new Set((w.sources ?? []).map((s) => s.id));
  if (![...sourceIds].some((id) => id.startsWith('T0'))) fail(`${where}: no T0 source`);

  const checkRefs = (ids, label) => {
    for (const id of ids ?? []) {
      if (!sourceIds.has(id)) fail(`${where}: ${label} references unknown source "${id}"`);
    }
  };

  for (const m of w.metrics ?? []) {
    if (!m.sourceIds?.length) fail(`${where}: metric "${m.label}" has no source`);
    checkRefs(m.sourceIds, `metric "${m.label}"`);
  }

  for (const c of w.claims ?? []) checkRefs(c.sourceIds, `claim "${c.id}"`);
  for (const t of w.timeline ?? []) checkRefs(t.sourceIds, `timeline "${t.date}"`);

  for (const s of w.stack ?? []) {
    checkRefs(s.sourceIds, `stack layer "${s.layer}"`);
    if (!['stated', 'corroborated', 'inferred'].includes(s.evidence)) {
      fail(`${where}: invalid evidence state "${s.evidence}" on layer "${s.layer}"`);
    }
    if (s.evidence === 'inferred' && !(s.basis && s.basis.length > 10)) {
      fail(`${where}: inferred stack layer "${s.layer}" has no documented basis`);
    }
  }

  if (!w.metrics?.length) fail(`${where}: no metrics`);
  if (!w.stack?.length) fail(`${where}: no stack rows`);
  if (!w.replication?.levels || w.replication.levels.length !== 3) {
    fail(`${where}: replication must describe three implementation levels`);
  }

  // SCQA length, excluding tables and sources
  const words = ['s', 'c', 'q', 'a']
    .map((k) => w.scqa?.[k] ?? '')
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  if (words < 350) warn(`${where}: SCQA is ${words} words, below the 350-word target`);
  if (words > 700) warn(`${where}: SCQA is ${words} words, above the 600-word target`);

  // Inference block completeness
  if (w.inference) {
    for (const key of ['known', 'inferred', 'basis', 'alternatives', 'unverified']) {
      if (!w.inference[key]) fail(`${where}: inference block missing "${key}"`);
    }
  }

  if (typeof w.coverage !== 'number' || w.coverage < 0 || w.coverage > 100) {
    fail(`${where}: coverage ${w.coverage} out of range`);
  }
  if (!['A', 'B', 'C'].includes(w.confidence)) fail(`${where}: invalid evidence grade`);

  // Static route emitted
  const pagePath = join(ROOT, 'out', 'winners', w.slug, 'index.html');
  if (existsSync(join(ROOT, 'out')) && !existsSync(pagePath)) {
    fail(`${where}: no static page at out/winners/${w.slug}/index.html`);
  }
}

// 4. Aggregate consistency with meta
if (raw.meta) {
  if (raw.meta.totalWinners !== winners.length) {
    fail(`meta.totalWinners (${raw.meta.totalWinners}) does not match record count (${winners.length})`);
  }
  const catSum = raw.meta.categories?.reduce((a, c) => a + c.count, 0) ?? 0;
  if (catSum !== winners.length) fail(`meta category counts sum to ${catSum}, not ${winners.length}`);
}

// 5. Report
console.log(`\nDataset validation — ${winners.length} winners`);
console.log(`  categories: innovation ${innovation}, adoption ${adoption}`);
console.log(`  grades: ${JSON.stringify(
  winners.reduce((a, w) => ({ ...a, [w.confidence]: (a[w.confidence] ?? 0) + 1 }), {})
)}`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ! ${w}`));
}
if (errors.length) {
  console.log(`\n${errors.length} error(s):`);
  errors.slice(0, 50).forEach((e) => console.log(`  x ${e}`));
  process.exit(1);
}
console.log('\nAll checks passed.\n');
