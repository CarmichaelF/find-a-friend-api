import { randomUUID } from 'crypto'
import {
	FilterOptionsKeys,
	FilterPetsParams,
	PetWithRelations,
	PetsRepository,
	PetsRepositoryCreateParams,
} from '../pets-repository'
import { verifyEmptyObject } from '@/utils/verify-empty-object'

export class InMemoryPetsRepository implements PetsRepository {
	private pets: PetWithRelations[] = []

	async create({ id, ...rest }: PetsRepositoryCreateParams) {
		const pet: PetWithRelations = {
			id: id ? id : randomUUID(),
			...rest,
		}

		this.pets.push(pet)

		return pet
	}

	async getPets() {
		return this.pets
	}

	async getPetById(id: string) {
		const pet = this.pets.find((pet) => pet.id === id)

		if (!pet) return null

		return pet
	}

	async filterPetsByCityOrCharacteristics({ city, ...rest }: FilterPetsParams) {
		const filteredPetsByCity: PetWithRelations[] = []
		const filteredPets: PetWithRelations[] = []

		for (let i = 0; i < this.pets.length; i++) {
			const pet = this.pets[i]
			if (pet.address?.city === city) filteredPetsByCity.push(pet)
		}
	
		if (verifyEmptyObject({ object: rest }))
			return filteredPetsByCity

		for (let i = 0; i < filteredPetsByCity.length; i++) {
			const pet = filteredPetsByCity[i]
			const filterableCharacteristics = Object.entries(rest)
			filterableCharacteristics.forEach((charac) => {
				const key = charac[0] as FilterOptionsKeys
				const value = charac[1]

				if (pet?.[key].toLowerCase().includes(value.toLowerCase()))
					filteredPets.push(pet)
			})
		}

		return filteredPets
	}
}
