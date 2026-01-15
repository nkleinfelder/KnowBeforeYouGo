import { useLocalStorage } from "usehooks-ts";

export type LocalStorageOriginCountry = {
  slug: string;
  name: string;
};
export function useOriginCountry() {
  const [originCountry, setOriginCountry] =
    useLocalStorage<LocalStorageOriginCountry | null>("originCountry", null);

  return [originCountry, setOriginCountry] as const;
}
