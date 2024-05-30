import { createRouter, createWebHistory } from "vue-router";
import edito, { notFound } from "@/domains/edito/router";
import auth from "@/domains/auth/router";
import product from "@/domains/product/router";
import admin from "@/domains/admin/router";
import content from "@/domains/content/router";
import organization from "@/domains/organization/router";
import { loaderPush, type LoaderItem } from "@/lib/loader";

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

let loaderItem: LoaderItem | undefined;

router.beforeEach((to, form, next) => {
	if (to.fullPath === "/") {
		return next();
	}

	loaderItem = loaderPush();
	duploTo.get(`/entry${to.fullPath}`)
		.info("entry.accepted", () => next())
		.e(() => {
			loaderItem?.close();
			loaderItem = undefined;
			next("/");
		})
		.catch(() => {
			loaderItem?.close();
			loaderItem = undefined;
			next("/");
		});
});

router.afterEach(() => {
	loaderItem?.close();
	loaderItem = undefined;
});
