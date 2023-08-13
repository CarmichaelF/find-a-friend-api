import { FilterOptions, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

type ListPetsUseCaseRequest = {
  city: string;
} & FilterOptions;

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute({
		city,
		...rest
	}: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
		const filteredPets = await this.petsRepository.ListPetsByCityOrCharacteristics({
			city,
			...rest,
		})
		return { pets: filteredPets }
	}
}
