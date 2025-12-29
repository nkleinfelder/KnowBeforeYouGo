import type { CollectionConfig } from "payload";
import { culturalAndSocialNorms } from "./categories/culturalAndSocialNorms";
import { languageAndCommunication } from "./categories/languageAndCommunication";
import { navigationAndTransportation } from "./categories/navigationAndTransportation";
import { moneyAndPayments } from "./categories/moneyAndPayments";
import { safetyAndLegal } from "./categories/safetyAndLegal";
import { dailyLifeAndLifestyle } from "./categories/dailyLifeAndLifestyle";
import { health } from "@/src/collections/categories/health";
import { revalidatePath } from "next/cache";

export const Countries: CollectionConfig = {
  slug: "countries",
  labels: {
    singular: "Country",
    plural: "Countries",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            const source = data?.name ?? value;

            if (!source) return value;

            return source
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-");
          },
        ],
        afterChange: [
          ({ data }) => {
            const slug = data?.slug;
            if (!slug) return;

            revalidatePath(`/(app)/`);
            revalidatePath(`/(app)/destinations/${slug}`);
          },
        ],
      },
    },
    {
      name: "images",
      label: "Images",
      type: "array",
      fields: [
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    culturalAndSocialNorms,
    languageAndCommunication,
    navigationAndTransportation,
    moneyAndPayments,
    safetyAndLegal,
    dailyLifeAndLifestyle,
    health,
  ],
};
