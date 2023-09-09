import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org/authenticate-org-use-case'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateOrgUseCase() {
	const orgsRepository = new PrismaOrgsRepository()
	const addressRepository = new PrismaAddressRepository()
	const useCase = new AuthenticateOrgUseCase(orgsRepository, addressRepository)

	return useCase
}
