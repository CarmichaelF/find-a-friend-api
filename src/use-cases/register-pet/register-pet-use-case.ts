import { ORGsRepository } from '@/repositories/orgs-repository'
import {
	PetWithRelations,
	PetsRepository,
} from '@/repositories/pets-repository'
import { Address, Pet, PetRequirement } from '@prisma/client'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { v2 as cloudinary } from 'cloudinary'
import { PetImageError } from '../errors/pet-image-error'
import { PetImageQuantityError } from '../errors/pet-image-quantity-error'
import { PetRequirementsQuantityError } from '../errors/pet-requirenents-quantity-error copy'

interface RegisterPetRequest {
  name: string;
  description: string;
  oRGId: string;
  age: string;
  dogSize: string;
  energyLevel: string;
  environment: string;
  independencyLevel: string;
  images: string[];
  requirements: PetRequirement[];
  address: Address;
}

interface RegisterPetResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
	constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: ORGsRepository
	) {}

	async execute({
		name,
		oRGId,
		description,
		age,
		dogSize,
		energyLevel,
		environment,
		independencyLevel,
		images,
		requirements,
		address,
	}: RegisterPetRequest): Promise<RegisterPetResponse> {
		const org = await this.orgsRepository.findOrgById(oRGId)

		if (!org) throw new OrgNotFoundError()

		if(images.length === 0) throw new PetImageQuantityError()
		
		if(requirements.length === 0) throw new PetRequirementsQuantityError()

		const cloudinaryImages = await Promise.all(
			images.map((image) =>
				cloudinary.uploader.upload(image, (error) => {
					if (error) throw new PetImageError(error)
				})
			)
		)

		const uploadedImages = cloudinaryImages.map((image) => image.secure_url)

		const pet: PetWithRelations = await this.petsRepository.create({
			name,
			address,
			description,
			age,
			dogSize,
			energyLevel,
			environment,
			independencyLevel,
			images: uploadedImages,
			requirements,
			addressId: address.id,
			oRGId,
		})

		return { pet }
	}
}
