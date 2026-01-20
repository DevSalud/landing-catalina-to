/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

// biome-ignore lint/style/noDefaultExport: Vitest espera que se exporte la configuración de Vite
export default getViteConfig({
	// @ts-ignore
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/tests/setup.ts'],
	},
})
