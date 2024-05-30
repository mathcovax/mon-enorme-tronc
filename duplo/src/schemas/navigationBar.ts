import { zod } from "@duplojs/duplojs";
import { primordialRolesEnum } from "./navigationItem";

export const navigationBarItemParentCategorySchema = zod.object({
	type: zod.literal(primordialRolesEnum.PARENT_CATEGORY),
	parentCategoryName: zod.string(),
	categories: zod.object({
		categoryName: zod.string(),
		categoryImageUrl: zod.string(),
	}).array()
});

export type NavigationBarItemParentCategory = zod.infer<typeof navigationBarItemParentCategorySchema>;

export const navigationBarItemCategorySchema = zod.object({
	type: zod.literal(primordialRolesEnum.CATEGORY),
	categoryName: zod.string(),
});

export type NavigationBarItemCategory = zod.infer<typeof navigationBarItemCategorySchema>;

export const navigationBarItemLinkSchema = zod.object({
	type: zod.literal(primordialRolesEnum.LINK),
	title: zod.string(),
	url: zod.string(),
});
	
export type NavigationBarItemLink = zod.infer<typeof navigationBarItemLinkSchema>;

export const navigationBarItemSchema = zod.union([
	navigationBarItemParentCategorySchema,
	navigationBarItemCategorySchema,
	navigationBarItemLinkSchema,
]);

export type NavigationBarItem = zod.infer<typeof navigationBarItemSchema>;
