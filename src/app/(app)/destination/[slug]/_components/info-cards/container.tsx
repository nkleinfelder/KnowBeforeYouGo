import { Tooltip } from "@/src/components/data-elements/tooltip";
import {
  Card,
  CardDescription,
  CardHeader,
  CardProps,
  CardTitle,
} from "@/src/components/ui/card";
import { Nullable } from "@/src/lib/type-utils";
import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { PropsWithChildren, ReactNode } from "react";

const containerVariants = cva("grid grid-rows-subgrid row-span-2", {
  variants: {
    variant: {
      default: "",
      image_right: "md:col-span-2 md:grid-cols-[2fr_1fr]",
      image_bottom: "",
    },
    color: {
      default: "",
      warning: "bg-warning-100 text-warning-800",
    },
    size: {
      default: "",
      large: "md:col-span-2",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});

export type InfoCardProps = PropsWithChildren<{
  className?: string;
  descriptionClassName?: string;
  title: string | ReactNode;
  description?: Nullable<string | ReactNode>;
  image?: string;
  cardVariant?: CardProps["variant"];
  tooltip?: Nullable<ReactNode>;
}> &
  VariantProps<typeof containerVariants> &
  Pick<CardProps, "as">;
export function InfoCard({
  children,
  title,
  description,
  className,
  descriptionClassName,
  cardVariant,
  size,
  image,
  variant,
  tooltip,
  as,
  color,
  ...props
}: InfoCardProps) {
  const showImage =
    image &&
    (["image_right", "image_bottom"] as InfoCardProps["variant"][]).includes(
      variant ?? "default",
    );

  return (
    <Card
      className={cn(containerVariants({ variant, size, color }), className)}
      variant={cardVariant}
      as={as}
      {...props}
    >
      <CardHeader className={cn("col-span-full items-start")}>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription className={descriptionClassName}>
            {description}
          </CardDescription>
        )}
        {tooltip && (
          <Tooltip
            className={cn(
              "col-start-3 col-end-4 row-start-1 justify-self-end self-start",
              description && "row-end-3",
            )}
          >
            {tooltip}
          </Tooltip>
        )}
      </CardHeader>
      {children}
      {showImage && (
        <Image
          src="/images/home-hero-background.jpg"
          alt=""
          width={250}
          height={250}
          className={cn(
            "w-full rounded-md object-cover",
            variant === "image_right" &&
              "md:col-start-2 md:row-start-1 md:row-end-3 md:h-full",
            variant === "image_bottom" && "aspect-video",
          )}
        />
      )}
    </Card>
  );
}
