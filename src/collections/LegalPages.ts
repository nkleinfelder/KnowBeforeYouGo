import type { CollectionConfig } from "payload";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  labels: {
    singular: "Legal Content",
    plural: "Legal Content",
  },
  admin: {
    useAsTitle: "id",
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
