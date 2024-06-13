export const cartSchema = zod.object({
	productSheetId: zod.string(),
	quantity: zod.number(),
	name: zod.string(),
	description: zod.string(),
	shortDescription: zod.string(),
	price: zod.number(),
	imageUrl: zod.string()
});
