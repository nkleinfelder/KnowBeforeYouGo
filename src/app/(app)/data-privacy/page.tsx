import { getConfiguredPayload } from "@/src/lib/payload";
import { RichText } from "@/src/components/rich-text";

const payload = await getConfiguredPayload();

export default async function Page() {
  const data = await payload.findGlobal({
    slug: "legal-pages",
  });

  return (
    <main className="content-grid pb-12 pt-28">
      <RichText data={data.dataPrivacy} />
    </main>
  );
}
