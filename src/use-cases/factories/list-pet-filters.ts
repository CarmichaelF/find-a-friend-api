import { ListPetFiltersUseCase } from '../list-filters/list-pet-filters-use-case'

export function makeListPetFilters() {
	const useCase = new ListPetFiltersUseCase()
	return useCase
}
