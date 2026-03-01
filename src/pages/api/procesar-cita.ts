import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, locals }) => {
	try {
		// Accedemos al entorno de ejecución (Cloudflare)
		// biome-ignore lint/suspicious/noExplicitAny: accessing runtime env dynamically
		const runtime = (locals as any).runtime
		// biome-ignore lint/suspicious/noExplicitAny: accessing runtime env dynamically
		const env = runtime?.env || (locals as any).env || {}

		const body = await request.json()
		const { id, action } = body

		const updateAppointmentStatusFunctionUrl =
			env.UPDATE_APPOINTMENT_STATUS_FUNCTION_URL ||
			import.meta.env.UPDATE_APPOINTMENT_STATUS_FUNCTION_URL
		const authHeader =
			env.SUPABASE_PUBLIC_KEY || import.meta.env.SUPABASE_PUBLIC_KEY || null

		if (!(id && action)) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Faltan parámetros requeridos',
				}),
				{ status: 400 },
			)
		}

		if (!(updateAppointmentStatusFunctionUrl && authHeader)) {
			return new Response(
				JSON.stringify({
					success: false,
					message:
						'No es posible procesar la solicitud debido a un error en la configuración',
				}),
				{ status: 400 },
			)
		}

		const response = await fetch(updateAppointmentStatusFunctionUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authHeader}`,
			},
			body: JSON.stringify({
				event_id: id,
				action,
			}),
		})

		const data = await response.json()

		return new Response(JSON.stringify(data), {
			status: response.status,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch {
		return new Response(
			JSON.stringify({
				success: false,
				message: 'Error interno del servidor',
			}),
			{ status: 500 },
		)
	}
}
