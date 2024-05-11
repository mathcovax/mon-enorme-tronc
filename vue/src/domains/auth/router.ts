import type { RouteRecordRaw } from "vue-router";


export default (): RouteRecordRaw[] => [
	{
		name: "login",
		path: "/login",
		component: () => import("./pages/LoginPage.vue"),
	},
	{
		name: "register",
		path: "/register",
		component: () => import("./pages/RegisterPage.vue"),
	}
];
