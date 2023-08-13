import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from '../errors/pet-not-found-error'
import { Pet } from '@prisma/client'

interface GetPetDetailsUseCaseRequest {
  id: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet;
}

export class GetPetDetailsUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute({
		id
	}: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
		const pet = await this.petsRepository.getPetById(id)

		if (!pet) throw new PetNotFoundError()

		return { pet }
	}
}
