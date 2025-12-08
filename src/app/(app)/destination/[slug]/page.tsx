import * as DataElements from "@/src/components/data-elements";
import { MOCK_DESTINATIONS } from "@/src/lib/mock-data/destinations";
import { notFound } from "next/navigation";
import * as Sections from "./_components";
import {
  CreditCardIcon,
  GlobeIcon,
  HouseIcon,
  MessagesSquareIcon,
  NavigationIcon,
  ShieldIcon,
} from "lucide-react";

function getData(slug: string) {
  return MOCK_DESTINATIONS.find((d) => d.slug === slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getData(slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="content-grid gap-y-12">
      <Sections.Header
        image={data.image}
        name={data.name}
        slogan={data.slogan}
        tags={data.tags}
      />
      <Sections.EssentialInfo data={data.essentialInfo} />
      <Sections.DetailInfo
        title="Culture & Social"
        Icon={GlobeIcon}
        content={data.details.culture}
      />
      <Sections.DetailInfo
        title="Language"
        Icon={MessagesSquareIcon}
        content={data.details.language}
      />
      <Sections.DetailInfo
        title="Transportation"
        Icon={NavigationIcon}
        content={data.details.transportation}
      />
      <Sections.DetailInfo
        title="Money"
        Icon={CreditCardIcon}
        content={data.details.money}
      />
      <Sections.DetailInfo
        title="Safety"
        Icon={ShieldIcon}
        content={data.details.safety}
      />
      <Sections.DetailInfo
        title="Daily Life"
        Icon={HouseIcon}
        content={data.details.daily}
      />
    </main>
  );
}
