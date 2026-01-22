"use client";

import { api } from "@/src/server/react";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <main className="pt-32 content-grid gap-y-12">
      <section className="grid grid-cols-3 gap-x-8"></section>
      <section className="grid grid-cols-3 gap-x-8 auto-rows-auto"></section>
    </main>
  );
}

function CountryColumn({ slug }: { slug: string }) {
  const { data, isLoading, isError } =
    api.country.getCountryBySlug.useQuery(slug);

  if (isLoading) return <Loader2Icon className="animate-spin size-4" />;

  if (isError) return <p>Error</p>;

  if (!data) return <p>No data</p>;

  return (
    <article className="grid gap-y-8 grid-rows-subgrid">
      <header className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold">{data.name}</h2>
      </header>

      {/* culture */}
      <section></section>

      {/* langauge */}
      <section></section>

      {/* transport */}
      <section></section>

      {/* money */}
      <section></section>

      {/* safety */}
      <section></section>

      {/* health */}
      <section></section>
    </article>
  );
}
