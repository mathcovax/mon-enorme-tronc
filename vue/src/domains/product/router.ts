import type { RouteRecordRaw } from "vue-router";

export const routerPageNameCategory = Object.freeze({
	CATEGORY_PAGE: "category",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameCategory.CATEGORY_PAGE,
		path: "/category/:categoryName",
		component: () => import("./pages/CategoryPage.vue"),
	},
];
