import tailwindcss from '@tailwindcss/vite'
// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'
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

	image: {
		service: passthroughImageService(),
	},

	adapter: cloudflare({
		imageService: 'passthrough',
		platformProxy: {
			enabled: true,
		},
	}),

	prefetch: true,

	site: 'https://www.cataterapias.cl',

	trailingSlash: 'never',

	integrations: [
		react(),
		sanity({
			projectId: '4tqm6mvt',
			dataset: 'production',
			useCdn: false,
			studioBasePath: '/admin',
		}),
		sitemap({
			filter: (page) => page !== 'https://www.cataterapias.cl/procesar_cita',
		}),
	],
})
