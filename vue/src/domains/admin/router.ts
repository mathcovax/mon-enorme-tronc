import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		path: "/admin-panel",
		component: () => import("./layout/AdminLayout.vue"),
		children: [
			{
				name: "admin-panel",
				path: "/admin-panel",
				component: () => import("./pages/adminPanel.vue"),
			},
		],
	},
];
