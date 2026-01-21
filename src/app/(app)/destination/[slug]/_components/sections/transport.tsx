import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { DriversPermits } from "./compare-to-origin-items";
import { cn } from "@/src/lib/utils";

export function Transport({
  id,
  title,
  Icon,
  data,
  countryName,
}: CountrySectionProps<"navTransport">) {
  const showTransportApps =
    data?.transportApps && data.transportApps.length > 0;
  const showNavApps = data?.navApps && data.navApps.length > 0;
  const showTransportTips =
    data?.transportTips && data.transportTips.length > 0;

  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.desc}
      className="group"
    >
      {data?.driverPermits && (
        <DriversPermits
          driverPermits={data.driverPermits}
          className={cn(
            showTransportApps &&
              showNavApps &&
              "md:group-has-[>:nth-child(4):last-child]:row-span-4",
            showTransportTips &&
              "md:group-has-[>:nth-child(2):last-child]:col-span-full",
          )}
        />
      )}
      {data?.transportApps && data.transportApps.length > 0 && (
        <InfoCard.Apps title="Transportation Apps" apps={data.transportApps} />
      )}
      {data?.navApps && data.navApps.length > 0 && (
        <InfoCard.Apps title="Navigation Apps" apps={data.navApps} />
      )}
      {data?.transportTips && data.transportTips.length > 0 && (
        <InfoCard.List.TipsFromLocals
          items={data.transportTips}
          countryName={countryName}
          className="col-span-full"
        />
      )}
    </DetailInfo>
  );
}
