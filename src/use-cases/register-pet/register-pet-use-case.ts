import { ORGsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { PetImageQuantityError } from '../errors/pet-image-quantity-error'
import { PetRequirementsQuantityError } from '../errors/pet-requirenents-quantity-error copy'
import { AddressRepository } from '@/repositories/address-repository'

interface RegisterPetRequest {
  name: string;
  description: string;
  age: string;
  petSize: string;
  energyLevel: string;
  environment: string;
  independencyLevel: string;
  images: string[];
  requirements: Prisma.PetRequirementCreateInput[];
  oRGId: string;
  petType: string;
}

interface RegisterPetResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
	constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: ORGsRepository,
    private addressRepository: AddressRepository
	) {}

	async execute({
		name,
		oRGId,
		description,
		age,
		petSize,
		energyLevel,
		environment,
		independencyLevel,
		images,
		requirements,
		petType,
	}: RegisterPetRequest): Promise<RegisterPetResponse> {
		const org = await this.orgsRepository.findOrgById(oRGId)

		if (!org) throw new OrgNotFoundError()

		if (images.length === 0) throw new PetImageQuantityError()

		if (requirements.length === 0) throw new PetRequirementsQuantityError()

		const address = await this.addressRepository.getAddressById(org.addressId)

		const pet = await this.petsRepository.create({
			name,
			description,
			age,
			petSize,
			energyLevel,
			environment,
			independencyLevel,
			images,
			requirements,
			oRGId,
			address,
			addressId: org.addressId,
			petType,
		})

		return { pet }
	}
}
