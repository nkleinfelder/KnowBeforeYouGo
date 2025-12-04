import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";

import { Countries } from "./src/collections/Countries";
import { PlugTypes } from "./src/collections/PlugTypes";
import { Media } from "./src/collections/Media";

export default buildConfig({
  editor: lexicalEditor(),

  localization: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },

  collections: [Countries, PlugTypes, Media],

  secret: process.env.PAYLOAD_SECRET || "",

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),

  sharp,
});
