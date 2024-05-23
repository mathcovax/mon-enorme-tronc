export const warehouseSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	address: zod.string(),
	organizationId: zod.string()
});
