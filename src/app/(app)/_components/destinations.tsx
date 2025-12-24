import { CountryCard } from "@/src/components/country-card";
import { getPayload } from "payload";
import config from "@payload-config";
import { getCountryImage } from "@/src/lib/utils";

const payload = await getPayload({ config });

export async function Destinations() {
  const data = await payload.find({
    collection: "countries",
    select: {
      name: true,
      slug: true,
      images: true,
    },
    limit: 100,
  });
  return (
    <section
      className="grid-cols-destinations breakout grid w-full scroll-mt-20 auto-rows-fr gap-2 p-inline"
      id="destinations-grid"
    >
      {data.docs.map((country) => (
        <CountryCard
          key={country.name}
          name={country.name}
          slug={country.slug ?? "error"}
          image={getCountryImage(country.images)}
          tags={[]}
        />
      ))}
    </section>
  );
}
