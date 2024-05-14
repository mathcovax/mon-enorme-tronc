import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		path: "/admin-panel",
		component: () => import("./layout/AdminLayout.vue"),
		children: [
			{
				name: "admin-panel",
				path: "/admin-panel",
				component: () => import("./pages/homeAdminPanel.vue"),
			},
			{
				name: "admin-panel-organization",
				path: "/admin-panel/organization",
				component: () => import("./pages/organizationAdminPanel.vue"),
			},
		],
	},
];
