import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetTypesUseCase, filters } from './list-filters-use-case'

let sut: ListPetTypesUseCase

describe('List Pet Types', () => {
	beforeEach(() => {
		sut = new ListPetTypesUseCase()
	})
  
	it('should be able to list pet types', async () => {
		const allFilters = await sut.execute()

		expect(allFilters.filters).toEqual(filters)
	})
})
