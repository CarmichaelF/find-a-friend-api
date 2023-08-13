import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org-use-case'
import { AddressRepository } from '@/repositories/address-repository'
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository'
import { InvalidAddress } from '../errors/org-invalid-address-error'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let addressRepository: AddressRepository
let sut: RegisterOrgUseCase

describe('Register ORG', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		addressRepository = new InMemoryAddressRepository()
		sut = new RegisterOrgUseCase(orgsRepository, addressRepository)
	})

	it('should be able to register a new ORG', async () => {
		const { org } = await sut.execute({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			address: '29 champs elysée',
			zipcode: '75008',
			password: '123456',
			phone: '1199999999',
		})

		expect(org.id).toEqual(expect.any(String))
		expect(org.email).toEqual('jsorg@gmail.com')
	})

	it('should not be able to register a new ORG with the same email', async () => {
		await sut.execute({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			address: '29 champs elysée',
			zipcode: '75008',
			password: '123456',
			phone: '1199999999',
		})
		expect(
			async () =>
				await sut.execute({
					name: 'JS Org',
					email: 'jsorg@gmail.com',
					address: '29 champs elysée',
					zipcode: '75008',
					password: '123456',
					phone: '1199999999',
				})
		).rejects.toBeInstanceOf(OrgAlreadyExistsError)
	})
	
	it('should not be able to register a new ORG with an invalid address', async () => {
		expect(
			async () =>
				await sut.execute({
					name: 'JS Org',
					email: 'jsorg@gmail.com',
					address: 'asgasgasgasga',
					zipcode: '1',
					password: '123456',
					phone: '1199999999',
				})
		).rejects.toBeInstanceOf(InvalidAddress)
	})
})
