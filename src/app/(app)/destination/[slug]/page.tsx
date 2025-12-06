import * as DataElements from "@/src/components/data-elements";

export default function Page() {
  return (
    <main className="content-grid">
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
