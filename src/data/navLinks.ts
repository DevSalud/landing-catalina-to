// ============================================================
// NAVIGATION LINKS — Configuración central del menú de navegación
// Agrega, elimina o reordena links desde aquí sin tocar los componentes.
// ============================================================

export interface NavLink {
	label: string
	href: string
	prefetch?: 'tap' | 'hover' | 'viewport' | false
	external?: boolean
}

export const NAV_LINKS: NavLink[] = [
	{ label: 'Inicio', href: '/#' },
	{ label: 'Áreas', href: '/#areas' },
	{ label: 'Sobre mí', href: '/#sobre-mi' },
	{ label: 'Valor', href: '/#valor' },
	{ label: 'Dónde', href: '/#donde' },
	{ label: 'Contacto', href: '/#contacto' },
	{ label: 'Blog', href: '/blog', prefetch: 'tap' },
]
