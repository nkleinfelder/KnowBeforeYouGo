import { CountryCard, CountryCardProps } from "@/src/components/country-card";
import { getCountryImage } from "@/src/lib/utils";
import { EuroIcon } from "lucide-react";
import { getConfiguredPayload } from "@/src/lib/payload";

const payload = await getConfiguredPayload();

export async function Destinations() {
  const data = await payload.find({
    collection: "countries",
    select: {
      name: true,
      slug: true,
      images: true,
      culturalAndSocialNorms: {
        avgCostOfLiving: true,
      },
    },
    sort: "name",
    limit: 100,
  });

  return (
    <section
      className="grid-cols-destinations breakout grid w-full scroll-mt-20 auto-rows-fr gap-2 p-inline py-6"
      id="destinations-grid"
    >
      {data.docs.map((country) => {
        const tags: CountryCardProps["tags"] = [];
        if (country.culturalAndSocialNorms?.avgCostOfLiving) {
          tags.push({
            icon: EuroIcon,
            name: country.culturalAndSocialNorms.avgCostOfLiving.toFixed(0),
          });
        }
        return (
          <CountryCard
            key={country.name}
            name={country.name}
            slug={country.slug ?? "error"}
            image={getCountryImage(country.images)}
            tags={tags}
          />
        );
      })}
    </section>
  );
}
