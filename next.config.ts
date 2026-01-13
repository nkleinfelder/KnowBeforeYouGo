import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactCompiler: false,
  output: "standalone",
  images: {
    qualities: [90, 75],
  },
};

export default withPayload(nextConfig);
