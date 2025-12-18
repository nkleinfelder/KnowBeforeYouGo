"use client";
import { useState } from "react";

export function useElementDimensions() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const ref = (node: Element | HTMLDivElement | null) => {
    let observer: ResizeObserver;
    if (node) {
      observer = new ResizeObserver(([entry]) => {
        setHeight(entry.borderBoxSize[0].blockSize);
        setWidth(entry.borderBoxSize[0].inlineSize);
      });

      observer.observe(node);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  };

  return {
    height,
    width,
    ref,
  };
}
