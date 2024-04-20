import { DuploInstance } from "@duplojs/duplojs";
import { DuploTesting } from "@duplojs/testing";
import duploWhatWasSent from "@duplojs/what-was-sent";
import duploHttpException from "@duplojs/http-exception";
import "../src/env";

export const duploTesting = new DuploTesting(
	DuploInstance,
	{
		port: 1506,
		host: "localhost",
		environment: "TEST"
	}
);

duploTesting.use(duploWhatWasSent, { globals: true, enabled: true });
duploTesting.use(duploHttpException,{ globals: true });

export const duplo = 
	new DuploInstance({
		port: 1506,
		host: "localhost",
		environment: "TEST",
		globals: true
	});


duplo.use(duploWhatWasSent, { globals: true });
duplo.use(duploHttpException,{ globals: true });
