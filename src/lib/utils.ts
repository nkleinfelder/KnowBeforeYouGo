import { Country } from "@/payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCountryImage(images: Country["images"]) {
  const firstImage = images?.[0];
  if (!firstImage) return null;

  if (typeof firstImage.image === "string") return firstImage.image;
  return firstImage.image?.url ?? "error";
}
