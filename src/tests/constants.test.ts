import { describe, expect, it } from 'vitest'
import {
	CALENDAR_URL,
	MAPS_EMBED_QUERY,
	PRICE_DOMICILIO,
	PRICE_FONASA,
	PRICE_PARTICULAR,
	WHATSAPP_URL,
} from '../lib/constants'

const WHATSAPP_REGEX = /^https:\/\/api\.whatsapp\.com\/send\?phone=/
const HTTP_REGEX = /^https?:\/\//

describe('Constantes de Negocio', () => {
	it('Las URLs esenciales deben ser válidas', () => {
		// Verificar que whatsapp empieza correctamente
		expect(WHATSAPP_URL).toMatch(WHATSAPP_REGEX)

		// Verificar que calendar (cita) sea un URL formato http
		expect(CALENDAR_URL).toMatch(HTTP_REGEX)

		// Verificar maps
		expect(MAPS_EMBED_QUERY).toContain('General+Ord')
	})

	it('Los precios deben ser números mayores a 0', () => {
		expect(PRICE_PARTICULAR).toBeGreaterThan(0)
		expect(PRICE_FONASA).toBeGreaterThan(0)
		expect(PRICE_DOMICILIO).toBeGreaterThan(0)
	})
})
