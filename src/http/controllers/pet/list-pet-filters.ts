import { makeListPetFilters } from '@/use-cases/factories/list-pet-filters'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listPetFilters(_: FastifyRequest, reply: FastifyReply) {
	const listPetFiltersUseCase = makeListPetFilters()

	const { filters } = await listPetFiltersUseCase.execute()

	return reply.send({ filters })
}
