import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import startCloudinary from './services/start-cloudinary-service'
import { orgRoutes } from './http/controllers/org/routes'
import { ZodError } from 'zod'
import { petRoutes } from './http/controllers/pet/routes'
import { env } from './env'
import cors from '@fastify/cors'
import multer from 'fastify-multer'

export const app = fastify()

startCloudinary()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(multer.contentParser)

app.register(cors, {
	origin: '*',
})

app.register(orgRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() })
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	}

	return reply.status(500).send({ message: 'Internal server error.' })
})