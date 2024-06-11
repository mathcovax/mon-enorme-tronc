import { zod } from "@duplojs/duplojs";
import { ZodType } from "zod";

export function zodToArray<
	zodType extends Zod.ZodType
>(zodSchema: zodType) {
	return zod.union([
		zodSchema.transform<zod.infer<zodType>[]>((arg) => [arg]),
		zodSchema.array()
	]);
}

export const stringBoolean = zod.enum(["true", "false"]).transform(v => v === "true" ? true : false);

export type getZodOutput<zodType extends ZodType> = zodType extends ZodType<infer T> ? T : never;
