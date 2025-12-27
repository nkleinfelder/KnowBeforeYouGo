import { CollectionConfig } from "payload";

export const EnglishLevels: CollectionConfig = {
  slug: "english-levels",
  labels: { singular: "EnglishLevel", plural: "EnglishLevels" },
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "text", localized: true },
    {
      name: "icon",
      label: "Icon",
      type: "upload",
      relationTo: "media",
    },
  ],
};
