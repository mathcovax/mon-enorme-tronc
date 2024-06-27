export const organizationCommandCollectionSchema = zod.object({
	commandId: zod.string(),
	quantity: zod.number(),
	createdAt: zod.coerce.string(),
}).array();
