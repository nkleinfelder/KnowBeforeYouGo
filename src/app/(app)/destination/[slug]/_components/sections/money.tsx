import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import { BarChartWithValues } from "@/src/components/charts/bar-chart";
import { Country } from "@/payload-types";

type PaymentMethodsPossiblyUndefined = NonNullable<
  Country["moneyAndPayments"]
>["paymentMethods"];
type PaymentMethodsRequired = Required<
  NonNullable<PaymentMethodsPossiblyUndefined>
>;
type PaymentMethods = {
  [key in keyof PaymentMethodsRequired]: number;
};

function checkPaymentMethodsType(
  data: PaymentMethodsPossiblyUndefined,
): data is PaymentMethods {
  if (!data) return false;
  return Object.values(data).every((value) => typeof value === "number");
}

export function Money({
  id,
  title,
  Icon,
  data,
}: CountrySectionProps<"moneyAndPayments">) {
  const paymentMethods = data?.paymentMethods;
  const allPaymentMethodsPresent = checkPaymentMethodsType(paymentMethods);

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
                value: paymentMethods["Payment by Card (%)"],
                fill: getBarColor(
                  paymentMethods["Payment by Card (%)"],
                  Object.values(paymentMethods),
                ),
              },
              {
                label: "Cash",
                value: paymentMethods["Payment by Cash (%)"],
                fill: getBarColor(
                  paymentMethods["Payment by Cash (%)"],
                  Object.values(paymentMethods),
                ),
              },
              {
                label: "App",
                value: paymentMethods["Payment by App (%)"],
                fill: getBarColor(
                  paymentMethods["Payment by App (%)"],
                  Object.values(paymentMethods),
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
