import { CollectionConfig } from "payload";

export const UserRequests: CollectionConfig = {
  slug: "user-requests",
  labels: {
    singular: "User Request",
    plural: "User Requests",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Request title",
      type: "text",
    },
    {
      name: "countryExperience",
      label: "Country experience",
      type: "group",
      fields: [
        {
          name: "hasVisited",
          label: "Have you been to this country?",
          type: "radio",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ],
        },
        {
          name: "durationOfStay",
          label: "Length of stay",
          type: "text",
        },
      ],
    },
    {
      name: "issue",
      label: "Issue details",
      type: "group",
      fields: [
        {
          name: "issueType",
          label: "Type of issue",
          type: "text",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
      ],
    },
  ],
};
