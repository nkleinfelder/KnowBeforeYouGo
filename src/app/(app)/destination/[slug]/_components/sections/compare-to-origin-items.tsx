"use client";
import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { BarChartWithValues } from "@/src/components/charts/bar-chart";
import { api } from "@/src/server/react";
import { skipToken } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import type { PaymentMethods as PaymentMethodsType } from "@/src/lib/types";
import { usePathname } from "next/navigation";
import { ReferenceValueLabel } from "../info-cards/rating";

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

  return data;
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
      referenceScore={compareInfo?.englishLevel.score}
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
      referenceScore={compareInfo?.lgbtqFriendliness.score}
      customLabels={{
        title: score.toFixed(0),
        description: label,
      }}
      min={-23}
      max={13}
    />
  );
}
