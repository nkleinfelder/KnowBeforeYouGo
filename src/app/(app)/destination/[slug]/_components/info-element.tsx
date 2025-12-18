import { Info, ListInfo } from "@/src/lib/mock-data/destinations";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function InfoElement({ data }: { data: Info }) {
  const warningCard = data.block === "list" && data.type === "emergency";

  return (
    <Card variant={warningCard ? "warning" : "default"}>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        {data.description && (
          <CardDescription>{data.description}</CardDescription>
        )}
      </CardHeader>
      <Content data={data} />
    </Card>
  );
}

function Content({ data }: { data: Info }) {
  if (data.block === "text") {
    return <TextContent text={data.text} />;
  }
  if (data.block === "checkstate") {
    return <CheckstateContent state={data.state} />;
  }
  if (data.block === "rating") {
    return <RatingContent min={data.min} max={data.max} rating={data.rating} />;
  }
  if (data.block === "list") {
    return <ListContent items={data.items} type={data.type} />;
  }
  return null;
}

function CheckstateContent({
  state,
}: {
  state: "true" | "false" | "indeterminate";
}) {
  return <p>{state}</p>;
}

function ListContent({
  items,
  type,
}: {
  items: ListInfo["items"];
  type?: ListInfo["type"];
}) {
  const defaultList = !type || type === "default";
  return (
    <ul
      className={cn(
        "flex list-inside flex-col gap-1",
        defaultList && "list-disc",
      )}
    >
      {items.map((item) => (
        <li
          key={item.text}
          className={cn(
            !defaultList && type === "alert" && "flex items-baseline gap-1",
            type === "emergency" &&
              "flex justify-between rounded-lg border border-destructive/20 bg-card px-3 py-2 text-lg font-semibold",
          )}
        >
          {/* translate makes the icon optically centered with first line of text */}
          {type === "alert" && (
            <AlertTriangle className="size-4 shrink-0 translate-y-0.5 text-red-500" />
          )}
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function RatingContent({
  min,
  max,
  rating,
}: {
  min?: number;
  max?: number;
  rating: number;
}) {
  return <p>{rating}</p>;
}

function TextContent({ text }: { text: string }) {
  return <p>{text}</p>;
}
