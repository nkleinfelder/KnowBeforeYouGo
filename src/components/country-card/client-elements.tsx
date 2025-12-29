"use client";
import Link from "next/link";
import { CSSProperties, PropsWithChildren } from "react";
import { useCountryCardContext } from "./context";

export function LinkWrapper({
  children,
  slug,
}: PropsWithChildren<{ slug: string }>) {
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
      {children}
    </Link>
  );
}

export function BlurElement() {
  const { contentHeight } = useCountryCardContext();
  return (
    <div
      className="image-blur-element w-full self-end bg-stone-800 opacity-100 backdrop-blur-3xl transition-opacity duration-200 ease-in-out group-focus-within:opacity-0 group-hover:opacity-0"
      style={{
        height: contentHeight + 16 * 2,
      }}
    />
  );
}

export function ContentWrapper({ children }: PropsWithChildren) {
  const { contentRef } = useCountryCardContext();

  return (
    <div
      ref={contentRef}
      className="relative flex flex-col self-end p-3 text-stone-50"
    >
      {children}
    </div>
  );
}
