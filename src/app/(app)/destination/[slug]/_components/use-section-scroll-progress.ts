"use client";
import { useEffect } from "react";

const VIEWPORT_TRIGGER_RATIO = 0.15;

/** Updates '--scroll-scale' CSS property of the given element */
export function useCountryDetailsScrollProgress(
  lineRef: React.RefObject<HTMLDivElement | null>,
  sectionIds: string[],
) {
  useEffect(() => {
    const sectionElements = sectionIds.map((id) => document.getElementById(id));

    const updateScroll = () => {
      if (!lineRef.current) return;

      const triggerY =
        window.scrollY + window.innerHeight * VIEWPORT_TRIGGER_RATIO;

      // Find currently active section
      let currentSectionIndex = -1;
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;

        if (triggerY >= absoluteTop) {
          currentSectionIndex = i;
        } else {
          break;
        }
      }

      let progress = 0;
      const totalSections = sectionIds.length;

      if (currentSectionIndex === -1) {
        // Before the first section
        progress = 0;
      } else if (currentSectionIndex >= totalSections - 1) {
        // Past the start of the last section -> Full bar
        progress = 1;
      } else {
        // We are strictly between section[i] and section[i+1]
        const currentEl = sectionElements[currentSectionIndex];
        const nextEl = sectionElements[currentSectionIndex + 1];

        if (currentEl && nextEl) {
          const currentTop =
            currentEl.getBoundingClientRect().top + window.scrollY;
          const nextTop = nextEl.getBoundingClientRect().top + window.scrollY;

          // How far are we between these two specific sections? (0 to 1)
          const sectionHeight = nextTop - currentTop;
          const scrollPastSection = triggerY - currentTop;
          const sectionProgress = scrollPastSection / sectionHeight;

          // Clamp locally to be safe
          const clampedSectionProgress = Math.max(
            0,
            Math.min(1, sectionProgress),
          );

          // Map this local progress to the global sidebar steps
          progress =
            (currentSectionIndex + clampedSectionProgress) /
            (totalSections - 1);
        }
      }

      lineRef.current.style.setProperty("--scroll-scale", progress.toString());
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [lineRef, sectionIds]);
}
