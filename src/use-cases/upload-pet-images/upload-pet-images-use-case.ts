import {  v2 as cloudinary } from 'cloudinary'
import { PetImageError } from '../errors/pet-image-error'
import { PetImageQuantityError } from '../errors/pet-image-quantity-error'
import { unlinkSync } from 'fs'
import { File } from 'fastify-multer/src/interfaces'

interface UploadPetImagesRequest {
  files: Partial<File>[]
}

interface UploadPetImagesResponse {
  files: string[]
}

export class UploadPetImages {
	async execute({
		files,
	}: UploadPetImagesRequest): Promise<UploadPetImagesResponse> {
		if (files.length === 0) throw new PetImageQuantityError()
		const cloudinaryFiles = await Promise.all(
			files.map((file) => {
				return cloudinary.uploader.upload(file.path as string, {
					filename_override: file.filename
				}, async (error) => {
					if (error) throw new PetImageError(error)
					unlinkSync(file.path as string)
				})
			})
		)

		return { files: cloudinaryFiles.map(cloudinaryFile => cloudinaryFile.url) }
	}
}
