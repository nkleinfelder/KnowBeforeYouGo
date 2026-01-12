import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import type {
  Country,
  EnglishLevel,
  LgbtqLevel,
  HazardsIndex,
} from "@/payload-types";

const payload = await getPayload({ config });

// User preferences from quiz (1-5 scale)
interface UserPreferences {
  costOfLiving: number; // 1 = tight budget, 5 = flexible
  englishProficiency: number; // 1 = not needed, 5 = essential
  lgbtqFriendliness: number; // 1 = not a factor, 5 = essential
  safety: number; // 1 = not concerned, 5 = very concerned (about hazards)
  dietaryFriendliness: number; // 1 = not important, 5 = essential
  cashlessPayment: number; // 1 = cash preferred, 5 = card essential
}

interface CountryScore {
  country: string;
  slug: string;
  image?: string;
  matchScore: number;
}

// Helper to get image URL from country
function getCountryImage(images: Country["images"]): string | undefined {
  const firstImage = images?.[0];
  if (!firstImage) return undefined;
  if (typeof firstImage.image === "string") return firstImage.image;
  return firstImage.image?.url ?? undefined;
}

// Normalize cost of living to 1-5 scale (inverted: low cost = high score for budget travelers)
function normalizeCostOfLiving(cost: number | null | undefined): number {
  if (!cost) return 3; // Default to middle
  // Assuming cost range roughly 400-2000€
  if (cost <= 500) return 1; // Very cheap
  if (cost <= 700) return 2; // Cheap
  if (cost <= 1000) return 3; // Moderate
  if (cost <= 1400) return 4; // Expensive
  return 5; // Very expensive
}

// Convert English level relationship to 1-5 scale
function normalizeEnglishLevel(
  level: Country["languageAndCommunication"],
): number {
  const englishLevel = level?.englishLevels;
  if (!englishLevel) return 3;

  // If it's populated as an object
  if (typeof englishLevel === "object" && "name" in englishLevel) {
    const name = (englishLevel as EnglishLevel).name.toLowerCase();
    if (name.includes("very high") || name.includes("excellent")) return 5;
    if (name.includes("high")) return 4;
    if (name.includes("moderate") || name.includes("medium")) return 3;
    if (name.includes("low")) return 2;
    if (name.includes("very low") || name.includes("minimal")) return 1;
  }
  return 3;
}

// Convert LGBTQ level relationship to 1-5 scale
function normalizeLgbtqLevel(
  cultural: Country["culturalAndSocialNorms"],
): number {
  const lgbtqLevel = cultural?.lgbtqFriendliness;
  if (!lgbtqLevel) return 3;

  if (typeof lgbtqLevel === "object" && "name" in lgbtqLevel) {
    const name = (lgbtqLevel as LgbtqLevel).name.toLowerCase();
    // Based on typical LGBTQ index naming
    if (
      name.includes("very friendly") ||
      name.includes("excellent") ||
      name.includes("high")
    )
      return 5;
    if (name.includes("friendly") || name.includes("good")) return 4;
    if (name.includes("moderate") || name.includes("mixed")) return 3;
    if (name.includes("unfriendly") || name.includes("low")) return 2;
    if (
      name.includes("hostile") ||
      name.includes("dangerous") ||
      name.includes("very low")
    )
      return 1;
  }
  return 3;
}

// Convert hazards index to safety score (inverted: low hazards = high safety)
function normalizeHazardsIndex(safety: Country["safetyAndLegal"]): number {
  const hazards = safety?.naturalHazardsIndexEnum;
  if (!hazards) return 3;

  if (typeof hazards === "object" && "name" in hazards) {
    const name = (hazards as HazardsIndex).name.toLowerCase();
    // Inverted: low hazards = safe
    if (name.includes("very low") || name.includes("minimal")) return 5;
    if (name.includes("low")) return 4;
    if (name.includes("moderate") || name.includes("medium")) return 3;
    if (name.includes("high")) return 2;
    if (name.includes("very high") || name.includes("extreme")) return 1;
  }
  return 3;
}

// Calculate dietary friendliness from veg percentages
function normalizeDietaryFriendliness(
  cultural: Country["culturalAndSocialNorms"],
): number {
  const vegShare = cultural?.vegetarianPopulationShare ?? 0;
  const veganShare = cultural?.veganPopulationShare ?? 0;
  const combinedShare = vegShare + veganShare;

  if (combinedShare >= 15) return 5; // Very veg-friendly
  if (combinedShare >= 10) return 4;
  if (combinedShare >= 6) return 3;
  if (combinedShare >= 3) return 2;
  return 1; // Low veg population
}

// Calculate cashless payment score from card payment percentage
function normalizeCashlessPayment(money: Country["moneyAndPayments"]): number {
  const cardPercent = money?.paymentMethods?.["Payment by Card (%)"] ?? 50;

  if (cardPercent >= 80) return 5; // Very cashless
  if (cardPercent >= 60) return 4;
  if (cardPercent >= 40) return 3;
  if (cardPercent >= 20) return 2;
  return 1; // Cash-heavy society
}

function calculateMatchScore(
  country: Country,
  preferences: UserPreferences,
): number {
  const scores: { score: number; weight: number }[] = [];

  const countryCost = normalizeCostOfLiving(
    country.culturalAndSocialNorms?.avgCostOfLiving,
  );
  const costMatch = 100 - Math.abs(countryCost - preferences.costOfLiving) * 25;
  scores.push({ score: costMatch, weight: 1.5 }); // Higher weight for budget

  const countryEnglish = normalizeEnglishLevel(
    country.languageAndCommunication,
  );
  const englishMatch =
    preferences.englishProficiency <= 2
      ? 100 // Don't care about English
      : 100 - Math.max(0, preferences.englishProficiency - countryEnglish) * 25;
  scores.push({ score: englishMatch, weight: 1 });

  const countryLgbtq = normalizeLgbtqLevel(country.culturalAndSocialNorms);
  const lgbtqMatch =
    preferences.lgbtqFriendliness <= 2
      ? 100
      : 100 - Math.max(0, preferences.lgbtqFriendliness - countryLgbtq) * 25;
  scores.push({ score: lgbtqMatch, weight: 1 });

  const countrySafety = normalizeHazardsIndex(country.safetyAndLegal);
  const safetyMatch =
    preferences.safety <= 2
      ? 100
      : 100 - Math.max(0, preferences.safety - countrySafety) * 25;
  scores.push({ score: safetyMatch, weight: 1.2 });

  const countryDietary = normalizeDietaryFriendliness(
    country.culturalAndSocialNorms,
  );
  const dietaryMatch =
    preferences.dietaryFriendliness <= 2
      ? 100
      : 100 -
        Math.max(0, preferences.dietaryFriendliness - countryDietary) * 25;
  scores.push({ score: dietaryMatch, weight: 0.8 });

  const countryCashless = normalizeCashlessPayment(country.moneyAndPayments);
  const cashlessMatch =
    100 - Math.abs(countryCashless - preferences.cashlessPayment) * 20;
  scores.push({ score: cashlessMatch, weight: 0.7 });

  const totalWeight = scores.reduce((sum, s) => sum + s.weight, 0);
  const weightedSum = scores.reduce((sum, s) => sum + s.score * s.weight, 0);

  return Math.round(Math.max(0, Math.min(100, weightedSum / totalWeight)));
}

async function getRecommendations(
  preferences: UserPreferences,
  topN: number = 3,
): Promise<CountryScore[]> {
  const data = await payload.find({
    collection: "countries",
    limit: 100,
    depth: 1,
  });

  if (data.docs.length === 0) {
    return [];
  }

  const scored: CountryScore[] = data.docs.map((country) => {
    const countryValues = {
      costOfLiving: normalizeCostOfLiving(
        country.culturalAndSocialNorms?.avgCostOfLiving,
      ),
      englishProficiency: normalizeEnglishLevel(
        country.languageAndCommunication,
      ),
      lgbtqFriendliness: normalizeLgbtqLevel(country.culturalAndSocialNorms),
      safety: normalizeHazardsIndex(country.safetyAndLegal),
      dietaryFriendliness: normalizeDietaryFriendliness(
        country.culturalAndSocialNorms,
      ),
      cashlessPayment: normalizeCashlessPayment(country.moneyAndPayments),
    };
    const matchScore = calculateMatchScore(country, preferences);

    return {
      country: country.name,
      slug: country.slug ?? country.name.toLowerCase().replace(/\s+/g, "-"),
      image: getCountryImage(country.images),
      matchScore,
    };
  });

  // Sort by match score descending
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, topN);
}

export async function GET() {
  return NextResponse.json({ message: "Recommendation endpoint working" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "costOfLiving",
      "englishProficiency",
      "lgbtqFriendliness",
      "safety",
      "dietaryFriendliness",
      "cashlessPayment",
    ];
    // safety should never be needed
    for (const field of requiredFields) {
      if (
        typeof body[field] !== "number" ||
        body[field] < 1 ||
        body[field] > 5
      ) {
        return NextResponse.json(
          {
            error: `Invalid or missing field: ${field}. Must be a number between 1 and 5.`,
          },
          { status: 400 },
        );
      }
    }

    const preferences: UserPreferences = {
      costOfLiving: body.costOfLiving,
      englishProficiency: body.englishProficiency,
      lgbtqFriendliness: body.lgbtqFriendliness,
      safety: body.safety,
      dietaryFriendliness: body.dietaryFriendliness,
      cashlessPayment: body.cashlessPayment,
    };

    const topN = body.topN || 3;
    const recommendations = await getRecommendations(preferences, topN);

    return NextResponse.json({
      recommendations,
      userPreferences: preferences,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid JSON body",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 },
    );
  }
}
