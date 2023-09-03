interface RemovePropertyParams<T> {
  obj: T;
  prop: keyof T;
}

export function removeProperty<T>({ obj, prop }: RemovePropertyParams<T>) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { [prop]: _, ...rest } = obj
	return rest as T
}
