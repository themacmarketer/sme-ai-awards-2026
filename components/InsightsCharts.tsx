'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const INK = '#141413';
const MUTED = '#6B6862';
const RULE = '#DEDAD2';
const ACCENT = '#1F4B43';
const SLATE = '#2B3A42';
const CLAY = '#8A4B2F';
const PALETTE = [ACCENT, SLATE, '#4F6F66', CLAY, '#9A8F7D', '#6E7F86', '#B5A48C'];

const axis = {
  tick: { fill: MUTED, fontSize: 11 },
  axisLine: { stroke: RULE },
  tickLine: false,
};

function TooltipBox({
  active,
  payload,
  label,
  suffix = '',
}: {
  active?: boolean;
  payload?: { value: number; name?: string }[];
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-rule bg-white px-3 py-2 text-xs shadow-sm">
      <p className="font-medium text-ink">{label}</p>
      <p className="mt-0.5 text-muted">
        {payload[0].value}
        {suffix}
      </p>
    </div>
  );
}

export function HorizontalBars({
  data,
  height = 260,
  color = ACCENT,
  suffix = '',
}: {
  data: { name: string; value: number }[];
  height?: number;
  color?: string;
  suffix?: string;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 4 }}>
          <CartesianGrid stroke={RULE} horizontal={false} />
          <XAxis type="number" {...axis} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={132}
            {...axis}
            tick={{ fill: INK, fontSize: 11 }}
          />
          <Tooltip content={<TooltipBox suffix={suffix} />} cursor={{ fill: 'rgba(31,75,67,0.05)' }} />
          <Bar dataKey="value" fill={color} radius={[0, 2, 2, 0]} barSize={14} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VerticalBars({
  data,
  height = 240,
  color = SLATE,
  suffix = '',
}: {
  data: { name: string; value: number }[];
  height?: number;
  color?: string;
  suffix?: string;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <CartesianGrid stroke={RULE} vertical={false} />
          <XAxis dataKey="name" {...axis} interval={0} tick={{ fill: INK, fontSize: 10 }} />
          <YAxis {...axis} allowDecimals={false} width={28} />
          <Tooltip content={<TooltipBox suffix={suffix} />} cursor={{ fill: 'rgba(31,75,67,0.05)' }} />
          <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} barSize={26} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategorySplit({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={86}
            paddingAngle={2}
            isAnimationActive={false}
            stroke="#FBFAF7"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={i === 0 ? ACCENT : SLATE} />
            ))}
          </Pie>
          <Tooltip content={<TooltipBox suffix=" winners" />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CoverageHistogram({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <CartesianGrid stroke={RULE} vertical={false} />
          <XAxis dataKey="name" {...axis} interval={0} tick={{ fill: INK, fontSize: 10 }} />
          <YAxis {...axis} allowDecimals={false} width={28} />
          <Tooltip content={<TooltipBox suffix=" winners" />} cursor={{ fill: 'rgba(31,75,67,0.05)' }} />
          <Bar dataKey="value" fill={CLAY} radius={[2, 2, 0, 0]} barSize={30} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EvidenceBars({ data }: { data: { name: string; value: number }[] }) {
  const colors = [ACCENT, SLATE, CLAY];
  return (
    <div style={{ height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 4 }}>
          <CartesianGrid stroke={RULE} horizontal={false} />
          <XAxis type="number" {...axis} allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={150} {...axis} tick={{ fill: INK, fontSize: 11 }} />
          <Tooltip content={<TooltipBox suffix=" winners" />} cursor={{ fill: 'rgba(31,75,67,0.05)' }} />
          <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={18} isAnimationActive={false}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i] ?? PALETTE[i % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
