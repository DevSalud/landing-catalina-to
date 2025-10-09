import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas/index.ts'


// biome-ignore lint/style/noDefaultExport: Sanity requires default export
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