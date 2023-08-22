export function normalizeCity(city: string) {
	return city
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
}
