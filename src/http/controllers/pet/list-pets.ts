import { makeListPets } from '@/use-cases/factories/list-pets'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
	const listPetsQuerySchema = z.object({
		city: z.string().optional(),
		name: z.string().optional(),
		description: z.string().optional(),
		age: z.string().optional(),
		petSize: z.string().optional(),
		energyLevel: z.number().optional(),
		independencyLevel: z.number().optional(),
		environment: z.string().optional(),
		petType: z.string().optional()
	})

	const queryParams = listPetsQuerySchema.parse(request.query)

	const listPetsUseCase = makeListPets()

	const { pets } = await listPetsUseCase.execute(queryParams)

	return reply.status(200).send({ pets })
}
