export const categorySchema = zod.object({
	name: zod.string(),
	disabled: zod.boolean(),
	imageKey: zod.string().nullable(),
	imageUrl: zod.string().nullable(),
});
