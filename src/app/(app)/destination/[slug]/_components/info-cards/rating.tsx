import { RadialChartStacked } from "@/src/components/charts/radial-chart";
import { InfoCard, InfoCardProps } from "./container";
import { cn } from "@/src/lib/utils";

export function Rating({
  min = 0,
  max = 100,
  rating,
  className,
  ...props
}: {
  min?: number;
  max?: number;
  rating: number;
} & InfoCardProps) {
  return (
    <InfoCard className={cn(className, "pb-0")} {...props}>
      <RadialChartStacked
        className="justify-self-center"
        data={[{ value: rating, not: max - rating }]}
        dataKeys={["not", "value"]}
        innerText={{
          title: `${rating.toFixed(0)}%`,
          description: `${min} - ${max}`,
        }}
      />
    </InfoCard>
  );
}
