import type { RouteRecordRaw } from "vue-router";

export const routerPageNamePayment = Object.freeze({
	COMMAND_PAGE: "command",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNamePayment.COMMAND_PAGE,
		path: "/command",
		component: () => import("./pages/CommandPage.vue"),
	}
];
