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
      type: "array",
      dbName: "lang_comm_apps",
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
      dbName: "lang_comm_messenger_apps",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
        { name: "description", type: "text", localized: true },
      ],
    },
  ],
};
