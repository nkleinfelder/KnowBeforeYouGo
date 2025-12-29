import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";

export function Language({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"languageAndCommunication">) {
  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.description}
    >
      <InfoCard.List.List
        title="Languages"
        items={data?.localLanguages?.map((item) => item.language) ?? []}
      />
      {data?.englishLevels && typeof data.englishLevels === "object" && (
        <InfoCard.Text
          title="English level"
          size="medium"
          description={data.englishLevels.description}
        >
          {data.englishLevels.name}
        </InfoCard.Text>
      )}
      {data?.messengerApps && data.messengerApps.length > 0 && (
        <InfoCard.Apps title="Messenger Apps" apps={data.messengerApps} />
      )}
    </DetailInfo>
  );
}
