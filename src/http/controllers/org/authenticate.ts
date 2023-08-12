import { OrgAuthenticationError } from '@/use-cases/errors/org-authentication-error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/authenticate-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	})

	const body = authenticateBodySchema.parse(request.body)

	const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

	try {
		const { org } = await authenticateOrgUseCase.execute(body)
		const token = reply.jwtSign(
			{},
			{
				sign: { sub: org.id, expiresIn: '1d' },
			}
		)
		return { token }
	} catch (error) {
		if (error instanceof OrgAuthenticationError)
			return reply.status(400).send({ message: error.message })
	}
}
