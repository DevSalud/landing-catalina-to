export const WHERE_TEXTS = {
	subtitle: 'Modalidades',
	title: 'Cobertura de Atención',
	description:
		'Llevando la terapia ocupacional donde la necesites. Combino la flexibilidad de la atención online con la cercanía de las visitas presenciales en zonas específicas.',
	cards: {
		online: {
			title: 'Atención Online',
			description:
				'Disponible para todo Chile. Ideal para seguimiento continuo, asesorías parentales y flexibilidad horaria desde la comodidad de tu hogar.',
			alt: 'Atención Online Terapia Ocupacional',
			features: [
				'Cobertura nacional (Arica a Punta Arenas)',
				'Sin traslados ni tiempos de espera',
			],
		},
		presential: {
			title: 'Atención a Domicilio',
			description:
				'Sesiones presenciales exclusivamente en la comodidad de tu hogar para las siguientes comunas:',
			alt: 'Atención Presencial a Domicilio',
			communes: ['Maipú', 'Cerrillos', 'Padre Hurtado'],
		},
	},
} as const
