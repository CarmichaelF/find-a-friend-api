import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org-use-case'
import { ORGsRepository } from '@/repositories/orgs-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hashSync } from 'bcryptjs'
import { env } from '@/env'
import { OrgAuthenticationError } from '../errors/org-authentication-error'

let orgsRepository: ORGsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate ORG', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		sut = new AuthenticateOrgUseCase(orgsRepository)
	})

	it('should be able to authenticate an ORG', async () => {
		const { email } = await orgsRepository.create({
			id: 'test-org',
			addressId: 'address-id',
			email: 'org@gmail.com',
			name: 'ORG test',
			phone: '999999999',
			password_hash: hashSync('123456', env.HASH_SALT),
		})

		const { org } = await sut.execute({
			email,
			password: '123456',
		})

		expect(org.id).toEqual('test-org')
		expect(org.email).toEqual(email)
	})

	it('should not be able to authenticate an ORG that does not exists', async () => {
		expect(async () => {
			await sut.execute({
				email: 'org@gmail.com',
				password: '123456',
			})
		}).rejects.toBeInstanceOf(OrgAuthenticationError)
	})
	
	it('should not be able to authenticate with the wrong password', async () => {
		
		const { email } = await orgsRepository.create({
			id: 'test-org',
			addressId: 'address-id',
			email: 'org@gmail.com',
			name: 'ORG test',
			phone: '999999999',
			password_hash: hashSync('123456', env.HASH_SALT),
		})

		expect(async () => {
			await sut.execute({
				email,
				password: '654321',
			})
		}).rejects.toBeInstanceOf(OrgAuthenticationError)
	})
})
