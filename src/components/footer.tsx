"use client";

import { CompassIcon, CheckCircle2Icon } from "lucide-react";
import { OriginCountryPicker } from "./origin-country-picker";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function formatCountryName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Footer() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();

  const destinationMatch = pathname.match(/^\/destination\/([^/]+)/);
  const countrySlug = destinationMatch?.[1];
  const countryName = countrySlug ? formatCountryName(countrySlug) : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <footer className="w-full content-grid text-white dark min-h-60">
      <div className="grid md:grid-cols-[20rem_1fr_auto] w-full gap-x-20 gap-y-10 py-4 items-center">
        <div className="group flex w-fit items-center gap-1.5">
          <CompassIcon className="ease-bezier-spring size-12 text-primary transition-transform duration-300 group-hover:-rotate-90 group-focus-visible:-rotate-90" />
          <div className="hidden flex-col items-start md:flex">
            <span className="translate-x-px text-base leading-none font-medium">
              Know Before
            </span>
            <span className="text-lg leading-none font-bold text-primary">
              You Go
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-w-md w-full justify-self-center items-center">
          {isSubmitted ? (
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2Icon className="size-5" />
              <span className="text-lg font-medium">
                You will now receive updates for {countryName}!
              </span>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-medium text-muted-foreground text-center">
                {countryName
                  ? `Subscribe to updates about ${countryName}`
                  : "Subscribe to our newsletter"}
              </h3>
              <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full h-11"
                  required
                />
                <Button type="submit" size="lg" className="shadow-md">
                  Subscribe
                </Button>
              </form>
            </>
          )}
        </div>
        <ul className="items-end grid gap-0.5 text-muted-foreground text-sm w-fit justify-self-end [&>li]:min-w-full">
          <li>
            <FooterLink
              // href="/privacy"
              href="/"
            >
              Privacy
            </FooterLink>
          </li>
          <li>
            <FooterLink
              // href="/terms"
              href="/"
            >
              Terms & Conditions
            </FooterLink>
          </li>
          <li>
            <OriginCountryPicker />
          </li>
        </ul>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  ...props
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-sm cursor-pointer hover:bg-stone-800 focus-visible:bg-stone-800 rounded-md flex justify-end min-w-full"
      {...props}
    >
      {children}
    </Link>
  );
}
