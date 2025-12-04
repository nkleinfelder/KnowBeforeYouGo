import type { CollectionConfig } from "payload";

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

    // 🌍 Cultural & Social Norms
    {
      name: "culturalAndSocialNorms",
      type: "group",
      label: "Cultural & Social Norms",
      fields: [
        {
          name: "eatingCultureVeganVegetarian",
          label: "Eating culture: vegan/vegetarian",
          type: "number",
          min: 1,
          max: 5,
        },
        {
          name: "lgbtqFriendliness",
          label: "LGBTQ friendliness",
          type: "number",
          min: 1,
          max: 5,
        },
        {
          name: "avgCostOfLiving",
          label: "Average cost of living (scale)",
          type: "number",
          min: 1,
        },
      ],
    },

    // 💬 Language & Communication
    {
      name: "languageAndCommunication",
      type: "group",
      label: "Language & Communication",
      fields: [
        {
          name: "languageLearningApps",
          label: "Language Learning Apps",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "url", type: "text" },
            { name: "description", type: "text", localized: true },
          ],
        },
        {
          name: "englishLevel",
          label: "English Level (scale)",
          type: "select",
          options: [
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
          ],
        },
        {
          name: "messengerApps",
          label: "Messenger Apps",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "url", type: "text" },
            { name: "description", type: "text", localized: true },
          ],
        },
      ],
    },

    // 🚗 Navigation & Transportation
    {
      name: "navigationAndTransportation",
      type: "group",
      label: "Navigation & Transportation",
      fields: [
        {
          name: "transportationApps",
          label: "Transportation Apps",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "url", type: "text" },
            { name: "description", type: "text", localized: true },
          ],
        },
        {
          name: "navigationApps",
          label: "Navigation Apps",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "url", type: "text" },
            { name: "description", type: "text", localized: true },
          ],
        },
      ],
    },

    // 💰 Money & Payments
    {
      name: "moneyAndPayments",
      type: "group",
      label: "Money & Payments",
      fields: [
        {
          name: "paymentMethods",
          label: "Payment Methods (Apps)",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "url", type: "text" },
            { name: "description", type: "text", localized: true },
            {
              name: "isMostPopular",
              label: "Most popular",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
        {
          name: "onlineShoppingApps",
          label: "Online Shopping Apps",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "url", type: "text" },
            { name: "description", type: "text", localized: true },
          ],
        },
        {
          name: "secondHandShoppingApps",
          label: "2nd Hand Shopping Apps",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "url", type: "text" },
            { name: "description", type: "text", localized: true },
          ],
        },
      ],
    },

    // ⚖️ Safety & Legal
    {
      name: "safetyAndLegal",
      type: "group",
      label: "Safety & Legal",
      fields: [
        {
          name: "visaRequired",
          label: "Visum required?",
          type: "select",
          localized: true,
          options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" },
          ],
        },
        {
          name: "emergencyNumbers",
          label: "Emergency Numbers",
          type: "group",
          fields: [
            {
              name: "police",
              label: "Police",
              type: "text",
              required: true,
            },
            {
              name: "ambulance",
              label: "Ambulance",
              type: "text",
              required: true,
            },
            {
              name: "fire",
              label: "Fire",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "naturalHazardsIndex",
          label: "Natural hazards index",
          type: "number",
          min: 0,
          max: 10,
        },
        {
          name: "naturalHazards",
          label: "Natural hazards",
          type: "array",
          localized: true,
          fields: [
            { name: "hazard", type: "text", required: true },
            { name: "notes", type: "textarea" },
          ],
        },
        {
          name: "vaccinations",
          label: "Vaccinations",
          type: "array",
          localized: true,
          fields: [
            {
              name: "name",
              label: "Vaccine",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "required",
              label: "Required?",
              type: "checkbox",
              defaultValue: false,
              localized: true,
            },
            { name: "notes", type: "textarea", localized: true },
          ],
        },
      ],
    },

    // 🏠 Daily Life & Lifestyle
    {
      name: "dailyLifeAndLifestyle",
      type: "group",
      label: "Daily Life & Lifestyle",
      fields: [
        { name: "description", type: "text", localized: true },
        {
          name: "findingFlatResources",
          label: "Finding Flat (Apps / Websites)",
          type: "array",
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
              relationTo: "plugTypes", // the collection you defined
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
          hasMany: true, // allows multiple selections
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
    },
  ],
};
