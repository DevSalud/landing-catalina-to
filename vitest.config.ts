/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
	test: {
		// Vitest runs using this context
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
	// biome-ignore lint/suspicious/noExplicitAny: getViteConfig type does not include test config
} as any)
