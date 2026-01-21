import { Country } from "@/payload-types";
import { LucideIcon } from "lucide-react";

export type CountrySectionProps<T extends keyof Country> = {
  title: string;
  id: string;
  countryName: string;
  Icon: LucideIcon;
  data: Country[T];
};
