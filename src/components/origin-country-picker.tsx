"use client";
import { useLocalStorage } from "usehooks-ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useOriginCountry } from "../hooks/use-origin-country";
import { api } from "../server/react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { PropsWithChildren } from "react";

export function OriginCountryPicker() {
  const [originCountry] = useOriginCountry();

  return (
    <OriginPickerDialog>
      <DialogTrigger suppressHydrationWarning asChild>
        <Button variant="outline">
          {originCountry
            ? `Adjust home country (${originCountry?.name})`
            : "Set your home country"}
        </Button>
      </DialogTrigger>
    </OriginPickerDialog>
  );
}

export function OriginPickerDialog({
  children,
  onboardingVariant,
}: PropsWithChildren<{
  onboardingVariant?: boolean;
}>) {
  const [dialogSeen, setDialogSeen] = useLocalStorage<boolean>(
    "origin-country-picker-dialog-seen",
    false,
  );
  const [originCountry, setOriginCountry] = useOriginCountry();
  const { data: countries } = api.country.getCountrySlugs.useQuery();

  return (
    <Dialog
      defaultOpen={!dialogSeen && onboardingVariant}
      onOpenChange={(open) => {
        if (onboardingVariant && !open && !dialogSeen) setDialogSeen(true);
      }}
    >
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compare countries to your Home</DialogTitle>
          <DialogDescription>
            Select where you currently live and see direct comparisons to your
            home country. This makes it easier for you to understand e.g. how
            expensive a country is, or check if your drivers license is valid
            there for some time.
            <br />
            You can always edit this on the bottom of this page.
          </DialogDescription>
        </DialogHeader>
        <Select
          value={originCountry?.slug ?? undefined}
          onValueChange={(value: string | undefined) =>
            setOriginCountry(
              value
                ? {
                    slug: value,
                    name:
                      countries?.find((c) => c.slug === value)?.name ?? value,
                  }
                : null,
            )
          }
        >
          <SelectTrigger className="w-48 mb-4">
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
        <DialogFooter className="grid grid-cols-2">
          <DialogClose
            asChild
            onClick={() => {
              if (!!originCountry) setOriginCountry(null);
            }}
          >
            <Button variant="outline">
              {!!originCountry ? "Remove origin country" : "Skip for now"}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={!originCountry} variant="default">
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
