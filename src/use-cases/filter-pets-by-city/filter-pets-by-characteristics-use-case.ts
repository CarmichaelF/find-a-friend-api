import { FilterOptions, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

type FilterPetsByCharacteristicsRequest = FilterOptions;

interface FilterPetsByCharacteristicsResponse {
  pets: Pet[];
}

export class FilterPetsByCharacteristics {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		name,
		description,
	}: FilterPetsByCharacteristicsRequest): Promise<FilterPetsByCharacteristicsResponse> {
		const pets = await this.petsRepository.getPetsByCharacteristics({
			name,
			description,
		})

		return { pets }
	}
}
