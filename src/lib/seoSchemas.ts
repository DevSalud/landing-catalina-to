export function createPersonSchema(
	siteBase: string,
	options?: { includeOfferCatalog?: boolean },
) {
	const base = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${siteBase}/#catalina`,
		name: 'Catalina Herrera',
		alternateName: ['Cataterapias', 'Catalina TO'],
		jobTitle: 'Terapeuta Ocupacional',
		image: `${siteBase}/images/Catalina.webp`,
		description:
			'Terapeuta Ocupacional especializada en niños y adolescentes en Maipú, Santiago.',
		telephone: '+56992194020',
		email: 'catalina.herrera.to@gmail.com',
		url: siteBase,
		sameAs: [
			'https://api.whatsapp.com/send?phone=56992194020',
			'https://centroinclusionsana.site.agendapro.com/cl/sucursal/340116/profesional/569175',
		],
		worksFor: {
			'@type': 'LocalBusiness',
			'@id': 'https://centroinclusionsana.site.agendapro.com/#centro',
			name: 'Centro Inclusión Sana',
			url: 'https://centroinclusionsana.site.agendapro.com/cl/sucursal/340116',
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'Av. Los Pajaritos 666',
				addressLocality: 'Maipú',
				postalCode: '9252853',
				addressRegion: 'RM',
				addressCountry: 'CL',
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: -33.5211062,
				longitude: -70.7624316,
			},
		},
		knowsAbout: [
			'Terapia Ocupacional Infantil',
			'Integración Sensorial',
			'Desarrollo Psicomotor',
			'Estimulación del Desarrollo',
		],
	} as const

	if (options?.includeOfferCatalog) {
		const itemOffered = {
			'@type': 'Service',
			name: 'Sesión Terapéutica',
			areaServed: 'Maipú',
			availableChannel: {
				'@type': 'ServiceChannel',
				serviceLocation: {
					'@type': 'Place',
					address: {
						'@type': 'PostalAddress',
						streetAddress: 'Av. Los Pajaritos 666',
						addressLocality: 'Maipú',
						addressRegion: 'RM',
						postalCode: '9252853',
						addressCountry: 'CL',
					},
				},
			},
			hoursAvailable: {
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
				opens: '10:00',
				closes: '18:00',
			},
		}

		const makesOffer = [
			{
				'@type': 'Offer',
				name: 'Sesión terapéutica particular',
				priceCurrency: 'CLP',
				price: '21990',
				availability: 'https://schema.org/InStock',
				seller: { '@id': `${siteBase}/#catalina` },
				itemOffered,
			},
			{
				'@type': 'Offer',
				name: 'Sesión terapéutica con descuento Fonasa',
				priceCurrency: 'CLP',
				price: '15000',
				availability: 'https://schema.org/InStock',
				seller: { '@id': `${siteBase}/#catalina` },
				itemOffered,
			},
		]
		return { ...base, makesOffer }
	}
	return base
}

export function createBreadcrumbListSchema(
	items: Array<{ name: string; item: string }>,
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((it, idx) => ({
			'@type': 'ListItem',
			position: idx + 1,
			name: it.name,
			item: it.item,
		})),
	}
}

export function createBlogSchema(params: {
	canonicalUrl: string
	description: string
	name?: string
}) {
	const {
		canonicalUrl,
		description,
		name = 'Blog de Terapia Ocupacional',
	} = params
	return {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name,
		url: canonicalUrl,
		description,
	}
}

export function createBlogPostingSchema(params: {
	siteBase: string
	canonicalUrl: string
	headline: string
	description: string
	image: string
	authorName: string
	datePublished?: string
	articleSection?: string
	keywords?: string
}) {
	const {
		siteBase,
		canonicalUrl,
		headline,
		description,
		image,
		authorName,
		datePublished,
		articleSection,
		keywords,
	} = params

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline,
		description,
		image,
		author: {
			'@type': 'Person',
			'@id': `${siteBase}/#catalina`,
			name: authorName,
		},
		datePublished,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonicalUrl,
		},
		publisher: {
			'@type': 'LocalBusiness',
			'@id': 'https://centroinclusionsana.site.agendapro.com/#centro',
			name: 'Centro Inclusión Sana',
			url: 'https://centroinclusionsana.site.agendapro.com/cl/sucursal/340116',
		},
		articleSection,
		keywords,
	}
}
