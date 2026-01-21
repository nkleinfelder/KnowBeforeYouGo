import * as InfoCard from "@/src/app/(app)/destination/[slug]/_components/info-cards";
import { DetailInfo } from "@/src/app/(app)/destination/[slug]/_components/detail-info";
import { CountrySectionProps } from "./props";
import {
  PaymentMethods,
  PaymentMethodsPossiblyUndefined,
} from "@/src/lib/types";
import { PaymentMethods as PaymentMethodsComponent } from "./compare-to-origin-items";

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
  countryName,
}: CountrySectionProps<"moneyAndPayments">) {
  const paymentMethods = data?.paymentMethods;
  const allPaymentMethodsPresent = checkPaymentMethodsType(paymentMethods);

  return (
    <DetailInfo
      id={id}
      title={title}
      Icon={Icon}
      description={data?.description}
      className="md:grid-cols-3 group"
    >
      {data?.acceptedCurrencies && data.acceptedCurrencies.length > 0 && (
        <InfoCard.List.List
          title="Accepted Currencies"
          items={data.acceptedCurrencies.map((item) => item.currency)}
        />
      )}
      {allPaymentMethodsPresent && (
        <PaymentMethodsComponent paymentMethods={paymentMethods} />
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
      {data?.moneyTips && data.moneyTips.length > 0 && (
        <InfoCard.List.TipsFromLocals
          items={data.moneyTips}
          countryName={countryName}
          className="col-span-full md:group-has-[>:nth-child(4):last-child]:col-span-2"
        />
      )}
    </DetailInfo>
  );
}
