import Image from "next/image";
import { InfoCard, InfoCardProps } from "./container";
import { App } from "@/payload-types";

export function Apps({
  apps,
  ...props
}: {
  apps: Pick<App, "id" | "url_ios" | "url_android" | "name" | "image">[];
} & InfoCardProps) {
  return (
    <InfoCard {...props}>
      <ul>
        {apps.map((app) => (
          <li key={app.id}>
            <AppImage
              src={"/images/home-hero-background.jpg"}
              name={app.name}
            />
          </li>
        ))}
      </ul>
    </InfoCard>
  );
}

function AppImage({ src, name }: { src?: string; name: string }) {
  if (src) return <Image src={src} alt={name} width={256} height={256} />;
}
