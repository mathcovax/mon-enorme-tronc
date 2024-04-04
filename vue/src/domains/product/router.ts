import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "category",
		path: "/category/:categoryId",
		component: () => import("./pages/CategoryPage.vue"),
	},
];
