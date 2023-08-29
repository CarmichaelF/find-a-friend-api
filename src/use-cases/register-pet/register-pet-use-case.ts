import { ORGsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { PetImageQuantityError } from '../errors/pet-image-quantity-error'
import { AddressRepository } from '@/repositories/address-repository'
import { AgeEnum, EnergyLevelEnum, EnvironmentEnum, IndependencyLevelEnum, PetSizeEnum } from '../list-filters/list-pet-filters-use-case'

interface RegisterPetRequest {
  name: string;
  description: string;
  age: AgeEnum;
  petSize: PetSizeEnum;
  energyLevel: EnergyLevelEnum;
  environment: EnvironmentEnum;
  independencyLevel: IndependencyLevelEnum;
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
