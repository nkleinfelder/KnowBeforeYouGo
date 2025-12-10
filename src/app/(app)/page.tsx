import * as Components from "./_components";

async function getRecommendation() {
  const res = await fetch("http://localhost:3000/api/recommendation");
  return res.json();
}

export default async function Home() {
  const recommendation = await getRecommendation();
  return (
    <main className="content-grid">
      <Components.HomeContent />
    </main>
  );
}
