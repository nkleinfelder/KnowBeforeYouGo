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
    {
      name: "vaccinations",
      label: "Vaccinations",
      type: "group",
      localized: true,
      fields: [
        {
          name: "requiredVaccinations",
          label: "Required vaccinations",
          type: "array",
          dbName: "req_vacc",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "notes",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          name: "riskBasedVaccinations",
          label: "Vaccinations for specific risks",
          type: "array",
          dbName: "risk_vacc",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "notes",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          name: "generalVaccinations",
          label: "Vaccinations suggestions for all travelers",
          type: "array",
          dbName: "all_vacc",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "notes",
              type: "textarea",
              localized: true,
            },
          ],
        },
      ],
    },
    { name: "Mental health help", type: "text", localized: true },
    { name: "Anti discrimination help", type: "text", localized: true },
    { name: "Sexual harassment help", type: "text", localized: true },
  ],
};
