import { revalidatePath } from "next/cache";
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
  hooks: {
    afterChange: [
      ({ data }) => {
        const slug = data?.slug;
        if (!slug) return;

        revalidatePath(`(app)/destination/[slug]`, "page");
      },
    ],
  },
};
