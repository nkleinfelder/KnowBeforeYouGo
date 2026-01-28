import {
  EuroIcon,
  FileTextIcon,
  FlagIcon,
  LinkIcon,
  LucideIcon,
  ShieldIcon,
} from "lucide-react";
import { PropsWithChildren } from "react";
import * as Primitives from "./primitives";
import { InfoCard } from "./info-cards/container";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";

type EssentialInfoProps = {
  id: string;
  title: string;
  visaRequired: string;
  insurance: string;
  rentAverage: string;
  englishLevel: string;
};
export function EssentialInfo({
  id,
  title,
  visaRequired,
  insurance,
  rentAverage,
  englishLevel,
}: EssentialInfoProps) {
  return (
    <Primitives.Section id={id}>
      <Primitives.Title>{title}</Primitives.Title>
      <Primitives.Grid>
        <EssentialCard title="Visa Required" Icon={FileTextIcon}>
          <Link
            href={visaRequired}
            target="_blank"
            className={buttonVariants()}
          >
            <LinkIcon className="size-4" />
            <span>View on Project Visa</span>
          </Link>
        </EssentialCard>
        <EssentialCard title="Insurance" Icon={ShieldIcon}>
          <p>{insurance}</p>
        </EssentialCard>
        <EssentialCard title="Cost of Living" Icon={EuroIcon}>
          <p className="text-xl font-bold text-primary">{rentAverage}€</p>
        </EssentialCard>
        <EssentialCard title="English Level" Icon={FlagIcon}>
          <p>{englishLevel}</p>
        </EssentialCard>
      </Primitives.Grid>
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
    <InfoCard
      className={className}
      cardVariant="primary"
      title={
        <>
          <Icon />
          <span> {title}</span>
        </>
      }
    >
      {children}
    </InfoCard>
  );
}
