export function createPersonSchema(
	siteBase: string,
	options?: { includeOfferCatalog?: boolean },
) {
	const base = {
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
			'https://cal.com/catalina-herrera-ygpr9v',
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
		const makesOffer = [
			{
				'@type': 'Offer',
				name: 'Sesión terapéutica particular',
				priceCurrency: 'CLP',
				price: '25000',
				availability: 'https://schema.org/InStock',
				seller: {
					'@type': 'Person',
					'@id': `${siteBase}/#catalina`,
				},
				itemOffered: {
					'@type': 'Service',
					name: 'Sesión Terapéutica Particular',
					areaServed: 'Maipú, Santiago de Chile',
				},
			},
			{
				'@type': 'Offer',
				name: 'Sesión terapéutica con descuento Fonasa',
				priceCurrency: 'CLP',
				price: '20000',
				availability: 'https://schema.org/InStock',
				seller: {
					'@type': 'Person',
					'@id': `${siteBase}/#catalina`,
				},
				itemOffered: {
					'@type': 'Service',
					name: 'Sesión Terapéutica Fonasa',
					areaServed: 'Maipú, Santiago de Chile',
				},
			},
		]
		return [
			{
				...base,
				makesOffer,
			},
		]
	}
	return [
		{
			...base,
		},
	]
}

export function createWebSiteSchema(siteBase: string) {
	return {
		'@type': 'WebSite',
		'@id': `${siteBase}/#website`,
		name: 'Catalina Herrera',
		alternateName: ['Cataterapias', 'Catalina TO'],
		url: siteBase,
	}
}

export function createBreadcrumbListSchema(
	items: Array<{ name: string; item: string }>,
) {
	return {
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
