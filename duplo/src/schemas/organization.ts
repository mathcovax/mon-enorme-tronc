export const organizationSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	label: zod.string().nullable(),
	ownerId: zod.string(),
	suspended: zod.boolean(),
});
