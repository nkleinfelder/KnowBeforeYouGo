import type { CollectionConfig } from "payload";

export const Apps: CollectionConfig = {
  slug: "apps",
  labels: { singular: "App", plural: "Apps" },
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "text", localized: true },
    { name: "url_android", label: "Url Android", type: "text" },
    { name: "url_ios", label: "URL iOS", type: "text" },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "isMostPopular",
      label: "Most popular",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
