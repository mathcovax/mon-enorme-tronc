import { createRouter, createWebHistory } from "vue-router";

import edito, { notFound } from "@/domains/edito/router";
import auth, { customersAuthRoutes } from "@/domains/auth/router";
import product from "@/domains/product/router";

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [
				...edito(),
				...product(),
				customersAuthRoutes(),
			]
		},
		...auth(),
		notFound(),
	],
	scrollBehavior() {
		return { top: 0 };
	},
});
