import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register org', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register a new org', async () => {
		const response = await request(app.server).post('/orgs').send({
			name: 'JS Org',
			email: 'jsorg@gmail.com',
			address: '29 champs elysée',
			zipcode: '75008',
			password: '12345678',
			phone: '1199999999',
		})
		expect(response.statusCode).toEqual(201)
	})
})
