import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { PropsWithChildren } from "react";

const containerVariants = cva("grid", {
  variants: {
    variant: {
      default: "",
      image_right: "md:col-span-2 md:grid-cols-[2fr_1fr]",
      image_bottom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type InfoCardProps = PropsWithChildren<{
  className?: string;
  title: string;
  description?: string;
  image?: string;
}> &
  VariantProps<typeof containerVariants>;
export function InfoCard({
  children,
  title,
  description,
  className,
  image,
  variant,
}: InfoCardProps) {
  const showImage =
    image &&
    (["image_right", "image_bottom"] as InfoCardProps["variant"][]).includes(
      variant ?? "default",
    );

  return (
    <Card className={cn(containerVariants({ variant }), className)}>
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
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
