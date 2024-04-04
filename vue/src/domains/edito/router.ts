import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw => ({
	name: "home",
	path: "/",
	component: () => import("./page/TheHome.vue"),
});
