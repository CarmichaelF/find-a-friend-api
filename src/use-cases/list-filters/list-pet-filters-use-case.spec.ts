import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetFiltersUseCase, filters } from './list-pet-filters-use-case'

let sut: ListPetFiltersUseCase

describe('List Pet Types', () => {
	beforeEach(() => {
		sut = new ListPetFiltersUseCase()
	})
  
	it('should be able to list pet types', async () => {
		const allFilters = await sut.execute()

		expect(allFilters.filters).toEqual(filters)
	})
})
