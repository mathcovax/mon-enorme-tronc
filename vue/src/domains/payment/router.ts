import type { RouteRecordRaw } from "vue-router";

export const routerPageNamePayment = Object.freeze({
	ORDER_PAGE: "order",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNamePayment.ORDER_PAGE,
		path: "/order",
		component: () => import("./pages/OrderPage.vue"),
	}
];
