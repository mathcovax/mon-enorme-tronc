export const articleSchema = zod.object({
	id: zod.string(),
	userId: zod.string(),
	producSheetId: zod.coerce.string(),
	createdAt: zod.coerce.string(),
});

export const articleCreatedSchema = zod.object({
	userId: zod.string(),
	productSheetId: zod.string(),
	quantity: zod.number(),
	createdAt: zod.coerce.string(),
});
