"use client";

import { useRef } from "react";
import { useCountryDetailsScrollProgress } from "./use-section-scroll-progress";

export function ScrollAnchorLinksLine({
  sectionIds,
  className,
}: {
  sectionIds: string[];
  className?: string;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  useCountryDetailsScrollProgress(lineRef, sectionIds);

  return (
    <div
      aria-hidden="true"
      style={{ "--scroll-scale": "0" } as React.CSSProperties}
      className={className}
      ref={lineRef}
    />
  );
}
