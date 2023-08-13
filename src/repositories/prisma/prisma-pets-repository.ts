/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma'
import {
	ListPetsParams,
	PetUncheckedCreateWithRelations,
	PetsRepository,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
	async create({
		addressId,
		requirements,
		address,
		...rest
	}: PetUncheckedCreateWithRelations) {
		const pet = await prisma.pet.create({
			data: {
				...rest,
				requirements: {
					create: requirements,
				},
				addressId
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

	async getPetsByCityOrCharacteristics({
		city,
		age,
		description,
		petSize,
		energyLevel,
		environment,
		independencyLevel,
		name,
	}: ListPetsParams) {
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
					petSize: {
						contains: petSize,
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
