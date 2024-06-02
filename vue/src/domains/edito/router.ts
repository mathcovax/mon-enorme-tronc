import type { RouteRecordRaw } from "vue-router";

export const routerPageNameEdito = Object.freeze({
	EDITO_HOME: "/",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameEdito.EDITO_HOME,
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
];

export const notFound = (): RouteRecordRaw => ({
	path: "/:notFoundPath(.*)*",
	component: () => import("@/layouts/BaseLayout.vue"),
	children: [
		{
			name: "not-found",
			path: "/:notFoundPath(.*)*",
			component: () => import("./pages/NotFound.vue"),
		}
	]
});
