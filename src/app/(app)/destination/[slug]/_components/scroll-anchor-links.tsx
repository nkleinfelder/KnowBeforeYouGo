import { BlankScrollButton } from "@/src/components/scroll-button";
import { cn } from "@/src/lib/utils";
import { LucideIcon } from "lucide-react";

export function ScrollAnchorLinks({
  sections,
}: {
  sections: {
    Icon: LucideIcon;
    id: string;
  }[];
}) {
  return (
    <aside className="sticky top-6 col-start-4 col-end-5 row-start-2 row-end-3 h-12 justify-self-end">
      <ol className="flex h-[min(calc(100dvh-2*var(--spacing)*6),35rem)] w-2 flex-col items-center justify-between bg-stone-200 shadow-lg">
        {sections.map((section) => (
          <li key={section.id}>
            <AnchorLink Icon={section.Icon} id={section.id} />
          </li>
        ))}
      </ol>
    </aside>
  );
}

function AnchorLink({ Icon, id }: { Icon: LucideIcon; id: string }) {
  return (
    <BlankScrollButton
      scrollToId={id}
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-full bg-stone-50 p-3 text-stone-700 shadow-sm transition-all duration-200 ease-out",
        "focus-within:scale-115 hover:scale-115",
        "focus-within:bg-violet-200 hover:bg-violet-200",
      )}
    >
      <Icon className="size-5" />
    </BlankScrollButton>
  );
}
