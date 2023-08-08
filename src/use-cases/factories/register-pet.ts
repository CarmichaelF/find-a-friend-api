import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from '../register/register-pet-use-case'

export function makeRegisterPetUseCase() {
	const petsRepository = new InMemoryPetsRepository()
	const useCase = new RegisterPetUseCase(petsRepository)

	return useCase
}
