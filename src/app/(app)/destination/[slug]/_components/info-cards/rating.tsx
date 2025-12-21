import { InfoCard, InfoCardProps } from "./container";

export function Rating({
  min,
  max,
  rating,
  ...props
}: {
  min?: number;
  max?: number;
  rating: number;
} & InfoCardProps) {
  return (
    <InfoCard {...props}>
      <p>{rating}</p>
    </InfoCard>
  );
}
