export const filtersSchema = zod.object({
	type: zod.enum([
		"COLOR",
		"SIZE",
		"DIAMETER",
		"TARGET",
		"ACCESSORY",
		"MATERIAL",
		"STIMULATION"
	]),
	name: zod.string(),
	values: zod.array(zod.string()) //valeur de l'enum
});
