import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hashSync } from 'bcryptjs'
import { env } from '@/env'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { randomUUID } from 'crypto'
import startCloudinary from '@/services/start-cloudinary-service'
import { PetImageQuantityError } from '../errors/pet-image-quantity-error'
import { ORGsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository'
import { AddressRepository } from '@/repositories/address-repository'
import { AgeEnum, EnergyLevelEnum, EnvironmentEnum, IndependencyLevelEnum, PetSizeEnum } from '../list-filters/list-pet-filters-use-case'

let petsRepository: PetsRepository
let orgsRepository: ORGsRepository
let addressRepository: AddressRepository
let sut: RegisterPetUseCase

describe('Register a new Pet', () => {
	beforeAll(() => {
		startCloudinary()
	})
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		orgsRepository = new InMemoryOrgsRepository()
		addressRepository = new InMemoryAddressRepository()
		sut = new RegisterPetUseCase(petsRepository, orgsRepository, addressRepository)
	})

	it('should be able to register a new pet', async () => {
		await addressRepository.create(
			{
				address: '29 champs elysée',
				zipcode: '75008',
				city: 'Paris',
				latitude: 48.877343,
				longitude: 2.329962,
				id: 'address-id',
			}
		)
		
		await orgsRepository.create({
			id: 'test-org',
			addressId: 'address-id',
			email: 'org@gmail.com',
			name: 'ORG test',
			phone: '999999999',
			password_hash: hashSync('123456', env.HASH_SALT),
		})

		const { pet } = await sut.execute({
			name: 'Simba',
			oRGId: 'test-org',
			description: 'Simba description',
			age: AgeEnum.puppy,
			petSize: PetSizeEnum.medium,
			energyLevel: EnergyLevelEnum.high,
			independencyLevel: IndependencyLevelEnum.low,
			environment: EnvironmentEnum.big,
			images: [
				'https://res.cloudinary.com/ddpeptbbo/image/upload/v1692820163/pexels-simona-kidri%C4%8D-2607544_dkngwd.jpg',
			],
			requirements: [
				{
					id: randomUUID(),
					description: 'Apartment is prohibited',
				},
			],
			petType: 'cachorro'
		})

		expect(pet.id).toEqual(expect.any(String))
		expect(pet.oRGId).toEqual('test-org')
		expect(pet.name).toEqual('Simba')
	})

	it('should not be able to register a new pet', async () => {
		expect(
			async () =>
				await sut.execute({
					name: 'Simba',
					oRGId: 'test-org',
					description: 'Simba description',
					age: AgeEnum.puppy,
					petSize: PetSizeEnum.medium,
					energyLevel: EnergyLevelEnum.high,
					independencyLevel: IndependencyLevelEnum.low,
					environment: EnvironmentEnum.big,
					images: [
						'https://res.cloudinary.com/ddpeptbbo/image/upload/v1692820163/pexels-simona-kidri%C4%8D-2607544_dkngwd.jpg',
					],
					requirements: [
						{
							id: randomUUID(),
							description: 'Apartment is prohibited',
						},
					],
					petType: 'cachorro'
				})
		).rejects.toBeInstanceOf(OrgNotFoundError)
	})

	it('should not be able to register a new pet without images', async () => {
		await orgsRepository.create({
			id: 'test-org',
			addressId: 'address-id',
			email: 'org@gmail.com',
			name: 'ORG test',
			phone: '999999999',
			password_hash: hashSync('123456', env.HASH_SALT),
		})

		expect(
			async () =>
				await sut.execute({
					name: 'Simba',
					oRGId: 'test-org',
					description: 'Simba description',
					age: AgeEnum.puppy,
					petSize: PetSizeEnum.medium,
					energyLevel: EnergyLevelEnum.high,
					independencyLevel: IndependencyLevelEnum.low,
					environment: EnvironmentEnum.big,
					images: [],
					requirements: [
						{
							id: randomUUID(),
							description: 'Apartment is prohibited',
						},
					],
					petType: 'cachorro'
				})
		).rejects.toBeInstanceOf(PetImageQuantityError)
	})
})
