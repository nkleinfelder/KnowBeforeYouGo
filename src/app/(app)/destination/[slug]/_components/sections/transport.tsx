import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { DriversPermits } from "./compare-to-origin-items";

export function Transport({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"navTransport">) {
  return (
    <DetailInfo id={id} title={title} Icon={Icon} description={data?.desc}>
      {data?.driverPermits && (
        <DriversPermits driverPermits={data.driverPermits} />
      )}
      {data?.transportApps && data.transportApps.length > 0 && (
        <InfoCard.Apps title="Transportation Apps" apps={data.transportApps} />
      )}
      {data?.navApps && data.navApps.length > 0 && (
        <InfoCard.Apps title="Navigation Apps" apps={data.navApps} />
      )}
    </DetailInfo>
  );
}
