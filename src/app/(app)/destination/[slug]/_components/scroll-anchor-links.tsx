import { BlankScrollButton } from "@/src/components/scroll-button";
import { cn } from "@/src/lib/utils";
import { LucideIcon } from "lucide-react";
import * as Navigation from "@radix-ui/react-navigation-menu";
import { ScrollAnchorLinksLine } from "./scroll-anchor-links-line";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/src/components/ui/tooltip";

export function ScrollAnchorLinks({
  sections,
}: {
  sections: {
    Icon: LucideIcon;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Navigation.Root asChild orientation="vertical">
      <aside className="sticky top-20 col-start-4 col-end-5 row-start-2 row-end-3 h-12 justify-self-end z-10">
        <Navigation.List className="relative z-0 flex h-[min(calc(100dvh-2*var(--spacing)*6-var(--spacing)*20),35rem)] flex-col items-center justify-between">
          {sections.map((section) => (
            <Navigation.Item key={section.id}>
              <AnchorLink
                Icon={section.Icon}
                id={section.id}
                title={section.title}
              />
            </Navigation.Item>
          ))}
          <ScrollAnchorLinksLine
            sectionIds={sections.map((s) => s.id)}
            className={cn(
              "absolute inset-x-auto -z-10 h-full w-2 bg-stone-200 shadow-lg",
              "after:absolute after:inset-x-0 after:z-10 after:h-full after:w-full after:origin-top after:scale-y-(--scroll-scale) after:rounded-full after:bg-primary after:content-['']",
              "after:transition-transform after:duration-100 after:ease-out",
            )}
          />
        </Navigation.List>
      </aside>
    </Navigation.Root>
  );
}

function AnchorLink({
  Icon,
  id,
  title,
}: {
  Icon: LucideIcon;
  id: string;
  title: string;
}) {
  return (
    <Tooltip>
      <Navigation.Link asChild>
        <TooltipTrigger asChild>
          <BlankScrollButton
            scrollToId={id}
            className={cn(
              "flex cursor-pointer p-3 items-center justify-center rounded-full bg-popover text-stone-700 shadow-sm transition-all duration-200 ease-out",
              "hover:scale-115 focus-visible:scale-115",
              "hover:bg-violet-200 focus-visible:bg-violet-200",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
            )}
          >
            <Icon className="size-5" />
          </BlankScrollButton>
        </TooltipTrigger>
      </Navigation.Link>
      <TooltipContent side="left">{title}</TooltipContent>
    </Tooltip>
  );
}
