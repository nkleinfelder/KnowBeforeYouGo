import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import {
  LGBTQFriendliness,
  VeganPopulationShare,
  VegetarianPopulationShare,
} from "./compare-to-origin-items";

export function Cultural({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"culturalAndSocialNorms">) {
  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.description}
      className="md:has-[&>:nth-child(4):last-child]:grid-cols-2 md:has-[&>:nth-child(2):last-child]:grid-cols-2"
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
      <InfoCard.Text
        title="Cost of Living"
        description="Average in €/month"
        size="large"
        variant="primary"
        tooltip="Note that the value is based on the average cost of single appartments. Most important is the comparison to your home country, so select one and check!"
      >
        {data?.avgCostOfLiving}€
      </InfoCard.Text>
    </DetailInfo>
  );
}
