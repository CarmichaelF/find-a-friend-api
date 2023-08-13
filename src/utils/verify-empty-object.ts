interface VerifyEmptyObjectParams{
    object: NonNullable<unknown>
}

export function verifyEmptyObject({object} : VerifyEmptyObjectParams) {
	return Object.keys(object).length === 0
}
