export const imageProductSheetSchema = zod.object({
	id: zod.string(),
	productSheetId: zod.string(),
	organizationId: zod.string(),
	url: zod.string(),
	key: zod.string(),
	alt: zod.string().nullable(),
});
