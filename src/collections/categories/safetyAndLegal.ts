import type { Field } from "payload";

export const safetyAndLegal: Field = {
  name: "safetyAndLegal",
  type: "group",
  label: "Safety & Legal",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "visaRequired",
      label: "Visum required?",
      type: "text",
    },
    {
      name: "emergencyNumbers",
      label: "Emergency Numbers",
      type: "group",
      fields: [
        {
          name: "police",
          label: "Police",
          type: "text",
          required: true,
        },
        {
          name: "ambulance",
          label: "Ambulance",
          type: "text",
          required: true,
        },
        {
          name: "fire",
          label: "Fire",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "naturalHazardsIndexEnum",
      label: "Natural hazards index",
      type: "relationship",
      relationTo: "hazards-index",
      hasMany: false,
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
          label: "Vaccinations for all travelers",
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
  ],
};
