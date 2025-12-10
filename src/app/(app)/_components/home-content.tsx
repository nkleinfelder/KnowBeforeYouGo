"use client";

import { useState } from "react";
import { Hero } from "./hero";
import { Sponsors } from "./sponsors";
import { Destinations } from "./destinations";
import { MatchFinder } from "./match-finder";

export function HomeContent() {
  const [showMatchFinder, setShowMatchFinder] = useState(false);

  if (showMatchFinder) {
    return <MatchFinder onBack={() => setShowMatchFinder(false)} />;
  }

  return (
    <>
      <Hero onFindMatch={() => setShowMatchFinder(true)} />
      <Sponsors />
      <Destinations />
    </>
  );
}
