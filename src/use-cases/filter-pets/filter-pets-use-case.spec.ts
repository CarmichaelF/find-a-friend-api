import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FilterPetsUseCase } from './filter-pets-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ORGsRepository } from '@/repositories/orgs-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hashSync } from 'bcryptjs'
import { env } from '@/env'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'

let petsRepository: PetsRepository
let orgsRepository: ORGsRepository
let sut: FilterPetsUseCase

describe('Filter Pets', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		orgsRepository = new InMemoryOrgsRepository()
		sut = new FilterPetsUseCase(petsRepository)
	})

	it('should be able to filter a pet by city', async () => {
		const org1 = await orgsRepository.create({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			addressId: 'address-test',
			password_hash: hashSync('123456', env.HASH_SALT),
			phone: '1199999999',
		})

		const org2 = await orgsRepository.create({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			addressId: 'address-test',
			password_hash: hashSync('123456', env.HASH_SALT),
			phone: '1199999999',
		})

		const pet1 = await petsRepository.create({
			id: 'pet-test',
			oRGId: org1.id,
			addressId: 'address-test',
			name: 'Simba',
			description: 'Test description',
			age: 'Puppy',
			dogSize: 'Medium',
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
		})

		await petsRepository.create({
			id: 'pet-test-2',
			oRGId: org2.id,
			addressId: 'address-test-2',
			name: 'Simba',
			description: 'Test description',
			age: 'Puppy',
			dogSize: 'Medium',
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
		})

		const { pets } = await sut.execute({ city: 'Paris' })

		expect(pets).toHaveLength(1)
		expect(pets).toEqual([pet1])
	})

	it('should be able to filter a pet by city and characterictics', async () => {
		const org = await orgsRepository.create({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			addressId: 'address-test',
			password_hash: hashSync('123456', env.HASH_SALT),
			phone: '1199999999',
		})

		const pet1 = await petsRepository.create({
			id: 'pet-test',
			oRGId: org.id,
			addressId: 'address-test',
			name: 'Simba',
			description: 'Tired',
			age: 'Puppy',
			dogSize: 'Medium',
			energyLevel: 'Low',
			independencyLevel: 'Low',
			environment: 'Large',
			images: [],
			address: {
				id: randomUUID(),
				latitude: new Decimal(48.8698679),
				longitude: new Decimal(2.3072976),
				city: 'Paris',
				zipcode: '75008',
				address: '29 champs elysée paris',
			},
			requirements: [],
		})

		await petsRepository.create({
			id: 'pet-test-2',
			oRGId: org.id,
			addressId: 'address-test',
			name: 'Simba',
			description: 'Energetic',
			age: 'Puppy',
			dogSize: 'Medium',
			energyLevel: 'Low',
			independencyLevel: 'Low',
			environment: 'Large',
			images: [],
			address: {
				id: randomUUID(),
				latitude: new Decimal(48.8698679),
				longitude: new Decimal(2.3072976),
				city: 'Paris',
				zipcode: '75008',
				address: '29 champs elysée paris',
			},
			requirements: [],
		})

		const { pets } = await sut.execute({ city: 'Paris', description: 'tired' })

		expect(pets).toHaveLength(1)
		expect(pets).toEqual([pet1])
	})
})
