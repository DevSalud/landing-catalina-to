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
export const CENTER_NAME = 'Consulta Particular'
export const CENTER_URL = 'https://cataterapia.cl'
export const CENTER_SCHEMA_ID = 'https://cataterapia.cl/#consulta'

// --- Dirección ---
export const ADDRESS_STREET = 'Av. Alcalde José Luis Infante Larraín #1685'
export const ADDRESS_CITY = 'Maipú'
export const ADDRESS_REGION = 'Santiago'
export const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_CITY}, ${ADDRESS_REGION}`
export const ADDRESS_POSTAL_CODE = '9281356'
export const ADDRESS_COUNTRY = 'CL'

// Coordenadas de la consulta (Av. Alcalde José Luis Infante Larraín #1685, Maipú)
export const GEO_LAT = -33.5625783
export const GEO_LNG = -70.7803404

// --- Google Maps ---
// Query para el embed del mapa
export const MAPS_EMBED_QUERY =
	'Av.+Alcalde+Jos%C3%A9+Luis+Infante+Larra%C3%ADn+1685+Maip%C3%BA+Santiago'

// --- Sitio web ---
export const SITE_URL = 'https://cataterapia.cl'
export const SITE_NAME = 'Catalina Herrera'
export const SITE_ALTERNATE_NAMES = ['Cataterapia', 'Catalina TO'] as const

// --- Precios (en CLP) ---
export const PRICE_PARTICULAR = 30_000
export const PRICE_FONASA = 26_000
export const PRICE_DOMICILIO = 40_000

// --- Horarios y atención ---
export const SESSION_DURATION_MIN = '35-45' // 35-45 minutos
export const SCHEDULE = [
	{ days: 'Lunes', hours: '15:00 a 20:00' },
	{ days: 'Martes', hours: '10:00 a 20:00' },
	{ days: 'Miércoles', hours: '10:00 a 20:00' },
]
export const AVAILABILITY_DAYS = 'Lunes, Martes y Miércoles'
export const PAYMENT_METHOD = 'Transferencia bancaria y/o efectivo'

// --- SEO defaults ---
export const DEFAULT_TITLE = `Terapia Ocupacional en Maipú | ${PROFESSIONAL_NAME}`
export const DEFAULT_DESCRIPTION =
	'Terapeuta Ocupacional en Maipú, Santiago. Atención especializada para niños y adolescentes. Valores preferenciales Fonasa. ¡Agenda tu hora!'
export const DEFAULT_OG_IMAGE = '/images/Catalina.webp'
export const DEFAULT_OG_IMAGE_ALT = 'Foto de Catalina Herrera sonriendo'

// --- Datos Bancarios para Transferencia ---
export const BANK_NAME = 'Banco de Chile'
export const BANK_ACCOUNT_TYPE = 'Cuenta Vista'
export const BANK_ACCOUNT_NUMBER = '00-013-90223-40'
export const BANK_RUT = '20.237.564-2'
export const BANK_RECEIPT_EMAIL = EMAIL
