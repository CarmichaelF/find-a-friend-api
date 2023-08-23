import { ImageExtensionError } from '@/use-cases/errors/image-extension-error'
import { PetImageQuantityError } from '@/use-cases/errors/pet-image-quantity-error'
import { makeUploadPetImages } from '@/use-cases/factories/upload-pet-images'
import { FastifyReply, FastifyRequest } from 'fastify'
import { File } from 'fastify-multer/src/interfaces'

export async function uploadPetImages(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const uploadPetImagesUseCase = makeUploadPetImages()
		//TODO: verify how to use zod to validate it
		const { files } = await uploadPetImagesUseCase.execute({
			files: request.files,
		} as { files: Partial<File>[] })
		return reply.send({ files })
	} catch (error) {
		if (error instanceof PetImageQuantityError)
			return reply.status(403).send({ message: error.message })
		//TODO: Verify how to handle the ImageExtensionError correctly
		if (error instanceof ImageExtensionError)
			return reply.status(400).send({ message: error.message })
	}
}
