export const filtersSchema = zod.array(
	zod.object({
		type: zod.enum([
			"CHECKBOX",
			"TOGGLE",
			"RANGE",
			"RADIO",
			"FULL-TEXT"
		]),
		name: zod.string(),
		path: zod.string().or(zod.undefined()),
		values: zod.array(zod.string()).or(zod.undefined())
	})
);
