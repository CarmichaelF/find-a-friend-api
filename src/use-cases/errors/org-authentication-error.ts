export class OrgAuthenticationError extends Error {
	constructor() {
		super('E-mail or password is wrong, please try again.')
	}
}
