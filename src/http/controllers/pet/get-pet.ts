import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/get-pet-details'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
	const getPetParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = getPetParamsSchema.parse(request.params)

	try {
		const getPetDetailsUseCase = makeGetPetDetailsUseCase()

		const { pet } = await getPetDetailsUseCase.execute({ id })

		return reply.status(200).send({ pet })
	} catch (error) {
		if (error instanceof PetNotFoundError)
			return reply.status(403).send({ message: error.message })
	}
}
