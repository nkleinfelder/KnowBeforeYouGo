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
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
        {
          name: "isMostPopular",
          label: "Most popular",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "onlineShoppingApps",
      label: "Online Shopping Apps",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
    {
      name: "secondHandShoppingApps",
      label: "2nd Hand Shopping Apps",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
  ],
};
