import type { CollectionConfig } from "payload";

export const PlugTypes: CollectionConfig = {
  slug: "plugTypes",
  labels: {
    singular: "Plug Type",
    plural: "Plug Types",
  },
  admin: {
    useAsTitle: "code",
  },
  fields: [
    {
      name: "code",
      label: "Plug type code (A - N)",
      type: "text",
      required: true,
    },
    {
      name: "image",
      label: "Plug image",
      type: "upload",
      relationTo: "media", // your media collection slug
      required: true,
    },
  ],
};
