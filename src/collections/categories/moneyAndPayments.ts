import type { Field } from "payload";

export const moneyAndPayments: Field = {
  name: "moneyAndPayments",
  type: "group",
  label: "Money & Payments",
  fields: [
    { name: "description", type: "text", localized: true },
    { name: "Accepted Currencies", type: "text", localized: true },
    {
      name: "paymentMethods",
      label: "Payment Methods",
      type: "group",
      fields: [
        {
          name: "Payment by Card (%)",
          type: "number",
          min: 0,
          max: 100,
        },
        {
          name: "Payment by Cash (%)",
          type: "number",
          min: 0,
          max: 100,
        },
        {
          name: "Payment by App (%)",
          type: "number",
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: "paymentApps",
      label: "Payment (Apps)",
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
