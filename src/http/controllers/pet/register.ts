import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { PetImageError } from '@/use-cases/errors/pet-image-error'
import { PetImageQuantityError } from '@/use-cases/errors/pet-image-quantity-error'
import { PetRequirementsQuantityError } from '@/use-cases/errors/pet-requirenents-quantity-error copy'
import { makeRegisterPetUseCase } from '@/use-cases/factories/register-pet'
import { AgeEnum, EnergyLevelEnum, EnvironmentEnum, IndependencyLevelEnum, PetSizeEnum, PetTypeEnum } from '@/use-cases/list-filters/list-pet-filters-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerPetBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		age: z.nativeEnum(AgeEnum),
		petSize: z.nativeEnum(PetSizeEnum),
		energyLevel: z.nativeEnum(EnergyLevelEnum),
		environment: z.nativeEnum(EnvironmentEnum),
		independencyLevel: z.nativeEnum(IndependencyLevelEnum),
		images: z.array(z.string()).min(1),
		requirements: z
			.array(
				z.object({
					description: z.string(),
				})
			)
			.min(1),
		petType: z.nativeEnum(PetTypeEnum)
	})

	const body = registerPetBodySchema.parse(request.body)
	const oRGId = request.user.sub

	try {
		const registerPetUseCase = makeRegisterPetUseCase()
		const { pet } = await registerPetUseCase.execute({...body, oRGId})
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
