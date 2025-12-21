import type { Field } from "payload";

export const navigationAndTransportation: Field = {
  name: "navTransport",
  type: "group",
  label: "Navigation & Transportation",
  fields: [
    { name: "desc", type: "text", localized: true, label: "Description" },
    {
      name: "transportApps",
      label: "Transportation Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
    {
      name: "driverPermits",
      label: "International & Regional Driving Permits",
      type: "group",
      fields: [
        {
          name: "idpOk",
          label: "International Driving Permit (IDP) eligible",
          type: "checkbox",
        },
        {
          name: "euOk",
          label: "EU Drivers Permit eligible",
          type: "checkbox",
        },
        {
          name: "iadpOk",
          label: "Inter-American Driving Permit (IADP) eligible",
          type: "checkbox",
        },
        {
          name: "aseanOk",
          label: "ASEAN Drivers Permit eligible",
          type: "checkbox",
        },
      ],
    },
    {
      name: "navApps",
      label: "Navigation Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
  ],
};
