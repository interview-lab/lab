import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	experimental: {
		optimizePackageImports: ['@interview-lab/ui'],
	},
};

export default withVanillaExtract(nextConfig);
