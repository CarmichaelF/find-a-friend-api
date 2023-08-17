import { env } from '@/env'
import {AddressType, Client} from '@googlemaps/google-maps-services-js'

interface GetAddressInfoParams {
  address: string;
  zipcode: string;
}

export async function getAddressInfo({
	address,
	zipcode,
}: GetAddressInfoParams) {
	const client = new Client({})

	const result = await client
		.geocode({
			params: {
				key: env.MAPS_API_KEY,
				address: `${address}, ${zipcode}`,
			},
		})

	const place = await client
		.placeDetails({
			params: {
				key: env.MAPS_API_KEY,
				place_id: result.data.results[0].place_id,
			}
		})
		
	const findAddressComponent = (type: AddressType) => {
		const component = place.data.result.address_components?.find((component) => component.types.includes(type))
		return component?.long_name
	}

	const city = findAddressComponent(AddressType.administrative_area_level_2)

	return {city, ...result.data.results[0].geometry.location, formattedAddress: result.data.results[0].formatted_address}
}
