import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";

import { Countries } from "./src/collections/Countries";
import { PlugTypes } from "./src/collections/PlugTypes";
import { Media } from "./src/collections/Media";
import { Apps } from "@/src/collections/Apps";
import { HazardsIndex } from "@/src/collections/HazardsIndex";
import { UserRequests } from "@/src/collections/UserRequests";

const isProd = process.env.NODE_ENV === "production";

const s3Endpoint = isProd
  ? process.env.S3_ENDPOINT_PROD
  : process.env.S3_ENDPOINT_DEV;

const databaseUrl = isProd
  ? process.env.DATABASE_URL_PROD
  : process.env.DATABASE_URL_DEV;

if (!s3Endpoint) {
  throw new Error("S3 endpoint not configured");
}

export default buildConfig({
  editor: lexicalEditor(),

  localization: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },

  collections: [Apps, Countries, UserRequests, HazardsIndex, PlugTypes, Media],

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "auto",
        endpoint: s3Endpoint || "",
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",

  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
      ssl: process.env.DATABASE_SSL === "true",
    },
    idType: "uuid",
  }),

  sharp,
});
