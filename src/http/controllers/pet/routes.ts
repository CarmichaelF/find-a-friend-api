import { jwtVerify } from '@/http/middlewares/jwt-verify'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { getPet } from './get-pet'
import { listPets } from './list-pets'

export async function petRoutes(app: FastifyInstance) {
	app.post('/pets', { onRequest: [jwtVerify] }, register)
	app.get('/pets/:id', { onRequest: [jwtVerify]}, getPet )
	app.get('/pets', listPets )
}
