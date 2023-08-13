import { GetPetDetailsUseCase } from '../get-pet-details/get-pet-details-use-case'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetDetailsUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const useCase = new GetPetDetailsUseCase(petsRepository)

	return useCase
}
