import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "home",
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
