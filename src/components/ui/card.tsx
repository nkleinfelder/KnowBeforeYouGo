import * as React from "react";

import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  "flex flex-col rounded-xl border border-border",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary:
          "border-primary/35 bg-gradient-to-br from-primary/10 to-primary/5 shadow-primary/10",
        warning: "bg-destructive/10 border-destructive/20",
      },
      size: {
        default: "p-5 gap-5 shadow-xs text-sm",
        sm: "p-4 gap-4 shadow-xs text-sm",
        md: "md:p-6 md:gap-6 shadow-sm p-5 gap-5",
        lg: "p-8 gap-8 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

function Card({ className, variant, size, ...props }: CardProps) {
  return (
    <article
      data-slot="card"
      className={cn(cardVariants({ variant, size }), "group", className)}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <header
      data-slot="card-header"
      className={cn(
        "@container/card-header grid grid-cols-1 items-center gap-x-1.5 gap-y-0.5",
        "group-data-[variant=primary]:[&>svg]:text-primary",
        "group-data-[size=lg]:gap-x-2 group-data-[size=lg]:gap-y-1 group-data-[size=default]:[&>svg]:size-4.5 group-data-[size=lg]:[&>svg]:size-5 group-data-[size=sm]:[&>svg]:size-4",
        "has-[svg]:grid-cols-[auto_1fr] has-[svg]:[&>div[data-slot='card-description']]:col-span-2",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  as = "h3",
  ...props
}: React.ComponentProps<"div"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  const Comp = as;
  return (
    <Comp
      data-slot="card-title"
      className={cn(
        "text-lg leading-none font-semibold",
        "group-data-[variant=warning]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <footer
      data-slot="card-footer"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
