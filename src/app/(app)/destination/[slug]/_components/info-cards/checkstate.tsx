import { InfoCard, InfoCardProps } from "./container";

export function Checkstate({
  state,
  ...props
}: {
  state: "true" | "false" | "indeterminate";
} & InfoCardProps) {
  return (
    <InfoCard {...props}>
      <p className="text-card-foreground">{state}</p>
    </InfoCard>
  );
}
