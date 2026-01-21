export const COUNTRY_CATEGORIES = [
  { value: "culturalAndSocialNorms", label: "Cultural & Social Norms" },
  { value: "languageAndCommunication", label: "Language & Communication" },
  { value: "navTransport", label: "Navigation & Transportation" },
  { value: "moneyAndPayments", label: "Money & Payments" },
  { value: "safetyAndLegal", label: "Safety & Legal" },
  { value: "dailyLifeAndLifestyle", label: "Daily Life & Lifestyle" },
  { value: "health", label: "Health" },
] as const;

export type CountryCategory = (typeof COUNTRY_CATEGORIES)[number]["value"];
