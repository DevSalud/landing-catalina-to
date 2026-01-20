import { actions } from 'astro:actions'
import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initContactForm } from './contactForm.ts'

// Mock de módulos externos
vi.mock('astro:actions', () => ({
	actions: {
		send: vi.fn(),
	},
}))

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}))

describe('Contact Form Logic', () => {
	let form: HTMLFormElement
	let nameInput: HTMLInputElement
	let emailInput: HTMLInputElement
	let messageInput: HTMLTextAreaElement
	let submitButton: HTMLButtonElement
	let nameError: HTMLSpanElement
	let emailError: HTMLSpanElement
	let messageError: HTMLSpanElement

	beforeEach(() => {
		// Reset mocks
		vi.clearAllMocks()

		// Configurar DOM
		document.body.innerHTML = `
      <div data-contact-form>
        <form id="contacto-form">
          <input type="text" id="nombre" name="nombre" />
          <span id="nombre-error" class="hidden">Error nombre</span>
          
          <input type="email" id="email" name="email" />
          <span id="email-error" class="hidden">Error email</span>
          
          <textarea id="mensaje" name="mensaje"></textarea>
          <span id="mensaje-error" class="hidden">Error mensaje</span>
          
          <button type="submit">Enviar</button>
        </form>
      </div>
    `

		// Obtener referencias
		form = document.getElementById('contacto-form') as HTMLFormElement
		nameInput = form.querySelector('#nombre') as HTMLInputElement
		emailInput = form.querySelector('#email') as HTMLInputElement
		messageInput = form.querySelector('#mensaje') as HTMLTextAreaElement
		submitButton = form.querySelector('button') as HTMLButtonElement
		nameError = document.getElementById('nombre-error') as HTMLSpanElement
		emailError = document.getElementById('email-error') as HTMLSpanElement
		messageError = document.getElementById('mensaje-error') as HTMLSpanElement

		// Inicializar lógica
		initContactForm()

		// Simular IntersectionObserver activando la carga
		// Como initContactForm usa IntersectionObserver, necesitamos simular que el elemento es visible
		// Sin embargo, como mockeamos IntersectionObserver en setup.ts, no disparará el callback automáticamente.
		// En initContactForm, también escuchamos 'focus' en los inputs. Podemos usar eso para disparar la carga.
		nameInput.dispatchEvent(new Event('focus'))
	})

	afterEach(() => {
		document.body.innerHTML = ''
	})

	it('debería mostrar errores si los campos están vacíos', async () => {
		// Submit formulario vacío
		form.dispatchEvent(new Event('submit'))

		// Esperar a que se procese (aunque es síncrono en validación, es buena práctica)
		await new Promise(process.nextTick)

		expect(nameError.classList.contains('hidden')).toBe(false)
		expect(emailError.classList.contains('hidden')).toBe(false)
		expect(messageError.classList.contains('hidden')).toBe(false)

		expect(nameInput.classList.contains('border-red-500')).toBe(true)
		expect(emailInput.classList.contains('border-red-500')).toBe(true)
		expect(messageInput.classList.contains('border-red-500')).toBe(true)

		expect(actions.send).not.toHaveBeenCalled()
	})

	it('debería mostrar error si el email es inválido', async () => {
		nameInput.value = 'Juan'
		emailInput.value = 'juan@invalid' // Email inválido
		messageInput.value = 'Hola'

		form.dispatchEvent(new Event('submit'))
		await new Promise(process.nextTick)

		expect(emailError.classList.contains('hidden')).toBe(false)
		expect(emailInput.classList.contains('border-red-500')).toBe(true)
		expect(actions.send).not.toHaveBeenCalled()
	})

	it('debería enviar el formulario correctamente si todo es válido', async () => {
		// Mock respuesta exitosa
		// @ts-ignore
		vi.mocked(actions.send).mockResolvedValue({
			data: { id: 'test-id' },
			error: undefined,
		})

		nameInput.value = 'Juan Pérez'
		emailInput.value = 'juan@example.com'
		messageInput.value = 'Hola, quiero información'

		form.dispatchEvent(new Event('submit'))

		// Verificar estado de carga inmediato
		expect(submitButton.disabled).toBe(true)
		expect(submitButton.innerHTML).toBe('Enviando...')

		// Esperar promesas
		await new Promise(process.nextTick)
		await new Promise(process.nextTick) // Un tick extra por el await actions.send

		expect(actions.send).toHaveBeenCalledWith(expect.any(FormData))
		expect(toast.success).toHaveBeenCalledWith('Mensaje enviado exitosamente')

		// Verificar reset
		expect(nameInput.value).toBe('')
		expect(emailInput.value).toBe('')
		expect(messageInput.value).toBe('')

		// Verificar estado final del botón
		expect(submitButton.disabled).toBe(false)
		expect(submitButton.innerHTML).toBe('Enviar')
	})

	it('debería manejar errores del servidor', async () => {
		// Mock error del servidor
		const error = {
			code: 'INTERNAL_SERVER_ERROR',
			message: 'Server error',
			type: 'ActionError',
			status: 500,
		}
		// @ts-ignore
		vi.mocked(actions.send).mockResolvedValue({ data: undefined, error })

		nameInput.value = 'Juan Pérez'
		emailInput.value = 'juan@example.com'
		messageInput.value = 'Hola'

		form.dispatchEvent(new Event('submit'))

		await new Promise(process.nextTick)
		await new Promise(process.nextTick)

		expect(actions.send).toHaveBeenCalled()
		expect(toast.error).toHaveBeenCalled()
		expect(toast.success).not.toHaveBeenCalled()

		// El formulario NO debería resetearse en caso de error
		expect(nameInput.value).toBe('Juan Pérez')
	})
})
