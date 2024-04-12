import "./helpers/route";
import "./helpers/checker";
import {DuploInstance} from "@duplojs/duplojs";
import duploWhatWasSent from "@duplojs/what-was-sent";
import duploHttpException from "@duplojs/http-exception";
import "../src/env";

export const duplo = 
	new DuploInstance({
		port: 1506,
		host: "localhost",
		environment: "TEST",
		globals: true
	});

duplo.use(duploWhatWasSent, {globals: true, enabled: true});
duplo.use(duploHttpException,{globals: true});
