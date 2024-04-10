import {Checker} from "@duplojs/duplojs";

const output = <info>(info: info, data: unknown) => ({info, data});

export async function testChecker<
	_checker extends Checker
>(
	checker: _checker, 
	input: _checker extends Checker<any, infer input> ? input : never, // eslint-disable-line @typescript-eslint/no-explicit-any
	options?: _checker extends Checker<infer options> ? options : never
){

	options = {
		...options,
		...checker.options,
	} as never;

	return await checker.handler(input, output as never, options) as never as ReturnType<_checker["handler"]>;
}
