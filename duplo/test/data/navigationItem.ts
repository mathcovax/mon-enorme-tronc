import { navigation_item } from "@prisma/client";

export const navigationItemData: navigation_item = {
	id: "toto",
	type: "PARENT_CATEGORY", 
	priority: 10,
	categoryName: null,
	parentCategoryName: "test",
	url: null,
	title: null
};
