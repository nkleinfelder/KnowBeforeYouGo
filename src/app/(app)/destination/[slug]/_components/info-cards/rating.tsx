"use client";
import { RadialChartStacked } from "@/src/components/charts/radial-chart";
import { InfoCard, InfoCardProps } from "./container";
import { cn } from "@/src/lib/utils";
import { useLocalStorage } from "usehooks-ts";

export function ReferenceValueLabel({ className }: { className?: string }) {
  const [originCountry] = useLocalStorage<{
    name: string;
    slug: string;
  } | null>("originCountry", null);

  return (
    <p
      className={cn(
        "text-xs text-muted-foreground self-start justify-self-start flex gap-0.5 items-center animate-in fade-in",
        className,
      )}
    >
      <span className="size-2 rounded-xs bg-chart-4" />
      {originCountry?.name}
    </p>
  );
}

export function Rating({
  min = 0,
  max = 100,
  rating,
  referenceScore,
  className,
  customLabels,
  fill,
  ...props
}: {
  min?: number;
  max?: number;
  fill?: string;
  referenceScore?: number;
  customLabels?: {
    title: string;
    description: string;
  };
  rating: number;
} & InfoCardProps) {
  const adjustedRating = rating - min;
  const adjustedMax = max - rating;

  return (
    <InfoCard className={cn(className, "pb-0")} {...props}>
      <RadialChartStacked
        maxValue={max}
        minValue={min}
        className="justify-self-center"
        colors={
          fill
            ? ["var(--color-secondary)", fill, "var(--color-indigo-700)"]
            : undefined
        }
        data={[{ value: adjustedRating, not: adjustedMax }]}
        dataKeys={["not", "value"]}
        innerText={{
          title: customLabels?.title ?? `${rating.toFixed(0)}%`,
          description: customLabels?.description ?? `${min} - ${max}`,
        }}
        referenceValue={referenceScore}
      />
      {referenceScore !== undefined && (
        <ReferenceValueLabel className="-translate-y-4" />
      )}
    </InfoCard>
  );
}
