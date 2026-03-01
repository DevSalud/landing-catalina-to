import { describe, expect, it } from 'vitest'

describe('Smoke Test - Entorno básico', () => {
	it('El framework de testing (Vitest) funciona correctamente', () => {
		expect(true).toBe(true)
		expect(1 + 1).toBe(2)
	})

	it('El entorno jsdom está configurado', () => {
		// Esto verifica que jsdom se inyectó correctamente
		expect(typeof window).not.toBe('undefined')
		expect(typeof document).not.toBe('undefined')

		// Probamos crear un elemento simple en el DOM virtual
		const div = document.createElement('div')
		div.id = 'test-id'
		document.body.appendChild(div)

		const found = document.getElementById('test-id')
		expect(found).not.toBeNull()
	})
})
