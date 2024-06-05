import type { RouteRecordRaw } from "vue-router";

export const routerPageNameCategory = Object.freeze({
	CATEGORY_PAGE: "category",
	PRODUCT_PAGE: "product",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameCategory.CATEGORY_PAGE,
		path: "/category/:categoryName",
		component: () => import("./pages/CategoryPage.vue"),
	},
	{
		name: routerPageNameCategory.PRODUCT_PAGE,
		path: "/product/:productSheetId",
		component: () => import("./pages/ProductPage.vue"),
	},
];
