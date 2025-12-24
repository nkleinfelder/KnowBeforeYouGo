import type { Field } from "payload";

export const health: Field = {
  name: "health",
  type: "group",
  label: "Health",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "healthInsurance",
      type: "group",
      label: "Health Insurance",
      fields: [
        {
          name: "isRequired",
          type: "checkbox",
          label: "Health insurance is mandatory",
          defaultValue: false,
        },
        {
          name: "description",
          type: "text",
          label: "Health insurance details",
          localized: true,
        },
      ],
    },
    { name: "Mental health help", type: "text", localized: true },
    { name: "Anti discrimination help", type: "text", localized: true },
    { name: "Sexual harassment help", type: "text", localized: true },
  ],
};
