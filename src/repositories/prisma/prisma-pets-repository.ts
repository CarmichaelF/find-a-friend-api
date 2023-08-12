import { prisma } from '@/lib/prisma'
import {
	FilterPetsParams,
	PetsRepository,
	PetsRepositoryCreateParams,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
	async create({ address, requirements, ...rest }: PetsRepositoryCreateParams) {
		const petAddress = await prisma.address.create({
			data: address,
		})
		const pet = await prisma.pet.create({
			data: {
				...rest,
				requirements: {
					create: requirements,
				},
				addressId: petAddress.id,
			},
			include: { address: true, requirements: true },
		})

		return pet
	}

	async getPetById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: { id },
			include: { address: true, requirements: true },
		})
		return pet
	}

	async filterPetsByCityOrCharacteristics({
		city,
		age,
		description,
		dogSize,
		energyLevel,
		environment,
		independencyLevel,
		name,
	}: FilterPetsParams) {
		const pets = await prisma.pet.findMany({
			where: {
				address: {
					city,
				},
				AND: {
					name: {
						contains: name,
					},
					age: {
						contains: age,
					},
					description: {
						contains: description,
					},
					dogSize: {
						contains: dogSize,
					},
					energyLevel: {
						contains: energyLevel,
					},
					environment: {
						contains: environment,
					},
					independencyLevel: {
						contains: independencyLevel,
					},
				},
			},
			include: {
				address: true,
				requirements: true,
			},
		})

		return pets
	}
}
