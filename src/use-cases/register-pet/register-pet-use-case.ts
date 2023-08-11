import { ORGsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetRequirement } from '@prisma/client'
import { OrgNotFoundError } from '../errors/org-not-found-error'

interface RegisterPetRequest {
  name: string;
  description: string;
  oRGId: string;
  requirements?: PetRequirement;
}

interface RegisterPetResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
	constructor(private petsRepository: PetsRepository, private orgsRepository : ORGsRepository) {}

	async execute({
		name,
		oRGId,
		description,
	}: RegisterPetRequest): Promise<RegisterPetResponse> {

		const org = await this.orgsRepository.findOrgById(oRGId)

		if(!org) throw new OrgNotFoundError()

		const pet = await this.petsRepository.create({
			name,
			oRGId,
			description,
			addressId: org.addressId
		})

		return { pet }
	}
}
