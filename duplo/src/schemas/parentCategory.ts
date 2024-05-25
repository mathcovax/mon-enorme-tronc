export const parentCategorySchema = zod.object({
	name: zod.string(),
	isInNavBar: zod.boolean(),
});
