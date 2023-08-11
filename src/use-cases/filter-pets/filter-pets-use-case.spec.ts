import { AddressRepository } from '@/repositories/address-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FilterPetsUseCase } from './filter-pets-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository'
import { ORGsRepository } from '@/repositories/orgs-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hashSync } from 'bcryptjs'
import { env } from '@/env'

let petsRepository: PetsRepository
let addressRepository: AddressRepository
let orgsRepository: ORGsRepository
let sut: FilterPetsUseCase

describe('Filter Pets', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		addressRepository = new InMemoryAddressRepository()
		orgsRepository = new InMemoryOrgsRepository()
		sut = new FilterPetsUseCase(petsRepository, addressRepository)
	})

	it('should be able to filter a pet by city', async () => {
		const address1 = await addressRepository.create({
			latitude: 48.8698679,
			longitude: 2.3072976,
			city: 'Paris',
			zipcode: '75008',
			address: '29 champs elysée paris',
		})
		
		const address2 = await addressRepository.create({
			latitude: 23.5991253,
			longitude: 46.6362542,
			city: 'São Paulo',
			zipcode: '04035-001',
			address: 'R. Domingos de Morais',
		})

		const org1 = await orgsRepository.create({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			addressId: address1.id,
			password_hash: hashSync('123456', env.HASH_SALT),
			phone: '1199999999',
		})
		
		const org2 = await orgsRepository.create({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			addressId: address2.id,
			password_hash: hashSync('123456', env.HASH_SALT),
			phone: '1199999999',
		})
        
		const pet1 = await petsRepository.create({
			id: 'pet-test',
			oRGId: org1.id,
			addressId: address1.id,
			name: 'Simba',
			description: 'Test description',
		})
		
		await petsRepository.create({
			id: 'pet-test-2',
			oRGId: org2.id,
			addressId: address2.id,
			name: 'Simba',
			description: 'Test description',
		})

		const { pets } = await sut.execute({ city: 'Paris' })

		expect(pets).toHaveLength(1)
		expect(pets).toEqual([pet1])
	})

	it('should be able to filter a pet by city and characterictics', async () => {
		const address = await addressRepository.create({
			latitude: 48.8698679,
			longitude: 2.3072976,
			city: 'Paris',
			zipcode: '75008',
			address: '29 champs elysée paris',
		})

		const org = await orgsRepository.create({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			addressId: address.id,
			password_hash: hashSync('123456', env.HASH_SALT),
			phone: '1199999999',
		})
        
		const pet1 = await petsRepository.create({
			id: 'pet-test',
			oRGId: org.id,
			addressId: address.id,
			name: 'Simba',
			description: 'Tired',
		})
		
		await petsRepository.create({
			id: 'pet-test-2',
			oRGId: org.id,
			addressId: address.id,
			name: 'Simba',
			description: 'Energetic',
		})

		const { pets } = await sut.execute({ city: 'Paris', description: 'tired' })

		expect(pets).toHaveLength(1)
		expect(pets).toEqual([pet1])
	})
})
