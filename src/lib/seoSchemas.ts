import {
	ADDRESS_CITY,
	ADDRESS_COUNTRY,
	ADDRESS_POSTAL_CODE,
	ADDRESS_REGION,
	ADDRESS_STREET,
	CALENDAR_URL,
	CENTER_NAME,
	CENTER_SCHEMA_ID,
	CENTER_URL,
	EMAIL,
	GEO_LAT,
	GEO_LNG,
	PHONE_RAW,
	PRICE_FONASA,
	PRICE_PARTICULAR,
	PROFESSIONAL_NAME,
	PROFESSIONAL_TITLE,
	SITE_ALTERNATE_NAMES,
	WHATSAPP_URL,
} from './constants'

export function createPersonSchema(
	siteBase: string,
	options?: { includeOfferCatalog?: boolean },
) {
	const base = {
		'@type': 'Person',
		'@id': `${siteBase}/#catalina`,
		name: PROFESSIONAL_NAME,
		alternateName: SITE_ALTERNATE_NAMES,
		jobTitle: PROFESSIONAL_TITLE,
		image: `${siteBase}/images/Catalina.webp`,
		description: `${PROFESSIONAL_TITLE} especializada en niños y adolescentes en ${ADDRESS_CITY}, Santiago.`,
		telephone: `+${PHONE_RAW}`,
		email: EMAIL,
		url: siteBase,
		sameAs: [WHATSAPP_URL, CALENDAR_URL],
		worksFor: {
			'@type': 'LocalBusiness',
			'@id': CENTER_SCHEMA_ID,
			name: CENTER_NAME,
			url: CENTER_URL,
			address: {
				'@type': 'PostalAddress',
				streetAddress: ADDRESS_STREET,
				addressLocality: ADDRESS_CITY,
				postalCode: ADDRESS_POSTAL_CODE,
				addressRegion: ADDRESS_REGION,
				addressCountry: ADDRESS_COUNTRY,
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: GEO_LAT,
				longitude: GEO_LNG,
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
				price: String(PRICE_PARTICULAR),
				availability: 'https://schema.org/InStock',
				seller: {
					'@type': 'Person',
					'@id': `${siteBase}/#catalina`,
				},
				itemOffered: {
					'@type': 'Service',
					name: 'Sesión Terapéutica Particular',
					areaServed: `${ADDRESS_CITY}, Santiago de Chile`,
				},
			},
			{
				'@type': 'Offer',
				name: 'Sesión terapéutica con descuento Fonasa',
				priceCurrency: 'CLP',
				price: String(PRICE_FONASA),
				availability: 'https://schema.org/InStock',
				seller: {
					'@type': 'Person',
					'@id': `${siteBase}/#catalina`,
				},
				itemOffered: {
					'@type': 'Service',
					name: 'Sesión Terapéutica Fonasa',
					areaServed: `${ADDRESS_CITY}, Santiago de Chile`,
				},
			},
		]
		return [{ ...base, makesOffer }]
	}
	return [{ ...base }]
}

export function createWebSiteSchema(siteBase: string) {
	return {
		'@type': 'WebSite',
		'@id': `${siteBase}/#website`,
		name: PROFESSIONAL_NAME,
		alternateName: SITE_ALTERNATE_NAMES,
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
			'@id': CENTER_SCHEMA_ID,
			name: CENTER_NAME,
			url: CENTER_URL,
		},
		articleSection,
		keywords,
	}
}

export function createFAQPageSchema(
	faqs: Array<{ question: string; answer: string }>,
) {
	return {
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
	}
}
