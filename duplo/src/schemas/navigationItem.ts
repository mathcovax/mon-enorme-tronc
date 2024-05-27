import { navigation_item_type } from "@prisma/client";

export const navigationItemTypeTuple: TuplifyUnion<navigation_item_type> = ["PARENT_CATEGORY", "CATEGORY", "LINK"];

export const primordialRolesEnum: UninonToEnum<navigation_item_type> = {
	PARENT_CATEGORY: "PARENT_CATEGORY",
	CATEGORY: "CATEGORY",
	LINK: "LINK"
};

export const navigationItemTypeSchema = zod.enum(navigationItemTypeTuple);

export const navigationItemBaseSchema = zod.object({
	priority: zod.number(),
	title: zod.string().max(30),
});

export const navigationItemParentCategorySchema = 
	navigationItemBaseSchema.extend({
		type: zod.literal(primordialRolesEnum.PARENT_CATEGORY),
		parentCategoryName: zod.string(),
	});

export const navigationItemCategorySchema = 
	navigationItemBaseSchema.extend({
		type: zod.literal(primordialRolesEnum.CATEGORY),
		categoryName: zod.string(),
	});

export const navigationItemLinkSchema = 
	navigationItemBaseSchema.extend({
		type: zod.literal(primordialRolesEnum.LINK),
		url: zod.string(),
	});

export const navigationItemSchema = zod.union([
	navigationItemParentCategorySchema,
	navigationItemCategorySchema,
	navigationItemLinkSchema,
]);
