import { InfoCard, InfoCardProps } from "./container";
import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { PhoneIcon } from "lucide-react";

// --- Types ---

type BaseListProps = Omit<InfoCardProps, "variant"> & {
  className?: string;
  title: string;
  description?: string;
  cardVariant?: InfoCardProps["variant"];
  variant: VariantProps<typeof listContainerVariants>["variant"];
};

type SimpleListProps = BaseListProps & {
  variant: "simple";
  items: string[];
};

type EmergencyListProps = BaseListProps & {
  variant: "emergency";
  items: { label: string; number: string }[];
};

type AppsListProps = BaseListProps & {
  variant: "apps";
  items: { name: string; icon: string }[];
};

type AdvancedListProps = SimpleListProps | EmergencyListProps | AppsListProps;

// --- Styles ---

const listContainerVariants = cva("w-full", {
  variants: {
    variant: {
      simple: "flex flex-col gap-1 list-inside list-disc pl-2",
      emergency: "flex flex-col gap-2",
      apps: "flex flex-row flex-wrap gap-3",
    },
  },
});

const listItemVariants = cva("text-sm", {
  variants: {
    variant: {
      simple: "text-card-foreground",
      emergency:
        "flex items-center justify-between rounded-md bg-white p-3 shadow-sm border border-red-100",
      apps: "relative flex flex-col items-center gap-2 group",
    },
  },
});

// --- Component ---

export function AdvancedList(props: AdvancedListProps) {
  const { variant, title, description, cardVariant, className, ...rest } =
    props;

  return (
    <InfoCard
      title={title}
      description={description}
      variant={cardVariant}
      color={variant === "emergency" ? "warning" : "default"}
      className={className}
      {...rest}
    >
      <ul className={cn(listContainerVariants({ variant }))}>
        {variant === "simple" &&
          props.items.map((item, i) => (
            <li key={i} className={cn(listItemVariants({ variant }))}>
              {item}
            </li>
          ))}

        {variant === "emergency" &&
          props.items.map((item, i) => (
            <li key={i} className={cn(listItemVariants({ variant }))}>
              <span className="font-medium text-stone-700">{item.label}</span>
              <div className="flex items-center gap-2 font-bold text-destructive">
                <PhoneIcon className="size-4" />
                <span>{item.number}</span>
              </div>
            </li>
          ))}

        {variant === "apps" &&
          props.items.map((item, i) => (
            <li key={i} className={cn(listItemVariants({ variant }))}>
              <div className="relative size-12 overflow-hidden rounded-xl border border-stone-100 shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] font-medium text-stone-500">
                {item.name}
              </span>
            </li>
          ))}
      </ul>
    </InfoCard>
  );
}
