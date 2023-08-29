import { jwtVerify } from '@/http/middlewares/jwt-verify'
import { FastifyInstance } from 'fastify'
import { register } from './register'
import { getPet } from './get-pet'
import { listPets } from './list-pets'
import { listPetFilters } from './list-pet-filters'
import { uploadPetImages } from './upload-pet-images'
import multer from 'fastify-multer'
import { ImageExtensionError } from '@/use-cases/errors/image-extension-error'

const storage = multer.diskStorage({
	destination: (_, __, cb) => cb(null, './temp/'),
	filename: (request, file, cb) => cb(null, `${Date.now()}-${request.user.sub}-${file.originalname}`),
})

const upload = multer({
	storage: storage,
	preservePath: true,
	fileFilter: (_, file, cb) => {
		const typeArray = file.mimetype.split('/')
		const fileType = typeArray[1]
		const acceptedTypes = ['jpeg', 'jpg', 'png']
		if (acceptedTypes.includes(fileType)) {
			cb(null, true)
		} else {
			cb(new ImageExtensionError(), false)
		}
	},
})

export async function petRoutes(app: FastifyInstance) {
	app.post('/pets', { onRequest: [jwtVerify] }, register)
	app.post(
		'/pets/upload',
		{ preHandler: upload.array('files'), onRequest: [jwtVerify] },
		uploadPetImages
	)
	app.get('/pets/:id', getPet)
	app.get('/pets', listPets)
	app.get('/pets/filters', listPetFilters)
}
