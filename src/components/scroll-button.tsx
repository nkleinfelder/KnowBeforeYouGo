"use client";
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
