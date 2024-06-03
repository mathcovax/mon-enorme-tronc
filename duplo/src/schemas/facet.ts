import { facet_type } from "@prisma/client";

export const facetTypeTuple: TuplifyUnion<facet_type> = [
	"COLOR", 
	"SIZE",
	"DIAMETER",
	"TARGET",
	"ACCESSORY",
	"MATERIAL",
	"STIMULATION"
];

export const facetTypeSchema = zod.enum(facetTypeTuple);

export const facetSchema = zod.object({
	type: facetTypeSchema,
	productSheetId: zod.string(),
	value: zod.string(),
});
