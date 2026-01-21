import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { HazardsIndex } from "./compare-to-origin-items";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { LinkIcon } from "lucide-react";

export function Safety({
  id,
  title,
  Icon,
  data,
  countryName,
}: CountrySectionProps<"safetyAndLegal">) {
  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.description}
      className="group"
    >
      {data?.visaRequired && (
        <InfoCard.Text title="Visa Required" size="medium">
          <Link
            href={data?.visaRequired}
            target="_blank"
            className={buttonVariants()}
          >
            <LinkIcon className="size-4" />
            <span>View on Project Visa</span>
          </Link>
        </InfoCard.Text>
      )}
      {data?.emergencyNumbers && (
        <InfoCard.Container
          title="Emergency Numbers"
          description="Important numbers for emergency calls"
          cardVariant="warning"
          className="max-md:row-start-1 md:col-span-2 md:row-span-4 md:group-has-[>article:nth-child(3):is(.tips-from-locals)]:row-span-2"
        >
          <InfoCard.List.ListContent className="md:row-span-3">
            <InfoCard.List.ListItem className="flex flex-1 items-center justify-between gap-2 text-lg">
              <p>Police</p>
              <p className="text-xl font-bold text-destructive">
                {data.emergencyNumbers.police}
              </p>
            </InfoCard.List.ListItem>
            <InfoCard.List.ListItem className="flex flex-1 items-center justify-between gap-2 text-lg">
              <p>Ambulance</p>
              <p className="text-xl font-bold text-destructive">
                {data.emergencyNumbers.ambulance}
              </p>
            </InfoCard.List.ListItem>
            <InfoCard.List.ListItem className="flex flex-1 items-center justify-between gap-2 text-lg">
              <p>Fire</p>
              <p className="text-xl font-bold text-destructive">
                {data.emergencyNumbers.fire}
              </p>
            </InfoCard.List.ListItem>
          </InfoCard.List.ListContent>
        </InfoCard.Container>
      )}
      {data?.naturalHazardsIndexEnum &&
        typeof data.naturalHazardsIndexEnum !== "string" &&
        data.naturalHazardsIndexValue && (
          <HazardsIndex
            name={data.naturalHazardsIndexEnum.name}
            description={data.naturalHazardsIndexEnum.description}
            value={data.naturalHazardsIndexValue}
          />
        )}
      {data?.safetyTips && data.safetyTips.length > 0 && (
        <InfoCard.List.TipsFromLocals
          items={data.safetyTips}
          countryName={countryName}
          className="col-span-full tips-from-locals"
        />
      )}
    </DetailInfo>
  );
}
