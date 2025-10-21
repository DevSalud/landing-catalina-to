import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
	projectId: '4tqm6mvt',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2025-09-10',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
	return builder.image(source)
}
