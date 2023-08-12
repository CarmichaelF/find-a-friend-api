export class PetImageQuantityError extends Error {
	constructor() {
		super('You need to upload at least 1 Pet image.')
	}
}
