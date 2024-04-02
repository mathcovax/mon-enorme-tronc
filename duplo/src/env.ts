import { config as importEnvFile } from "dotenv";
import { zod } from "@duplojs/duplojs";

declare global {
  const ENV: (typeof import("./env"))["default"];
}

importEnvFile({ path: ".env.local" });
importEnvFile({ path: ".env" });

//@ts-expect-error var 'global' cause type error.
export default global.ENV = zod
	.object({
		PORT: zod.coerce.number().default(1506),
		HOST: zod.string().default("0.0.0.0"),
		ENVIRONMENT: zod.enum(["DEV", "PROD"]).default("DEV"),
	})
	.readonly()
	.parse(process.env);
