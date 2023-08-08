import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetRequirement } from '@prisma/client'

interface RegisterPetRequest {
  name: string;
  description: string;
  requirements?: PetRequirement
}

interface RegisterPetResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute({
		name,
		description,
	}: RegisterPetRequest): Promise<RegisterPetResponse> {
		const pet = await this.petsRepository.create({
			name,
			description,
		})

		return { pet }
	}
}
