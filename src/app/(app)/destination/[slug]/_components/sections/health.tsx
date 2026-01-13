import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { Nullable } from "@/src/lib/type-utils";
import {
  AlertTriangleIcon,
  AwardIcon,
  Link2Icon,
  LinkIcon,
  LucideIcon,
  PhoneIcon,
  UserRoundSearchIcon,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Health({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"health">) {
  const helplines: {
    label: string;
    name?: Nullable<string>;
    phone?: Nullable<string>;
    website?: Nullable<string>;
  }[] = [];
  if (
    !!data?.mentalHealthHelp &&
    (data.mentalHealthHelp.phone || data.mentalHealthHelp.website)
  )
    helplines.push({
      label: "Mental health help",
      ...data.mentalHealthHelp,
    });
  if (
    !!data?.antiDiscriminationHelp &&
    (data.antiDiscriminationHelp.phone || data.antiDiscriminationHelp.website)
  )
    helplines.push({
      label: "Anti discrimination help",
      ...data.antiDiscriminationHelp,
    });
  if (
    !!data?.sexualHarassmentHelp &&
    (data.sexualHarassmentHelp.phone || data.sexualHarassmentHelp.website)
  )
    helplines.push({
      label: "Sexual harassment help",
      ...data.sexualHarassmentHelp,
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
          {helplines.map(({ label, name, phone, website }) => (
            <InfoCard.List.ListItem
              key={label}
              className="gap grid flex-col pb-3 font-normal"
            >
              <h4 className="text-sm font-semibold">{label}</h4>
              {name && <p className="">{name}</p>}
              <div className="mt-2 flex flex-wrap gap-1">
                {phone && (
                  <a
                    className="flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 shadow transition-colors duration-150 ease-in-out hover:border-primary/20 hover:bg-primary/7 focus-visible:border-primary/20 focus-visible:bg-primary/7"
                    href={`tel:${phone}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <PhoneIcon className="size-3.5 text-primary" />
                    <span className="text-muted-foreground">{phone}</span>
                  </a>
                )}
                {website && (
                  <a
                    className="flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 shadow transition-colors duration-150 ease-in-out hover:border-primary/20 hover:bg-primary/7 focus-visible:border-primary/20 focus-visible:bg-primary/7"
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkIcon className="size-4 text-primary" />
                    <span className="text-muted-foreground">{website}</span>
                  </a>
                )}
              </div>
            </InfoCard.List.ListItem>
          ))}
        </InfoCard.List.ListContent>
      </InfoCard.Container>
      <InfoCard.Container
        as="section"
        title="Vaccinations"
        description="Recommendations are based on a Report from the RKI Germany. We do not take accountability for the completness of this list."
        className="col-span-full auto-rows-auto grid-cols-subgrid grid-rows-none"
      >
        {data?.vaccinations?.requiredVaccinations && (
          <VaccinationList
            title="Required"
            description="These vaccinations are mandatory"
            data={data.vaccinations.requiredVaccinations}
            Icon={AlertTriangleIcon}
          />
        )}
        {data?.vaccinations?.riskBasedVaccinations && (
          <VaccinationList
            title="Specific risks"
            description="Check if these risks apply to you"
            data={data.vaccinations.riskBasedVaccinations}
            Icon={UserRoundSearchIcon}
          />
        )}
        {data?.vaccinations?.generalVaccinations && (
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
      {data.length > 0 && (
        <InfoCard.List.ListContent>
          {data.map((item) => (
            <li
              key={item.name}
              className="flex flex-col rounded-sm border border-border px-2 py-1.5"
            >
              <h5 className="text-sm leading-tight font-semibold">
                {item.name}
              </h5>
              {item.notes && (
                <p className="text-xs font-normal text-muted-foreground">
                  {item.notes}
                </p>
              )}
            </li>
          ))}
        </InfoCard.List.ListContent>
      )}
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
