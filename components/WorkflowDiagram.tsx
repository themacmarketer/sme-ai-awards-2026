import type { Diagram, DiagramNode } from '@/lib/types';

const ORDER: DiagramNode['kind'][] = ['input', 'process', 'ai', 'system', 'human', 'output'];

const STYLE: Record<DiagramNode['kind'], { fill: string; stroke: string; text: string }> = {
  input: { fill: '#f1f5f9', stroke: '#cbd5e1', text: '#1e293b' },
  process: { fill: '#FFFFFF', stroke: '#94a3b8', text: '#1e293b' },
  ai: { fill: '#eff6ff', stroke: '#0066cc', text: '#0066cc' },
  system: { fill: '#f1f5f9', stroke: '#475569', text: '#475569' },
  human: { fill: '#fffbeb', stroke: '#d97706', text: '#d97706' },
  output: { fill: '#1e293b', stroke: '#1e293b', text: '#ffffff' },
};

function wrap(label: string, perLine = 20, maxLines = 3): string[] {
  const words = label.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const word of words) {
    if ((cur + ' ' + word).trim().length <= perLine) {
      cur = (cur + ' ' + word).trim();
    } else {
      if (cur) lines.push(cur);
      cur = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  if (lines.length === maxLines) {
    const rest = words.slice(lines.join(' ').split(/\s+/).length).join(' ');
    if (rest) lines[maxLines - 1] = lines[maxLines - 1].replace(/[.,;:]?$/, '') + '…';
  }
  return lines;
}

export function WorkflowDiagram({
  diagram,
  variant = 'documented',
}: {
  diagram: Diagram;
  variant?: 'documented' | 'illustrative';
}) {
  const cols = ORDER.filter((k) => diagram.nodes.some((n) => n.kind === k));
  const colCount = Math.max(cols.length, 2);

  const W = 680;
  const padX = 8;
  const colW = (W - padX * 2) / colCount;
  const nodeW = Math.min(168, colW - 20);
  const rowH = 56;
  const gapY = 16;

  const positions = new Map<string, { x: number; y: number; w: number; h: number }>();
  let maxRows = 1;
  cols.forEach((kind) => {
    const inCol = diagram.nodes.filter((n) => n.kind === kind);
    maxRows = Math.max(maxRows, inCol.length);
  });

  cols.forEach((kind, ci) => {
    const inCol = diagram.nodes.filter((n) => n.kind === kind);
    const totalH = inCol.length * rowH + (inCol.length - 1) * gapY;
    const colH = maxRows * rowH + (maxRows - 1) * gapY;
    const startY = 34 + (colH - totalH) / 2;
    inCol.forEach((n, ri) => {
      const x = padX + ci * colW + (colW - nodeW) / 2;
      const y = startY + ri * (rowH + gapY);
      positions.set(n.id, { x, y, w: nodeW, h: rowH });
    });
  });

  const H = 34 + maxRows * rowH + (maxRows - 1) * gapY + 46;

  const markerId = `arrow-${variant}`;

  return (
    <figure className="border border-rule bg-white">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink">
          {diagram.title}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {variant === 'documented' ? 'Evidence-bounded' : 'Illustrative only'}
        </span>
      </figcaption>

      <div className="scroll-x">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="img"
          aria-label={`${diagram.title}. ${diagram.caption}`}
          className="block min-w-[560px]"
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          {diagram.edges.map(([from, to], i) => {
            const a = positions.get(from);
            const b = positions.get(to);
            if (!a || !b) return null;
            const x1 = a.x + a.w;
            const y1 = a.y + a.h / 2;
            const x2 = b.x;
            const y2 = b.y + b.h / 2;
            if (x2 <= x1 + 4) {
              const midY = Math.max(a.y + a.h, b.y + b.h) + 8;
              return (
                <path
                  key={i}
                  d={`M ${a.x + a.w / 2} ${a.y + a.h} C ${a.x + a.w / 2} ${midY}, ${b.x + b.w / 2} ${midY}, ${b.x + b.w / 2} ${b.y + b.h}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  markerEnd={`url(#${markerId})`}
                />
              );
            }
            const dx = Math.max(18, (x2 - x1) * 0.5);
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2 - 4} ${y2}`}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1"
                markerEnd={`url(#${markerId})`}
              />
            );
          })}

          {diagram.nodes.map((n) => {
            const p = positions.get(n.id);
            if (!p) return null;
            const s = STYLE[n.kind];
            const lines = wrap(n.label, Math.floor(p.w / 8.2), 3);
            const lineH = 13;
            const textY = p.y + p.h / 2 - ((lines.length - 1) * lineH) / 2 + 4;
            return (
              <g key={n.id}>
                <rect
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  rx="2"
                  fill={s.fill}
                  stroke={s.stroke}
                  strokeWidth="1"
                />
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={p.x + p.w / 2}
                    y={textY + li * lineH}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fill={s.text}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {cols.map((kind, ci) => (
            <text
              key={kind}
              x={padX + ci * colW + colW / 2}
              y={16}
              textAnchor="middle"
              fontSize="8.5"
              letterSpacing="1.2"
              fontFamily="ui-monospace, monospace"
              fill="#94a3b8"
            >
              {kind.toUpperCase()}
            </text>
          ))}
        </svg>
      </div>

      <p className="border-t border-rule px-4 py-3 text-xs leading-relaxed text-muted">
        {diagram.caption}
      </p>
    </figure>
  );
}
