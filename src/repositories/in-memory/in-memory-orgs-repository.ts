import { ORG } from '@prisma/client'
import { ORGsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements ORGsRepository {
	public orgs: ORG[] = []

	async create({ id, ...rest }: ORG) {
		const org: ORG = { id: id ? id : randomUUID(), ...rest }

		this.orgs.push(org)
		return org
	}

	async findOrgByEmail(email: string) {
		const org = this.orgs.find((org) => org.email === email)

		if (!org) return null
	
		return org
	}
}
