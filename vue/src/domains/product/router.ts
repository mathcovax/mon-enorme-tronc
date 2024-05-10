import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "categories",
		path: "/categories",
		component: () => import("./pages/CategoriesPage.vue"),
	},
	{
		name: "category",
		path: "/categories/:categoryId",
		component: () => import("./pages/CategoryPage.vue"),
	},
	{
		name: "product",
		path: "/products/:productId",
		component: () => import("./pages/ProductPage.vue"),
	},
];
