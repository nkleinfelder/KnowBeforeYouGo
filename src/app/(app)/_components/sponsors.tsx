import { cn } from "@/src/lib/utils";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";

export function Sponsors() {
  return (
    <section className="full-width flex w-full flex-col items-center gap-6 bg-stone-800 py-8">
      <h2 className="text-center text-stone-300">Supported By</h2>
      <div className="grid auto-cols-[7rem] gap-x-12 gap-y-4 md:grid-flow-col">
        <Sponsor
          href=""
          image="/images/sponsors/uni-koeln.webp"
          name="Universität zu Köln"
          className="rounded-full"
        />
        <Sponsor
          href=""
          image="/images/sponsors/gateway.webp"
          name="Gateway Cologne"
        />
      </div>
    </section>
  );
}

function Sponsor({
  href,
  image,
  name,
  className,
}: Pick<LinkProps, "href"> & {
  image: ImageProps["src"];
  name: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-2"
    >
      <Image
        src={image}
        alt=""
        width={128}
        height={128}
        className={cn("size-14 object-contain", className)}
      />
      <p className="lineheight-1.2 text-center text-xs text-balance text-stone-100">
        {name}
      </p>
    </Link>
  );
}
