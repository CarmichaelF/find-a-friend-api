import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
	public pets: Pet[] = []
	
	async create({
		id,
		description,
		name,
		oRGId,
	}: Prisma.PetUncheckedCreateInput) {
		const pet: Pet = {
			id: id ? id : randomUUID(),
			description,
			name,
			oRGId,
		}
		
		this.pets.push(pet)
		
		return pet
	}
}
