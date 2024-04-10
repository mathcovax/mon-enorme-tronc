import {DuploInstance} from "@duplojs/duplojs";
import "../src/env";

declare module "@duplojs/duplojs" {
	interface DuploInterfaceEnvironment {
		TEST: true
	}
}

//@ts-expect-error var 'global' cause type error.
global.duplo = 
	new DuploInstance({
		port: 1506,
		host: "localhost",
		environment: "TEST",
	});
