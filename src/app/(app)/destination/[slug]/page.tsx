import * as DataElements from "@/src/components/data-elements";
import { MOCK_DESTINATIONS } from "@/src/lib/mock-data/destinations";
import { notFound } from "next/navigation";
import * as Sections from "./_components";

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
      <div className="grid w-full auto-rows-[6.5rem] grid-cols-4 gap-2">
        <DataElements.KPI.CheckState
          state="true"
          title="Vegan friendly"
          label="friendly"
        />
        <DataElements.KPI.CheckState
          state="indeterminate"
          title="LGBTQ+ Friendly"
          label="Depends"
        />
        <DataElements.KPI.CheckState state="false" title="Partyy" label="Nah" />
      </div>
    </main>
  );
}
