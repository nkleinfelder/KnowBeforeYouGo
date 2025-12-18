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
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
    {
      name: "navigationApps",
      label: "Navigation Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
  ],
};
