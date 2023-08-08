import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org-use-case'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register ORG', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		sut = new RegisterOrgUseCase(orgsRepository)
	})

	it('should be able to register a new ORG', async () => {
		const { org } = await sut.execute({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			addressId: 'address-id',
			postalCode: '0999999',
			password: '123456',
			phone: '1199999999',
		})

		expect(org.id).toEqual(expect.any(String))
		expect(org.email).toEqual('jsorg@gmail.com')
	})
})
