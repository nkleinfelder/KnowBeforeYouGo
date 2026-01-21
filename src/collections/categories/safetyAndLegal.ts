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
        },
        {
          name: "ambulance",
          label: "Ambulance",
          type: "text",
        },
        {
          name: "fire",
          label: "Fire",
          type: "text",
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
      name: "naturalHazardsIndexValue",
      type: "number",
      min: 0,
      max: 10,
    },
  ],
};
