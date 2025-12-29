"use client";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/src/components/ui/chart";
import { DataKey } from "recharts/types/util/types";

type Props<T extends Record<string, unknown>[]> = {
  data: T | undefined;
  xAxis: keyof T[number];
  yAxis: keyof T[number];
  barColor?: string;
  barRadius?: number;
  cells?: React.ReactNode;
};
export function BarChartDefault<T extends Record<string, unknown>[]>({
  data,
  xAxis,
  yAxis,
  barColor = "var(--color-indigo-600)",
  barRadius = 8,
}: Props<T>) {
  return (
    <ChartContainer
      className="min-h-56 w-full"
      config={{
        [yAxis]: { color: "var(--color-primary)", label: "Count" },
      }}
    >
      <BarChart accessibilityLayer data={data}>
        <XAxis
          dataKey={xAxis as DataKey<T>}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey={yAxis as DataKey<T>} fill={barColor} radius={barRadius} />
      </BarChart>
    </ChartContainer>
  );
}

export function BarChartWithValues<T extends Record<string, unknown>[]>({
  data,
  xAxis,
  yAxis,
  barColor = "var(--color-primary-400)",
  barRadius = 8,
  cells,
  formatLabelAsPercentage = false,
}: Props<T> & {
  formatLabelAsPercentage?: boolean;
}) {
  return (
    <ChartContainer
      className="aspect-auto min-h-56 w-full"
      config={{
        [yAxis]: { color: "var(--color-primary-300)", label: "Count" },
      }}
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey={xAxis as DataKey<T>}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey={yAxis as DataKey<T>} fill={barColor} radius={barRadius}>
          <LabelList
            position="top"
            offset={8}
            className="fill-muted-foreground font-medium"
            fontSize={14}
            formatter={
              formatLabelAsPercentage
                ? (value: number) => `${value.toFixed(0)}%`
                : undefined
            }
          />
        </Bar>
        {cells}
      </BarChart>
    </ChartContainer>
  );
}

export function HorizontalBarChart<T extends Record<string, unknown>[]>({
  data,
  xAxis,
  yAxis,
  barColor = "var(--color-indigo-300)",
  barRadius = 8,
}: Props<T>) {
  return (
    <ChartContainer className="min-h-56 w-full" config={{}}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: 10,
          right: 10,
        }}
      >
        <YAxis
          dataKey={yAxis as DataKey<T>}
          type="category"
          tickLine={false}
          tickMargin={4}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[0]}
        />
        <XAxis dataKey={xAxis as DataKey<T>} type="number" hide />
        <Bar
          dataKey={xAxis as DataKey<T>}
          layout="vertical"
          radius={barRadius}
          fill={barColor}
        >
          <LabelList
            position="insideLeft"
            offset={6}
            className="text-indigo-50"
            fontSize={14}
            fill={`var(--color-indigo-800)`}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
