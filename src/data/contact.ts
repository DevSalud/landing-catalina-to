export const CONTACT_TEXTS = {
	subtitle: 'Empecemos',
	title: 'Contáctame',
	description:
		'¿Tienes alguna pregunta o necesitas ayuda? ¡No dudes en escribirme!, con gusto te ayudaré 😊. También puedes contactarme directamente por WhatsApp para una respuesta más rápida.',
	whatsapp: {
		text: 'Contáctame por WhatsApp',
		link: 'https://api.whatsapp.com/send?phone=56992194020',
	},
	form: {
		divider: 'O completa el formulario',
		fields: {
			name: {
				label: 'Nombre',
				placeholder: 'Juan Pérez',
				error: 'El nombre es obligatorio',
			},
			email: {
				label: 'Email',
				placeholder: 'juanperez@ejemplo.com',
				error: 'El email no es válido',
			},
			message: {
				label: 'Mensaje',
				placeholder: 'Escribe aquí tu mensaje',
				error: 'El mensaje es obligatorio',
			},
		},
		button: 'Enviar',
		success: '¡Mensaje enviado con éxito!',
		error: 'Ocurrió un error al enviar el mensaje',
	},
} as const
