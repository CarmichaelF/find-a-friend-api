import {
	ListPetsParams,
	PetWithRelations,
	PetsRepository,
} from '@/repositories/pets-repository'
import { removeProperty } from '@/utils/remove-property'

interface ListPetsUseCaseResponse {
  pets: PetWithRelations[];
}

export class ListPetsUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute(props: ListPetsParams): Promise<ListPetsUseCaseResponse> {
		const filteredPets =
      await this.petsRepository.getPetsByCityOrCharacteristics(props)
		return {
			pets: filteredPets.map(({ org, ...rest }) => {
				return {
					...rest,
					org: removeProperty({ obj: org, prop: 'password_hash' }),
				}
			}),
		}
	}
}
