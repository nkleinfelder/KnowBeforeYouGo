import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { CountrySectionProps } from "./props";
import {
  CostOfLiving,
  LGBTQFriendliness,
  VeganPopulationShare,
  VegetarianPopulationShare,
} from "./compare-to-origin-items";
import { cn } from "@/src/lib/utils";

export function Cultural({
  id,
  title,
  Icon,
  data,
  countryName,
}: CountrySectionProps<"culturalAndSocialNorms"> & {
  countryName: string;
}) {
  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.description}
      className={cn(
        "md:has-[>article:nth-child(2n):not(:nth-child(3n)):last-child]:grid-cols-2",
        "md:has-[>article:nth-child(5):last-child]:grid-cols-6 md:has-[>article:nth-child(5):last-child]:[&>article]:col-span-2 md:has-[>article:nth-child(5):last-child]:[&>article:last-child]:col-span-3 md:has-[>article:nth-child(5):last-child]:[&>article:nth-last-child(2)]:col-span-3",
      )}
    >
      {data?.veganPopulationShare && (
        <VeganPopulationShare
          veganPopulationShare={data.veganPopulationShare}
        />
      )}
      {data?.vegetarianPopulationShare && (
        <VegetarianPopulationShare
          vegetarianPopulationShare={data.vegetarianPopulationShare}
        />
      )}
      {data?.lgbtqFriendliness &&
        typeof data.lgbtqFriendliness === "object" &&
        data.lgbtqFriendlinessScore && (
          <LGBTQFriendliness
            score={data.lgbtqFriendlinessScore}
            label={data.lgbtqFriendliness.name}
            description={data.lgbtqFriendliness.description ?? ""}
          />
        )}
      {data?.avgCostOfLiving && <CostOfLiving value={data.avgCostOfLiving} />}
      {data?.erasmusFunding && typeof data.erasmusFunding === "object" && (
        <InfoCard.Text
          title="Erasmus Funding"
          description={`${countryName} is part of the Erasmus+ program and you get funding for time spent in the program.`}
          size="large"
          tooltip="The exact amount depends on your country of origin."
          className="flex-row gap-2"
        >
          <span>{data.erasmusFunding.monthlyFunding.min}€</span>
          <span>–</span>
          <span>{data.erasmusFunding.monthlyFunding.max}€</span>
        </InfoCard.Text>
      )}
    </DetailInfo>
  );
}
