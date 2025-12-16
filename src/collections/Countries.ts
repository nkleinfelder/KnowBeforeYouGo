import type { CollectionConfig } from "payload";
import { culturalAndSocialNorms } from "./categories/culturalAndSocialNorms";
import { languageAndCommunication } from "./categories/languageAndCommunication";
import { navigationAndTransportation } from "./categories/navigationAndTransportation";
import { moneyAndPayments } from "./categories/moneyAndPayments";
import { safetyAndLegal } from "./categories/safetyAndLegal";
import { dailyLifeAndLifestyle } from "./categories/dailyLifeAndLifestyle";
import { health } from "@/src/collections/categories/health";

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
