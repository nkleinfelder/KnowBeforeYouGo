import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { Nullable } from "@/src/lib/type-utils";
import { PlugType } from "@/payload-types";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

export function Daily({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"dailyLifeAndLifestyle">) {
  const openingDays = data?.openingDays?.map((item) => parseInt(item));

  return (
    <DetailInfo
      id={id}
      title={title}
      description={data?.description}
      Icon={Icon}
    >
      {data?.findingFlatResources && (
        <InfoCard.Container
          title="Finding Flats"
          description="Resources to find a place to live"
          className="md:col-span-2"
        >
          <InfoCard.List.ListContent>
            {data.findingFlatResources.map(
              (item) =>
                item.platform && (
                  <InfoCard.List.ListItemWithTitle
                    key={item.platform}
                    title={item.platform}
                    description={item.description}
                  />
                ),
            )}
          </InfoCard.List.ListContent>
        </InfoCard.Container>
      )}
      {data?.electricalPlugTypes && data.electricalPlugTypes.length > 0 && (
        <InfoCard.Container
          title="Electrical Plug Types"
          className="md:col-span-2"
        >
          <InfoCard.List.ListContent className="md:grid md:grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))]">
            {data.electricalPlugTypes.map(
              (item) =>
                item.plugType &&
                typeof item.plugType !== "string" && (
                  <PlugTypeListItem
                    key={item.plugType.code}
                    data={item.plugType}
                    voltage={item.voltage}
                  />
                ),
            )}
          </InfoCard.List.ListContent>
        </InfoCard.Container>
      )}
      {data?.openingDays && (
        <InfoCard.Container
          title="Opening Days"
          className="md:col-start-3 md:row-span-4 md:row-start-1"
        >
          <InfoCard.List.ListContent className="md:row-span-3">
            {[1, 2, 3, 4, 5, 6, 0].map((day) => (
              <OpeningDay
                day={day}
                isOpen={openingDays?.includes(day) ?? false}
                key={day}
              />
            ))}
          </InfoCard.List.ListContent>
        </InfoCard.Container>
      )}
      {data?.socialMediaApps && data.socialMediaApps.length > 0 && (
        <InfoCard.Apps title="Social Media Apps" apps={data.socialMediaApps} />
      )}
      {data?.datingApps && data.datingApps.length > 0 && (
        <InfoCard.Apps title="Dating Apps" apps={data.datingApps} />
      )}
      {data?.foodDeliveryApps && data.foodDeliveryApps.length > 0 && (
        <InfoCard.Apps
          title="Food Delivery Apps"
          apps={data.foodDeliveryApps}
        />
      )}
    </DetailInfo>
  );
}

function PlugTypeListItem({
  data,
  voltage,
}: {
  data: Nullable<PlugType>;
  voltage?: Nullable<string>;
}) {
  const imageSrc =
    data?.image && typeof data.image === "object" && data.image.url;
  return (
    <InfoCard.List.ListItem
      className={cn("group flex items-center gap-x-3 has-[img]:p-1")}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={data?.code}
          width={256}
          height={256}
          className="aspect-square size-16 rounded-md bg-muted object-contain"
        />
      )}
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold">Type {data?.code}</h4>
        {voltage && (
          <p className="text-xs font-medium text-muted-foreground">
            {voltage} Volt
          </p>
        )}
      </div>
    </InfoCard.List.ListItem>
  );
}

function OpeningDay({ day, isOpen }: { day: number; isOpen: boolean }) {
  const dayDate = new Date(new Date().setDate(day));
  const dayName = dayDate.toLocaleString("en-us", {
    weekday: "long",
  });

  return (
    <InfoCard.List.ListItem
      className="group flex items-center gap-x-1.5 px-2"
      data-state={isOpen ? "open" : "closed"}
    >
      {isOpen ? (
        <CheckIcon className="size-4 text-green-500" />
      ) : (
        <XIcon className="size-4 text-red-500" />
      )}
      <h4 className="text-xs font-medium group-data-[state=closed]:text-muted-foreground">
        {dayName}
      </h4>
    </InfoCard.List.ListItem>
  );
}
