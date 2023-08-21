import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetTypesUseCaseResponse {
    types: string[];
}

export class GetPetTypesUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute(): Promise<GetPetTypesUseCaseResponse> {
		const allPets = await this.petsRepository.getPets()

		return { types: [...new Set(allPets.map((pet) => pet.petType))] }
	}
}
