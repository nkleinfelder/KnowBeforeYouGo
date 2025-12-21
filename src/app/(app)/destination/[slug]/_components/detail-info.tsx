import { Info } from "@/src/lib/mock-data/destinations";
import { LucideIcon } from "lucide-react";
import * as Primitives from "./primitives";

// Kurz reudig zum rebasen
function InfoElement({ data }: { data: unknown }) {
  return <div></div>;
}

export function DetailInfo({
  title,
  Icon,
  content,
  id,
}: {
  title: string;
  Icon: LucideIcon;
  content: Info[];
  id: string;
}) {
  return (
    <Primitives.Section id={id}>
      <Primitives.Header>
        <Icon className="size-6 text-primary" />
        <Primitives.Title>{title}</Primitives.Title>
      </Primitives.Header>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
        {content.map((info) => (
          <InfoElement key={info.title} data={info} />
        ))}
      </div>
    </Primitives.Section>
  );
}
