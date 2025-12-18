import type { Field } from "payload";

export const moneyAndPayments: Field = {
  name: "moneyAndPayments",
  type: "group",
  label: "Money & Payments",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "paymentMethods",
      label: "Payment Methods (Apps)",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
    {
      name: "onlineShoppingApps",
      label: "Online Shopping Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
  ],
};
