import type { Field } from "payload";

export const dailyLifeAndLifestyle: Field = {
  name: "dailyLifeAndLifestyle",
  type: "group",
  label: "Daily Life & Lifestyle",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "findingFlatResources",
      label: "Finding Flat (Apps / Websites)",
      type: "array",
      dbName: "find_flat_res",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
    {
      name: "electricalPlugTypes",
      label: "Electrical Plug Types",
      type: "array",
      localized: true,
      fields: [
        {
          name: "plugType",
          label: "Plug Type",
          type: "relationship",
          relationTo: "plugTypes",
          required: true,
        },
        {
          name: "voltage",
          label: "Voltage info (optional override)",
          type: "text",
        },
      ],
    },
    {
      name: "foodDeliveryApps",
      label: "Food Delivery Apps",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
      ],
    },
    {
      name: "socialMediaApps",
      label: "Social Media Apps",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
    {
      name: "datingApps",
      label: "Dating Apps",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
      ],
    },
    {
      name: "openingDays",
      label: "Opening Days",
      type: "select",
      hasMany: true,
      localized: true,
      options: [
        { label: "Monday", value: "mo" },
        { label: "Tuesday", value: "tu" },
        { label: "Wednesday", value: "we" },
        { label: "Thursday", value: "th" },
        { label: "Friday", value: "fr" },
        { label: "Saturday", value: "sa" },
        { label: "Sunday", value: "su" },
      ],
    },
  ],
};
