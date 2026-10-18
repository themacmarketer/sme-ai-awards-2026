import type { Winner } from '@/lib/types';
import { EvidenceChip } from './Evidence';

export function MetricsTable({ w }: { w: Winner }) {
  const hasSplit = w.metrics.some((m) => m.baseline || m.after);

  return (
    <div className="scroll-x">
      <table className="data-table min-w-[640px]">
        <caption className="sr-only">
          Published business outcomes for {w.name}, as reported in the award citation.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[30%]">Metric</th>
            {hasSplit && <th scope="col">Before</th>}
            {hasSplit && <th scope="col">After</th>}
            <th scope="col">Published result</th>
            <th scope="col" className="w-[26%]">Attribution</th>
          </tr>
        </thead>
        <tbody>
          {w.metrics.map((m, i) => (
            <tr key={i}>
              <th scope="row" className="border-b border-rule px-3 py-3 text-left align-top text-[0.9375rem] font-normal text-ink">
                {m.label}
              </th>
              {hasSplit && <td className="text-muted">{m.baseline ?? 'Not published'}</td>}
              {hasSplit && <td className="text-muted">{m.after ?? 'Not published'}</td>}
              <td className="font-medium">{m.value}</td>
              <td className="text-xs leading-relaxed text-muted">
                {m.attribution ?? 'Company-reported'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasSplit && (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          The award citation publishes relative changes and absolute volumes, not paired
          before-and-after values. Baseline figures are therefore not shown, and no improvement
          percentage has been calculated from them.
        </p>
      )}
    </div>
  );
}

export function StackTable({ w }: { w: Winner }) {
  return (
    <div className="scroll-x">
      <table className="data-table min-w-[760px]">
        <caption className="sr-only">
          Technology stack for {w.name}, with evidence status for each layer.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[16%]">Layer</th>
            <th scope="col" className="w-[30%]">Implementation</th>
            <th scope="col" className="w-[20%]">Vendor / in-house</th>
            <th scope="col" className="w-[14%]">Evidence</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {w.stack.map((s, i) => (
            <tr key={i}>
              <th scope="row" className="border-b border-rule px-3 py-3 text-left align-top text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-muted">
                {s.layer}
              </th>
              <td>
                {s.what}
                {s.basis && (
                  <span className="mt-1 block text-xs italic leading-relaxed text-amber-700">
                    Basis: {s.basis}
                  </span>
                )}
              </td>
              <td className="text-sm">
                {s.vendor ?? (
                  <span className="text-muted">
                    {s.origin === 'in-house' ? 'In-house, unnamed' : 'Not disclosed'}
                  </span>
                )}
                <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-muted">
                  {s.origin}
                </span>
              </td>
              <td><EvidenceChip state={s.evidence} /></td>
              <td className="text-xs text-muted">
                {s.sourceIds.map((id) => (
                  <a key={id} href={`#src-${id}`} className="link-underline mr-1.5 whitespace-nowrap">
                    {id}
                  </a>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
