import { NextResponse } from "next/server";

// Country data with normalized scores (1-5 scale)
// 1 = low/cold/cheap, 5 = high/hot/expensive
interface CountryData {
  name: string;
  temperature: number; // 1 = cold, 5 = hot
  costOfLiving: number; // 1 = cheap, 5 = expensive
  safety: number; // 1 = less safe, 5 = very safe
  nightlife: number; // 1 = quiet, 5 = vibrant
  nature: number; // 1 = urban, 5 = nature-focused
  englishProficiency: number; // 1 = low, 5 = high
  publicTransport: number; // 1 = poor, 5 = excellent
  foodScene: number; // 1 = basic, 5 = excellent
}

const countries: CountryData[] = [
  {
    name: "Thailand",
    temperature: 5,
    costOfLiving: 1,
    safety: 3,
    nightlife: 4,
    nature: 4,
    englishProficiency: 2,
    publicTransport: 3,
    foodScene: 5,
  },
  {
    name: "Japan",
    temperature: 3,
    costOfLiving: 4,
    safety: 5,
    nightlife: 4,
    nature: 4,
    englishProficiency: 2,
    publicTransport: 5,
    foodScene: 5,
  },
  {
    name: "Portugal",
    temperature: 4,
    costOfLiving: 2,
    safety: 5,
    nightlife: 4,
    nature: 3,
    englishProficiency: 4,
    publicTransport: 4,
    foodScene: 4,
  },
  {
    name: "Germany",
    temperature: 2,
    costOfLiving: 3,
    safety: 5,
    nightlife: 4,
    nature: 3,
    englishProficiency: 4,
    publicTransport: 5,
    foodScene: 3,
  },
  {
    name: "Canada",
    temperature: 1,
    costOfLiving: 3,
    safety: 5,
    nightlife: 3,
    nature: 5,
    englishProficiency: 5,
    publicTransport: 3,
    foodScene: 3,
  },
  {
    name: "Spain",
    temperature: 4,
    costOfLiving: 2,
    safety: 4,
    nightlife: 5,
    nature: 3,
    englishProficiency: 3,
    publicTransport: 4,
    foodScene: 5,
  },
];

// User preferences from quiz (same scale 1-5)
interface UserPreferences {
  temperature: number;
  costOfLiving: number;
  safety: number;
  nightlife: number;
  nature: number;
  englishProficiency: number;
  publicTransport: number;
  foodScene: number;
  // Optional weights for each preference (default to 1)
  weights?: {
    temperature?: number;
    costOfLiving?: number;
    safety?: number;
    nightlife?: number;
    nature?: number;
    englishProficiency?: number;
    publicTransport?: number;
    foodScene?: number;
  };
}

function calculateMatchScore(
  country: CountryData,
  preferences: UserPreferences,
): number {
  const weights = preferences.weights || {};
  const defaultWeight = 1;

  const criteria: (keyof Omit<CountryData, "name">)[] = [
    "temperature",
    "costOfLiving",
    "safety",
    "nightlife",
    "nature",
    "englishProficiency",
    "publicTransport",
    "foodScene",
  ];

  let totalScore = 0;
  let totalWeight = 0;

  for (const criterion of criteria) {
    const weight = weights[criterion] ?? defaultWeight;
    const difference = Math.abs(country[criterion] - preferences[criterion]);
    // Convert difference to a 0-100 score (0 difference = 100, 4 difference = 0)
    const score = Math.max(0, 100 - difference * 25);
    totalScore += score * weight;
    totalWeight += weight;
  }

  return Math.round(totalScore / totalWeight);
}

function getRecommendations(preferences: UserPreferences, topN: number = 5) {
  const scored = countries.map((country) => ({
    country: country.name,
    matchScore: calculateMatchScore(country, preferences),
    details: {
      temperature: country.temperature,
      costOfLiving: country.costOfLiving,
      safety: country.safety,
      nightlife: country.nightlife,
      nature: country.nature,
      englishProficiency: country.englishProficiency,
      publicTransport: country.publicTransport,
      foodScene: country.foodScene,
    },
  }));

  // Sort by match score descending
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, topN);
}

export async function GET() {
  return NextResponse.json({ message: " \n Recommendation endpoint working" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "temperature",
      "costOfLiving",
      "safety",
      "nightlife",
      "nature",
      "englishProficiency",
      "publicTransport",
      "foodScene",
    ];

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
      temperature: body.temperature,
      costOfLiving: body.costOfLiving,
      safety: body.safety,
      nightlife: body.nightlife,
      nature: body.nature,
      englishProficiency: body.englishProficiency,
      publicTransport: body.publicTransport,
      foodScene: body.foodScene,
      weights: body.weights,
    };

    const topN = body.topN || 5;
    const recommendations = getRecommendations(preferences, topN);

    return NextResponse.json({
      recommendations,
      userPreferences: preferences,
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
