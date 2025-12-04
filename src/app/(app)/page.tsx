import * as Components from "./_components";

export default function Home() {
  return (
    <main className="content-grid">
      <Components.Hero />
      <Components.Sponsors />
      <Components.Destinations />
    </main>
  );
}
