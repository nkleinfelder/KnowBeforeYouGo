import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";

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
    >
      {data?.veganPopulationShare && (
        <InfoCard.Rating
          title="Vegans"
          description="Population share (in %)"
          rating={data?.veganPopulationShare}
        />
      )}
      {data?.vegetarianPopulationShare && (
        <InfoCard.Rating
          title="Vegetarians"
          description="Vegetarian population share (in %)"
          rating={data?.vegetarianPopulationShare}
        />
      )}
      {data?.lgbtqFriendliness &&
        typeof data.lgbtqFriendliness === "object" && (
          <InfoCard.Text
            title="LGBTQ"
            description={"Spartacus Gay Travel Index"}
            size="medium"
          >
            {data.lgbtqFriendliness.name}
            <span className="text-xs font-normal text-muted-foreground">
              {data.lgbtqFriendliness.description}
            </span>
          </InfoCard.Text>
        )}
      <InfoCard.Text
        title="Cost of Living"
        description="Average in €/month"
        size="large"
        variant="primary"
      >
        {data?.avgCostOfLiving}€
      </InfoCard.Text>
    </DetailInfo>
  );
}
