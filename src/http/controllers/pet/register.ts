import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { PetImageError } from '@/use-cases/errors/pet-image-error'
import { PetImageQuantityError } from '@/use-cases/errors/pet-image-quantity-error'
import { PetRequirementsQuantityError } from '@/use-cases/errors/pet-requirenents-quantity-error copy'
import { makeRegisterPetUseCase } from '@/use-cases/factories/register-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerPetBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		oRGId: z.string(),
		age: z.string(),
		petSize: z.string(),
		energyLevel: z.string(),
		environment: z.string(),
		independencyLevel: z.string(),
		images: z.array(z.string()).min(1),
		requirements: z
			.array(
				z.object({
					description: z.string(),
				})
			)
			.min(1),
		petType: z.enum(['dog', 'cat'])
	})

	const body = registerPetBodySchema.parse(request.body)

	try {
		const registerPetUseCase = makeRegisterPetUseCase()
		const { pet } = await registerPetUseCase.execute(body)
		return reply.status(201).send({ pet })
	} catch (error) {
		if (error instanceof OrgNotFoundError)
			return reply.status(403).send({ message: error.message })
		if (error instanceof PetImageQuantityError)
			return reply.status(403).send({ message: error.message })
		if (error instanceof PetRequirementsQuantityError)
			return reply.status(403).send({ message: error.message })
		if (error instanceof PetImageError)
			return reply.status(500).send({ message: error.message })
	}
}
