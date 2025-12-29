import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: true, // simplest upload config
  fields: [],
  access: {
    read: () => true,
  },
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
