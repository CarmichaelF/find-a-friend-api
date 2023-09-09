import { ORGsRepository } from '@/repositories/orgs-repository'
import { Address, org } from '@prisma/client'
import { compareSync } from 'bcryptjs'
import { OrgAuthenticationError } from '../errors/org-authentication-error'
import { AddressRepository } from '@/repositories/address-repository'
import { InvalidAddress } from '../errors/org-invalid-address-error'

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateOrgUseCaseResponse {
  org: org & { address: Address };
}

export class AuthenticateOrgUseCase {
	constructor(
    private orgsRepository: ORGsRepository,
    private addressRepository: AddressRepository
	) {}

	async execute({
		email,
		password,
	}: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
		const org = await this.orgsRepository.findOrgByEmail(email)
		if (!org) throw new OrgAuthenticationError()

		const doesPasswordsMatch = compareSync(password, org.password_hash)

		if (!doesPasswordsMatch) throw new OrgAuthenticationError()

		const address = await this.addressRepository.getAddressById(org.addressId)

		if (!address) throw new InvalidAddress()

		return { org: { ...org, address } }
	}
}
