import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { CompassIcon } from "lucide-react";
import { CTA } from "./cta";
import { PropsWithChildren } from "react";
import { Hamburger } from "./hamburger";
import { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";

export function Header() {
  return (
    <header className="content-grid fixed inset-x-0 top-4 z-50">
      <NavigationMenu className="w-full max-w-full [&>div]:w-full">
        {/* Desktop */}
        <NavigationMenuList
          data-viewport="desktop"
          className="hidden rounded-full bg-stone-50 p-1 shadow-lg md:grid md:grid-cols-[1fr_auto_1fr]"
        >
          <LogoLink />

          <div className="flex">
            <NavItem href="/#destinations-grid">Destinations</NavItem>
            <NavItem href="/compare">Compare</NavItem>
          </div>
          <CTA className="hidden justify-self-end md:flex" />
        </NavigationMenuList>

        {/* Mobile Hamburger menu */}
        <NavigationMenuList className="justify-between md:hidden">
          <LogoLink />
          <Hamburger className="rounded-full bg-stone-50 shadow-lg">
            <NavigationMenuList className="flex-col text-center md:hidden">
              <NavItem href="/#destinations-grid">Destinations</NavItem>
              <NavItem href="/compare">Compare</NavItem>
              <NavigationMenuItem asChild>
                <CTA className="w-full" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </Hamburger>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

function NavItem({
  href,
  children,
  ...props
}: PropsWithChildren<{ href: string }> & NavigationMenuLinkProps) {
  return (
    <NavigationMenuItem className="w-full text-center md:w-fit [&>a]:justify-center">
      <NavigationMenuLink {...props} href={href}>
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function LogoLink() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href="/"
        className="group flex w-fit items-center gap-1.5 rounded-full bg-stone-50 p-3 text-stone-700 shadow-lg md:bg-transparent md:px-3 md:py-1.5 md:shadow-none"
      >
        <CompassIcon className="ease-bezier-spring size-5 text-primary transition-transform duration-300 group-hover:-rotate-90 group-focus-visible:-rotate-90" />
        <div className="hidden flex-col items-start md:flex">
          <span className="translate-x-px text-xs leading-none font-medium text-stone-600">
            Know Before
          </span>
          <span className="text-sm leading-none font-bold text-primary">
            You Go
          </span>
        </div>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
