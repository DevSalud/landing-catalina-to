import { actions } from 'astro:actions'
import { showToast } from '../lib/toast'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const form = document.getElementById('contacto-form') as HTMLFormElement
const submitter = document.querySelector(
	"button[type='submit']",
) as HTMLButtonElement

if (form && submitter) {
	const nombreError = document.getElementById('nombre-error') as HTMLSpanElement
	const emailError = document.getElementById('email-error') as HTMLSpanElement
	const mensajeError = document.getElementById(
		'mensaje-error',
	) as HTMLSpanElement

	form.addEventListener('submit', async (e) => {
		e.preventDefault()

		const nombre = form.nombre.value
		const email = form.email.value
		const mensaje = form.mensaje.value

		let hasError = false

		if (nombre.trim().length === 0) {
			nombreError.classList.remove('hidden')
			form.nombre.classList.add('border-red-500')
			hasError = true
		} else {
			nombreError.classList.add('hidden')
			form.nombre.classList.remove('border-red-500')
		}

		if (emailRegex.test(email)) {
			emailError.classList.add('hidden')
			form.email.classList.remove('border-red-500')
		} else {
			emailError.classList.remove('hidden')
			form.email.classList.add('border-red-500')
			hasError = true
		}

		if (mensaje.trim().length === 0) {
			mensajeError.classList.remove('hidden')
			form.mensaje.classList.add('border-red-500')
			hasError = true
		} else {
			mensajeError.classList.add('hidden')
			form.mensaje.classList.remove('border-red-500')
		}

		if (hasError) {
			return
		}

		submitter.disabled = true
		submitter.innerHTML = 'Enviando...'
		submitter.classList.add('opacity-70')
		submitter.classList.add('pointer-events-none')
		submitter.classList.add('select-none')

		const formData = new FormData()
		formData.append('nombre', nombre)
		formData.append('email', email)
		formData.append('mensaje', mensaje)

		try {
			const { error } = await actions.send(formData)

			if (error) {
				throw error
			}

			showToast('Mensaje enviado exitosamente', 'success')
			form.reset()
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: We need to see the action error
			console.error(error)
			showToast(
				'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
				'error',
			)
		} finally {
			submitter.disabled = false
			submitter.innerHTML = 'Enviar'
			submitter.classList.remove('opacity-70')
			submitter.classList.remove('pointer-events-none')
			submitter.classList.remove('select-none')
		}
	})
}
