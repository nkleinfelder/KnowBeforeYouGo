import { ComponentProps, PropsWithChildren } from "react";
import { InfoCard, InfoCardProps } from "./container";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const textVariants = cva("text-card-foreground flex flex-col text-pretty", {
  variants: {
    variant: {
      default: "",
      primary: "text-primary",
    },
    size: {
      default: "",
      medium: "text-xl font-bold",
      large: "text-3xl font-bold",
    },
    alignment: {
      default: "",
      center: "justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    alignment: "default",
  },
});

export function Text({
  children,
  className,
  variant,
  size,
  alignment,
  cardVariant,
  as,
  ...props
}: PropsWithChildren<{
  cardVariant?: InfoCardProps["variant"];
  cardSize?: InfoCardProps["size"];
  as?: React.ElementType;
}> &
  Omit<InfoCardProps, "variant" | "size"> &
  VariantProps<typeof textVariants> &
  ComponentProps<"div">) {
  const Comp = as ?? ("p" satisfies React.ElementType);

  return (
    <InfoCard variant={cardVariant} {...props}>
      <Comp
        className={cn(textVariants({ variant, size, alignment }), className)}
      >
        {children}
      </Comp>
    </InfoCard>
  );
}
