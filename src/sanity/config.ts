import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas/index.ts'

const config = defineConfig({
	name: 'cataterapia-studio',
	title: 'Cataterapia Blog',

	projectId: '4tqm6mvt',
	dataset: 'production',

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},

	basePath: '/admin', // Importante: esto hace que funcione en /admin
})

export { config }
export { config as sanityConfig }
