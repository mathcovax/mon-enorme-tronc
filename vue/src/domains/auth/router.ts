import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "customer-login",
		path: "/login",
		component: () => import("./pages/LoginPage.vue"),
	},
	{
		name: "admin-login",
		path: "/admin-login",
		component: () => import("./pages/LoginPage.vue"),
	},
	{
		name: "store-keeper-login",
		path: "/store-keeper-login",
		component: () => import("./pages/LoginPage.vue"),
	},
	{
		name: "accountant-login",
		path: "/accountant-login",
		component: () => import("./pages/LoginPage.vue"),
	},
];
