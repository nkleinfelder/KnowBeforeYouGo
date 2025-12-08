"use client";
import { useRef } from "react";
import { Button, ButtonProps } from "./ui/button";

export function ScrollButton({
  scrollToId,
  onClick,
  children,
  ...props
}: { scrollToId: string } & ButtonProps) {
  const handleScroll = () => {
    const element = document.getElementById(scrollToId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      onClick={(e) => {
        if (onClick) onClick(e);
        handleScroll();
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export function BlankScrollButton({
  scrollToId,
  onClick,
  children,
  scrollTopPercentage = 0.15,
  ...props
}: { scrollToId: string; scrollTopPercentage?: number } & ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const handleScroll = () => {
    const element = document.getElementById(scrollToId);

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition =
        elementPosition - window.innerHeight * scrollTopPercentage;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      if (ref.current) ref.current.blur();
    }
  };

  return (
    <button
      ref={ref}
      onClick={(e) => {
        if (onClick) onClick(e);
        handleScroll();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
