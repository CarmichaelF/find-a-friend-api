import { app } from '@/app'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'
import { hashSync } from 'bcryptjs'
import request from 'supertest'

export async function registerAndAuthenticateOrg() {
	const org = await prisma.org.create({
		data: {
			email: 'org@test.com',
			name: 'Org test',
			password_hash: hashSync('12345678', env.HASH_SALT),
			phone: '999999999',
			address: {
				create: {
					latitude: new Decimal(48.8698679),
					longitude: new Decimal(2.3072976),
					city: 'Paris',
					zipcode: '75008',
					address: '29 champs elysée paris',
				},
			},
		},
	})

	const {
		body: { token },
	} = await request(app.server).post('/orgs/authenticate').send({
		email: 'org@test.com',
		password: '12345678',
	})

	return { org, token }
}
