"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { CountryCard, CountryCardProps } from "@/src/components/country-card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GemIcon,
  Loader2Icon,
  MapPinIcon,
  SparklesIcon,
  TrophyIcon,
} from "lucide-react";
import { InfoPopover } from "@/src/components/ui-extensions/info-popover";

// Types
type Preferences = {
  costOfLiving: number;
  englishProficiency: number;
  lgbtqFriendliness: number;
  safety: number;
  dietaryFriendliness: number;
  cashlessPayment: number;
};

type Recommendation = {
  country: string;
  slug: string;
  matchScore: number;
  image?: string;
};

type HiddenGem = {
  country: string;
  slug: string;
  image?: string;
};

// Constants
const FALLBACK_IMAGE = "/images/destinations/fallback.webp";
const BACKGROUND_IMAGE = "/images/home-hero-background.jpg";

const RANK_CONFIG = [
  { label: "1st Place", gradient: "from-amber-400 to-yellow-500" },
  { label: "2nd Place", gradient: "from-slate-300 to-slate-400" },
  { label: "3rd Place", gradient: "from-orange-300 to-amber-400" },
];

const QUESTIONS: {
  key: keyof Preferences;
  label: string;
  question: string;
  options: string[];
  extraInfo?: string;
}[] = [
  {
    key: "costOfLiving",
    label: "Budget Constraints",
    question: "How strict are you with your budget?",
    options: [
      "Minimal priority",
      "Low priority",
      "Neutral",
      "High priority",
      "Top priority",
    ],
    extraInfo:
      "Reflect on how much emphasis you want to place on keeping overall trip costs low like accommodation, meals, transport, activities.",
  },
  {
    key: "englishProficiency",
    label: "English Usage",
    question: "How important is it that locals speak English?",
    options: [
      "Minimal priority",
      "Low priority",
      "Neutral",
      "High priority",
      "Top priority",
    ],
    extraInfo:
      "Consider how much you value destinations where English is commonly spoken by locals, staff, or on signage/menus.",
  },
  {
    key: "lgbtqFriendliness",
    label: "LGBTQ+ Acceptance",
    question: "How important is LGBTQ+ acceptance to you?",
    options: [
      "Minimal priority",
      "Low priority",
      "Neutral",
      "High priority",
      "Top priority",
    ],
    extraInfo:
      "Think about how important a supportive environment (legal protections, social attitudes, visible inclusivity) is for you.",
  },
  {
    key: "safety",
    label: "Personal Safety",
    question: "How much do you prioritize personal safety?",
    options: [
      "Minimal priority",
      "Low priority",
      "Neutral",
      "High priority",
      "Top priority",
    ],
    extraInfo:
      "Weigh how much you prioritize low crime, stable conditions, reliable healthcare, and save traffic",
  },
  {
    key: "dietaryFriendliness",
    label: "Dietary Needs",
    question: "How important is finding food that is vegetarian or vegan?",
    options: [
      "Minimal priority",
      "Low priority",
      "Neutral",
      "High priority",
      "Top priority",
    ],
    extraInfo:
      "Consider ease of finding food matching your requirements for example vegan food labeled as such on a menu.",
  },
  {
    key: "cashlessPayment",
    label: "Payment Methods",
    question: "How important is being able to pay without cash?",
    options: [
      "Minimal priority",
      "Low priority",
      "Neutral",
      "High priority",
      "Top priority",
    ],
    extraInfo:
      "Reflect on your preference for card/mobile payments versus cash availability and acceptance.",
  },
];

// Components
function RankBadge({ index }: { index: number }) {
  const config = RANK_CONFIG[index] || RANK_CONFIG[2];
  return (
    <div
      className={`absolute -top-2 left-4 z-10 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white shadow-md ${config.gradient}`}
    >
      {config.label}
    </div>
  );
}

function EmptyState() {
  return (
    <Card
      size="md"
      className="border-stone-200 bg-white/90 shadow-lg backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-stone-100">
          <MapPinIcon className="size-8 text-stone-400" />
        </div>
        <div>
          <p className="font-medium text-stone-700">No destinations found</p>
          <p className="mt-1 text-sm text-stone-500">
            Please add countries to the CMS first.
          </p>
        </div>
      </div>
    </Card>
  );
}

function RecommendationCard({
  rec,
  index,
}: {
  rec: Recommendation;
  index: number;
}) {
  const config = RANK_CONFIG[index] || RANK_CONFIG[2];
  const tags: CountryCardProps["tags"] = [
    { icon: TrophyIcon, name: config.label },
    { icon: SparklesIcon, name: `${rec.matchScore}%` },
  ];

  return (
    <div className="relative">
      <RankBadge index={index} />
      <CountryCard
        name={rec.country}
        slug={rec.slug}
        image={rec.image || FALLBACK_IMAGE}
        tags={tags}
      />
    </div>
  );
}

function HiddenGemCard({ gem }: { gem: HiddenGem }) {
  const tags: CountryCardProps["tags"] = [
    { icon: GemIcon, name: "Hidden Gem" },
  ];

  return (
    <div className="relative origin-top scale-90">
      <div className="absolute -top-2 left-4 z-10 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 px-2 py-0.5 text-xs font-bold text-white shadow-md">
        💎 Hidden Gem
      </div>
      <CountryCard
        name={gem.country}
        slug={gem.slug}
        image={gem.image || FALLBACK_IMAGE}
        tags={tags}
      />
    </div>
  );
}

// Main Component
export function MatchFinder() {
  const [preferences, setPreferences] = useState<Partial<Preferences>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);
  const [hiddenGems, setHiddenGems] = useState<HiddenGem[]>([]);
  const [showHiddenGems, setShowHiddenGems] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const isLastQuestion = currentStep === QUESTIONS.length - 1;
  const hasAnsweredCurrent = preferences[currentQuestion?.key] !== undefined;
  const hasRecommendations = recommendations && recommendations.length > 0;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
      setHiddenGems(data.hiddenGems || []);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRecommendations(null);
    setHiddenGems([]);
    setPreferences({});
    setCurrentStep(0);
    setShowHiddenGems(false);
  };

  return (
    <section className="full-width relative flex min-h-lvh items-center justify-center overflow-clip rounded-b-4xl">
      <div
        className={`z-10 flex w-full flex-col items-center gap-4 px-4 ${
          recommendations ? "max-w-4xl pt-24" : "max-w-md"
        }`}
      >
        {!recommendations ? (
          // Questionnaire
          <Card
            size="md"
            className="w-full border-stone-200 bg-white/90 shadow-lg backdrop-blur-sm"
          >
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-stone-500">
                <span>
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="py-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <h2 className="text-2xl font-semibold text-stone-800">
                  {currentQuestion.label}
                </h2>
                {currentQuestion.extraInfo && (
                  <InfoPopover contentClassName="max-w-xs text-stone-600">
                    {currentQuestion.extraInfo}
                  </InfoPopover>
                )}
              </div>
              <p className="mt-1 text-sm text-stone-500">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((option, idx) => {
                const value = idx + 1;
                const isSelected = preferences[currentQuestion.key] === value;

                return (
                  <button
                    key={idx}
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        [currentQuestion.key]: value,
                      }))
                    }
                    className={`rounded-lg border px-4 py-3 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 text-stone-800"
                        : "border-stone-300 bg-stone-50 text-stone-600 hover:border-stone-400 hover:bg-stone-100"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 0}
                className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900"
              >
                <ArrowLeftIcon className="size-4" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!hasAnsweredCurrent || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin" />
                      Finding...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="size-4" />
                      Get Results
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  disabled={!hasAnsweredCurrent}
                  className="flex-1"
                >
                  Next
                  <ArrowRightIcon className="size-4" />
                </Button>
              )}
            </div>
          </Card>
        ) : (
          // Results
          <div className="flex flex-col gap-6">
            <h2 className="text-center text-xl font-semibold text-white drop-shadow-md">
              Your Top Matches
            </h2>

            {!hasRecommendations ? (
              <EmptyState />
            ) : (
              <>
                {/* Top Matches */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard
                      key={rec.country}
                      rec={rec}
                      index={index}
                    />
                  ))}
                </div>

                {/* Hidden Gems Toggle */}
                {!showHiddenGems && hiddenGems.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowHiddenGems(true)}
                    className="border-purple-300 bg-purple-50/90 text-purple-700 backdrop-blur-sm hover:bg-purple-100 hover:text-purple-900"
                  >
                    <GemIcon className="size-4" />
                    Discover Hidden Gems
                  </Button>
                )}

                {/* Hidden Gems */}
                {showHiddenGems && hiddenGems.length > 0 && (
                  <div className="flex w-full flex-col items-center gap-4">
                    <div className="flex items-center justify-center gap-2">
                      <GemIcon className="size-4 text-purple-400" />
                      <h3 className="text-base font-semibold text-white drop-shadow-md">
                        Hidden Gems
                      </h3>
                      <GemIcon className="size-4 text-purple-400" />
                    </div>
                    <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                      {hiddenGems.map((gem) => (
                        <HiddenGemCard key={gem.country} gem={gem} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full border-stone-300 bg-white/90 text-stone-700 backdrop-blur-sm hover:bg-white hover:text-stone-900"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>

      <Image
        src={BACKGROUND_IMAGE}
        alt=""
        sizes="100vw"
        className="full-width h-full w-full scale-105 object-cover blur-xs brightness-75"
        fill
      />
    </section>
  );
}
