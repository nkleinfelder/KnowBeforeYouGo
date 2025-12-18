import type { Field } from "payload";

export const health: Field = {
  name: "health",
  type: "group",
  label: "Health",
  fields: [
    { name: "description", type: "text", localized: true },
    { name: "Mental health help", type: "text", localized: true },
    {
      name: "findingADoctor",
      label: "Finding a doctor",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url_webpage", label: "Url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
    { name: "Anti discrimination help", type: "text", localized: true },
    { name: "Sexual harassment help", type: "text", localized: true },
  ],
};
