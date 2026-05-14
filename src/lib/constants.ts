// ============================================================
// CONSTANTES DEL SITIO — Catalina Herrera, Terapeuta Ocupacional
// Fuente única de verdad para todos los datos del sitio.
// ============================================================

// --- Identidad profesional ---
export const PROFESSIONAL_NAME = 'Catalina Herrera'
export const PROFESSIONAL_TITLE = 'Terapeuta Ocupacional'
export const PROFESSIONAL_UNIVERSITY = 'Universidad Autónoma de Chile'
export const PROFESSIONAL_SINCE_YEAR = 2023

// --- Contacto ---
export const PHONE_RAW = '56992194020' // Sin espacios, para uso en URLs
export const PHONE_DISPLAY = '+56 9 9219 4020' // Para mostrar al usuario
export const EMAIL = 'catalina.herrera.to@gmail.com'

// --- URLs externas ---
export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${PHONE_RAW}`
export const CALENDAR_NAMESPACE = 'catalina-herrera-ygpr9v'
export const CALENDAR_URL = `https://cal.com/${CALENDAR_NAMESPACE}`
export const CALENDAR_LINK_PARTICULAR = `${CALENDAR_NAMESPACE}/terapia-ocupacional`
export const CALENDAR_URL_PARTICULAR = `https://cal.com/${CALENDAR_LINK_PARTICULAR}`
export const CALENDAR_LINK_FONASA = `${CALENDAR_NAMESPACE}/terapia-ocupacional-preferencial`
export const CALENDAR_URL_FONASA = `https://cal.com/${CALENDAR_LINK_FONASA}`
export const CALENDAR_LINK_DOMICILIO = `${CALENDAR_NAMESPACE}/terapia-ocupacional-domiciliaria`
export const CALENDAR_URL_DOMICILIO = `https://cal.com/${CALENDAR_LINK_DOMICILIO}`

// --- Centro de atención ---
export const CENTER_NAME = 'Centro Inclusión SANA'
export const CENTER_URL =
	'https://centroinclusionsana.site.agendapro.com/cl/sucursal/340116'
export const CENTER_SCHEMA_ID =
	'https://centroinclusionsana.site.agendapro.com/#centro'

// --- Dirección ---
export const ADDRESS_STREET = 'Gral. Ordóñez 155, Of. 1609'
export const ADDRESS_CITY = 'Maipú'
export const ADDRESS_REGION = 'Santiago'
export const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_CITY}, ${ADDRESS_REGION}`
export const ADDRESS_POSTAL_CODE = '9252853'
export const ADDRESS_COUNTRY = 'CL'

// Coordenadas del nuevo centro (General Ordóñez 155, Maipú)
// TODO: Verificar coordenadas exactas de la nueva dirección
export const GEO_LAT = -33.507814
export const GEO_LNG = -70.7582636

// --- Google Maps ---
// Query para el embed del mapa (actualizar cuando se confirmen coordenadas)
export const MAPS_EMBED_QUERY =
	'General+Ord%C3%B3%C3%B1ez+155+Maip%C3%BA+Santiago'

// --- Sitio web ---
export const SITE_URL = 'https://www.cataterapia.cl'
export const SITE_NAME = 'Catalina Herrera'
export const SITE_ALTERNATE_NAMES = ['Cataterapia', 'Catalina TO'] as const

// --- Precios (en CLP) ---
export const PRICE_PARTICULAR = 25_000
export const PRICE_FONASA = 20_000
export const PRICE_DOMICILIO = 35_000

// --- Horarios y atención ---
export const SESSION_DURATION_MIN = 45 // 45 minutos
export const SCHEDULE = [
	{ days: 'Lunes', hours: '09:00 a 13:00' },
	{ days: 'Viernes', hours: '09:00 a 19:00' },
	{ days: 'Sábados', hours: '09:00 a 12:00' },
]
export const AVAILABILITY_DAYS = 'Lunes, Viernes y Sábado'
export const PAYMENT_METHOD = 'Transferencia bancaria'

// --- SEO defaults ---
export const DEFAULT_TITLE = `Terapia Ocupacional en Maipú | ${PROFESSIONAL_NAME}`
export const DEFAULT_DESCRIPTION =
	'Terapeuta Ocupacional en Maipú, Santiago. Atención especializada para niños y adolescentes. Valores preferenciales Fonasa. ¡Agenda tu hora!'
export const DEFAULT_OG_IMAGE = '/images/Catalina.webp'
export const DEFAULT_OG_IMAGE_ALT = 'Foto de Catalina Herrera sonriendo'
