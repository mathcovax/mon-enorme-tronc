export const parentCategorySchema = zod.object({
	name: zod.string(),
});

export const parentCategoryWithCategoriesNameSchema = parentCategorySchema.extend({ 
	categories: zod.object({
		categoryName: zod.string()
	}).array().optional() 
});
