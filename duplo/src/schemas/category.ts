export const categorySchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	disabled: zod.boolean(),
	imageKey: zod.string().nullable(),
	imageUrl: zod.string().nullable(),
});
