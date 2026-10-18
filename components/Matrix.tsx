import type { Winner } from '@/lib/types';

/**
 * Sector × use-case matrix. Every cell is a count from the dataset.
 * The sparsity is the point: it shows how little these winners cluster.
 */
export function SectorUseCaseMatrix({ winners }: { winners: Winner[] }) {
  const sectors = [...new Set(winners.map((w) => w.sector))];
  const useCases = [...new Set(winners.map((w) => w.useCase))];

  const count = (s: string, u: string) =>
    winners.filter((w) => w.sector === s && w.useCase === u).length;

  const sectorTotals = new Map(sectors.map((s) => [s, winners.filter((w) => w.sector === s).length]));
  const useCaseTotals = new Map(useCases.map((u) => [u, winners.filter((w) => w.useCase === u).length]));

  const rows = [...sectors].sort((a, b) => (sectorTotals.get(b)! - sectorTotals.get(a)!) || a.localeCompare(b));
  const cols = [...useCases].sort((a, b) => (useCaseTotals.get(b)! - useCaseTotals.get(a)!) || a.localeCompare(b));

  const cells = rows.flatMap((r) => cols.map((c) => count(r, c)));
  const max = Math.max(...cells);
  const filled = cells.filter((c) => c > 0).length;

  return (
    <figure className="border border-rule bg-white">
      <figcaption className="border-b border-rule px-5 py-3">
        <p className="font-sans text-base font-semibold">Sector by AI use case</p>
        <p className="mt-0.5 text-xs text-muted">
          {filled} of {cells.length} combinations contain a winner. The matrix is sparse, which is
          the finding: these companies did not converge on one sector-specific pattern.
        </p>
      </figcaption>
      <div className="scroll-x">
        <table className="min-w-[900px] border-collapse text-xs">
          <caption className="sr-only">
            Counts of winners by published sector and assigned AI use case.
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 bg-white px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted"
              >
                Sector
              </th>
              {cols.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="h-28 w-6 px-0 py-2 align-bottom"
                  title={c}
                >
                  <span className="block whitespace-nowrap text-[0.5625rem] font-normal text-muted" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    {c}
                  </span>
                </th>
              ))}
              <th scope="col" className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-muted">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 whitespace-nowrap border-t border-rule bg-white px-3 py-1.5 text-left text-[0.6875rem] font-normal text-ink"
                >
                  {r}
                </th>
                {cols.map((c) => {
                  const n = count(r, c);
                  const alpha = n === 0 ? 0 : 0.15 + (n / max) * 0.85;
                  return (
                    <td
                      key={c}
                      className="border-t border-rule p-0 text-center"
                      style={{ background: n ? `rgba(0,102,204,${alpha})` : undefined }}
                      title={`${r} × ${c}: ${n}`}
                    >
                      <span className={`block py-1.5 text-[0.625rem] ${alpha > 0.6 ? 'text-white' : 'text-ink/70'}`}>
                        {n || ''}
                      </span>
                    </td>
                  );
                })}
                <td className="border-t border-rule px-2 py-1.5 text-right text-xs font-medium text-muted">
                  {sectorTotals.get(r)}
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="sticky left-0 z-10 border-t border-ink bg-white px-3 py-1.5 text-left text-xs font-medium uppercase tracking-wide text-muted">
                Total
              </th>
              {cols.map((c) => (
                <td key={c} className="border-t border-ink py-1.5 text-center text-xs font-medium text-muted">
                  {useCaseTotals.get(c)}
                </td>
              ))}
              <td className="border-t border-ink px-2 py-1.5 text-right text-xs font-medium text-ink">
                {winners.length}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}
