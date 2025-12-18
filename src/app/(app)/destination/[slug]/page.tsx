import { MOCK_DESTINATIONS } from "@/src/lib/mock-data/destinations";
import { notFound } from "next/navigation";
import * as Sections from "./_components";
import {
  CreditCardIcon,
  GlobeIcon,
  HouseIcon,
  InfoIcon,
  MessagesSquareIcon,
  NavigationIcon,
  ShieldIcon,
} from "lucide-react";
import { ScrollAnchorLinks } from "./_components/scroll-anchor-links";

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

  const sections = [
    {
      title: "Culture & Social",
      Icon: GlobeIcon,
      content: data.details.culture,
      id: "culture-and-social",
    },
    {
      title: "Language",
      Icon: MessagesSquareIcon,
      content: data.details.language,
      id: "language",
    },
    {
      title: "Transportation",
      Icon: NavigationIcon,
      content: data.details.transportation,
      id: "transportation",
    },
    {
      title: "Money",
      Icon: CreditCardIcon,
      content: data.details.money,
      id: "money",
    },
    {
      title: "Safety",
      Icon: ShieldIcon,
      content: data.details.safety,
      id: "safety",
    },
    {
      title: "Daily Life",
      Icon: HouseIcon,
      content: data.details.daily,
      id: "daily-life",
    },
  ];

  return (
    <main className="content-grid gap-y-12 pb-12">
      <Sections.Header
        image={data.image}
        name={data.name}
        slogan={data.slogan}
        tags={data.tags}
      />
      <ScrollAnchorLinks
        sections={[
          {
            Icon: InfoIcon,
            id: "essential-info",
          },
          ...sections,
        ]}
      />
      <Sections.EssentialInfo data={data.essentialInfo} />
      {sections.map((section) => (
        <Sections.DetailInfo key={section.id} {...section} />
      ))}
      <Sections.ShareExperience countryId={data.slug} countryName={data.name} />
    </main>
  );
}
