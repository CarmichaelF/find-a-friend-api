import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet-use-case'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register a new Pet', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new RegisterPetUseCase(petsRepository)
	})

	it('should be able to register a new pet', async () => {

		const { pet } = await sut.execute({
			name: 'Simba',
			description: 'Simba description',
		})

		expect(pet.id).toEqual(expect.any(String))
		expect(pet.name).toEqual('Simba')
	})
})
