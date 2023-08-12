import { UploadApiErrorResponse } from 'cloudinary'

export class PetImageError extends Error {
	constructor(error: UploadApiErrorResponse) {
		super(
			`There was an error: (${error.message}) while uploading Pet Images, please try again.`
		)
	}
}
