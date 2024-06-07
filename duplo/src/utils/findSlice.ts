export async function *FindSlice<
	F extends ((slice: number, size: number) => Promise<unknown[]>),
	R extends Awaited<ReturnType<F>>[number]
>(size: number, find: F): AsyncGenerator<R>
{
	for (let slice = 0; true; slice++) {
		const result = await find(slice, size);
		
		if (result.length === 0) {
			break;
		}

		for (const value of result) {
			yield value as R;
		}
	}
}

