import type { Field } from "payload";

export const culturalAndSocialNorms: Field = {
  name: "culturalAndSocialNorms",
  type: "group",
  label: "Cultural & Social Norms",
  fields: [
    { name: "description", type: "text", localized: true },
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
};
