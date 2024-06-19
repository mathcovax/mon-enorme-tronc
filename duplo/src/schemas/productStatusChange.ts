import { productStatusTuple } from "./product";
import { productSheetSchema } from "./productSheet";

export const productStatusChangeSchema = zod.object({
	from: zod.enum(productStatusTuple),
	to: zod.enum(productStatusTuple),
	sku: zod.string(),
	productSheet: productSheetSchema.pick({
		id: true,
		name: true,
		organizationId: true,
	}),
	date: zod.coerce.date(),
});
