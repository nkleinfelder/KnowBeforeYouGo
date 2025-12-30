import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { Nullable } from "@/src/lib/type-utils";
import { CheckIcon, XIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Transport({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"navTransport">) {
  return (
    <DetailInfo id={id} title={title} Icon={Icon} description={data?.desc}>
      {data?.driverPermits && (
        <InfoCard.Container
          title="Driving Permits"
          description="Check if international and regional driving permits are accepted here"
          className={cn(
            "md:col-span-2",
            "md:group-has-[>:nth-child(3)]:row-span-4",
            "md:group-not-has-[>:nth-child(2)]:col-span-3",
          )}
        >
          <InfoCard.List.ListContent className="md:row-span-3">
            <ListItem
              title="IDP"
              description="International Driving Permit"
              accepted={data.driverPermits.idpOk}
            />
            <ListItem
              title="EU Drivers Permit"
              description="EU Drivers Permit"
              accepted={data.driverPermits.euOk}
            />
            <ListItem
              title="IADP"
              description="Inter-American Driving Permit"
              accepted={data.driverPermits.iadpOk}
            />
            <ListItem
              title="ASEAN Drivers Permit"
              description="ASEAN Drivers Permit"
              accepted={data.driverPermits.aseanOk}
            />
          </InfoCard.List.ListContent>
        </InfoCard.Container>
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

function ListItem({
  title,
  description,
  accepted,
}: {
  title: string;
  description?: string;
  accepted: Nullable<boolean>;
}) {
  const isAccepted = accepted === true;
  const acceptedString = isAccepted ? "is accepted" : "is not accepted";

  return (
    <InfoCard.List.ListItem className={cn("flex items-center gap-2")}>
      {isAccepted && <CheckIcon className="stroke-2.5 size-5 text-green-500" />}
      {!isAccepted && <XIcon className="stroke-2.5 size-5 text-red-500" />}

      <div className="flex flex-col">
        <h4 className="font-semibold">{title}</h4>
        {description && (
          <p className="text-xs font-medium text-muted-foreground">
            {description} {acceptedString}
          </p>
        )}
      </div>
    </InfoCard.List.ListItem>
  );
}
