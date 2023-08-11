import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hashSync } from 'bcryptjs'
import { env } from '@/env'
import { OrgNotFoundError } from '../errors/org-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register a new Pet', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		orgsRepository = new InMemoryOrgsRepository()
		sut = new RegisterPetUseCase(petsRepository, orgsRepository)
	})

	it('should be able to register a new pet', async () => {
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
		})

		expect(pet.id).toEqual(expect.any(String))
		expect(pet.oRGId).toEqual('test-org')
		expect(pet.name).toEqual('Simba')
	})

	it('should not be able to register a new pet', async () => {
		expect(async () => await sut.execute({
			name: 'Simba',
			oRGId: 'test-org',
			description: 'Simba description',
		})).rejects.toBeInstanceOf(OrgNotFoundError)
	})
})
