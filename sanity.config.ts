import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas/index.ts'

export default defineConfig({
	name: 'cataterapias-studio',
	title: 'Cataterapias Blog',

	projectId: '4tqm6mvt',
	dataset: 'production',

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
})
