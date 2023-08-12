import { AuthenticateOrgUseCase } from '../authenticate-org/authenticate-org-use-case'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateOrgUseCase() {
	const orgsRepository = new PrismaOrgsRepository()
	const useCase = new AuthenticateOrgUseCase(orgsRepository)

	return useCase
}
