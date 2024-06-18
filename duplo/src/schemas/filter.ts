type SimpleFilterType = Extract<FilterDef["type"], "TOGGLE">
type DeepFilterType = Extract<FilterDef["type"], "CHECKBOX" | "RADIO">

export const simpleFilterSchema = zod.object({
	type: zod.enum<string, TuplifyUnion<SimpleFilterType>>(["TOGGLE"]),
	name: zod.string(),
	quantity: zod.number(),
});

export type SimpleFilter = Zod.infer<typeof simpleFilterSchema>

export const rangeFilterSchema = zod.object({
	type: zod.literal("RANGE"),
	name: zod.string(),
	min: zod.number(),
	max: zod.number(),
});

export type RangeFilterSchema = Zod.infer<typeof rangeFilterSchema>

export const deepFilterSchema = zod.object({
	type: zod.enum<string, TuplifyUnion<DeepFilterType>>(["CHECKBOX", "RADIO"]),
	name: zod.string(),
	values: zod.object({
		value: zod.string(),
		quantity: zod.number(),
	}).array()
});

export type DeepFilter = Zod.infer<typeof deepFilterSchema>

export const filterSchema = zod.union([
	deepFilterSchema,
	simpleFilterSchema,
	rangeFilterSchema,
]);
