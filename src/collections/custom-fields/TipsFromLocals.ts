import { ArrayField, Field } from "payload";

const link: Field = {
  name: "link",
  label: "Link",
  type: "array",
  maxRows: 1,
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "url",
      label: "URL",
      type: "text",
      required: true,
    },
  ],
};

const tip: Field = {
  name: "tip",
  type: "group",
  label: "Tip",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
    },
    link,
  ],
};

export const tipsFromLocalsComponent: ArrayField = {
  name: "tipsFromLocalsComponent",
  type: "array",
  label: "Custom Tips",
  fields: [tip],
};
