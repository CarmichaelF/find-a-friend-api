import { randomUUID } from 'crypto'
import {
	PetsRepository,
} from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
	private pets: Pet[] = []

	async create({
		id,
		description,
		name,
		oRGId,
		addressId,
	}: Prisma.PetUncheckedCreateInput) {
		const pet: Pet = {
			id: id ? id : randomUUID(),
			description,
			name,
			oRGId,
			addressId,
		}

		this.pets.push(pet)

		return pet
	}

	async getPets() {
		return this.pets
	}
}
