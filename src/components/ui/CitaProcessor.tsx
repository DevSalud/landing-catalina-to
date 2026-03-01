import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import type React from 'react'

const getSuccessContent = (action: string) => {
	if (action === 'confirmed') {
		return {
			title: '¡Cita Confirmada!',
			message: (
				<span>
					Tu cita ha sido confirmada exitosamente. Te esperamos.
					<br />
					<br />
					Por favor, recuerda leer nuestras{' '}
					<a
						href="/normativas"
						className="text-moody-blue-600 font-semibold underline hover:text-moody-blue-800 transition-colors"
					>
						Normativas de Atención
					</a>{' '}
					antes de asistir.
				</span>
			),
		}
	}
	return {
		title: 'Cita Rechazada',
		message: 'La cita ha sido rechazada correctamente.',
	}
}

const validateParams = (id: string | null, action: string | null) => {
	if (!(id && action)) {
		return {
			title: 'Solicitud inválida',
			message: 'Faltan parámetros necesarios.',
		}
	}
	if (action !== 'confirmed' && action !== 'cancelled') {
		return {
			title: 'Acción no reconocida',
			message: 'La acción solicitada no es válida.',
		}
	}
	return null
}

// Error personalizado para incluir status code
class ApiError extends Error {
	status: number
	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

const processCitaApi = async (id: string, action: string) => {
	const response = await fetch('/api/procesar-cita', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, action }),
	})

	const data = await response.json()
	if (!response.ok) {
		throw new ApiError(data.message || 'Error al procesar', response.status)
	}
	return data
}

export const CitaProcessor = () => {
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'loading',
	)
	const [title, setTitle] = useState('Procesando solicitud')
	const [message, setMessage] = useState<React.ReactNode>(
		'Por favor espera un momento...',
	)
	const [actionType, setActionType] = useState<string | null>(null)

	useEffect(() => {
		const run = async () => {
			const params = new URLSearchParams(window.location.search)
			const id = params.get('id') || ''
			const action = params.get('action') || ''

			setActionType(action)

			const validationError = validateParams(id, action)
			if (validationError) {
				setStatus('error')
				setTitle(validationError.title)
				setMessage(validationError.message)
				return
			}

			try {
				await processCitaApi(id, action)
				const successContent = getSuccessContent(action)
				setStatus('success')
				setTitle(successContent.title)
				setMessage(successContent.message)
			} catch (error) {
				if (error instanceof ApiError && error.status === 409) {
					setStatus('error')
					setTitle('No se puede procesar')
					setMessage(error.message)
					return
				}

				// Error genérico del sistema (no mostrar detalle técnico)
				setStatus('error')
				setTitle('Error del sistema')
				setMessage(
					'Ha ocurrido un error inesperado al procesar tu solicitud. Por favor, intenta nuevamente más tarde o contacta con soporte.',
				)
			}
		}

		run()
	}, [])

	return (
		<div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-moody-blue-100">
			<div className="flex justify-center mb-6">
				{status === 'loading' && (
					<Loader2 className="w-16 h-16 text-moody-blue-500 animate-spin" />
				)}
				{status === 'success' && actionType === 'confirmed' && (
					<CheckCircle2 className="w-16 h-16 text-mint-500" />
				)}
				{status === 'success' && actionType === 'cancelled' && (
					<CheckCircle2 className="w-16 h-16 text-gray-500" />
				)}
				{status === 'error' && <XCircle className="w-16 h-16 text-red-500" />}
			</div>

			<h1 className="text-2xl font-bold text-moody-blue-900 mb-4">{title}</h1>
			<p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

			{status !== 'loading' && (
				<a
					href="/"
					className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-moody-blue-600 hover:bg-moody-blue-700 transition-colors shadow-lg hover:shadow-moody-blue-200"
				>
					Volver al Inicio
				</a>
			)}
		</div>
	)
}
