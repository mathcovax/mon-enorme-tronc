import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "category",
		path: "/category/:categoryName",
		component: () => import("./pages/CategoryPage.vue"),
	},
];
