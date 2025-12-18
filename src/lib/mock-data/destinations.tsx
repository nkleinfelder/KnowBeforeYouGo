import { LucideIcon, TagIcon, GroupIcon, BadgeIcon } from "lucide-react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type Tag = {
  name: string;
  icon: LucideIcon;
};

type BaseInfo = {
  block: "text" | "checkstate" | "rating" | "list";
  title: string;
  description?: string;
};

type RichTextInfo = BaseInfo & {
  block: "richtext";
  content: SerializedEditorState;
};

type TextInfo = BaseInfo & {
  block: "text";
  text: string;
};

type CheckstateInfo = BaseInfo & {
  block: "checkstate";
  state: "true" | "false" | "indeterminate";
};

type RatingInfo = BaseInfo & {
  block: "rating";
  rating: number;
  min?: number;
  max?: number;
};

export type ListInfo = BaseInfo & {
  block: "list";
  items: {
    text: string;
    description?: string;
    icon?: string;
  }[];
  type?: "default" | "alert" | "emergency" | "applications";
};

export type Info = CheckstateInfo | RatingInfo | ListInfo | TextInfo;

type EssentialInfo = {
  visaRequired: {
    state: boolean | string;
  };
  insurance: string;
  rent: {
    min: number;
    max: number;
  };
  climate: string;
  university: string;
};

type DetailInfoCategory =
  | "culture"
  | "language"
  | "transportation"
  | "money"
  | "safety"
  | "daily";

export type Destination = {
  name: string;
  slug: string;
  slogan: string;
  image: string;
  tags: Tag[];

  essentialInfo: EssentialInfo;
  details: Record<DetailInfoCategory, Info[]>;
};

const mockTags: Tag[] = [
  {
    name: "Cheap",
    icon: TagIcon,
  },
  {
    name: "Social",
    icon: GroupIcon,
  },
  {
    name: "Popular",
    icon: BadgeIcon,
  },
];

// Helper to create a simple paragraph node for Lexical RichText
const createRichText = (text: string): SerializedEditorState =>
  ({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: text,
              type: "text",
              version: 1,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

export const MOCK_DESTINATIONS: Destination[] = [
  {
    name: "Germany",
    slug: "germany",
    slogan: "Engineering Excellence",
    image: "/images/destinations/germany.webp",
    tags: mockTags,
    essentialInfo: {
      visaRequired: { state: "True (Non-EU)" },
      insurance: "Statutory (Required)",
      rent: { min: 350, max: 850 },
      climate: "Temperate",
      university: "TU Munich, Humboldt Berlin",
    },
    details: {
      culture: [
        {
          block: "checkstate",
          title: "Vegan/Vegetarian Friendly",
          state: "true",
        },
        {
          block: "rating",
          title: "LGBTQ+ Friendly",
          min: 0,
          max: 10,
          rating: 8,
        },
        {
          block: "rating",
          title: "Average Cost of Living",
          min: 0,
          max: 10,
          rating: 8,
        },
        {
          block: "text",
          title: "Structured & Direct",
          text: "German culture values punctuality, structure, and direct communication. Sunday is strictly a rest day; shops are closed.",
        },
        {
          block: "list",
          title: "Key Cultural Norms",
          items: [
            { text: "Punctuality", description: "Always be on time." },
            { text: "Privacy", description: "Personal space is respected." },
            { text: "Sundays", description: "Ruhetag (Quiet day)." },
          ],
        },
        {
          block: "list",
          title: "Social Taboos",
          description: "Topics to avoid",
          type: "alert",
          items: [
            {
              text: "Never joke about WW2 or Nazi history",
              description: "No Nazis allowed.",
            },
            { text: "Don't compare east vs west" },
          ],
        },
      ],
      language: [
        {
          block: "checkstate",
          title: "English Proficiency",
          state: "true",
          description: "High in cities/universities, lower in bureaucracy.",
        },
        {
          block: "text",
          title: "German is Key",
          text: "While you can survive with English, learning basic German is essential for dealing with the Ausländerbehörde (Foreigners Office).",
        },
      ],
      transportation: [
        {
          block: "rating",
          title: "Public Transport Quality",
          rating: 5,
          max: 5,
        },
        {
          block: "list",
          title: "Options",
          items: [
            {
              text: "Deutschlandticket",
              description: "€49/month for all regional transport.",
            },
            { text: "Biking", description: "Very bike-friendly cities." },
          ],
        },
      ],
      money: [
        {
          block: "text",
          title: "Cash is King",
          text: "Many smaller shops, bakeries, and kiosks ('Späti') still only accept cash (Bargeld). Always carry some euros.",
        },
        {
          block: "list",
          title: "Banking",
          items: [
            {
              text: "Blocked Account",
              description: "Required for visa (~€11,904/yr).",
            },
            {
              text: "EC Karte",
              description: "Local debit card preferred over Credit.",
            },
          ],
        },
      ],
      safety: [
        {
          block: "list",
          title: "Emergency Numbers",
          type: "emergency",
          items: [
            { text: "110", description: "Police" },
            { text: "112", description: "Ambulance & Fire" },
          ],
        },
        {
          block: "rating",
          title: "Safety Score",
          rating: 5,
          max: 5,
        },
      ],
      daily: [
        {
          block: "list",
          title: "Everyday Life",
          items: [
            {
              text: "Pfand System",
              description: "Deposit on bottles (recycle them!).",
            },
            { text: "Mensa", description: "Affordable university cafeterias." },
          ],
        },
      ],
    },
  },
  {
    name: "France",
    slug: "france",
    slogan: "Art, Wine, Love",
    image: "/images/destinations/france.webp",
    tags: mockTags,
    essentialInfo: {
      visaRequired: { state: "True (Non-EU)" },
      insurance: "Social Security (Free) + Mutuelle",
      rent: { min: 400, max: 900 },
      climate: "Varied (Oceanic/Med)",
      university: "Sorbonne, Sciences Po",
    },
    details: {
      culture: [
        {
          block: "text",
          title: "Joie de Vivre",
          text: "Food and conversation are central. Politeness (always say 'Bonjour') is crucial in social interactions.",
        },
      ],
      language: [
        {
          block: "checkstate",
          title: "English Proficiency",
          state: "indeterminate",
          description: "Varies. French is strongly preferred.",
        },
      ],
      transportation: [
        {
          block: "rating",
          title: "Public Transport",
          rating: 4,
          max: 5,
        },
        {
          block: "list",
          title: "Travel",
          items: [
            { text: "TGV", description: "High-speed trains are excellent." },
            {
              text: "Carte Jeune",
              description: "Discount card for youth rail travel.",
            },
          ],
        },
      ],
      money: [
        {
          block: "text",
          title: "CAF Housing Aid",
          text: "International students can apply for CAF (Caisse d'Allocations Familiales) to get reimbursement for part of their rent.",
        },
      ],
      safety: [
        {
          block: "rating",
          title: "Safety Score",
          rating: 4,
          max: 5,
        },
      ],
      daily: [
        {
          block: "list",
          title: "Daily Habits",
          items: [
            {
              text: "Boulangerie",
              description: "Daily fresh bread is a religion.",
            },
            {
              text: "Strikes",
              description: "Transport strikes are common; plan ahead.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Italy",
    slug: "italy",
    slogan: "La Dolce Vita",
    image: "/images/destinations/italy.webp",
    tags: mockTags,
    essentialInfo: {
      visaRequired: { state: "True (Non-EU)" },
      insurance: "SSN Registration or Private",
      rent: { min: 300, max: 750 },
      climate: "Mediterranean",
      university: "Sapienza, Bologna",
    },
    details: {
      culture: [
        {
          block: "text",
          title: "Expressive & Social",
          text: "Life happens in the piazza. Aperitivo is a ritual. Communication is expressive and often loud.",
        },
      ],
      language: [
        {
          block: "checkstate",
          title: "English Proficiency",
          state: "indeterminate",
          description: "Good in tourist areas, less so in local spots.",
        },
      ],
      transportation: [
        {
          block: "rating",
          title: "Transport Reliability",
          rating: 3,
          max: 5,
        },
        {
          block: "list",
          title: "Getting Around",
          items: [
            {
              text: "Trains",
              description: "Trenitalia/Italo connect major cities well.",
            },
            {
              text: "Bus validation",
              description: "Always stamp your ticket!",
            },
          ],
        },
      ],
      money: [
        {
          block: "text",
          title: "Cost of Living",
          text: "Generally affordable, especially the South. Northern cities like Milan are significantly more expensive.",
        },
      ],
      safety: [
        {
          block: "rating",
          title: "Safety Score",
          rating: 4,
          max: 5,
        },
      ],
      daily: [
        {
          block: "list",
          title: "Lifestyle",
          items: [
            {
              text: "Coffee",
              description: "Espresso at the bar counter is cheaper.",
            },
            {
              text: "Late Dinner",
              description: "Restaurants often open after 7:30 PM.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Portugal",
    slug: "portugal",
    slogan: "Coastal Charms Await",
    image: "/images/destinations/portugal.webp",
    tags: mockTags,
    essentialInfo: {
      visaRequired: { state: "True (Non-EU)" },
      insurance: "Private (EU use EHIC)",
      rent: { min: 300, max: 650 },
      climate: "Warm Temperate",
      university: "ULisboa, U. Porto",
    },
    details: {
      culture: [
        {
          block: "text",
          title: "Relaxed & Welcoming",
          text: "Portuguese people are incredibly hospitable. The pace of life is slower and more relaxed.",
        },
      ],
      language: [
        {
          block: "checkstate",
          title: "English Proficiency",
          state: "true",
          description: "Excellent English proficiency among youth.",
        },
      ],
      transportation: [
        {
          block: "rating",
          title: "Transport Quality",
          rating: 4,
          max: 5,
        },
      ],
      money: [
        {
          block: "text",
          title: "Affordability",
          text: "One of the most affordable countries in Western Europe. Great value for food and drink.",
        },
        {
          block: "list",
          title: "Payments",
          items: [
            {
              text: "Multibanco",
              description: "Local widespread ATM network.",
            },
          ],
        },
      ],
      safety: [
        {
          block: "rating",
          title: "Safety Score",
          rating: 5,
          max: 5,
        },
        {
          block: "text",
          title: "Peaceful",
          text: "Consistently ranked as one of the safest countries in the world.",
        },
      ],
      daily: [
        {
          block: "list",
          title: "Must Dos",
          items: [
            {
              text: "Pastel de Nata",
              description: "Try the iconic custard tart.",
            },
            { text: "Surf", description: "Great coastlines for water sports." },
          ],
        },
      ],
    },
  },
  {
    name: "Turkey",
    slug: "turkey",
    slogan: "Köfte & Sun",
    image: "/images/destinations/turkey.webp",
    tags: mockTags,
    essentialInfo: {
      visaRequired: { state: "Required" },
      insurance: "Health Insurance Required",
      rent: { min: 200, max: 500 },
      climate: "Continental/Med",
      university: "METU, Boğaziçi",
    },
    details: {
      culture: [
        {
          block: "text",
          title: "Hospitality",
          text: "Turkish hospitality is legendary. You will be offered tea (çay) everywhere you go.",
        },
      ],
      language: [
        {
          block: "checkstate",
          title: "English Proficiency",
          state: "indeterminate",
          description: "Varies. Good in universities, lower in public.",
        },
      ],
      transportation: [
        {
          block: "rating",
          title: "Public Transport",
          rating: 4,
          max: 5,
        },
        {
          block: "list",
          title: "Travel",
          items: [
            {
              text: "Dolmuş",
              description: "Shared taxi minibuses are cheap and common.",
            },
            {
              text: "Buses",
              description: "Intercity buses are luxurious and affordable.",
            },
          ],
        },
      ],
      money: [
        {
          block: "text",
          title: "Currency",
          text: "Turkish Lira (TRY). Inflation can be high, so prices fluctuate. Cash is useful in bazaars.",
        },
      ],
      safety: [
        {
          block: "rating",
          title: "Safety Score",
          rating: 4,
          max: 5,
        },
      ],
      daily: [
        {
          block: "list",
          title: "Local Life",
          items: [
            {
              text: "Cats",
              description: "Street cats are loved and cared for by everyone.",
            },
            {
              text: "Bazaars",
              description: "Haggling is part of the shopping experience.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Spain",
    slug: "spain",
    slogan: "Sun & Siestas",
    image: "/images/destinations/spain.webp",
    tags: mockTags,
    essentialInfo: {
      visaRequired: { state: "True (Non-EU)" },
      insurance: "Private (No Copay)",
      rent: { min: 300, max: 700 },
      climate: "Sunny/Hot",
      university: "U. Barcelona, Complutense",
    },
    details: {
      culture: [
        {
          block: "text",
          title: "Fiesta & Siesta",
          text: "Social life is vibrant and outdoors. The 'Siesta' (mid-day break) still affects shop hours in smaller towns.",
        },
      ],
      language: [
        {
          block: "checkstate",
          title: "English Proficiency",
          state: "false",
          description: "Not very high. Spanish skills are highly recommended.",
        },
      ],
      transportation: [
        {
          block: "rating",
          title: "Transport Quality",
          rating: 4,
          max: 5,
        },
        {
          block: "list",
          title: "Options",
          items: [
            { text: "Renfe", description: "National train network." },
            {
              text: "Metro",
              description: "Great systems in Madrid and Barcelona.",
            },
          ],
        },
      ],
      money: [
        {
          block: "text",
          title: "Costs",
          text: "Generally cheaper than northern Europe. Dining out is affordable and common.",
        },
      ],
      safety: [
        {
          block: "rating",
          title: "Safety Score",
          rating: 4,
          max: 5,
        },
        {
          block: "text",
          title: "Pickpockets",
          text: "Be very careful with belongings in tourist hubs like Barcelona.",
        },
      ],
      daily: [
        {
          block: "list",
          title: "Habits",
          items: [
            {
              text: "Tapas",
              description: "Small dishes to share with drinks.",
            },
            {
              text: "Schedule",
              description: "Lunch at 2 PM, Dinner at 9-10 PM.",
            },
          ],
        },
      ],
    },
  },
];
