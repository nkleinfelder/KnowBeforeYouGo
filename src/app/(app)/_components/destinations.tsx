"use client";
import { CountryCard, CountryCardProps } from "@/src/components/country-card";
import { BadgeIcon, GroupIcon, TagIcon } from "lucide-react";

const mockTags: CountryCardProps["tags"][0][] = [
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

// Germany, France, Italy, Portugal, Poland, Spain, Netherlands
const MOCK_DESTINATIONS: CountryCardProps[] = [
  {
    name: "Germany",
    slug: "germany",
    slogan: "Engineering Excellence",
    image: "/images/destinations/germany.webp",
    tags: mockTags,
  },
  {
    name: "France",
    slug: "france",
    slogan: "Art, Wine, Love",
    image: "/images/destinations/france.webp",
    tags: mockTags,
  },
  {
    name: "Italy",
    slug: "italy",
    slogan: "La Dolce Vita",
    image: "/images/destinations/italy.webp",
    tags: mockTags,
  },
  {
    name: "Portugal",
    slug: "portugal",
    slogan: "Coastal Charms Await",
    image: "/images/destinations/portugal.webp",
    tags: mockTags,
  },
  {
    name: "Turkey",
    slug: "turkey",
    slogan: "Köfte & Sun",
    image: "/images/destinations/turkey.webp",
    tags: mockTags,
  },
  {
    name: "Spain",
    slug: "spain",
    slogan: "Sun & Siestas",
    image: "/images/destinations/spain.webp",
    tags: mockTags,
  },
];

export function Destinations() {
  return (
    <section
      className="grid-cols-destinations full-width-no-inherit grid w-full auto-rows-fr gap-2 p-inline"
      id="destinations-grid"
    >
      {MOCK_DESTINATIONS.map((destination) => (
        <CountryCard key={destination.name} {...destination} />
      ))}
    </section>
  );
}
