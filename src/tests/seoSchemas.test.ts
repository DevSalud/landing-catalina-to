import { describe, expect, it } from 'vitest'
import {
	createFAQPageSchema,
	createPersonSchema,
	createWebSiteSchema,
} from '../lib/seoSchemas'

describe('SEO JSON-LD Schemas', () => {
	const dummyBase = 'https://www.ejemplo.cl'

	it('createWebSiteSchema debe generar un objeto válido con @type WebSite', () => {
		const schema = createWebSiteSchema(dummyBase)
		expect(schema).toBeDefined()
		expect(schema['@type']).toBe('WebSite')
		expect(schema.name).toBe('Catalina Herrera')
	})

	it('createPersonSchema debe generar un array con un objeto Person válido', () => {
		// createPersonSchema devuelve un array
		const schemaArray = createPersonSchema(dummyBase)
		expect(Array.isArray(schemaArray)).toBe(true)

		const schema = schemaArray[0]
		expect(schema['@type']).toBe('Person')
		expect(schema.name).toBe('Catalina Herrera')
		expect(schema.jobTitle).toBe('Terapeuta Ocupacional')

		// Verifica que incluya el LocalBusiness anidado
		expect(schema.worksFor).toBeDefined()
		expect(schema.worksFor['@type']).toBe('LocalBusiness')
	})

	it('createFAQPageSchema debe procesar un listado de FAQs correctamente', () => {
		const mockFaqs = [
			{ question: 'Q1', answer: 'A1' },
			{ question: 'Q2', answer: 'A2' },
		]
		const schema = createFAQPageSchema(mockFaqs)
		expect(schema['@type']).toBe('FAQPage')
		expect(schema.mainEntity).toHaveLength(2)
		expect(schema.mainEntity[0].name).toBe('Q1')
		expect(schema.mainEntity[0].acceptedAnswer.text).toBe('A1')
	})
})
