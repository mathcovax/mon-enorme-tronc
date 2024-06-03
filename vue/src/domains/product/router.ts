import type { RouteRecordRaw } from "vue-router";

export const routerPageNameCategory = Object.freeze({
	PRODUCT_CATEGORY: "category",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameCategory.PRODUCT_CATEGORY,
		path: "/category/:categoryName",
		component: () => import("./pages/ProductPage.vue"),
	},
];
