import { PropsWithChildren } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu";
import {
  NavigationMenuItemProps,
  NavigationMenuSub,
} from "@radix-ui/react-navigation-menu";
import { MenuIcon, XIcon } from "lucide-react";

export function Hamburger({
  children,
  ...props
}: PropsWithChildren<NavigationMenuItemProps>) {
  return (
    <NavigationMenuItem {...props}>
      <NavigationMenuTrigger
        hideChevron
        className="group size-11 rounded-full p-2"
      >
        <MenuIcon className="size-6 p-1 group-data-[state=open]:hidden" />
        <XIcon className="size-6 p-1 group-data-[state=closed]:hidden" />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuSub>
          {children}

          <NavigationMenuViewport />
        </NavigationMenuSub>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
