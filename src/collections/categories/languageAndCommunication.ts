import type { Field } from "payload";

export const languageAndCommunication: Field = {
  name: "languageAndCommunication",
  type: "group",
  label: "Language & Communication",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "languageLearningApps",
      label: "Language Learning Apps",
      type: "relationship",
      relationTo: "apps",
      hasMany: true,
    },
    {
      name: "localLanguages",
      label: "Local Languages",
      type: "text",
      localized: true,
    },
    {
      name: "englishLevel",
      label: "English Level",
      type: "select",
      options: [
        { label: "Very high proficiency", value: "4" },
        { label: "High proficiency", value: "3" },
        { label: "Moderate proficiency", value: "2" },
        { label: "Low proficiency", value: "1" },
        { label: "Very low proficiency", value: "0" },
      ],
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
