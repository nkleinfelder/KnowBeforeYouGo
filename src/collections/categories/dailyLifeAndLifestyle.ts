import type { Field } from "payload";

export const dailyLifeAndLifestyle: Field = {
  name: "dailyLifeAndLifestyle",
  type: "group",
  label: "Daily Life & Lifestyle",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "findingFlatResources",
      label: "Finding Flat Resources",
      type: "array",
      fields: [
        {
          name: "platform",
          label: "Website or App",
          type: "text",
        },
        {
          name: "description",
          label: "Description",
          type: "text",
        },
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
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
    {
      name: "socialMediaApps",
      label: "Social Media Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
    {
      name: "datingApps",
      label: "Dating Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
    {
      name: "openingDays",
      label: "Opening Days",
      type: "select",
      hasMany: true,
      localized: true,
      options: [
        { label: "Sunday", value: "0" },
        { label: "Monday", value: "1" },
        { label: "Tuesday", value: "2" },
        { label: "Wednesday", value: "3" },
        { label: "Thursday", value: "4" },
        { label: "Friday", value: "5" },
        { label: "Saturday", value: "6" },
      ],
    },
  ],
};
