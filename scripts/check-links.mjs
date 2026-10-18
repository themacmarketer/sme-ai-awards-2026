#!/usr/bin/env node
/**
 * External link checker.
 * Distinguishes broken links from blocked requests, rate limits and anti-bot responses.
 * A 403 or 429 is NOT treated as a broken link.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const registry = JSON.parse(readFileSync(join(ROOT, 'data/sources.json'), 'utf8')).sources;
const winners = JSON.parse(readFileSync(join(ROOT, 'data/winners.json'), 'utf8')).winners;

const used = new Set(winners.flatMap((w) => w.sources.map((s) => s.id)));
const targets = registry.filter((s) => used.has(s.id));

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function classify(status) {
  if (status >= 200 && status < 300) return 'ok';
  if (status === 401 || status === 403) return 'blocked';
  if (status === 429) return 'rate-limited';
  if (status === 404 || status === 410) return 'broken';
  if (status >= 500) return 'server-error';
  if (status >= 300 && status < 400) return 'redirect';
  return 'unknown';
}

async function check(src) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(src.url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' },
    });
    return { id: src.id, url: src.url, status: res.status, verdict: classify(res.status) };
  } catch (err) {
    const msg = String(err?.name === 'AbortError' ? 'timeout' : err?.message || err);
    return { id: src.id, url: src.url, status: 0, verdict: 'unreachable', detail: msg };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
const queue = [...targets];
const workers = Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const next = queue.shift();
    if (!next) break;
    results.push(await check(next));
  }
});
await Promise.all(workers);

const order = ['broken', 'unreachable', 'server-error', 'blocked', 'rate-limited', 'redirect', 'unknown', 'ok'];
results.sort((a, b) => order.indexOf(a.verdict) - order.indexOf(b.verdict));

const tally = results.reduce((a, r) => ({ ...a, [r.verdict]: (a[r.verdict] ?? 0) + 1 }), {});

console.log(`\nLink check — ${results.length} cited sources\n`);
for (const r of results) {
  const mark = r.verdict === 'ok' ? 'OK  ' : r.verdict === 'broken' ? 'DEAD' : 'NOTE';
  console.log(`${mark} ${String(r.status).padStart(3)}  ${r.verdict.padEnd(12)} ${r.id}`);
  if (r.verdict !== 'ok') console.log(`     ${r.url}${r.detail ? ` — ${r.detail}` : ''}`);
}

console.log('\nSummary:', JSON.stringify(tally));
const broken = results.filter((r) => r.verdict === 'broken');
console.log(
  broken.length
    ? `\n${broken.length} definitively broken link(s) require attention.`
    : '\nNo definitively broken links. Non-200 responses are recorded as blocked, rate-limited or unreachable.'
);
process.exit(broken.length ? 1 : 0);
