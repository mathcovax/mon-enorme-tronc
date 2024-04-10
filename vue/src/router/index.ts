import { createRouter, createWebHistory } from "vue-router";

import edito, { notFound } from "@/domains/edito/router";
import auth from "@/domains/auth/router";
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
			]
		},
		...auth(),
		notFound(),
	],
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 }
	},
});
