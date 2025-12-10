"use client";

import { Button } from "@/src/components/ui/button";
import { BookTextIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { ScrollButton } from "@/src/components/scroll-button";

export function Hero({ onFindMatch }: { onFindMatch?: () => void }) {
  return (
    <section className="full-width relative min-h-lvh overflow-clip">
      <div className="z-10 flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold text-balance text-stone-50 md:text-5xl">
          Find your perfect Erasmus destination
        </h1>
        <p className="text-pretty text-stone-200">
          Use our quiz to find the best Erasmus+ destination based on your
          personality and studies!
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Button size="lg" className="grow shadow-md" onClick={onFindMatch}>
            <BookTextIcon className="size-4" />
            <span>Find your Match</span>
          </Button>
          <ScrollButton
            scrollToId="destinations-grid"
            size="lg"
            variant="secondary"
            className="grow shadow-md"
          >
            <SearchIcon className="size-4" />
            <span>Browse Destinations</span>
          </ScrollButton>
        </div>
      </div>
      {/* TODO move to new component and also render in match finder view */}
      <Image
        src="/images/home-hero-background.jpg"
        alt=""
        sizes="100vw"
        className="full-width h-full w-full scale-105 object-cover blur-xs brightness-75"
        preload
        fill
      />
      <div
        aria-hidden
        className="full-width absolute inset-x-0 bottom-0 h-4 w-full bg-linear-to-b from-transparent to-stone-800"
      />
    </section>
  );
}
