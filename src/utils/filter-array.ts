export function filterArray<T>(array: T[], typeOfValue = 'number') {
	return array.filter((value) => typeof value === typeOfValue)
}
