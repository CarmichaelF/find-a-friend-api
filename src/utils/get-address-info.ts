import { env } from '@/env'
import NodeGeocoder from 'node-geocoder'

interface GetAddressInfoParams {
  address: string;
  zipcode: string;
}

export async function getAddressInfo({
	address,
	zipcode,
}: GetAddressInfoParams) {
	const geocoder = NodeGeocoder({
		provider: 'google',
		apiKey: env.MAPS_API_KEY,
	})
	const [data] = await geocoder.geocode({
		address,
		zipcode,
		limit: 1,
	})

	return data
}
