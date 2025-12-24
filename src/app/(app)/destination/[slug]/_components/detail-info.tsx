import { LucideIcon } from "lucide-react";
import * as Primitives from "./primitives";
import { PropsWithChildren } from "react";

export function DetailInfo({
  title,
  Icon,
  id,
  children,
}: PropsWithChildren<{
  title: string;
  Icon: LucideIcon;
  id: string;
}>) {
  return (
    <Primitives.Section id={id}>
      <Primitives.Header>
        <Icon className="size-6 text-primary" />
        <Primitives.Title>{title}</Primitives.Title>
      </Primitives.Header>
      <Primitives.Grid>{children}</Primitives.Grid>
    </Primitives.Section>
  );
}
