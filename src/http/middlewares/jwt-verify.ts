import { FastifyReply, FastifyRequest } from 'fastify'

export async function jwtVerify(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify()
	} catch (err) {
		reply.send(err)
	}
}
