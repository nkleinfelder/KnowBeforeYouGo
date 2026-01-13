import { RadialChartStacked } from "@/src/components/charts/radial-chart";
import { InfoCard, InfoCardProps } from "./container";
import { cn } from "@/src/lib/utils";

export function ReferenceValueLabel({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-xs text-muted-foreground self-start justify-self-start flex gap-0.5 items-center animate-in fade-in",
        className,
      )}
    >
      <span className="size-2 rounded-xs bg-chart-4" />
      Your Country
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
  ...props
}: {
  min?: number;
  max?: number;
  referenceScore?: number;
  customLabels?: {
    title: string;
    description: string;
  };
  rating: number;
} & InfoCardProps) {
  return (
    <InfoCard className={cn(className, "pb-0")} {...props}>
      <RadialChartStacked
        maxValue={max}
        minValue={min}
        className="justify-self-center"
        data={[{ value: rating, not: max - rating }]}
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
