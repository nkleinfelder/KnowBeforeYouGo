"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { CountryCardContextProvider, useCountryCardContext } from "./context";
import { cn } from "@/src/lib/utils";
import "./styles.css";
import { CSSProperties } from "react";
import { LucideIcon } from "lucide-react";

export type CountryCardProps = {
  name: string;
  slug: string;
  image: string;
  tags: {
    name: string;
    icon: LucideIcon;
  }[];
};
export function CountryCard({ ...props }: CountryCardProps) {
  return (
    <CountryCardContextProvider>
      <CountryCardInner {...props} />
    </CountryCardContextProvider>
  );
}

function CountryCardInner({ name, slug, image, tags }: CountryCardProps) {
  const { contentHeight } = useCountryCardContext();

  return (
    <Link
      href={`/destination/${slug}`}
      className="country-card group"
      style={
        {
          "--content-height": `${contentHeight}px`,
        } as CSSProperties
      }
    >
      <article
        style={{ height: "var(--container-height)" }}
        className="grid-stack relative box-content rounded-4xl bg-white p-1.5 shadow-md transition-shadow duration-200 ease-in-out focus-within:shadow-xl hover:shadow-xl"
      >
        <BackgroundImage image={image} />
        <Content name={name} slogan="" tags={tags} />
      </article>
    </Link>
  );
}

function BackgroundImage({ image }: { image: string }) {
  const { contentHeight } = useCountryCardContext();
  return (
    <div
      className={cn(
        "grid-stack h-(--container-height) w-full content-center overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-md transition-all duration-200 ease-in-out group-focus-within:h-[calc(var(--container-height)-var(--content-height))] group-hover:h-[calc(var(--container-height)-var(--content-height))]",
      )}
    >
      <Image
        src={image}
        alt=""
        width={256}
        height={512}
        className="h-full w-full rounded-[inherit] object-cover"
        style={{ height: "var(--container-height)" }}
      />
      <div
        className="image-blur-element w-full self-end bg-stone-800 opacity-100 backdrop-blur-3xl transition-opacity duration-200 ease-in-out group-focus-within:opacity-0 group-hover:opacity-0"
        style={{
          height: contentHeight + 16 * 2,
        }}
      />
    </div>
  );
}

function Content({
  name,
  slogan,
  tags,
}: {
  name: string;
  slogan: string;
  tags: Destination["tags"];
}) {
  const { contentRef } = useCountryCardContext();
  return (
    <div
      ref={contentRef}
      className="relative flex flex-col self-end p-3 text-stone-50"
    >
      <h3 className="text-xl font-bold transition-colors duration-200 ease-in-out group-focus-within:text-stone-900 group-hover:text-stone-900">
        {name}
      </h3>
      <p className="text-sm text-stone-300 transition-colors duration-200 ease-in-out group-focus-within:text-stone-500 group-hover:text-stone-500">
        {slogan}
      </p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag data={t} key={t.name} />
        ))}
      </ul>
      <Button
        className="mt-3 cursor-pointer rounded-full border-transparent text-stone-800 shadow-lg transition-colors duration-200 ease-in-out group-focus-within:bg-stone-900 group-focus-within:text-stone-50 group-hover:bg-stone-900 group-hover:text-stone-50"
        variant="outline"
        tabIndex={-1}
        aria-hidden
      >
        View Details
      </Button>
    </div>
  );
}

function Tag({ data }: { data: Destination["tags"][number] }) {
  const Icon = data.icon;

  return (
    <li className="flex items-center justify-center gap-0.5 text-stone-50 group-focus-within:text-stone-800 group-hover:text-stone-800">
      <Icon className="size-2.5 transition-colors duration-200 ease-in-out" />
      <span className="text-xs transition-colors duration-200 ease-in-out">
        {data.name}
      </span>
    </li>
  );
}
