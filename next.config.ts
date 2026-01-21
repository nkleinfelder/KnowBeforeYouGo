import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactCompiler: false,
  output: "standalone",
  images: {
    qualities: [90, 75],
    minimumCacheTTL: 60 * 60 * 24 * 14, // 14 days
  },
};

export default withPayload(nextConfig);
