import { org } from '@prisma/client'
import { ORGsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements ORGsRepository {
	private orgs: org[] = []

	async create({ id, ...rest }: org) {
		const org: org = { id: id ? id : randomUUID(), ...rest }

		this.orgs.push(org)
		return org
	}

	async findOrgByEmail(email: string) {
		const org = this.orgs.find((org) => org.email === email)

		if (!org) return null
	
		return org
	}

	async findOrgById(id: string){
		const org = this.orgs.find((org) => org.id === id)

		if (!org) return null
	
		return org
	}
}
