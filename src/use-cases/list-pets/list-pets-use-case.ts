import { ListPetsParams, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute(props: ListPetsParams): Promise<ListPetsUseCaseResponse> {
		const filteredPets =
      await this.petsRepository.getPetsByCityOrCharacteristics(props)
		return { pets: filteredPets }
	}
}
