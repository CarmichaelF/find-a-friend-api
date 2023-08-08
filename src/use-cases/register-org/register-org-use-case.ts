import { env } from '@/env'
import { ORGsRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  postalCode: string;
  addressId: string;
  phone: string;
  password: string;
}

interface RegisterOrgUseCaseResponse {
  org: ORG;
}

export class RegisterOrgUseCase {
	constructor(private orgsRepository: ORGsRepository) {}

	async execute({
		password,
		email,
		...rest
	}: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
		const password_hash = hashSync(password, env.HASH_SALT)

		const orgWithSameEmail = this.orgsRepository.findOrgByEmail(email)

		if(!orgWithSameEmail) throw new OrgAlreadyExistsError

		const org = await this.orgsRepository.create({ password_hash, email, ...rest })

		return { org }
	}
}
