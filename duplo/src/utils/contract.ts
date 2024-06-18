export function contract<T>() {
	return <R extends T>(value: R): R =>  value;
}

export function strictContract<T>(value: NoInfer<T>): T
{
	return value;
}
