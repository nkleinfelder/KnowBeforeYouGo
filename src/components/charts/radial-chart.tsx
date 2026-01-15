"use client";
import { ChartConfig, ChartContainer } from "@/src/components/ui/chart";
import { cn } from "@/src/lib/utils";
import { ReactNode } from "react";
import {
  Customized,
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { DataKey } from "recharts/types/util/types";

const chartConfig: ChartConfig = {};

type Props<T extends Record<string, unknown>[]> = {
  data: T | undefined;
  dataKeys: (keyof T[number])[];
  cells?: React.ReactNode;
  referenceValue?: number;
  maxValue?: number;
  minValue?: number;
  className?: string;
  innerText?: {
    title: ReactNode;
    description: ReactNode;
  };
};

const colors = [
  "var(--color-secondary)",
  "var(--color-primary)",
  "var(--color-indigo-700)",
];
export function RadialChartStacked<T extends Record<string, unknown>[]>({
  data,
  innerText,
  dataKeys,
  referenceValue,
  maxValue = 100,
  minValue = 0,
  className,
}: Props<T>) {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn(
        "relative aspect-3/1 min-h-28 w-full max-w-80 min-w-0",
        className,
      )}
    >
      <RadialBarChart
        data={data}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
        className="aspect-square"
      >
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          {innerText && (
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 14}
                        className="fill-foreground text-xl font-bold"
                      >
                        {innerText?.title}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 30}
                        className="fill-muted-foreground"
                      >
                        {innerText?.description}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          )}
        </PolarRadiusAxis>
        {dataKeys.map((dataKey, index) => (
          <RadialBar
            key={index}
            dataKey={dataKey as DataKey<T[number]>}
            fill={colors[index]}
            stackId="a"
            cornerRadius={5}
            className="translate-y-9 stroke-transparent stroke-2"
            animationDuration={300}
          />
        ))}
        {referenceValue !== undefined && (
          <Customized
            component={
              <ReferenceLine
                value={referenceValue}
                maxValue={maxValue}
                minValue={minValue}
                innerRadius={80}
                outerRadius={130}
              />
            }
          />
        )}
      </RadialBarChart>
    </ChartContainer>
  );
}

function ReferenceLine({
  value,
  maxValue,
  minValue,
  innerRadius,
  outerRadius,
}: {
  value: number;
  maxValue: number;
  minValue: number;
  innerRadius: number;
  outerRadius: number;
}) {
  const lineLength = innerRadius + (outerRadius - innerRadius) / 2;
  const range = maxValue - minValue;
  const rotation = 180 + ((value - minValue) / range) * 180;

  return (
    <path
      d={`M0,0l${lineLength},0`}
      stroke="var(--chart-4)"
      strokeWidth={3}
      strokeDashoffset={15 - innerRadius}
      strokeDasharray="5 5 5 5 5 5 5 5 5 5 500"
      strokeLinecap="round"
      style={{
        transform: `translate(50%, calc(100% - 1rem)) rotate(${rotation}deg)`,
        transformOrigin: "0px 0px",
      }}
    />
  );
}
