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
import * as InfoSection from "./_components/sections";
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

  console.log(country);

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
        visaRequired={country.safetyAndLegal?.visaRequired ?? "Unknown"}
        insurance={
          country.health?.healthInsurance?.isRequired
            ? "Required"
            : "Not required"
        }
        rentAverage={
          country.culturalAndSocialNorms?.avgCostOfLiving?.toFixed(0) ??
          "unknown"
        }
        englishLevel={
          country.languageAndCommunication?.englishLevels &&
          typeof country.languageAndCommunication?.englishLevels === "object"
            ? country.languageAndCommunication.englishLevels.name
            : "unknown"
        }
      />

      <InfoSection.Cultural
        id={SECTIONS.CULTURE.id}
        title={SECTIONS.CULTURE.title}
        Icon={SECTIONS.CULTURE.Icon}
        data={country.culturalAndSocialNorms}
      />
      <InfoSection.Language
        id={SECTIONS.LANGUAGE.id}
        title={SECTIONS.LANGUAGE.title}
        Icon={SECTIONS.LANGUAGE.Icon}
        data={country.languageAndCommunication}
      />
      <InfoSection.Transport
        id={SECTIONS.TRANSPORT.id}
        title={SECTIONS.TRANSPORT.title}
        Icon={SECTIONS.TRANSPORT.Icon}
        data={country.navTransport}
      />
      <InfoSection.Money
        id={SECTIONS.MONEY.id}
        title={SECTIONS.MONEY.title}
        Icon={SECTIONS.MONEY.Icon}
        data={country.moneyAndPayments}
      />
      <InfoSection.Safety
        id={SECTIONS.SAFETY.id}
        title={SECTIONS.SAFETY.title}
        Icon={SECTIONS.SAFETY.Icon}
        data={country.safetyAndLegal}
      />
      <InfoSection.Daily
        id={SECTIONS.DAILY.id}
        title={SECTIONS.DAILY.title}
        Icon={SECTIONS.DAILY.Icon}
        data={country.dailyLifeAndLifestyle}
      />

      <Sections.ShareExperience
        countryId={country.slug ?? ""}
        countryName={country.name}
      />
    </main>
  );
}
