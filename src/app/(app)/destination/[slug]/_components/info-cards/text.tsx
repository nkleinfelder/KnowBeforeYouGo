import { PropsWithChildren } from "react";
import { InfoCard, InfoCardProps } from "./container";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const textVariants = cva("text-card-foreground", {
  variants: {
    variant: {
      default: "",
      primary: "text-primary",
    },
    size: {
      default: "",
      large: "text-3xl font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export function Text({
  children,
  className,
  variant,
  size,
  cardVariant,
  ...props
}: PropsWithChildren<{
  cardVariant?: InfoCardProps["variant"];
}> &
  Omit<InfoCardProps, "variant"> &
  VariantProps<typeof textVariants>) {
  return (
    <InfoCard variant={cardVariant} {...props}>
      <p className={cn(textVariants({ variant, size }), className)}>
        {children}
      </p>
    </InfoCard>
  );
}
