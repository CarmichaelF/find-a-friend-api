import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FilterPetsByCharacteristics } from './filter-pets-by-characteristics-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: PetsRepository
let sut: FilterPetsByCharacteristics

describe('Filter Pets By Characteristics', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new FilterPetsByCharacteristics(petsRepository)
	})

	it('should be able to filter pets by characteristics', async () => {
		await petsRepository.create({
			id: 'pet-id',
			name: 'Simba',
			description: 'asgasg',
			oRGId: 'org-id',
		})

		const { pets } = await sut.execute({
			name: 'Simba',
		})

		expect(pets).toHaveLength(1)
	})
})
