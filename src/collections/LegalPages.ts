import type { GlobalConfig } from "payload";

export const LegalPages: GlobalConfig = {
  slug: "legal-pages",
  label: "Legal Pages",
  admin: {
    description: "Legal texts such as AGB and Data Privacy",
  },
  fields: [
    {
      name: "agb",
      label: "AGB",
      type: "richText",
      required: true,
    },
    {
      name: "dataPrivacy",
      label: "Data Privacy",
      type: "richText",
      required: true,
    },
  ],
};
