import type { Field } from "payload";

export const culturalAndSocialNorms: Field = {
  name: "culturalAndSocialNorms",
  type: "group",
  label: "Cultural & Social Norms",
  fields: [
    { name: "description", type: "text", localized: true },
    {
      name: "vegetarianPopulationShare",
      label: "vegetarian population share (in %)",
      type: "number",
      min: 0,
      max: 100,
    },
    {
      name: "veganPopulationShare",
      label: "vegan population share (in %)",
      type: "number",
      min: 0,
      max: 100,
    },
    {
      name: "lgbtqFriendliness",
      label: "LGBTQ friendliness (-23 - 13)",
      type: "relationship",
      relationTo: "lgbtq-levels",
      hasMany: false,
    },
    {
      name: "avgCostOfLiving",
      label: "Average cost of living without rent (in €)",
      type: "number",
      min: 1,
    },
  ],
};
