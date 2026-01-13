import { useLocalStorage } from "usehooks-ts";

export function useOriginCountry() {
  const [originCountry, setOriginCountry] = useLocalStorage<{
    slug: string;
    name: string;
  } | null>("originCountry", null);

  return [originCountry, setOriginCountry] as const;
}
