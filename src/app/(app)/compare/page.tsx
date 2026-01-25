"use client";

import { useState } from "react";
import { api } from "@/src/server/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Loader2Icon, XIcon, CheckIcon, GhostIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { App, Country } from "@/payload-types";
import { COUNTRY_FALLBACK_IMAGE } from "@/src/lib/constants";
import { Nullable } from "@/src/lib/type-utils";
import Link from "next/link";

export default function ComparePage() {
  const [slugs, setSlugs] = useState<(string | null)[]>([null, null, null]);
  const { data: countryList } = api.country.getCountrySlugs.useQuery();

  const updateSlot = (index: number, slug: string | null) => {
    const newSlugs = [...slugs];
    newSlugs[index] = slug;
    setSlugs(newSlugs);
  };

  return (
    <main className="content-grid md:gap-y-8 gap-y-4 pb-8 md:pt-40 pt-26">
      <div className="flex flex-col items-center md:gap-4 gap-1 text-center mb-8">
        <h1 className="md:text-5xl text-3xl font-bold text-foreground ">
          Compare Countries
        </h1>
        <p className="max-w-lg md:text-lg text-muted-foreground ">
          Select countries to view their details side-by-side.
        </p>
      </div>

      {/* Selectors */}
      <section className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-3 w-full">
        {slugs.map((slug, i) => (
          <div key={i} className="flex gap-2">
            <Select
              value={slug ?? ""}
              onValueChange={(val) => updateSlot(i, val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Country ${i + 1}`} />
              </SelectTrigger>
              <SelectContent>
                {countryList?.map((c) => (
                  <SelectItem
                    key={c.slug}
                    value={c.slug}
                    disabled={slugs.includes(c.slug) && slug !== c.slug}
                  >
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {slug && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateSlot(i, null)}
                className="shrink-0"
              >
                <XIcon className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </section>

      {/* Comparison Grid */}
      {/* Defined rows: Header, Essential, Culture, Language, Transport, Money, Safety, Health, Daily */}
      <section
        className="auto-rows-auto grid md:gap-8 gap-6 md:grid-cols-3 grid-cols-[repeat(3,14rem)] w-full min-h-[60svh] overflow-x-auto"
        style={{
          gridTemplateRows: "auto auto auto auto auto auto auto auto auto",
        }}
      >
        {slugs.map((slug, i) =>
          slug ? (
            <CountryColumn key={slug} slug={slug} />
          ) : (
            <div
              key={i}
              className="row-span-9 rounded-xl border border-dashed border-stone-200 bg-stone-50/50 flex items-center pt-12 flex-col gap-4"
            >
              <GhostIcon
                className="size-12 text-muted-foreground"
                strokeWidth={1.5}
              />
              <p className="text-balance text-muted-foreground text-sm">
                Select a country to compare
              </p>
            </div>
          ),
        )}
      </section>
    </main>
  );
}

function CountryColumn({ slug }: { slug: string }) {
  const { data, isLoading, isError } =
    api.country.getCountryBySlug.useQuery(slug);

  if (isLoading)
    return (
      <div className="row-span-9 flex items-center justify-center p-12">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    );

  if (isError || !data)
    return (
      <div className="row-span-9 flex items-center justify-center p-12 text-destructive">
        Error loading data
      </div>
    );

  const getImageUrl = (
    img: Nullable<NonNullable<Country["images"]>[number]["image"]>,
  ) => {
    if (!img) return COUNTRY_FALLBACK_IMAGE;
    if (typeof img === "string") return img;
    return img.url;
  };
  const heroImage =
    getImageUrl(data.images?.[0]?.image) ?? COUNTRY_FALLBACK_IMAGE;

  return (
    <article className="grid row-span-9 grid-rows-subgrid gap-y-4">
      {/* 1. Header */}
      <header className="flex flex-col gap-4">
        <Link
          href={`/destination/${slug}`}
          aria-label={`Detail page for ${data.name}`}
          className="hover:opacity-90 focus-visible:opacity-90 transition-opacity duration-200 ease-in-out group"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-stone-100 shadow-sm">
            <Image
              src={heroImage}
              alt={data.name}
              sizes="(max-width: 768px) 100vw, 1280px"
              fill
              className="object-cover group-hover:scale-105 group-focus-within:scale-105 transition-transform duration-200 ease-in-out"
            />
            <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4">
              <h2 className="text-2xl font-bold text-white">{data.name}</h2>
            </div>
          </div>
        </Link>
      </header>

      {/* 2. Essential Info */}
      <Section title="Essential Info">
        <InfoRow label="Visa">
          {data.safetyAndLegal?.visaRequired ? "Check Requirements" : "Unknown"}
        </InfoRow>
        <InfoRow label="Insurance">
          {data.health?.healthInsurance?.isRequired ? "Mandatory" : "Optional"}
        </InfoRow>
        <InfoRow label="Rent Avg.">
          {data.culturalAndSocialNorms?.avgCostOfLiving
            ? `~${data.culturalAndSocialNorms.avgCostOfLiving}€`
            : "N/A"}
        </InfoRow>
        <InfoRow label="English Level">
          {typeof data.languageAndCommunication?.englishLevels === "object"
            ? data.languageAndCommunication.englishLevels?.name
            : "N/A"}
        </InfoRow>
      </Section>

      {/* 3. Cultural & Social */}
      <Section title="Culture & Social">
        <InfoRow label="Vegetarian Share">
          {data.culturalAndSocialNorms?.vegetarianPopulationShare ?? 0}%
        </InfoRow>
        <InfoRow label="Vegan Share">
          {data.culturalAndSocialNorms?.veganPopulationShare ?? 0}%
        </InfoRow>
        <InfoRow label="LGBTQ+">
          {typeof data.culturalAndSocialNorms?.lgbtqFriendliness === "object"
            ? data.culturalAndSocialNorms.lgbtqFriendliness?.name
            : "Unknown"}
        </InfoRow>
        <div className="mt-2 line-clamp-4 text-sm text-stone-600">
          {data.culturalAndSocialNorms?.description}
        </div>
      </Section>

      {/* 4. Language */}
      <Section title="Language">
        <div className="mb-2 flex flex-wrap gap-1">
          {data.languageAndCommunication?.localLanguages?.map((l, i) => (
            <Badge key={i} variant="secondary">
              {l.language}
            </Badge>
          ))}
        </div>
        <InfoRow label="English Score">
          {data.languageAndCommunication?.englishLevelScore ?? "N/A"}
        </InfoRow>
        <AppList
          title="Messengers"
          apps={data.languageAndCommunication?.messengerApps}
        />
      </Section>

      {/* 5. Transport */}
      <Section title="Transportation">
        <div className="space-y-1 text-sm">
          <PermitRow label="IDP" ok={data.navTransport?.driverPermits?.idpOk} />
          <PermitRow
            label="EU License"
            ok={data.navTransport?.driverPermits?.euOk}
          />
          <PermitRow
            label="Inter-American"
            ok={data.navTransport?.driverPermits?.iadpOk}
          />
          <PermitRow
            label="ASEAN"
            ok={data.navTransport?.driverPermits?.aseanOk}
          />
        </div>
        <AppList
          title="Transport Apps"
          apps={data.navTransport?.transportApps}
        />
        <AppList title="Nav Apps" apps={data.navTransport?.navApps} />
      </Section>

      {/* 6. Money */}
      <Section title="Money">
        <div className="space-y-1 text-sm">
          <InfoRow label="Card">
            {data.moneyAndPayments?.paymentMethods?.["Payment by Card (%)"] ??
              0}
            %
          </InfoRow>
          <InfoRow label="Cash">
            {data.moneyAndPayments?.paymentMethods?.["Payment by Cash (%)"] ??
              0}
            %
          </InfoRow>
          <InfoRow label="App">
            {data.moneyAndPayments?.paymentMethods?.["Payment by App (%)"] ?? 0}
            %
          </InfoRow>
        </div>
        <h4 className="text-xs font-semibold uppercase text-stone-500 mt-2">
          Accepted Currencies
        </h4>
        <div className="mb-2 flex flex-wrap gap-1">
          {data.moneyAndPayments?.acceptedCurrencies?.map((c, i) => (
            <Badge key={i} variant="outline">
              {c.currency}
            </Badge>
          ))}
        </div>
        <AppList
          title="Payment Apps"
          apps={data.moneyAndPayments?.paymentApps}
        />
      </Section>

      {/* 7. Safety */}
      <Section title="Safety">
        <ul className="mb-2 grid grid-cols-2 gap-2 text-sm">
          <li className="rounded border border-red-100 bg-red-50 p-2 text-center col-span-2">
            <span className="block text-xs font-medium text-red-400">
              Police
            </span>
            <span className="font-bold text-red-700">
              {data.safetyAndLegal?.emergencyNumbers?.police || "?"}
            </span>
          </li>
          <li className="rounded border border-red-100 bg-red-50 p-2 text-center">
            <span className="block text-xs font-medium text-red-400">
              Ambulance
            </span>
            <span className="font-bold text-red-700">
              {data.safetyAndLegal?.emergencyNumbers?.ambulance || "?"}
            </span>
          </li>
          <li className="rounded border border-red-100 bg-red-50 p-2 text-center">
            <span className="block text-xs font-medium text-red-400">Fire</span>
            <span className="font-bold text-red-700">
              {data.safetyAndLegal?.emergencyNumbers?.fire || "?"}
            </span>
          </li>
        </ul>
        <InfoRow label="Hazards Index">
          {data.safetyAndLegal?.naturalHazardsIndexValue ?? "?"}
          <span className="text-muted-foreground">/10</span>
        </InfoRow>
      </Section>

      {/* 8. Health */}
      <Section title="Health">
        <InfoRow label="Mandatory Insurance">
          {data.health?.healthInsurance?.isRequired ? "Yes" : "No"}
        </InfoRow>
        {data.health?.vaccinations?.requiredVaccinations &&
          data.health.vaccinations.requiredVaccinations.length > 0 && (
            <div className="mt-2">
              <span className="text-xs font-semibold uppercase text-stone-500">
                Required Vaccines
              </span>
              <ul className="list-inside list-disc text-sm">
                {data.health.vaccinations.requiredVaccinations.map((v, i) => (
                  <li key={i} className="truncate">
                    {v.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </Section>

      {/* 9. Daily Life */}
      <Section title="Daily Life">
        <AppList
          title="Finding Flats"
          apps={data.dailyLifeAndLifestyle?.findingFlatResources?.map(
            (r) => r.platform || "",
          )}
        />
        {data.dailyLifeAndLifestyle?.electricalPlugTypes && (
          <div className="mt-2">
            <span className="text-xs font-semibold uppercase text-stone-500">
              Plugs
            </span>
            <div className="mt-1 flex gap-2">
              {data.dailyLifeAndLifestyle.electricalPlugTypes.map((p, i) => {
                const typeCode =
                  typeof p.plugType === "object" ? p.plugType.code : p.plugType;
                return (
                  <Badge key={i} variant="outline">
                    {typeCode}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <h3 className="border-b border-stone-100 pb-2 text-lg font-bold text-primary">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-stone-500">{label}</span>
      <span className="font-semibold text-right text-stone-800 dark:text-stone-200">
        {children}
      </span>
    </div>
  );
}

function PermitRow({ label, ok }: { label: string; ok?: boolean | null }) {
  return (
    <div className="flex items-center gap-2">
      {ok === true ? (
        <CheckIcon className="size-4 text-green-500" />
      ) : (
        <XIcon className="size-4 text-red-400" />
      )}
      <span className={cn(ok ? "text-stone-700" : "text-stone-400")}>
        {label}
      </span>
    </div>
  );
}

function AppList({
  title,
  apps,
}: {
  title: string;
  apps?: (string | App)[] | null;
}) {
  if (!apps || apps.length === 0) return null;
  return (
    <div className="mt-2">
      <span className="mb-1 block text-xs font-semibold uppercase text-stone-500">
        {title}
      </span>
      <div className="flex flex-wrap gap-1">
        {apps.map((app, i) => {
          const name = typeof app === "string" ? app : app.name;
          return (
            <Badge key={i} variant="secondary" className="text-[10px]">
              {name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
