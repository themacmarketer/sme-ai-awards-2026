import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const data = JSON.parse(fs.readFileSync('./data/winners.json', 'utf8'));
const meta = data.meta;
const winners = data.winners;

const OUT_DIR = './public/charts';
fs.mkdirSync(OUT_DIR, { recursive: true });

function makeSvgChart({ title, subtitle, items, maxValue, unit = '' }) {
  const width = 800;
  const height = 480;
  const margin = { top: 90, right: 60, bottom: 40, left: 240 };
  const chartWidth = width - margin.left - margin.right;
  const barHeight = 24;
  const barGap = 16;

  let barsSvg = '';
  items.forEach((item, i) => {
    const y = margin.top + i * (barHeight + barGap);
    const barW = Math.max(8, (item.value / maxValue) * chartWidth);
    const cleanName = item.name.replace(/&/g, '&amp;');
    barsSvg += `
      <text x="${margin.left - 15}" y="${y + 17}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="500" fill="#2B3A42">${cleanName}</text>
      <rect x="${margin.left}" y="${y}" width="${chartWidth}" height="${barHeight}" rx="4" fill="#F0EFEB" />
      <rect x="${margin.left}" y="${y}" width="${barW}" height="${barHeight}" rx="4" fill="#1F4B43" />
      <text x="${margin.left + barW + 12}" y="${y + 17}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#141413">${item.value}${unit}</text>
    `;
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#FAF9F5" rx="12" />
      <rect x="0" y="0" width="${width}" height="6" fill="#1F4B43" />
      
      <!-- Header -->
      <text x="40" y="45" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1" fill="#1F4B43">SME AI IMPACT AWARDS 2026 RESEARCH</text>
      <text x="40" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="#141413">${title}</text>
      <text x="${width - 40}" y="45" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="500" fill="#6B6862">N = 30 WINNERS</text>
      <text x="${width - 40}" y="70" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="500" fill="#6B6862">${subtitle}</text>

      <!-- Bars -->
      ${barsSvg}

      <!-- Footer -->
      <line x1="40" y1="${height - 35}" x2="${width - 40}" y2="${height - 35}" stroke="#DEDAD2" stroke-width="1" />
      <text x="40" y="${height - 18}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" fill="#8E8B82">Source: SME AI Impact Showcase (bestcourses.sg/sme-ai) · Canonical source: IMDA and SBF</text>
    </svg>
  `;
}

async function run() {
  // 1. Sector distribution
  const sectorCounts = {};
  winners.forEach(w => sectorCounts[w.sector] = (sectorCounts[w.sector] || 0) + 1);
  const sectorItems = Object.entries(sectorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([name, value]) => ({ name, value }));

  const svg1 = makeSvgChart({
    title: 'Top Industry Sectors of AI Winners',
    subtitle: 'Distribution of 30 Winners',
    items: sectorItems,
    maxValue: Math.max(...sectorItems.map(i => i.value)) + 1,
    unit: ' companies'
  });
  await sharp(Buffer.from(svg1)).png().toFile(`${OUT_DIR}/sectors-distribution.png`);

  // 2. AI Stack Types
  const aiTypeCounts = {};
  winners.forEach(w => aiTypeCounts[w.aiType] = (aiTypeCounts[w.aiType] || 0) + 1);
  const aiTypeItems = Object.entries(aiTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([name, value]) => ({ name, value }));

  const svg2 = makeSvgChart({
    title: 'AI Technology Architecture Types',
    subtitle: 'Underlying AI Systems',
    items: aiTypeItems,
    maxValue: Math.max(...aiTypeItems.map(i => i.value)) + 2,
    unit: ' implementations'
  });
  await sharp(Buffer.from(svg2)).png().toFile(`${OUT_DIR}/ai-types-breakdown.png`);

  // 3. Business outcomes
  const outcomeCounts = { Time: 0, Capacity: 0, Cost: 0, Quality: 0, Revenue: 0 };
  winners.forEach(w => w.outcomes.forEach(o => outcomeCounts[o] = (outcomeCounts[o] || 0) + 1));
  const outcomeItems = Object.entries(outcomeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name: `${name} savings/boost`, value }));

  const svg3 = makeSvgChart({
    title: 'Reported Business Outcomes by Type',
    subtitle: 'Quantified Metrics',
    items: outcomeItems,
    maxValue: 30,
    unit: ' of 30 winners'
  });
  await sharp(Buffer.from(svg3)).png().toFile(`${OUT_DIR}/outcomes-frequency.png`);

  // 4. Evidence Grades
  const gradeItems = [
    { name: 'Grade A — Independently supported', value: winners.filter(w => w.confidence === 'A').length },
    { name: 'Grade B — Canonical source supported', value: winners.filter(w => w.confidence === 'B').length },
    { name: 'Grade C — Limited public evidence', value: winners.filter(w => w.confidence === 'C').length }
  ];

  const svg4 = makeSvgChart({
    title: 'Evidence Grade Distribution',
    subtitle: 'Verification Rigor',
    items: gradeItems,
    maxValue: 30,
    unit: ' winners'
  });
  await sharp(Buffer.from(svg4)).png().toFile(`${OUT_DIR}/evidence-grades.png`);

  // 5. Research Coverage Histogram
  const buckets = [
    { name: '90% – 100% Comprehensive coverage', value: winners.filter(w => w.coverage >= 90).length },
    { name: '80% – 89% High coverage', value: winners.filter(w => w.coverage >= 80 && w.coverage < 90).length },
    { name: '70% – 79% Moderate coverage', value: winners.filter(w => w.coverage >= 70 && w.coverage < 80).length },
    { name: '60% – 69% Baseline coverage', value: winners.filter(w => w.coverage >= 60 && w.coverage < 70).length },
  ];

  const svg5 = makeSvgChart({
    title: 'Research Coverage Score Distribution',
    subtitle: '10 Evaluation Dimensions',
    items: buckets,
    maxValue: 30,
    unit: ' winners'
  });
  await sharp(Buffer.from(svg5)).png().toFile(`${OUT_DIR}/coverage-histogram.png`);

  console.log('Successfully generated 5 PNG charts in public/charts/ via sharp.');
}

run();
