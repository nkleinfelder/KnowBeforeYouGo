import { CompassIcon } from "lucide-react";
import { OriginPickerClient } from "../origin-picker-client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { NewsletterSub } from "./newsletter-sub";

export function Footer() {
  return (
    <footer className="w-full content-grid text-white dark min-h-60">
      <div className="grid md:grid-cols-[1fr_auto_1fr] w-full gap-x-20 gap-y-10 py-4 items-center">
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
        <NewsletterSub />
        <ul className="items-end grid gap-0.5 text-muted-foreground text-sm w-fit justify-self-end [&>li]:min-w-full -col-start-2">
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
            <OriginPickerClient />
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
