import { randomUUID } from 'crypto'
import {
	FilterOptionsKeys,
	ListPetsParams,
	PetUncheckedCreateWithRelations,
	PetWithRelations,
	PetsRepository,
} from '../pets-repository'
import { verifyEmptyObject } from '@/utils/verify-empty-object'
import { Address, org } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
	private pets: PetWithRelations[] = []

	async create({
		id,
		images,
		requirements,
		address,
		org,
		...rest
	}: PetUncheckedCreateWithRelations) {
		const pet: PetWithRelations = {
			id: id ? id : randomUUID(),
			org: org as org,
			address: address as Address,
			requirements: requirements.map(({ id, ...restRequirement }) => {
				return {
					id: id ? id : randomUUID(),
					petId: id ? id : randomUUID(),
					...restRequirement,
				}
			}),
			images: images as string[],
			...rest,
		}

		this.pets.push(pet)

		return pet
	}

	async getPetById(id: string) {
		const pet = this.pets.find((pet) => pet.id === id)

		if (!pet) return null

		return pet
	}

	async getPetsByCityOrCharacteristics({ city, ...rest }: ListPetsParams) {
		const filteredPetsByCity: PetWithRelations[] = []
		const filteredPets: PetWithRelations[] = []

		for (let i = 0; i < this.pets.length; i++) {
			const pet = this.pets[i]
			if (pet.address?.city === city) filteredPetsByCity.push(pet)
		}

		if (verifyEmptyObject({ object: rest })) return filteredPetsByCity

		for (let i = 0; i < filteredPetsByCity.length; i++) {
			const pet = filteredPetsByCity[i]
			const filterableCharacteristics = Object.entries(rest)
			filterableCharacteristics.forEach((charac) => {
				const key = charac[0] as FilterOptionsKeys
				const value = charac[1]

				const petValue = pet?.[key]

				if(typeof petValue === 'number' && typeof value === 'number') {
					if(petValue === value) filteredPets.push(pet)
					
				} else if(typeof petValue === 'string' && typeof value === 'string') {
					const lowerCaseValue = value.toLowerCase()
					const lowerCasePetValue = petValue.toLowerCase()
	
					if (lowerCasePetValue.includes(lowerCaseValue))
						filteredPets.push(pet)
				}
			})
		}

		return filteredPets
	}
}
