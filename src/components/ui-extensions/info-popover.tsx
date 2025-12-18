import { PropsWithChildren } from "react";
import { cn } from "@/src/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { InfoIcon } from "lucide-react";

export function InfoPopover({
  children,
  className,
  contentClassName,
}: PropsWithChildren<{ className?: string; contentClassName?: string }>) {
  return (
    <Popover>
      <PopoverTrigger className={cn("p-1", className)}>
        <InfoIcon className="size-4 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent
        className={cn("px-3 py-2 text-sm", contentClassName)}
        align="end"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
