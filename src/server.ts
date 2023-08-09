import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { env } from '@/env'

const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app
	.listen({
		host: '0.0.0.0',
		port: env.PORT,
	})
	.then(() => {
		console.log('HTTP Server Running.')
	})
