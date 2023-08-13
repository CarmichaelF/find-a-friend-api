import { org } from '@prisma/client'
import { ORGsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements ORGsRepository {
	async create(data: org) {
		const org = await prisma.org.create({
			data,
		})

		return org
	}

	async findOrgByEmail(email: string) {
		const org = await prisma.org.findUnique({
			where: {
				email,
			},
		})

		return org
	}

	async findOrgById(id: string) {
		const org = await prisma.org.findUnique({
			where: {
				id,
			},
		})

		return org
	}
}
