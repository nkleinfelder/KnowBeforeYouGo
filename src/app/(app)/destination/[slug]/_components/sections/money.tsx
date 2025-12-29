import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { BarChartWithValues } from "@/src/components/charts/bar-chart";
export function Money({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"moneyAndPayments">) {
  const allPaymentMethodsPresent =
    data &&
    data.paymentMethods &&
    Object.values(data.paymentMethods).every(
      (value) => !!value && typeof value === "number",
    );

  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.description}
    >
      {data?.acceptedCurrencies && data.acceptedCurrencies.length > 0 && (
        <InfoCard.List.List
          title="Accepted Currencies"
          items={data.acceptedCurrencies.map((item) => item.currency)}
        />
      )}
      {allPaymentMethodsPresent && (
        <InfoCard.Container title="Payment Methods" className="md:col-span-2">
          <BarChartWithValues
            formatLabelAsPercentage
            data={[
              {
                label: "Card",
                value: data.paymentMethods!["Payment by Card (%)"],
                fill: getBarColor(
                  data.paymentMethods!["Payment by Card (%)"] ?? 0,
                  // @ts-expect-error copmiler doesn't recognize that it's checked
                  Object.values(data.paymentMethods),
                ),
              },
              {
                label: "Cash",
                value: data.paymentMethods!["Payment by Cash (%)"],
                fill: getBarColor(
                  data.paymentMethods!["Payment by Cash (%)"] ?? 0,
                  // @ts-expect-error copmiler doesn't recognize that it's checked
                  Object.values(data.paymentMethods),
                ),
              },
              {
                label: "App",
                value: data.paymentMethods!["Payment by App (%)"],
                fill: getBarColor(
                  data.paymentMethods!["Payment by App (%)"] ?? 0,
                  // @ts-expect-error copmiler doesn't recognize that it's checked
                  Object.values(data.paymentMethods),
                ),
              },
            ]}
            xAxis="label"
            yAxis="value"
          />
        </InfoCard.Container>
      )}
      {data?.paymentApps && data.paymentApps.length > 0 && (
        <InfoCard.Apps title="Payment Apps" apps={data.paymentApps} />
      )}
      {data?.onlineShoppingApps && data.onlineShoppingApps.length > 0 && (
        <InfoCard.Apps
          title="Online Shopping Apps"
          apps={data.onlineShoppingApps}
          className="md:col-span-2"
        />
      )}
    </DetailInfo>
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
