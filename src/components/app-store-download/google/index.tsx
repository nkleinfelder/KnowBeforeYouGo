import Image, { ImageProps } from "next/image";

export function DownloadOnPlaystore({
  locale,
  ...props
}: {
  locale: string | "de" | "en";
} & Omit<ImageProps, "src" | "alt">) {
  const imageLocale = locale === "de" ? "de" : "en";
  const src = `/images/app-store/google/${imageLocale}.png`;

  return (
    <Image
      src={src}
      alt="Download on Google Play"
      width={512}
      height={128}
      {...props}
    />
  );
}
