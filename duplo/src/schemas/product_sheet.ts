export const productSheetSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	description: zod.string(),
	short_description: zod.string(),
	price: zod.number(),
	created_at: zod.coerce.string(),
	updated_at: zod.coerce.string()
});
