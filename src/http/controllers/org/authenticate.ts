import { OrgAuthenticationError } from '@/use-cases/errors/org-authentication-error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/authenticate-org'
import { removeProperty } from '@/utils/remove-property'
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
		const token = await reply.jwtSign(
			{},
			{
				sign: { sub: org.id, expiresIn: '1d' },
			}
		)

		return reply
			.status(200)
			.send({ org: removeProperty({obj: org, prop: 'password_hash'}), token })
	} catch (error) {
		if (error instanceof OrgAuthenticationError)
			return reply.status(400).send({ message: error.message })
	}
}
