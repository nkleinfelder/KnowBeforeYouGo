import { PropsWithChildren } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { InfoIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Tooltip({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "py-2.5 px-2.5 -translate-y-2.5 translate-x-2.5",
          className,
        )}
      >
        <InfoIcon className="size-4 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent
        className={
          "border border-border bg-card px-3 py-2 text-sm shadow-lg text-card-foreground"
        }
        align="end"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
