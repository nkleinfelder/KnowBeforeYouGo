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
import { getPayload } from "payload";
import config from "@payload-config";
import * as InfoCard from "./_components/info-cards";
import { getCountryImage } from "@/src/lib/utils";

const payload = await getPayload({ config });

const SECTIONS = {
  ESSENTIAL: {
    id: "essential-infos",
    title: "Essential Info",
    Icon: InfoIcon,
  },
  CULTURE: {
    id: "culture-and-social",
    title: "Culture & Social",
    Icon: GlobeIcon,
  },
  LANGUAGE: {
    id: "language",
    title: "Language",
    Icon: MessagesSquareIcon,
  },
  TRANSPORT: {
    id: "transportation",
    title: "Transportation",
    Icon: NavigationIcon,
  },
  MONEY: {
    id: "money",
    title: "Money",
    Icon: CreditCardIcon,
  },
  SAFETY: {
    id: "safety",
    title: "Safety",
    Icon: ShieldIcon,
  },
  DAILY: {
    id: "daily-life",
    title: "Daily Life",
    Icon: HouseIcon,
  },
} as const;
const ANCHOR_LINKS = Object.values(SECTIONS);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await payload.find({
    collection: "countries",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data || data.totalDocs === 0) {
    notFound();
  }

  const country = data.docs[0];

  return (
    <main className="content-grid gap-y-12 pb-12">
      <Sections.Header
        image={getCountryImage(country.images)}
        name={country.name}
      />
      <ScrollAnchorLinks sections={ANCHOR_LINKS} />
      <Sections.EssentialInfo
        id={SECTIONS.ESSENTIAL.id}
        title={SECTIONS.ESSENTIAL.title}
        visaRequired={country.safetyAndLegal.visaRequired ?? "Unknown"}
        insurance=""
        rentAverage={
          country.culturalAndSocialNorms?.avgCostOfLiving?.toFixed(0) ??
          "unknown"
        }
        englishLevel={
          country.languageAndCommunication?.englishLevel ?? "unknown"
        }
      />

      <Sections.DetailInfo
        id={SECTIONS.CULTURE.id}
        title={SECTIONS.CULTURE.title}
        Icon={SECTIONS.CULTURE.Icon}
      >
        <InfoCard.Text
          title="Vegans"
          description="Population share (in %)"
          size="large"
        >
          {country.culturalAndSocialNorms?.veganPopulationShare?.toFixed(0)}%
        </InfoCard.Text>
        <InfoCard.Text
          title="Vegetarians"
          description="Vegetarian population share (in %)"
          size="large"
        >
          {country.culturalAndSocialNorms?.vegetarianPopulationShare?.toFixed(
            0,
          )}
          %
        </InfoCard.Text>
        <InfoCard.Rating
          title="LGBTQ"
          description={"Friendliness score"}
          min={-23}
          max={13}
          rating={country.culturalAndSocialNorms?.lgbtqFriendliness ?? -10}
        />
        <InfoCard.Text
          title="Cost of Living"
          description="Average in €/month"
          size="large"
          variant="primary"
        >
          {country.culturalAndSocialNorms?.avgCostOfLiving}€
        </InfoCard.Text>
      </Sections.DetailInfo>

      <Sections.DetailInfo
        id={SECTIONS.LANGUAGE.id}
        title={SECTIONS.LANGUAGE.title}
        Icon={SECTIONS.LANGUAGE.Icon}
      />
      <Sections.DetailInfo
        id={SECTIONS.TRANSPORT.id}
        title={SECTIONS.TRANSPORT.title}
        Icon={SECTIONS.TRANSPORT.Icon}
      />
      <Sections.DetailInfo
        id={SECTIONS.MONEY.id}
        title={SECTIONS.MONEY.title}
        Icon={SECTIONS.MONEY.Icon}
      />
      <Sections.DetailInfo
        id={SECTIONS.SAFETY.id}
        title={SECTIONS.SAFETY.title}
        Icon={SECTIONS.SAFETY.Icon}
      />
      <Sections.DetailInfo
        id={SECTIONS.DAILY.id}
        title={SECTIONS.DAILY.title}
        Icon={SECTIONS.DAILY.Icon}
      />
      <Sections.ShareExperience
        countryId={country.slug ?? ""}
        countryName={country.name}
      />
    </main>
  );
}
