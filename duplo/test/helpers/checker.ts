/* eslint-disable */
//@ts-nocheck
import {Checker, DuploInstance, DuploConfig} from "@duplojs/duplojs";

declare module "@duplojs/duplojs" {
	interface DuploInstance<duploConfig extends DuploConfig> {
		testChecker: typeof testChecker,
	}
}

const output = <info>(info: info, data: unknown) => ({info, data});

export async function testChecker<
	_checker extends Checker
>(
	checker: _checker, 
	input: _checker extends Checker<any, infer input> ? input : never,
	options?: _checker extends Checker<infer options> ? options : never
){

	options = {
		...options,
		...checker.options,
	} as never;

	return await checker.handler(input, output as never, options) as never as ReturnType<_checker["handler"]>;
}

DuploInstance.prototype.testChecker = testChecker;
