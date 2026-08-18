import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export -> ./out, deployed to GitHub Pages. No server at runtime.
  output: "export",
  // Set to /portfolio in the Pages workflow for this project site.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  // Emit /work/index.html rather than /work.html so any static host serves it.
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { unoptimized: true },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
