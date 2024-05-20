import { zod } from "@duplojs/duplojs";

export function zodToArray<
	zodType extends Zod.ZodType
>(zodSchema: zodType) {
	return zod.union([
		zodSchema.transform<zod.infer<zodType>[]>((arg) => [arg]),
		zodSchema.array()
	]);
}
