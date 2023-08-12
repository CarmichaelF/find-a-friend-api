import { ORGsRepository } from '@/repositories/orgs-repository'
import { org } from '@prisma/client'
import { compareSync } from 'bcryptjs'
import { OrgAuthenticationError } from '../errors/org-authentication-error'

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateOrgUseCaseResponse {
  org: org;
}

export class AuthenticateOrgUseCase {
	constructor(private orgsRepository: ORGsRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
		const org = await this.orgsRepository.findOrgByEmail(email)

		if (!org) throw new OrgAuthenticationError()

		const doesPasswordsMatch = compareSync(password, org.password_hash)

		if (!doesPasswordsMatch) throw new OrgAuthenticationError()

		return { org }
	}
}
