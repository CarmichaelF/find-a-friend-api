import { randomUUID } from 'crypto'
import { AddressRepository } from '../address-repository'
import { Address } from '@prisma/client'

export class InMemoryAddressRepository implements AddressRepository {
	private addresses : Address[] = []
	async create({id, ...rest}: Address) {
		const address = {
			id: id ? id : randomUUID(),
			...rest
		}

		this.addresses.push(address)

		return address
	}

	async getAddressById(id: string) {
		const address = this.addresses.find((address) => address.id === id)

		if(!address) return null

		return address
	}
}
