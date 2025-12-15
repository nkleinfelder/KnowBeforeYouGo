import type { Field } from "payload";

export const navigationAndTransportation: Field = {
  name: "navigationAndTransportation",
  type: "group",
  label: "Navigation & Transportation",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "transportationApps",
      label: "Transportation Apps",
      type: "array",
      dbName: "nav_trans_apps",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
    {
      name: "navigationApps",
      label: "Navigation Apps",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
  ],
};
