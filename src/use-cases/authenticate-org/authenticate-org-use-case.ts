import { ORGsRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { compareSync } from 'bcryptjs'

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateOrgUseCaseResponse {
  org: ORG;
}

export class AuthenticateOrgUseCase {
	constructor(private orgsRepository: ORGsRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
		const org = await this.orgsRepository.findOrgByEmail(email)

		if (!org) throw new OrgNotFoundError()

		const doesPasswordsMatch = compareSync(password, org.password_hash)

		if (!doesPasswordsMatch) throw new OrgNotFoundError()

		return { org }
	}
}
