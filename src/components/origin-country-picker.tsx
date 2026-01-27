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
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { useOriginCountry } from "@/src/hooks/use-origin-country";
import { api } from "@/src/server/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/components/ui/select";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

export default function OriginCountryPicker() {
  const [originCountry] = useOriginCountry();

  return (
    <OriginPickerDialog>
      <DialogTrigger className="px-3 py-1.5 text-sm cursor-pointer hover:bg-stone-800 focus-visible:bg-stone-800 rounded-md">
        {originCountry
          ? `Adjust home country (${originCountry?.name})`
          : "Set your home country"}
      </DialogTrigger>
    </OriginPickerDialog>
  );
}

export function OriginPickerDialog({ children }: PropsWithChildren) {
  const [dialogSeen, setDialogSeen] = useLocalStorage<boolean>(
    "origin-country-picker-dialog-seen",
    false,
  );
  const [originCountry, setOriginCountry] = useOriginCountry();
  const { data: countries } = api.country.getCountrySlugs.useQuery();
  const pathname = usePathname();

  return (
    <Dialog
      defaultOpen={!dialogSeen && pathname.split("/").at(1) === "destination"}
      onOpenChange={(open) => {
        if (!open && !dialogSeen) setDialogSeen(true);
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
