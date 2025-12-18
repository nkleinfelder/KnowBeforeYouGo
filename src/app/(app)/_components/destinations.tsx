"use client";
import { CountryCard } from "@/src/components/country-card";
import { MOCK_DESTINATIONS } from "@/src/lib/mock-data/destinations";

export function Destinations() {
  return (
    <section
      className="grid-cols-destinations breakout grid w-full scroll-mt-20 auto-rows-fr gap-2 p-inline"
      id="destinations-grid"
    >
      {MOCK_DESTINATIONS.map((destination) => (
        <CountryCard key={destination.name} data={destination} />
      ))}
    </section>
  );
}
