"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Loader2Icon,
  SparklesIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Preferences = {
  temperature: number;
  costOfLiving: number;
  safety: number;
  nightlife: number;
  nature: number;
  englishProficiency: number;
  publicTransport: number;
  foodScene: number;
};

type Recommendation = {
  country: string;
  matchScore: number;
};

const questions = [
  {
    key: "temperature" as const,
    label: "Climate",
    options: ["Cold", "Cool", "Moderate", "Warm", "Hot"],
  },
  {
    key: "costOfLiving" as const,
    label: "Budget",
    options: ["Very low", "Low", "Medium", "High", "Very high"],
  },
  {
    key: "safety" as const,
    label: "Safety",
    options: [
      "Not important",
      "Slightly",
      "Moderate",
      "Important",
      "Essential",
    ],
  },
  {
    key: "nightlife" as const,
    label: "Nightlife",
    options: ["Quiet", "Casual", "Moderate", "Active", "Vibrant"],
  },
  {
    key: "nature" as const,
    label: "Nature",
    options: ["Urban", "Mostly urban", "Balanced", "Nature lover", "Essential"],
  },
  {
    key: "englishProficiency" as const,
    label: "English",
    options: ["Not needed", "Basic", "Moderate", "Important", "Essential"],
  },
  {
    key: "publicTransport" as const,
    label: "Transport",
    options: ["Not needed", "Basic", "Moderate", "Important", "Excellent"],
  },
  {
    key: "foodScene" as const,
    label: "Food",
    options: ["Basic", "Simple", "Nice", "Important", "Essential"],
  },
];

export function MatchFinder() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<Partial<Preferences>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastQuestion = currentStep === questions.length - 1;
  const hasAnsweredCurrent = preferences[currentQuestion?.key] !== undefined;

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
    } catch (error) {
      console.error("Failed to get recommendations:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionSelect = (value: number) => {
    setPreferences((prev) => ({ ...prev, [currentQuestion.key]: value }));

    // Auto-advance to next question after a short delay
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <section className="full-width relative flex min-h-lvh items-center justify-center overflow-clip">
      <div className="z-10 flex w-full max-w-md flex-col items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="self-start text-stone-300 hover:text-stone-100"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Button>

        {!recommendations ? (
          <Card
            size="md"
            className="w-full border-stone-700 bg-stone-900/80 backdrop-blur-sm"
          >
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-stone-400">
                <span>
                  Question {currentStep + 1} of {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-stone-700">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="py-4 text-center">
              <h2 className="text-2xl font-semibold text-stone-100">
                {currentQuestion.label}
              </h2>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((option, idx) => {
                const value = idx + 1;
                const isSelected = preferences[currentQuestion.key] === value;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(value)}
                    className={`rounded-lg border px-4 py-3 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/20 text-stone-100"
                        : "border-stone-600 bg-stone-800/50 text-stone-300 hover:border-stone-500 hover:bg-stone-700/50"
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
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex-1 border-stone-600 text-black hover:bg-stone-800 hover:text-white"
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
          <Card
            size="md"
            className="w-full border-stone-700 bg-stone-900/80 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold text-stone-100">
              Your Top Matches
            </h2>

            <div className="flex flex-col gap-3">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div
                  key={rec.country}
                  className="flex items-center gap-3 rounded-lg border border-stone-700 bg-stone-800/50 px-4 py-3"
                >
                  <span className="font-bold text-primary">{index + 1}</span>
                  <span className="flex-1 text-stone-100">{rec.country}</span>
                  <span className="text-lg font-semibold text-primary">
                    {rec.matchScore}%
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setRecommendations(null);
                setPreferences({});
                setCurrentStep(0);
              }}
              className="w-full border-stone-600 text-black hover:bg-stone-800 hover:text-white"
            >
              Try Again
            </Button>
          </Card>
        )}
      </div>

      <Image
        src="/images/home-hero-background.jpg"
        alt=""
        sizes="100vw"
        className="full-width h-full w-full scale-105 object-cover blur-xs brightness-50"
        fill
      />
    </section>
  );
}
