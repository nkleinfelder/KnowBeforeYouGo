"use client";
import dynamic from "next/dynamic";

const OriginPickerDialog = dynamic(() => import("./origin-country-picker"), {
  ssr: false,
  loading: () => (
    <p className="px-3 py-1.5 text-sm cursor-pointer hover:bg-stone-800 focus-visible:bg-stone-800 rounded-md">
      Set your home country
    </p>
  ),
});

export function OriginPickerClient() {
  return <OriginPickerDialog />;
}
