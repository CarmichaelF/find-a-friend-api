import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetTypesUseCase } from './get-pet-types-use-case'
import { Decimal } from '@prisma/client/runtime/library'

let petsRepository: InMemoryPetsRepository
let sut: GetPetTypesUseCase

describe('Get Pet Types', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new GetPetTypesUseCase(petsRepository)
	})

	it('should be able to retrieve all pet types', async () => {
		await petsRepository.create({
			id: 'pet-test',
			oRGId: 'org-fake',
			addressId: 'address-test',
			name: 'Simba',
			description: 'Test description',
			age: 'Puppy',
			petSize: 'Medium',
			energyLevel: 'Low',
			independencyLevel: 'Low',
			environment: 'Large',
			images: [],
			address: {
				id: 'address-test',
				latitude: new Decimal(48.8698679),
				longitude: new Decimal(2.3072976),
				city: 'Paris',
				zipcode: '75008',
				address: '29 champs elysée paris',
			},
			requirements: [],
			petType: 'dog',
		})

		await petsRepository.create({
			id: 'pet-test-2',
			oRGId: 'org-fake',
			addressId: 'address-test-2',
			name: 'Simba',
			description: 'Test description',
			age: 'Puppy',
			petSize: 'Medium',
			energyLevel: 'Low',
			independencyLevel: 'Low',
			environment: 'Large',
			images: [],
			address: {
				id: 'address-test-2',
				latitude: new Decimal(23.5991253),
				longitude: new Decimal(46.6362542),
				city: 'São Paulo',
				zipcode: '04035-001',
				address: 'R. Domingos de Morais',
			},
			requirements: [],
			petType: 'dog',
		})

		const allTypes = await sut.execute()


		expect(allTypes.types).toEqual(['dog'])
	})
	it('should return an empty array', async () => {
		const allTypes = await sut.execute()

		expect(allTypes.types).toEqual([])
	})
})
