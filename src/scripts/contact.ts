// Lazy loading del JavaScript del formulario
const contactSection = document.querySelector('[data-contact-form]')
let scriptLoaded = false
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Función para cargar el script del formulario
async function loadContactScript() {
	if (scriptLoaded) {
		return
	}
	scriptLoaded = true

	// Importación dinámica - solo se carga cuando es necesario
	const { actions } = await import('astro:actions')
	const { toast } = await import('sonner')

	const form = document.getElementById('contacto-form') as HTMLFormElement
	const submitter = document.querySelector(
		"button[type='submit']",
	) as HTMLButtonElement

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

		if (nombre.length === 0) {
			nombreError.classList.remove('hidden')
			form.nombre.classList.add('border-red-500')
		}

		if (!emailRegex.test(email)) {
			emailError.classList.remove('hidden')
			form.email.classList.add('border-red-500')
		}

		if (mensaje.length === 0) {
			mensajeError.classList.remove('hidden')
			form.mensaje.classList.add('border-red-500')
		}

		if (
			nombre.length === 0 ||
			emailRegex.test(email) === false ||
			mensaje.length === 0
		) {
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
		form.nombre.classList.remove('border-red-500')
		form.email.classList.remove('border-red-500')
		form.mensaje.classList.remove('border-red-500')

		const formData = new FormData()

		formData.append('nombre', nombre)
		formData.append('email', email)
		formData.append('mensaje', mensaje)

		try {
			const { error } = await actions.send(formData)

			if (error) {
				throw error
			}

			toast.success('Mensaje enviado exitosamente')
			form.reset()
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: We need to see the action error
			console.error(error)
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
	})
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
