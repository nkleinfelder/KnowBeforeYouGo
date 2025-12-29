import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";

export function Daily({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"dailyLifeAndLifestyle">) {
  return <DetailInfo id={id} title={title} Icon={Icon}></DetailInfo>;
}
