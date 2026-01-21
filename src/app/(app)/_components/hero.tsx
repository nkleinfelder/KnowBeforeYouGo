import { buttonVariants } from "@/src/components/ui/button";
import { BookTextIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { ScrollButton } from "@/src/components/scroll-button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

export function Hero() {
  return (
    <section className="full-width relative min-h-lvh bg-stone-800">
      <div className="z-10 flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold text-balance text-stone-50 md:text-5xl">
          Find your perfect Erasmus destination
        </h1>
        <p className="text-pretty text-stone-200">
          Use our quiz to find the best Erasmus+ destination based on your
          personality and studies!
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Link
            className={cn(buttonVariants({ size: "lg" }), "grow shadow-md")}
            href="/match-finder"
          >
            <BookTextIcon className="size-4" />
            <span>Find your Match</span>
          </Link>
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
      <div className="full-width-no-inherit h-full w-full absolute  overflow-clip shadow-md shadow-stone-50/3">
        <Image
          src="/images/home-hero-background.jpg"
          alt=""
          sizes="100vw"
          className="scale-105 aspect-auto object-cover blur-xs brightness-75"
          preload
          fill
        />
      </div>
    </section>
  );
}
