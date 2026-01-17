"use client";
import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { BarChartWithValues } from "@/src/components/charts/bar-chart";
import { api } from "@/src/server/react";
import { skipToken } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import type { PaymentMethods as PaymentMethodsType } from "@/src/lib/types";
import { usePathname } from "next/navigation";
import { ReferenceValueLabel } from "../info-cards/rating";
import { Country } from "@/payload-types";
import { cn } from "@/src/lib/utils";
import { Nullable } from "@/src/lib/type-utils";
import { CheckIcon, XIcon } from "lucide-react";
import { AppRouterOutput } from "@/src/server/root";

type CompareProps<T extends Record<string, unknown>> = T & {};

function useCompareInfo() {
  const [originCountry] = useLocalStorage<{
    name: string;
    slug: string;
  } | null>("originCountry", null);
  const pathname = usePathname();
  const dest = pathname.split("/").indexOf("destination");
  const currentSlug = dest === -1 ? undefined : pathname.split("/")[dest + 1];
  const { data } = api.country.getCompareInfo.useQuery(
    originCountry !== null && currentSlug !== originCountry.slug
      ? {
          originCountrySlug: originCountry.slug,
        }
      : skipToken,
  );

  return { ...data, compareTo: originCountry?.name };
}

export function CostOfLiving({
  value,
}: CompareProps<{
  value: number;
}>) {
  const data = useCompareInfo();

  return (
    <InfoCard.Text
      title="Cost of Living"
      description="Average in €/month"
      size="large"
      variant="primary"
      tooltip="Note that the value is based on the average cost of single appartments. Most important is the comparison to your home country, so select one and check!"
      className="flex-row gap-8"
      as="div"
    >
      <p>{value.toFixed(0)}€</p>
      {data?.costOfLiving && (
        <section className="text-chart-4 flex flex-col">
          <p className="leading-none">{data?.costOfLiving}€</p>
          <p className="text-xs text-muted-foreground font-normal leading-none">
            {data.compareTo}
          </p>
        </section>
      )}
    </InfoCard.Text>
  );
}

export function EnglishLevel({
  name,
  description,
  score,
}: CompareProps<{
  name: string;
  description: string;
  score: number;
}>) {
  const compareInfo = useCompareInfo();

  return (
    <InfoCard.Rating
      title="English level"
      description="English Proficiency Index"
      tooltip={description}
      rating={score}
      referenceScore={compareInfo?.englishLevel?.score}
      customLabels={{
        title: score.toFixed(0),
        description: name,
      }}
      min={390}
      max={624}
    />
  );
}

const colors = [
  "var(--color-primary)",
  "var(--color-indigo-300)",
  "var(--color-indigo-100)",
];
/**
 * Get bar color based on it's rank in the list
 */
function getBarColor(value: number, allValues: number[]) {
  const sortedValues = allValues.sort((a, b) => b - a);
  const index = sortedValues.indexOf(value);

  return colors[index];
}

export function PaymentMethods({
  paymentMethods,
}: CompareProps<{
  paymentMethods: PaymentMethodsType;
}>) {
  const compareInfo = useCompareInfo();

  return (
    <InfoCard.Container
      title="Payment Methods"
      description={
        compareInfo?.paymentMethods?.["Payment by App (%)"] && (
          <ReferenceValueLabel />
        )
      }
      className="md:col-span-2"
    >
      <BarChartWithValues
        formatLabelAsPercentage
        data={[
          {
            label: "Card",
            value: paymentMethods["Payment by Card (%)"],
            fill: getBarColor(
              paymentMethods["Payment by Card (%)"],
              Object.values(paymentMethods),
            ),
            referenceValue:
              compareInfo?.paymentMethods?.["Payment by Card (%)"],
          },
          {
            label: "Cash",
            value: paymentMethods["Payment by Cash (%)"],
            fill: getBarColor(
              paymentMethods["Payment by Cash (%)"],
              Object.values(paymentMethods),
            ),
            referenceValue:
              compareInfo?.paymentMethods?.["Payment by Cash (%)"],
          },
          {
            label: "App",
            value: paymentMethods["Payment by App (%)"],
            fill: getBarColor(
              paymentMethods["Payment by App (%)"],
              Object.values(paymentMethods),
            ),
            referenceValue: compareInfo?.paymentMethods?.["Payment by App (%)"],
          },
        ]}
        xAxis="label"
        yAxis="value"
        yAxisReference="referenceValue"
      />
    </InfoCard.Container>
  );
}

export function VeganPopulationShare({
  veganPopulationShare,
}: CompareProps<{
  veganPopulationShare: number;
}>) {
  const compareInfo = useCompareInfo();

  return (
    <InfoCard.Rating
      title="Vegans"
      description="Population share (in %)"
      rating={veganPopulationShare}
      referenceScore={compareInfo?.veganPopulationShare}
      max={40}
    />
  );
}

export function VegetarianPopulationShare({
  vegetarianPopulationShare,
}: CompareProps<{
  vegetarianPopulationShare: number;
}>) {
  const compareInfo = useCompareInfo();

  return (
    <InfoCard.Rating
      title="Vegetarians"
      description="Vegetarian population share (in %)"
      rating={vegetarianPopulationShare}
      referenceScore={compareInfo?.vegetarianPopulationShare}
      max={40}
    />
  );
}

export function LGBTQFriendliness({
  label,
  score,
  description,
}: CompareProps<{
  label: string;
  score: number;
  description: string;
}>) {
  const compareInfo = useCompareInfo();

  return (
    <InfoCard.Rating
      title="LGBTQ"
      description={"Spartacus Gay Travel Index"}
      tooltip={description}
      rating={score}
      referenceScore={compareInfo?.lgbtqFriendliness?.score}
      customLabels={{
        title: score.toFixed(0),
        description: label,
      }}
      min={-23}
      max={13}
    />
  );
}

type DriversPermitsProps = CompareProps<{
  driverPermits: NonNullable<
    NonNullable<NonNullable<Country>["navTransport"]>["driverPermits"]
  >;
}>;

const localLicenseLabel: Record<
  NonNullable<
    AppRouterOutput["country"]["getCompareInfo"]["driversPermitType"]
  >,
  string
> = {
  internationalDp: "International DP",
  iaDp: "Inter-American DP",
  aseanDp: "ASEAN DP",
  euDp: "EU DP",
};
export function DriversPermits({ driverPermits }: DriversPermitsProps) {
  const compareData = useCompareInfo();
  const localLicenseAvailable = !!compareData.driversPermitType;
  const localLicenseAccepted =
    (compareData.driversPermitType === "euDp" && driverPermits.euOk === true) ||
    (compareData.driversPermitType === "iaDp" &&
      driverPermits.iadpOk === true) ||
    (compareData.driversPermitType === "aseanDp" &&
      driverPermits.aseanOk === true) ||
    (compareData.driversPermitType === "internationalDp" &&
      driverPermits.idpOk === true);

  const description = localLicenseAvailable ? (
    <>
      Your Countries drivers license (
      {localLicenseLabel[compareData.driversPermitType!]}) is{" "}
      {localLicenseAccepted ? "accepted" : <strong>not accepted</strong>} here.
    </>
  ) : (
    "Check if international and regional driving permits are accepted here"
  );

  return (
    <InfoCard.Container
      title="Driving Permits"
      description={description}
      className={cn(
        "md:col-span-2",
        "md:group-has-[>:nth-child(3)]:row-span-4",
        "md:group-not-has-[>:nth-child(2)]:col-span-3",
      )}
    >
      <InfoCard.List.ListContent className="md:row-span-3">
        <ListItemDriverPermit
          title="IDP"
          description="International Driving Permit"
          accepted={driverPermits.idpOk}
          className={
            compareData?.driversPermitType === "internationalDp" &&
            (driverPermits.idpOk ? "border-green-500" : "border-destructive")
          }
        />
        <ListItemDriverPermit
          title="EU Drivers Permit"
          description="EU Drivers Permit"
          accepted={driverPermits.euOk}
          className={
            compareData?.driversPermitType === "euDp" &&
            (driverPermits.euOk ? "border-green-500" : "border-destructive")
          }
        />
        <ListItemDriverPermit
          title="IADP"
          description="Inter-American Driving Permit"
          accepted={driverPermits.iadpOk}
          className={
            compareData?.driversPermitType === "iaDp" &&
            (driverPermits.iadpOk ? "border-green-500" : "border-destructive")
          }
        />
        <ListItemDriverPermit
          title="ASEAN Drivers Permit"
          description="ASEAN Drivers Permit"
          accepted={driverPermits.aseanOk}
          className={
            compareData?.driversPermitType === "aseanDp" &&
            (driverPermits.aseanOk ? "border-green-500" : "border-destructive")
          }
        />
      </InfoCard.List.ListContent>
    </InfoCard.Container>
  );
}

function ListItemDriverPermit({
  title,
  description,
  accepted,
  className,
}: {
  title: string;
  description?: string;
  accepted: Nullable<boolean>;
  className?: string | false;
}) {
  const isAccepted = accepted === true;
  const acceptedString = isAccepted ? "is accepted" : "is not accepted";

  return (
    <InfoCard.List.ListItem
      className={cn("flex items-center gap-2", className)}
    >
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
