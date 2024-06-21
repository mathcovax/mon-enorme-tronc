import type { RouteRecordRaw } from "vue-router";

export const routerPageNamePayment = Object.freeze({
	USER_ORDER: "orders",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNamePayment.USER_ORDER,
		path: "/orders",
		component: () => import("./pages/OrderPage.vue"),
	}
];
