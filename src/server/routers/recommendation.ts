import { getConfiguredPayload } from "@/src/lib/payload";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import type { Country, HazardsIndex } from "@/payload-types";

const payload = await getConfiguredPayload();

// User preferences schema (1-5 scale)
const userPreferencesSchema = z.object({
  costOfLiving: z.number().min(1).max(5), // 1 = tight budget, 5 = flexible
  englishProficiency: z.number().min(1).max(5), // 1 = not needed, 5 = essential
  lgbtqFriendliness: z.number().min(1).max(5), // 1 = not a factor, 5 = essential
  safety: z.number().min(1).max(5), // 1 = not concerned, 5 = very concerned
  dietaryFriendliness: z.number().min(1).max(5), // 1 = not important, 5 = essential
  cashlessPayment: z.number().min(1).max(5), // 1 = cash preferred, 5 = card essential
});

type UserPreferences = z.infer<typeof userPreferencesSchema>;

interface CountryScore {
  country: string;
  slug: string;
  image?: string;
  matchScore: number;
}

interface HiddenGem {
  country: string;
  slug: string;
  image?: string;
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
  if (!cost) return 3;
  if (cost <= 500) return 1;
  if (cost <= 700) return 2;
  if (cost <= 1000) return 3;
  if (cost <= 1400) return 4;
  return 5;
}

// Convert English level score to 1-5 scale
// Score range from 390 to 624
function normalizeEnglishLevel(
  level: Country["languageAndCommunication"],
): number {
  const score = level?.englishLevelScore;
  if (score == null) return 3;

  // Map score from 390-624 range to 1-5 scale
  if (score >= 580) return 5; // Very high proficiency
  if (score >= 530) return 4; // High proficiency
  if (score >= 480) return 3; // Moderate proficiency
  if (score >= 430) return 2; // Low proficiency
  return 1; // Very low proficiency
}

// Convert LGBTQ friendliness score to 1-5 scale
// Score range is -23 to 13
function normalizeLgbtqLevel(
  cultural: Country["culturalAndSocialNorms"],
): number {
  const score = cultural?.lgbtqFriendlinessScore;
  if (score == null) return 3;

  // Map score from -23 to 13 range to 1-5 scale
  if (score >= 8) return 5; // Very friendly
  if (score >= 2) return 4; // Friendly
  if (score >= -5) return 3; // Moderate
  if (score >= -15) return 2; // Unfriendly
  return 1; // Hostile
}

// Convert hazards index to safety score
// naturalHazardsIndexValue range: 0 to 10 (higher = safer)
function normalizeHazardsIndex(safety: Country["safetyAndLegal"]): number {
  // First try numeric value if available
  const numericValue = (safety as { naturalHazardsIndexValue?: number })
    ?.naturalHazardsIndexValue;
  if (numericValue != null) {
    // Higher value = safer = higher score
    if (numericValue >= 9) return 5; // Very safe
    if (numericValue >= 7) return 4; // Safe
    if (numericValue >= 5) return 3; // Moderate
    if (numericValue >= 3) return 2; // Risky
    return 1; // High risk
  }

  // Fall back to enum name parsing
  const hazards = safety?.naturalHazardsIndexEnum;
  if (!hazards) return 3;

  if (typeof hazards === "object" && "name" in hazards) {
    const name = (hazards as HazardsIndex).name.toLowerCase();
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

  if (combinedShare >= 15) return 5;
  if (combinedShare >= 10) return 4;
  if (combinedShare >= 6) return 3;
  if (combinedShare >= 3) return 2;
  return 1;
}

// Calculate cashless payment score from card payment percentage
function normalizeCashlessPayment(money: Country["moneyAndPayments"]): number {
  const cardPercent = money?.paymentMethods?.["Payment by Card (%)"] ?? 50;

  if (cardPercent >= 80) return 5;
  if (cardPercent >= 60) return 4;
  if (cardPercent >= 40) return 3;
  if (cardPercent >= 20) return 2;
  return 1;
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
  scores.push({ score: costMatch, weight: 1.5 });

  const countryEnglish = normalizeEnglishLevel(
    country.languageAndCommunication,
  );
  const englishMatch =
    preferences.englishProficiency <= 2
      ? 100
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
): Promise<{ recommendations: CountryScore[]; hiddenGems: HiddenGem[] }> {
  const data = await payload.find({
    collection: "countries",
    limit: 100,
    depth: 1,
  });

  if (data.docs.length === 0) {
    return { recommendations: [], hiddenGems: [] };
  }

  const scored: (CountryScore & { isHiddenGem: boolean })[] = data.docs.map(
    (country) => {
      const matchScore = calculateMatchScore(country, preferences);

      return {
        country: country.name,
        slug: country.slug ?? country.name.toLowerCase().replace(/\s+/g, "-"),
        image: getCountryImage(country.images),
        matchScore,
        isHiddenGem: country.hiddenGem ?? false,
      };
    },
  );

  scored.sort((a, b) => b.matchScore - a.matchScore);

  const recommendations = scored
    .slice(0, topN)
    .map(({ isHiddenGem: _, ...rest }) => rest);
  const recommendedSlugs = new Set(recommendations.map((r) => r.slug));

  const hiddenGems: HiddenGem[] = scored
    .filter((c) => c.isHiddenGem && !recommendedSlugs.has(c.slug))
    .slice(0, 2)
    .map(({ country, slug, image }) => ({ country, slug, image }));

  return { recommendations, hiddenGems };
}

export const recommendationRouter = createTRPCRouter({
  getRecommendations: publicProcedure
    .input(
      z.object({
        preferences: userPreferencesSchema,
        topN: z.number().min(1).max(10).optional().default(3),
      }),
    )
    .mutation(async ({ input }) => {
      const { recommendations, hiddenGems } = await getRecommendations(
        input.preferences,
        input.topN,
      );

      return {
        recommendations,
        hiddenGems,
        userPreferences: input.preferences,
      };
    }),
});
