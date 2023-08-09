import { randomUUID } from 'crypto'
import {
	FilterOptions,
	FilterOptionsKeys,
	PetsRepository,
} from '../pets-repository'
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

	async getPetsByCharacteristics(query: FilterOptions) {
		const pets = this.pets.filter((pet) => {
			return Object.entries(query).map((entry) => {
				const key = entry[0] as FilterOptionsKeys
				const value: string = entry[1]
				if(!value) return
				return pet[key].toLowerCase().includes(value.toLowerCase())
			})
		})

		return pets
	}
}
