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
      type: "select",
      localized: true,
      options: [
        { label: "Yes", value: "1" },
        { label: "No", value: "0" },
      ],
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
      name: "naturalHazardsIndex",
      label: "Natural hazards index",
      type: "number",
      min: 0,
      max: 10,
    },
    {
      name: "naturalHazards",
      label: "Natural hazards",
      type: "array",
      localized: true,
      fields: [
        { name: "hazard", type: "text", required: true },
        { name: "notes", type: "textarea" },
      ],
    },
    {
      name: "vaccinations",
      label: "Vaccinations",
      type: "array",
      localized: true,
      fields: [
        {
          name: "name",
          label: "Vaccine",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "required",
          label: "Required?",
          type: "checkbox",
          defaultValue: false,
          localized: true,
        },
        { name: "notes", type: "textarea", localized: true },
      ],
    },
  ],
};
