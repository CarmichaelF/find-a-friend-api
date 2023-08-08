import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
	public pets: Pet[] = []

	async create({ id, description, name, requirements }: Prisma.PetCreateInput) {
		const pet = {
			id: id ? id : randomUUID(),
			description,
			name,
			requirements,
		}

		this.pets.push(pet)

		return pet
	}
}
