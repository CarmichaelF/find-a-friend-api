import { AddressRepository } from '@/repositories/address-repository'
import {
	FilterOptions,
	FilterOptionsKeys,
	PetsRepository,
} from '@/repositories/pets-repository'
import { verifyEmptyObject } from '@/utils/verify-empty-object'
import { Address, Pet } from '@prisma/client'

interface PetsWithAddress {
  pet: Pet;
  petAddress: Address | null;
}

type FilterPetsUseCaseRequest = {
  city: string;
} & FilterOptions;

interface FilterPetsUseCaseResponse {
  pets: Pet[];
}

export class FilterPetsUseCase {
	constructor(
    private petsRepository: PetsRepository,
    private addressRepository: AddressRepository
	) {}
	async execute({
		city,
		...rest
	}: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
		const pets = await this.petsRepository.getPets()
		const petsWithAddress: PetsWithAddress[] = []
		const filteredPetsByCity: Pet[] = []
		const filteredPets: Pet[] = []

		for (let i = 0; i < pets.length; i++) {
			const pet = pets[i]
			const petAddress = await this.addressRepository.getAddressById(
				pet.addressId
			)
			petsWithAddress.push({ pet, petAddress })
		}

		for (let i = 0; i < petsWithAddress.length; i++) {
			const { pet, petAddress } = petsWithAddress[i]
			if (petAddress?.city === city) filteredPetsByCity.push(pet)
		}

		if (verifyEmptyObject({ object: rest }))
			return { pets: filteredPetsByCity }

		for (let i = 0; i < filteredPetsByCity.length; i++) {
			const pet = pets[i]
			const filterableCharacteristics = Object.entries(rest)
			filterableCharacteristics.forEach((charac) => {
				const key = charac[0] as FilterOptionsKeys
				const value = charac[1]

				if (pet?.[key].toLowerCase().includes(value.toLowerCase()))
					filteredPets.push(pet)
			})
		}

		return { pets: filteredPets }
	}
}
