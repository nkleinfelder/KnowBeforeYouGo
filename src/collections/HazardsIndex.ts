import type { CollectionConfig } from "payload";

export const HazardsIndex: CollectionConfig = {
  slug: "hazards-index",
  labels: { singular: "HazardIndex", plural: "HazardsIndex" },
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "text" },
    {
      name: "icon",
      label: "Icon",
      type: "upload",
      relationTo: "media",
    },
  ],
};
