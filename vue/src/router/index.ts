import { createRouter, createWebHistory } from "vue-router";
import edito, { notFound } from "@/domains/edito/router";
import auth from "@/domains/auth/router";
import product from "@/domains/product/router";
import admin from "@/domains/admin/router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [
				...edito(),
				...product(),
				...auth(),
			]
		},
		...admin(),
		notFound(),
	],
	scrollBehavior() {
		return { top: 0 };
	},
});

export default router;

router.beforeEach((to, form, next) => {
	duploTo.get(`/entry${to.fullPath}`)
		.info("entry.accepted", () => next())
		.e(() => next("/"))
		.catch(() => next("/"));
});
