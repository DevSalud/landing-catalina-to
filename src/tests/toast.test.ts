import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { showToast } from '../lib/toast'

describe('Toast Module', () => {
	beforeEach(() => {
		// Limpiar el DOM simulado antes de cada test
		document.body.innerHTML = ''
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('debería crear el toast-container e inyectar el toast de tipo success', () => {
		showToast('Operación exitosa', 'success')

		const container = document.getElementById('toast-container')
		expect(container).not.toBeNull()

		const toast = container?.querySelector('[role="alert"]')
		expect(toast).not.toBeNull()
		expect(toast?.textContent?.trim()).toContain('Operación exitosa')
		expect(toast?.className).toContain('border-emerald-200')
	})

	it('debería inyectar el toast de tipo error con clases de error', () => {
		showToast('Ocurrió un error', 'error')

		const container = document.getElementById('toast-container')
		expect(container).not.toBeNull()

		const toast = container?.querySelector('[role="alert"]')
		expect(toast).not.toBeNull()
		expect(toast?.textContent?.trim()).toContain('Ocurrió un error')
		expect(toast?.className).toContain('border-rose-200')
	})

	it('debería apilar múltiples toasts en el mismo contenedor', () => {
		showToast('Toast 1', 'success')
		showToast('Toast 2', 'error')

		const container = document.getElementById('toast-container')
		expect(container).not.toBeNull()
		expect(container?.children.length).toBe(2)
	})

	it('debería remover el toast del DOM después de 4.3 segundos', () => {
		showToast('Toast efímero', 'success')

		let container = document.getElementById('toast-container')
		expect(container).not.toBeNull()
		expect(container?.children.length).toBe(1)

		// Adelantar 4000ms de visualización + 300ms de desvanecido
		vi.advanceTimersByTime(4300)

		// El toast y el contenedor (si está vacío) deben desaparecer
		container = document.getElementById('toast-container')
		expect(container).toBeNull()
	})
})
