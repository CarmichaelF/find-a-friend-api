import { FilterOptions, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

type FilterPetsUseCaseRequest = {
  city: string;
} & FilterOptions;

interface FilterPetsUseCaseResponse {
  pets: Pet[];
}

export class FilterPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute({
		city,
		...rest
	}: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
		const filteredPets = await this.petsRepository.filterPetsByCityOrCharacteristics({
			city,
			...rest,
		})
		return { pets: filteredPets }
	}
}
