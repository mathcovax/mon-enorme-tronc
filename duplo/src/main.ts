import Duplo from "@duplojs/duplojs";
import duploHttpException from "@duplojs/http-exception";
import duploRoutesDirectory, { matchScriptFile } from "@duplojs/routes-directory";
import duploSwagger from "@duplojs/swagger";
import duploWhatWasSent from "@duplojs/what-was-sent";
import { ZodAccelerator } from "@duplojs/zod-accelerator";
import duploTypeGenerator from "@duplojs/to/plugin";
import "./env";

declare global {
    const duplo: typeof import("./main.js")["default"];
}

export default Duplo({
	port: ENV.PORT,
	host: ENV.HOST,
	environment: ENV.ENVIRONMENT,
	globals: true,
});

duplo.use(
	duploSwagger,
	{
		disabledDoc: ENV.ENVIRONMENT !== "DEV",
		globals: true,
	}
);

duplo.use(duploWhatWasSent, {globals: true});

duplo.use(duploHttpException,{globals: true});

duplo.use(
	ZodAccelerator.duplojs,
	{
		DEV: true,
		PROD: true
	}
);

duplo.use(duploTypeGenerator, {outputFile: undefined});

Promise.all([
	duplo.use(
		duploRoutesDirectory, 
		{
			path: __dirname + "/routes",
			matchs: [matchScriptFile]
		}
	),
	import("@services/mongoose").then(({awaiting}) => awaiting),
])
	.then(() => {
		duplo.launch(() => { 
			console.log(`Ready on ${ENV.ENVIRONMENT}:${ENV.HOST}:${ENV.PORT}`); 
		});
	});
