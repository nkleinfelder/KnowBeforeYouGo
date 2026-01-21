import { ComponentPropsWithoutRef } from "react";
import { InfoCard, InfoCardProps } from "./container";
import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangleIcon } from "lucide-react";
import { Nullable } from "@/src/lib/type-utils";
import { Country } from "@/payload-types";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";

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

type TipsFromLocals = NonNullable<
  Country["culturalAndSocialNorms"]
>["culturalTips"];
export function TipsFromLocals({
  items,
  className,
  countryName,
}: {
  items: TipsFromLocals;
  countryName: string;
  className?: string;
}) {
  if (!items) return null;

  return (
    <InfoCard
      title="Local Guidance"
      description={`These tips come from locals, or previous students that have visited ${countryName}.`}
      className={cn(className, "@container")}
    >
      <ListContent className="@2xl:grid @2xl:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <ListItem key={index} className="flex-col">
            <h4 className="font-semibold text-balance">{item.tip.title}</h4>
            <p className="text-sm font-normal text-muted-foreground text-pretty">
              {item.tip.description}
            </p>
            {item.tip.link &&
              item.tip.link.map((link, index) => (
                <Link
                  key={link.id ?? index}
                  href={link.url}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "mt-3 w-full",
                  )}
                >
                  {link.title}
                </Link>
              ))}
          </ListItem>
        ))}
      </ListContent>
    </InfoCard>
  );
}
