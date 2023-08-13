import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ListPetsUseCase } from '../list-pets/list-pets-use-case'

export function makeListPets() {
	const petsRepository = new PrismaPetsRepository()
	const useCase = new ListPetsUseCase(petsRepository)

	return useCase
}
