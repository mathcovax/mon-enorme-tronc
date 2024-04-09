import Duplo, {HttpMethods, zod} from "@duplojs/duplojs";
import duploHttpException from "@duplojs/http-exception";
import duploRoutesDirectory, { matchScriptFile } from "@duplojs/routes-directory";
import duploSwagger from "@duplojs/swagger";
import duploWhatWasSent from "@duplojs/what-was-sent";
import { ZodAccelerator } from "@duplojs/zod-accelerator";
import duploTypeGenerator from "@duplojs/to/plugin";
import { CacheFolder } from "@duplojs/editor-tools";
import "./env";

declare global {
    const duplo: typeof import("./main.js")["default"];
	const zod: typeof import("./main.js")["zod"];
	type Methods = HttpMethods;
}

export default Duplo({
	port: ENV.PORT,
	host: ENV.HOST,
	environment: ENV.ENVIRONMENT,
	globals: true,
});

export {
	zod
};

duplo.use(
	duploSwagger,
	{
		disabledDoc: ENV.ENVIRONMENT !== "DEV",
		swaggerSpec: {
			basePath: "/api",
			consumes: [
				"application/json",
				"text/plain",
			],
		},
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
duplo.use(duploTypeGenerator, {outputFile: CacheFolder.create("client") + "/EnrichedDuploTo.d.ts"});

duplo.use(
	duploRoutesDirectory, 
	{
		path: ["routes", "providers"].map((path) => `${__dirname}/${path}`),
		matchs: [matchScriptFile]
	}
).then(() => {
	duplo.launch(() => { 
		console.log(`Ready on ${ENV.ENVIRONMENT}:${ENV.HOST}:${ENV.PORT}`); 
	});
});
