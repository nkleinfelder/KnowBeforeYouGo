import { LucideIcon } from "lucide-react";
import * as Primitives from "./primitives";
import { PropsWithChildren } from "react";
import { Nullable } from "@/src/lib/type-utils";

export function DetailInfo({
  title,
  description,
  Icon,
  id,
  children,
  className,
}: PropsWithChildren<{
  title: string;
  description?: Nullable<string>;
  Icon: LucideIcon;
  id: string;
  className?: string;
}>) {
  return (
    <Primitives.Section id={id}>
      <Primitives.Header>
        <Icon className="size-5 text-primary md:size-6" />
        <Primitives.Title>{title}</Primitives.Title>
        {description && (
          <Primitives.Description>{description}</Primitives.Description>
        )}
      </Primitives.Header>
      <Primitives.Grid className={className}>{children}</Primitives.Grid>
    </Primitives.Section>
  );
}
