import { PropsWithChildren } from "react";
import { InfoCard, InfoCardProps } from "./container";

export function Text({
  children,
  ...props
}: PropsWithChildren & InfoCardProps) {
  return (
    <InfoCard {...props}>
      <p className="text-card-foreground">{children}</p>
    </InfoCard>
  );
}
