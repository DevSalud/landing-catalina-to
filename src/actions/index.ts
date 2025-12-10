import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'

export const server = {
	send: defineAction({
		accept: 'form',
		handler: async (form) => {
			const apiKey =
				import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY
			if (!apiKey) {
				throw new ActionError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Falta la configuración de email (API Key)',
				})
			}
			const resend = new Resend(apiKey)
			const nombre = form.get('nombre')
			const email = form.get('email')
			const mensaje = form.get('mensaje')

			const { data, error } = await resend.emails.send({
				from: 'Catalina Terapeuta <cataterapias@cataterapias.cl>',
				to: ['catalina.herrera.to@gmail.com'],
				subject: `Tienes un nuevo mensaje de ${nombre}`,
				html: `<p>De: ${nombre} (${email})</p>
        <p><strong>${mensaje}</p></strong>`,
			})

			if (error) {
				throw new ActionError({
					code: 'BAD_REQUEST',
					message: error.message,
				})
			}

			return data
		},
	}),
}
