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
        { name: "url_android", label: "Url Android", type: "text" },
        { name: "url_ios", label: "URL iOS", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
    {
      name: "navigationApps",
      label: "Navigation Apps",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url_android", label: "Url Android", type: "text" },
        { name: "url_ios", label: "URL iOS", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
  ],
};
