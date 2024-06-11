export const articleSchema = zod.object({
	id: zod.string(),
	userId: zod.string(),
	producSheetId: zod.coerce.string(),
	createdAt: zod.coerce.string(),
});
