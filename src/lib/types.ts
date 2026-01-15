import { Country } from "@/payload-types";

export type PaymentMethodsPossiblyUndefined = NonNullable<
  Country["moneyAndPayments"]
>["paymentMethods"];
export type PaymentMethodsRequired = Required<
  NonNullable<PaymentMethodsPossiblyUndefined>
>;
export type PaymentMethods = {
  [key in keyof PaymentMethodsRequired]: number;
};
