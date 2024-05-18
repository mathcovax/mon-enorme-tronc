export const categorySchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	disabled: zod.boolean()
});
