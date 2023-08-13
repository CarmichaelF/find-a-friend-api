import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../register-org/register-org-use-case'
import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'

export function makeRegisterOrgUseCase() {
	const orgsRepository = new PrismaOrgsRepository()
	const addressRepository = new PrismaAddressRepository()
	const useCase = new RegisterOrgUseCase(orgsRepository, addressRepository)

	return useCase
}
