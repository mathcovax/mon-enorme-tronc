import { createRouter, createWebHistory } from "vue-router";

import home from "@/domains/edito/router";

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/TheBase.vue"),
			children: [
				home()
			]
		},
	]
});
