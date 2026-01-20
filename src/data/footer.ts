export const FOOTER_TEXTS = {
	identity: {
		name: 'Catalina Herrera',
		logoAlt: 'Logo de',
		description:
			'Terapia Ocupacional dedicada al desarrollo integral de niños y adolescentes, en un ambiente acogedor y profesional.',
		sana: {
			name: 'Centro Inclusión SANA',
			agreement: 'Convenio Vigente',
		},
		online: {
			text: 'Atención Online (Todo Chile)',
			platforms: 'Google Meet / Zoom / Microsoft Teams',
		},
		home: {
			text: 'Atención a Domicilio',
			communes: 'Maipú, Cerrillos, Padre Hurtado',
		},
	},
	navigation: {
		title: 'Navegación',
		links: [
			{ text: 'Inicio', href: '/' },
			{ text: 'Sobre Mí', href: '/#sobre-mi' },
			{ text: 'Servicios', href: '/#areas' },
			{ text: 'Cobertura', href: '/#donde' },
			{ text: 'Inversión', href: '/#valor' },
			{ text: 'Blog', href: '/blog' },
		],
	},
	patients: {
		title: 'Pacientes',
		regulations: {
			text: 'Normativas de Atención',
			href: '/normativas',
		},
		schedule: {
			text: 'Agendar Hora',
			badge: 'Online',
			href: 'https://cal.com/catalina-herrera-ygpr9v',
		},
	},
	contact: {
		title: 'Contacto',
		email: 'catalina.herrera.to@gmail.com',
		phone: '+56 9 9219 4020',
		whatsappLink: 'https://api.whatsapp.com/send?phone=56992194020',
	},
	copyright: 'Catalina Herrera. Todos los derechos reservados.',
} as const
