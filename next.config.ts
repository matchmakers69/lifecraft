import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
		formats: ["image/avif", "image/webp"],
		domains: ["i.ytimg.com"],
	},
	reactStrictMode: true,
	pageExtensions: ["md", "tsx", "ts", "jsx", "js", "mdx"],
	experimental: {
		optimizeCss: false,
		mdxRs: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;