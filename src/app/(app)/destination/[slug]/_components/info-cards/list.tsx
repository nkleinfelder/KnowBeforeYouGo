import { ComponentPropsWithoutRef } from "react";
import { InfoCard, InfoCardProps } from "./container";
import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangleIcon } from "lucide-react";
import { Nullable } from "@/src/lib/type-utils";

export function List({
  items,
  cardVariant,
  variant,
  ...props
}: {
  items: string[];
  cardVariant?: InfoCardProps["variant"];
} & VariantProps<typeof listVariants> &
  Pick<InfoCardProps, "title" | "description" | "image">) {
  return (
    <InfoCard variant={cardVariant} {...props}>
      <ListContent variant={variant}>
        {items.map((item, index) => (
          <ListItem variant={variant} key={index}>
            {item}
          </ListItem>
        ))}
      </ListContent>
    </InfoCard>
  );
}

const listVariants = cva("flex flex-col gap-1  list-inside", {
  variants: {
    variant: {
      default: "list-disc",
      alert: "border-destructive/20 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function ListContent({
  children,
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<"ul"> & VariantProps<typeof listVariants>) {
  return (
    <ul className={cn(listVariants({ variant }), className)} {...props}>
      {children}
    </ul>
  );
}

const listItemVariants = cva(
  "flex items-baseline justify-start rounded-lg border border-border bg-card px-3 py-2 font-semibold",
  {
    variants: {
      variant: {
        default: "",
        alert: "border-destructive/20 flex items-baseline gap-x-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function ListItem({
  children,
  className,
  variant,
  ...props
}: ComponentPropsWithoutRef<"li"> & VariantProps<typeof listItemVariants>) {
  return (
    <li className={cn(listItemVariants({ variant }), className)} {...props}>
      {/* translate makes the icon optically centered with first line of text */}
      {variant === "alert" && (
        <AlertTriangleIcon className="size-4 shrink-0 translate-y-0.5 text-red-500" />
      )}
      {children}
    </li>
  );
}

export function ListItemWithTitle({
  title,
  description,
  className,
  ...props
}: ComponentPropsWithoutRef<"li"> & {
  title: string;
  description?: Nullable<string>;
}) {
  return (
    <ListItem className={cn("flex-col", className)} {...props}>
      <h4 className="font-semibold">{title}</h4>
      {description && (
        <p className="text-xs font-medium break-all text-muted-foreground">
          {description}
        </p>
      )}
    </ListItem>
  );
}
