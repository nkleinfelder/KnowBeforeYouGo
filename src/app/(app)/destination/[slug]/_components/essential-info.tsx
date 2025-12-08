import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
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
import * as Primitives from "./primitives";

export function EssentialInfo({
  data,
}: {
  data: Destination["essentialInfo"];
}) {
  return (
    <Primitives.Section>
      <Primitives.Title>Essential Information</Primitives.Title>
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
    </Primitives.Section>
  );
}

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
    <Card className={cn("text-sm", className)} variant="primary" size="default">
      <CardHeader>
        <Icon />
        <CardTitle as="h3">{title}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
}
