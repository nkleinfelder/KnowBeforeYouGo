import type { CollectionConfig } from "payload";

export const ErasmusFundings: CollectionConfig = {
  slug: "erasmusfundings",
  labels: { singular: "ErasmusFunding", plural: "ErasmusFundings" },
  admin: { useAsTitle: "groupName" },
  fields: [
    {
      name: "groupName",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "monthlyFunding",
      type: "group",
      fields: [
        {
          name: "min",
          label: "Minimum (in €)",
          type: "number",
          required: true,
        },
        {
          name: "max",
          label: "Maximum (in €)",
          type: "number",
          required: true,
        },
      ],
    },
  ],
};

export default ErasmusFundings;
