import { facet_type } from "@prisma/client";

export const fullProductSheetSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	price: zod.number(),
	shortDescription: zod.string(),
	description: zod.string(),
	quantity: zod.number(),
	categories: zod.string().array(),
	images: zod.string().array(),
	promotion: zod.object({
		percentage: zod.number().min(0).max(100).optional(),
		startDate: zod.date().optional(),
		endDate: zod.date().optional(),
	}).or(zod.null()),
	organization: zod.object({
		id: zod.string(),
		name: zod.string(),
		label: zod.string().optional(),
		logoUrl: zod.string().optional(),
	}),
	facets: zod.object<{ [P in facet_type]: Zod.ZodOptional<Zod.ZodString> }>({
		ACCESSORY: zod.string().optional(),
		COLOR: zod.string().optional(),
		DIAMETER: zod.string().optional(),
		MATERIAL: zod.string().optional(),
		SIZE: zod.string().optional(),
		STIMULATION: zod.string().optional(),
		TARGET: zod.string().optional(),
	}),
});

export type FullProductSheetSchema = Zod.infer<typeof fullProductSheetSchema>
