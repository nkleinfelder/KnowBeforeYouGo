import Image from "next/image";
import { InfoCard, InfoCardProps } from "./container";
import { App } from "@/payload-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import Link from "next/link";
import { Nullable } from "@/src/lib/type-utils";
import { DownloadOnPlaystore } from "@/src/components/app-store-download/google";
import { DownloadOnAppStore } from "@/src/components/app-store-download/ios";
import { cn } from "@/src/lib/utils";

export function Apps({
  apps,
  ...props
}: {
  // fucked type because of payload
  apps: (
    | string
    | Pick<
        App,
        "id" | "url_ios" | "url_android" | "name" | "image" | "description"
      >
  )[];
} & InfoCardProps) {
  return (
    <InfoCard {...props}>
      <ul className="flex h-fit flex-wrap-reverse items-end gap-2 self-end">
        {apps.map(
          (app) =>
            typeof app !== "string" && (
              <AppElement
                src={
                  app.image && typeof app.image === "object" && app.image.url
                }
                description={app.description}
                name={app.name}
                urlAndroid={app.url_android}
                urlIos={app.url_ios}
                key={app.id}
              />
            ),
        )}
      </ul>
    </InfoCard>
  );
}

function AppElement({
  src,
  name,
  urlAndroid,
  urlIos,
  description,
}: {
  src?: Nullable<string> | false;
  description?: Nullable<string>;
  name: string;
  urlAndroid: Nullable<string>;
  urlIos: Nullable<string>;
}) {
  const someUrl = urlAndroid || urlIos;

  if (src)
    return (
      <li className="flex">
        <Popover>
          <PopoverTrigger>
            <Image
              src={src}
              alt={name}
              width={256}
              height={256}
              className="aspect-square size-14 rounded-sm shadow"
            />
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              "flex w-fit max-w-64 flex-col",
              !someUrl && "px-3 py-2",
              someUrl && "p-3",
            )}
          >
            <h4 className="text-lg leading-tight font-semibold text-balance">
              {name}
            </h4>
            {description && (
              <p className="text-sm text-pretty">{description}</p>
            )}

            {someUrl && (
              <ul className="mt-2.5 flex flex-col gap-1">
                {urlAndroid && (
                  <li>
                    <Link href={urlAndroid}>
                      <DownloadOnPlaystore
                        locale="en"
                        className="h-auto w-32"
                      />
                    </Link>
                  </li>
                )}
                {urlIos && (
                  <li>
                    <Link href={urlIos}>
                      <DownloadOnAppStore locale="en" className="h-auto w-32" />
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </PopoverContent>
        </Popover>
      </li>
    );
}
