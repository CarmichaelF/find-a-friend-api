export class PetRequirementsQuantityError extends Error {
	constructor() {
		super('You need to send at least 1 Pet requirement.')
	}
}
