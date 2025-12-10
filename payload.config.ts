import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
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

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "true",
    },
    idType: "uuid",
  }),

  sharp,
});
