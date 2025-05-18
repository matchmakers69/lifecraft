import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
			  protocol: "https",
			  hostname: "res.cloudinary.com",
			},
			{
			  protocol: "https",
			  hostname: "www.gravatar.com",
			},
			{
			  protocol: "https",
			  hostname: "cdn.discordapp.com",
			},
			{
			  protocol: "https",
			  hostname: "avatars.githubusercontent.com",
			},
			{
			  protocol: "https",
			  hostname: "przemeklewtak-files.s3.eu-west-1.amazonaws.com",
			},
		  ],

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