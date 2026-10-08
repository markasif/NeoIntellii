/**
 * The cumulative cash-difference chart.
 *
 * Loaded on demand (see CompareArea) so recharts stays out of the first paint:
 * the workspace has to produce a number on a phone before it draws anything.
 *
 * The chart is never the only way to read the data. CompareArea renders a
 * table alternative beside it, and this component carries a text description
 * for anyone who cannot see the line at all.
 */

import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface CashflowPoint {
  month: number;
  cumulative: number;
}

export interface CashflowChartProps {
  data: CashflowPoint[];
  currency: string;
  paybackMonth: number | null;
  /** Read out to assistive technology in place of the line. */
  description: string;
}

const compact = (value: number): string => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${Math.round(abs / 1_000)}K`;
  return `${sign}${Math.round(abs)}`;
};

export default function CashflowChart({ data, currency, paybackMonth, description }: CashflowChartProps) {
  return (
    <figure className="m-0">
      <div className="h-64 w-full" role="img" aria-label={description}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="rgba(14,19,32,0.06)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "hsl(var(--body-muted))" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(14,19,32,0.10)" }}
              label={{ value: "Month", position: "insideBottom", offset: -4, fontSize: 11 }}
            />
            <YAxis
              tickFormatter={compact}
              tick={{ fontSize: 11, fill: "hsl(var(--body-muted))" }}
              tickLine={false}
              axisLine={false}
              width={56}
            />
            <Tooltip
              formatter={(value: number) => [`${currency} ${Math.round(value).toLocaleString("en-US")}`, "Cumulative difference"]}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{ fontSize: 12, borderRadius: 12, border: "1px solid rgba(14,19,32,0.10)" }}
            />
            <ReferenceLine y={0} stroke="rgba(14,19,32,0.25)" />
            {paybackMonth != null && (
              <ReferenceLine
                x={paybackMonth}
                stroke="hsl(var(--secondary))"
                strokeDasharray="4 4"
                label={{ value: `Payback m${paybackMonth}`, fontSize: 11, position: "top" }}
              />
            )}
            <Line type="monotone" dataKey="cumulative" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
