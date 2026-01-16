/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';
// https://vite.dev/config/
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import svgr from '@svgr/rollup';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [
		react(),
		dts({
			tsconfigPath: './tsconfig.json',
			outDir: 'dist',
			rollupTypes: false,
		}),
		vanillaExtractPlugin(),
		svgr({ include: '**/*.svg' }),
		tsconfigPaths(),
		copy({
			targets: [
				{ src: 'src/assets/fonts/*.woff2', dest: 'dist/fonts' },
				{ src: 'src/styles/pretendard.css', dest: 'dist' },
			],
			hook: 'writeBundle',
		}),
	],
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: 'playwright',
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
	build: {
		lib: {
			name: 'ui',
			entry: ['src/index.ts'],
			cssFileName: 'ui-style',
			formats: ['es', 'umd'],
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react/jsx-runtime': 'jsxRuntime',
				},
			},
		},
	},
});
