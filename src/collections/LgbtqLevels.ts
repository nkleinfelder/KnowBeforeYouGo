import { revalidatePath } from "next/cache";
import { CollectionConfig } from "payload";

export const LgbtqLevels: CollectionConfig = {
  slug: "lgbtq-levels",
  labels: { singular: "LgbtqLevel", plural: "LgbtqLevels" },
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "range", type: "text" },
    { name: "description", type: "text", localized: true },
    {
      name: "icon",
      label: "Icon",
      type: "upload",
      relationTo: "media",
    },
  ],
  hooks: {
    afterChange: [
      ({ data }) => {
        const slug = data?.slug;
        if (!slug) return;

        revalidatePath(`(app)/destinations/[slug]`, "page");
      },
    ],
  },
};
