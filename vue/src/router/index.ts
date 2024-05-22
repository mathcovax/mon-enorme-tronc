import { createRouter, createWebHistory } from "vue-router";
import edito, { notFound } from "@/domains/edito/router";
import auth from "@/domains/auth/router";
import product from "@/domains/product/router";
import admin from "@/domains/admin/router";
import content from "@/domains/content/router";
import organization from "@/domains/organization/router";

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
		...organization(),
		...content(),
		...organization(),
		...admin(),
		...organization(),
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
