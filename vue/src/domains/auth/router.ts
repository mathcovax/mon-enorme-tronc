import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAuth = Object.freeze({
	AUTH_LOGIN: "login",
	AUTH_REGISTER: "register",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAuth.AUTH_LOGIN,
		path: "/login",
		component: () => import("./pages/LoginPage.vue"),
	},
	{
		name: routerPageNameAuth.AUTH_REGISTER,
		path: "/register",
		component: () => import("./pages/RegisterPage.vue"),
	}
];
