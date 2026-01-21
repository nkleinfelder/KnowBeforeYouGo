import { Hero } from "./_components/hero";
import { Sponsors } from "./_components/sponsors";
import { Destinations } from "./_components/destinations";

export default async function Home() {
  return (
    <main className="content-grid">
      <Hero />
      <Sponsors />
      <Destinations />
    </main>
  );
}
