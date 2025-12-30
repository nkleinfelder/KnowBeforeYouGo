import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { Nullable } from "@/src/lib/type-utils";
import {
  AlertTriangleIcon,
  AwardIcon,
  LucideIcon,
  UserRoundSearchIcon,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Health({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"health">) {
  const helplines: { label: string; value: string }[] = [];
  if (!!data?.["Mental health help"])
    helplines.push({
      label: "Mental health help",
      value: data["Mental health help"],
    });
  if (!!data?.["Anti discrimination help"])
    helplines.push({
      label: "Anti discrimination help",
      value: data["Anti discrimination help"],
    });
  if (!!data?.["Sexual harassment help"])
    helplines.push({
      label: "Sexual harassment help",
      value: data["Sexual harassment help"],
    });

  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.description}
    >
      <HealthInsurance
        required={data?.healthInsurance?.isRequired === true}
        description={data?.healthInsurance?.description}
      />
      <InfoCard.Container title="Helplines" className="md:col-[2/-1]">
        <InfoCard.List.ListContent>
          {helplines.map(({ label, value }) => (
            <InfoCard.List.ListItemWithTitle
              key={label}
              title={label}
              description={value}
            />
          ))}
        </InfoCard.List.ListContent>
      </InfoCard.Container>
      <InfoCard.Container
        as="section"
        title="Vaccinations"
        description="Recommendations are based on a Report from the RKI Germany. We do not take accountability for the completness of this list."
        className="col-span-full auto-rows-auto grid-cols-subgrid grid-rows-none"
      >
        {data?.vaccinations?.requiredVaccinations &&
          data?.vaccinations?.requiredVaccinations.length > 0 && (
            <VaccinationList
              title="Required"
              description="These vaccinations are mandatory"
              data={data.vaccinations.requiredVaccinations}
              Icon={AlertTriangleIcon}
            />
          )}
        {data?.vaccinations?.riskBasedVaccinations &&
          data?.vaccinations?.riskBasedVaccinations.length > 0 && (
            <VaccinationList
              title="Specific risks"
              description="Check if these risks apply to you"
              data={data.vaccinations.riskBasedVaccinations}
              Icon={UserRoundSearchIcon}
            />
          )}
        {data?.vaccinations?.generalVaccinations &&
          data?.vaccinations?.generalVaccinations.length > 0 && (
            <VaccinationList
              title="Recommended"
              description="It's best to get these vaccinations"
              data={data.vaccinations.generalVaccinations}
              Icon={AwardIcon}
            />
          )}
      </InfoCard.Container>
    </DetailInfo>
  );
}

function VaccinationList({
  title,
  description,
  data,
  Icon,
}: {
  title: string;
  description: string;
  data: { name: string; notes?: Nullable<string> }[];
  Icon: LucideIcon;
}) {
  return (
    <article className="flex flex-col gap-2.5">
      <header className="flex flex-col gap-0.5">
        <h4 className="flex items-center gap-1 text-base leading-none font-medium">
          <Icon aria-hidden="true" className="size-4 text-primary" />
          <span>{title}</span>
        </h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </header>
      <InfoCard.List.ListContent>
        {data.map((item) => (
          <li
            key={item.name}
            className="flex flex-col rounded-sm border border-border px-2 py-1.5"
          >
            <h5 className="text-sm leading-tight font-semibold">{item.name}</h5>
            {item.notes && (
              <p className="text-xs font-normal text-muted-foreground">
                {item.notes}
              </p>
            )}
          </li>
        ))}
      </InfoCard.List.ListContent>
    </article>
  );
}

function HealthInsurance({
  required,
  description,
}: {
  required: boolean;
  description?: Nullable<string>;
}) {
  return (
    <InfoCard.Container
      title="Health Insurance"
      description={`Health insurance is ${required ? "" : "not"} mandatory`}
    >
      <div
        className={cn("flex flex-col justify-center", required && "gap-1.5")}
      >
        <div
          className="flex items-center gap-1.5 text-lg font-medium"
          aria-hidden="true"
        >
          {required && (
            <AlertTriangleIcon className="stroke-2.5 size-8 text-primary" />
          )}
          {required && <p>Mandatory</p>}
          {!required && <p>Not mandatory</p>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </InfoCard.Container>
  );
}
