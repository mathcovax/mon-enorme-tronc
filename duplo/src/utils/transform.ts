export function transform<T, R>(value: T, callback: (value: T) => R): R
{
	return callback(value);
}
