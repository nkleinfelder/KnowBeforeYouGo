import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactCompiler: false,
  output: "standalone",
};

export default withPayload(nextConfig);
