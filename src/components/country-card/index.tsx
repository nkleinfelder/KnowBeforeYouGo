import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { CountryCardContextProvider } from "./context";
import { cn } from "@/src/lib/utils";
import "./styles.css";
import { CheckIcon, LucideIcon } from "lucide-react";
import {
  BlurElement,
  ContentWrapper,
  LinkWrapper,
  SelectableWrapper,
} from "./client-elements";
import { Nullable } from "@/src/lib/type-utils";
import { COUNTRY_FALLBACK_IMAGE } from "@/src/lib/constants";

export type CountryCardProps = {
  name: string;
  slug: string;
  image?: Nullable<string>;
  tags: {
    name: string;
    icon: LucideIcon;
  }[];
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};
export function CountryCard({ ...props }: CountryCardProps) {
  return (
    <CountryCardContextProvider>
      <CountryCardInner {...props} />
    </CountryCardContextProvider>
  );
}

function CountryCardInner({
  name,
  slug,
  image,
  tags,
  selectable,
  selected,
  onSelect,
}: CountryCardProps) {
  const Wrapper = selectable ? SelectableWrapper : LinkWrapper;
  const wrapperProps = selectable ? { onSelect } : { slug };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Wrapper {...(wrapperProps as any)}>
      <article
        style={{ height: "var(--container-height)" }}
        className={cn(
          "grid-stack relative box-content rounded-4xl bg-white p-1.5 shadow-md transition-all duration-200 ease-in-out focus-within:shadow-xl hover:shadow-xl",
          selected && "ring-3 ring-primary ring-offset-2",
        )}
      >
        {selected && (
          <div className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-md">
            <CheckIcon className="size-4" />
          </div>
        )}
        <BackgroundImage image={image} />
        <Content name={name} slogan="" tags={tags} />
      </article>
    </Wrapper>
  );
}

function BackgroundImage({ image }: Pick<CountryCardProps, "image">) {
  const imageSrc = image ?? COUNTRY_FALLBACK_IMAGE;

  return (
    <div
      className={cn(
        "grid-stack h-(--container-height) w-full content-center overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-md transition-all duration-200 ease-in-out group-focus-within:h-[calc(var(--container-height)-var(--content-height))] group-hover:h-[calc(var(--container-height)-var(--content-height))]",
      )}
    >
      <Image
        src={imageSrc}
        alt=""
        width={512}
        height={512}
        className="h-full w-full rounded-[inherit] object-cover"
        style={{ height: "var(--container-height)" }}
        quality={90}
      />
      <BlurElement />
    </div>
  );
}

function Content({
  name,
  slogan,
  tags,
}: {
  name: string;
  slogan: string;
  tags: CountryCardProps["tags"];
}) {
  return (
    <ContentWrapper>
      <h3 className="text-xl font-bold transition-colors duration-200 ease-in-out group-focus-within:text-stone-900 group-hover:text-stone-900">
        {name}
      </h3>
      <p className="text-sm text-stone-300 transition-colors duration-200 ease-in-out group-focus-within:text-stone-500 group-hover:text-stone-500">
        {slogan}
      </p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag data={t} key={t.name} />
        ))}
      </ul>
      <Button
        className="mt-3 cursor-pointer rounded-full border-transparent text-stone-800 shadow-lg transition-colors duration-200 ease-in-out group-focus-within:bg-stone-900 group-focus-within:text-stone-50 group-hover:bg-stone-900 group-hover:text-stone-50"
        variant="outline"
        tabIndex={-1}
        aria-hidden
      >
        View Details
      </Button>
    </ContentWrapper>
  );
}

function Tag({ data }: { data: CountryCardProps["tags"][number] }) {
  const Icon = data.icon;

  return (
    <li className="flex items-center justify-center gap-0.5 text-stone-50 group-focus-within:text-stone-800 group-hover:text-stone-800">
      <Icon className="size-3 transition-colors duration-200 ease-in-out" />
      <span className="text-xs transition-colors duration-200 ease-in-out">
        {data.name}
      </span>
    </li>
  );
}
