export const promotionSchema = zod.object({
	id: zod.number(),
	percentage: zod.number().min(0).max(1),
	startDate: zod.date(),
	endDate: zod.date(),
	productSheet: zod.object({
		id: zod.string(),
		name: zod.string()
	}).optional(),
	productSheetId: zod.string().optional(),
});
