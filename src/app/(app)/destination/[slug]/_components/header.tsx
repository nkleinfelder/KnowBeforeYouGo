import { Badge } from "@/src/components/ui/badge";
import { COUNTRY_FALLBACK_IMAGE } from "@/src/lib/constants";
import { Nullable } from "@/src/lib/type-utils";
import Image from "next/image";

export function Header({
  image,
  name,
  subtitle,
  tags,
}: {
  image?: Nullable<string>;
  name: string;
  subtitle?: string;
  tags?: string[];
}) {
  return (
    <header className="full-width h-96 w-full overflow-hidden">
      <Image
        src={image ?? COUNTRY_FALLBACK_IMAGE}
        alt=""
        width={1920}
        height={1080}
        quality={90}
        sizes="100vw"
        className="full-width row-start-1 row-end-2 h-full w-full scale-105 overflow-hidden bg-stone-800 mask-linear-180 mask-linear-from-stone-800 mask-linear-from-60% mask-linear-to-transparent mask-linear-to-[calc(100%-2.5%)] object-cover object-center blur-xs brightness-75"
      />
      <div className="z-10 row-start-1 row-end-2 flex flex-col gap-2 self-end pb-10 text-stone-50">
        <h1 className="text-6xl font-bold">{name}</h1>
        {subtitle && <p className="mb-2 text-xl font-medium">{subtitle}</p>}
        {tags && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge variant="translucent" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
