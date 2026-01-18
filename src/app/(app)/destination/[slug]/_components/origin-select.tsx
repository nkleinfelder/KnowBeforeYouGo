"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/components/ui/select";
import { api } from "@/src/server/react";
import { useOriginCountry } from "@/src/hooks/use-origin-country";

export default function OriginSelect() {
  const [originCountry, setOriginCountry] = useOriginCountry();
  const { data: countries, isLoading } = api.country.getCountrySlugs.useQuery();

  if (isLoading) return null;

  return (
    <Select
      value={originCountry?.slug ?? undefined}
      onValueChange={(value: string | undefined) =>
        setOriginCountry(
          value
            ? {
                slug: value,
                name: countries?.find((c) => c.slug === value)?.name ?? value,
              }
            : null,
        )
      }
    >
      <SelectTrigger>
        {originCountry?.name ?? "Select origin country"}
      </SelectTrigger>
      <SelectContent>
        {countries?.map((country) => (
          <SelectItem key={country.slug} value={country.slug}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
