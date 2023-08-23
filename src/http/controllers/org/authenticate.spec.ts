import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { Decimal } from '@prisma/client/runtime/library'
import { env } from '@/env'
import { hashSync } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

describe('Authenticate Org', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to authenticate an org', async () => {
		await prisma.org.create({
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
	
		const response = await request(app.server).post('/orgs/authenticate').send({
			email: 'org@test.com',
			password: '12345678',
		})

		expect(response.statusCode).toEqual(200)
	})
})
