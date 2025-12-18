"use client";
import { cn } from "@/src/lib/utils";
import { BookTextIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu";

const classNameInternal = cn(
  buttonVariants({ size: "lg" }),
  "shadow-md w-fit justify-self-end",
);

export function CTA({ className }: { className?: string }) {
  const pathname = usePathname();
  const isMatchFinder = pathname === "/match-finder";

  if (isMatchFinder) {
    return (
      <div
        className={cn(
          classNameInternal,
          className,
          "pointer-events-none opacity-50",
        )}
      >
        <CTAContent />
      </div>
    );
  }

  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuLink
        href="/match-finder"
        className={cn(
          classNameInternal,
          "hover:text-stone-50 focus-visible:bg-primary/80 focus-visible:text-stone-50 focus-visible:ring-primary/70",
          className,
        )}
      >
        <CTAContent />
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function CTAContent() {
  return (
    <>
      <BookTextIcon className="size-4" />
      <span>Find your Match</span>
    </>
  );
}
