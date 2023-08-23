import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetNotFoundError } from '../errors/pet-not-found-error'
import { Decimal } from '@prisma/client/runtime/library'

let petsRepository: PetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new GetPetDetailsUseCase(petsRepository)
	})

	it('should be able to get pet details', async () => {
		await petsRepository.create({
			addressId: 'address-test',
			age: 'Filhote',
			petSize: 'Médio',
			energyLevel: 'Alta',
			independencyLevel: 'Pequena',
			environment: 'Grande',
			images: [],
			requirements: [],
			description: 'Description test',
			name: 'Simba',
			oRGId: 'org-test',
			id: 'pet-test',
			address: {
				id: 'address-test',
				latitude: new Decimal(48.8698679),
				longitude: new Decimal(2.3072976),
				city: 'Paris',
				zipcode: '75008',
				address: '29 champs elysée paris',
			},
			petType: 'cachorro'
		})
		const { pet } = await sut.execute({ id: 'pet-test' })

		expect(pet).toEqual(
			expect.objectContaining({
				id: 'pet-test',
			})
		)
	})

	it('should not be able to get pet details', async () => {
		expect(async () => {
			await sut.execute({ id: 'pet-test' })
		}).rejects.toBeInstanceOf(PetNotFoundError)
	})
})
