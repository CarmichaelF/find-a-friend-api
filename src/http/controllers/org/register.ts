import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { InvalidAddress } from '@/use-cases/errors/org-invalid-address-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/register-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { removeProperty } from '@/utils/remove-property'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerOrgBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		zipcode: z.string(),
		address: z.string(),
		phone: z.string(),
		password: z.string().min(8),
	})

	const body = registerOrgBodySchema.parse(request.body)

	const registerOrgUseCase = makeRegisterOrgUseCase()

	try {
		const { org } = await registerOrgUseCase.execute(body)

		return reply.status(201).send({ org: removeProperty({obj: org, prop: 'password_hash'}) })
	} catch (error) {
		if(error instanceof OrgAlreadyExistsError) return reply.status(409).send({message: error.message})
		if(error instanceof InvalidAddress) return reply.status(400).send({message: error.message})
	}
}
