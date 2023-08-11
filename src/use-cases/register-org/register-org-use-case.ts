import { env } from '@/env'
import { ORGsRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { getAddressInfo } from '@/utils/get-address-info'
import { OrgInvalidAddress } from '../errors/org-invalid-address-error'
import { AddressRepository } from '@/repositories/address-repository'
import { Decimal } from '@prisma/client/runtime/library'

interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  zipcode: string;
  address: string;
  phone: string;
  password: string;
}

interface RegisterOrgUseCaseResponse {
  org: ORG;
}

export class RegisterOrgUseCase {
	constructor(
    private orgsRepository: ORGsRepository,
    private addressRepository: AddressRepository
	) {}

	async execute({
		password,
		email,
		zipcode,
		address,
		...rest
	}: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
		const password_hash = hashSync(password, env.HASH_SALT)

		const orgWithSameEmail = this.orgsRepository.findOrgByEmail(email)

		if (!orgWithSameEmail) throw new OrgAlreadyExistsError()

		const fullAddress = await getAddressInfo({ zipcode, address })

		if (!fullAddress?.latitude || !fullAddress?.longitude || !fullAddress?.city)
			throw new OrgInvalidAddress()

		const { id: addressId } = await this.addressRepository.create({
			zipcode,
			address: fullAddress.formattedAddress
				? fullAddress.formattedAddress
				: address,
			latitude: new Decimal(fullAddress.latitude),
			longitude: new Decimal(fullAddress.longitude),
			city: fullAddress.city,
		})

		const org = await this.orgsRepository.create({
			password_hash,
			email,
			addressId,
			...rest,
		})

		return { org }
	}
}
