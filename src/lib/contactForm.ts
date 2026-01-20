// Lógica del formulario de contacto
import { actions } from 'astro:actions'
import { toast } from 'sonner'

const EMAIL_REGEX = /^[a-zA-Z0-9._%±-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface ContactFormElements extends HTMLFormControlsCollection {
	nombre: HTMLInputElement
	email: HTMLInputElement
	mensaje: HTMLTextAreaElement
}

interface ContactForm extends HTMLFormElement {
	elements: ContactFormElements
}

export function initContactForm() {
	// Lazy loading del JavaScript del formulario
	const contactSection = document.querySelector('[data-contact-form]')
	let scriptLoaded = false

	// Función para cargar el script del formulario
	function loadContactScript() {
		if (scriptLoaded) {
			return
		}
		scriptLoaded = true

		const form = document.getElementById('contacto-form') as ContactForm
		if (!form) {
			return
		}

		const submitter = document.querySelector(
			"button[type='submit']",
		) as HTMLButtonElement

		const nombreError = document.getElementById(
			'nombre-error',
		) as HTMLSpanElement
		const emailError = document.getElementById('email-error') as HTMLSpanElement
		const mensajeError = document.getElementById(
			'mensaje-error',
		) as HTMLSpanElement

		form.addEventListener('submit', async (e) => {
			e.preventDefault()
			await handleSubmit(form, submitter, nombreError, emailError, mensajeError)
		})
	}

	async function handleSubmit(
		form: ContactForm,
		submitter: HTMLButtonElement,
		nombreError: HTMLSpanElement,
		emailError: HTMLSpanElement,
		mensajeError: HTMLSpanElement,
	) {
		const nombreInput = form.elements.nombre
		const emailInput = form.elements.email
		const mensajeInput = form.elements.mensaje

		const nombre = nombreInput.value
		const email = emailInput.value
		const mensaje = mensajeInput.value

		let hasError = false

		if (nombre.length === 0) {
			nombreError.classList.remove('hidden')
			nombreInput.classList.add('border-red-500')
			hasError = true
		}

		if (!EMAIL_REGEX.test(email)) {
			emailError.classList.remove('hidden')
			emailInput.classList.add('border-red-500')
			hasError = true
		}

		if (mensaje.length === 0) {
			mensajeError.classList.remove('hidden')
			mensajeInput.classList.add('border-red-500')
			hasError = true
		}

		if (hasError) {
			return
		}

		submitter.disabled = true
		submitter.innerHTML = 'Enviando...'
		submitter.classList.add('opacity-70')
		submitter.classList.add('pointer-events-none')
		submitter.classList.add('select-none')

		nombreError.classList.add('hidden')
		emailError.classList.add('hidden')
		mensajeError.classList.add('hidden')
		nombreInput.classList.remove('border-red-500')
		emailInput.classList.remove('border-red-500')
		mensajeInput.classList.remove('border-red-500')

		const formData = new FormData()
		formData.append('nombre', nombre)
		formData.append('email', email)
		formData.append('mensaje', mensaje)

		try {
			// @ts-ignore
			const { error } = await actions.send(formData)

			if (error) {
				throw error
			}

			toast.success('Mensaje enviado exitosamente')
			form.reset()
		} catch (_error) {
			toast.error(
				'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
			)
		} finally {
			submitter.disabled = false
			submitter.innerHTML = 'Enviar'
			submitter.classList.remove('opacity-70')
			submitter.classList.remove('pointer-events-none')
			submitter.classList.remove('select-none')
		}
	}

	// Intersection Observer para detectar cuando el componente es visible
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					loadContactScript()
					observer.unobserve(entry.target) // Solo cargar una vez
				}
			}
		},
		{
			rootMargin: '100px', // Cargar 100px antes de que sea visible
		},
	)

	if (contactSection) {
		observer.observe(contactSection)
	}

	// También cargar si el usuario hace focus en algún input (fallback)
	const inputs = document.querySelectorAll(
		'#contacto-form input, #contacto-form textarea',
	)
	for (const input of inputs) {
		input.addEventListener('focus', loadContactScript, { once: true })
	}
}
