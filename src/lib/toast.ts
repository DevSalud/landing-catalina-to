/**
 * Muestra una notificación visual en la esquina inferior derecha del DOM.
 * Implementado sin dependencias de frameworks, optimizado para rendimiento y estilizado con Tailwind CSS v4.
 */
export function showToast(
	message: string,
	type: 'success' | 'error' = 'success',
): void {
	// 1. Obtener o crear el contenedor principal de los toasts
	let container = document.getElementById('toast-container')
	if (!container) {
		container = document.createElement('div')
		container.id = 'toast-container'
		container.className =
			'fixed bottom-4 right-4 z-100 flex flex-col gap-2 pointer-events-none'
		document.body.appendChild(container)
	}

	// 2. Crear el elemento de toast individual
	const toast = document.createElement('div')
	const typeClasses =
		type === 'success'
			? 'bg-white border-emerald-200 text-gray-800'
			: 'bg-white border-rose-200 text-gray-800'

	toast.className = `p-4 rounded-xl border shadow-lg flex items-center gap-3 transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto max-w-sm ${typeClasses}`
	toast.setAttribute('role', 'alert')

	// Iconos SVG minimalistas y limpios
	const icon =
		type === 'success'
			? `<svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
			: `<svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`

	toast.innerHTML = `
    ${icon}
    <span class="text-sm font-medium">${message}</span>
  `

	container.appendChild(toast)

	// Animación de entrada
	requestAnimationFrame(() => {
		toast.classList.remove('translate-y-2', 'opacity-0')
	})

	// Animación de salida y remoción después de 4 segundos
	setTimeout(() => {
		toast.classList.add('translate-y-2', 'opacity-0')
		setTimeout(() => {
			toast.remove()
			// Limpiar el contenedor si queda vacío
			if (container && container.childNodes.length === 0) {
				container.remove()
			}
		}, 300)
	}, 4000)
}
