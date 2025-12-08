import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cardVariants,
} from "@/src/components/ui/card";
import { Destination } from "@/src/lib/mock-data/destinations";
import { cn } from "@/src/lib/utils";
import {
  CloudIcon,
  EuroIcon,
  FileTextIcon,
  GraduationCapIcon,
  LucideIcon,
  ShieldIcon,
} from "lucide-react";
import { PropsWithChildren } from "react";

const headerIcons: Record<keyof Destination["essentialInfo"], LucideIcon> = {
  visaRequired: FileTextIcon,
  insurance: ShieldIcon,
  rent: EuroIcon,
  climate: CloudIcon,
  university: GraduationCapIcon,
};

export function EssentialInfo({
  data,
}: {
  data: Destination["essentialInfo"];
}) {
  return (
    <section className="flex w-full flex-col gap-5">
      <h2 className="text-3xl font-bold">Essential Information</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
        <EssentialCard title="Visa Required" Icon={FileTextIcon}>
          <Badge size="lg">{data.visaRequired.state}</Badge>
        </EssentialCard>
        <EssentialCard title="Insurance" Icon={ShieldIcon}>
          <p>{data.insurance}</p>
        </EssentialCard>
        <EssentialCard title="Rent" Icon={EuroIcon}>
          <p className="text-xl font-bold text-primary">
            €{data.rent.min}-{data.rent.max}/month
          </p>
        </EssentialCard>
        <EssentialCard title="Climate" Icon={CloudIcon}>
          <p>{data.climate}</p>
        </EssentialCard>
        <EssentialCard
          title="University"
          Icon={GraduationCapIcon}
          className="md:col-span-2"
        >
          <p>{data.university}</p>
        </EssentialCard>
      </div>
    </section>
  );
}

const essentialClasses = cardVariants({
  variant: "primary",
  size: "default",
});
function EssentialCard({
  title,
  Icon,
  children,
  className,
}: PropsWithChildren<{
  title: string;
  Icon: LucideIcon;
  className?: string;
}>) {
  return (
    <article className={cn(essentialClasses, "shadow-primary/10", className)}>
      <header className="flex items-center gap-1.5">
        <Icon className="size-4.5 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </header>
      <main className="text-sm">{children}</main>
    </article>
  );
}
