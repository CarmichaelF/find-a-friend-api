import { AddressRepository } from '../address-repository'
import { Address } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { normalizeCity } from '@/utils/normalize-city'

export class PrismaAddressRepository implements AddressRepository {
	async create({ city, ...rest }: Address) {
		const cityNormalized = normalizeCity(city)

		const address = await prisma.address.create({
			data: { city: cityNormalized, ...rest },
		})

		return address
	}

	async getAddressById(id: string) {
		const address = await prisma.address.findUnique({
			where: { id },
		})

		return address
	}
}
