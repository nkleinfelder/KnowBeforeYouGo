import type { Field } from "payload";

export const languageAndCommunication: Field = {
  name: "languageAndCommunication",
  type: "group",
  label: "Language & Communication",
  fields: [
    { name: "description", type: "text", localized: true },
    // {
    //   name: "languageLearningApps",
    //   label: "Language Learning Apps",
    //   type: "relationship",
    //   relationTo: "apps",
    //   hasMany: true,
    // },
    {
      name: "localLanguages",
      label: "Local Languages",
      type: "array",
      fields: [
        {
          name: "language",
          label: "Language",
          type: "text",
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "englishLevels",
      label: "English Level",
      type: "relationship",
      relationTo: "english-levels",
      hasMany: false,
    },
    {
      name: "messengerApps",
      label: "Messenger Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
  ],
};
