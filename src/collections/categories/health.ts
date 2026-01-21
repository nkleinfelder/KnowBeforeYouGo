import type { Field } from "payload";
import { tipsFromLocalsComponent } from "../custom-fields/TipsFromLocals";

export const health: Field = {
  name: "health",
  type: "group",
  label: "Health",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "healthInsurance",
      type: "group",
      label: "Health Insurance",
      fields: [
        {
          name: "isRequired",
          type: "checkbox",
          label: "Health insurance is mandatory",
          defaultValue: false,
        },
        {
          name: "description",
          type: "text",
          label: "Health insurance details",
          localized: true,
        },
      ],
    },
    {
      name: "vaccinations",
      label: "Vaccinations",
      type: "group",
      localized: true,
      fields: [
        {
          name: "requiredVaccinations",
          label: "Required vaccinations",
          type: "array",
          dbName: "req_vacc",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "notes",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          name: "riskBasedVaccinations",
          label: "Vaccinations for specific risks",
          type: "array",
          dbName: "risk_vacc",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "notes",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          name: "generalVaccinations",
          label: "Vaccinations suggestions for all travelers",
          type: "array",
          dbName: "all_vacc",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "notes",
              type: "textarea",
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: "mentalHealthHelp",
      label: "Mental health help",
      type: "group",
      fields: [
        {
          name: "name",
          label: "Institute name",
          type: "text",
          localized: true,
        },
        {
          name: "phone",
          label: "Phone number",
          type: "text",
        },
        {
          name: "website",
          label: "Website",
          type: "text",
        },
      ],
    },
    // { name: "Mental health help", type: "text", localized: true },
    {
      name: "antiDiscriminationHelp",
      label: "Anti-discrimination help",
      type: "group",
      fields: [
        {
          name: "name",
          label: "Institute name",
          type: "text",
          localized: true,
        },
        {
          name: "phone",
          label: "Phone number",
          type: "text",
        },
        {
          name: "website",
          label: "Website",
          type: "text",
        },
      ],
    },
    {
      name: "sexualHarassmentHelp",
      label: "Sexual harassment help",
      type: "group",
      fields: [
        {
          name: "name",
          label: "Institute name",
          type: "text",
          localized: true,
        },
        {
          name: "phone",
          label: "Phone number",
          type: "text",
        },
        {
          name: "website",
          label: "Website",
          type: "text",
        },
      ],
    },
    {
      ...tipsFromLocalsComponent,
      name: "healthTips",
    },
  ],
};
