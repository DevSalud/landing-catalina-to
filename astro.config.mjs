// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'

import react from '@astrojs/react'
import sanity from '@sanity/astro'

// https://astro.build/config
// biome-ignore lint/style/noDefaultExport: Astro requires default export
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: [
				'sanity',
				'sanity/structure',
				'@sanity/vision',
				'@sanity/client',
				'react',
				'react-dom',
				'react-dom/client',
				'styled-components',
			],
		},
		ssr: {
			noExternal: ['sanity', '@sanity/client'],
		},
	},

	build: {
		inlineStylesheets: 'always',
	},

	output: 'server',

	adapter: vercel({
		webAnalytics: { enabled: true },
		maxDuration: 60,
	}),

	site: 'https://www.cataterapias.cl',

	integrations: [
		react(),
		sanity({
			projectId: '4tqm6mvt',
			dataset: 'production',
			useCdn: false,
			studioBasePath: '/admin',
		}),
		sitemap(),
	],
})
