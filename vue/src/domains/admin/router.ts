import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdminPanel = Object.freeze({
	ADMIN_PANEL_HOME: "admin-panel",
	ADMIN_PANEL_ORGANIZATIONS: "admin-panel-organizations",
	ADMIN_PANEL_USERS: "admin-panel-users",
});

export default (): RouteRecordRaw[] => [
	{
		path: "/admin-panel",
		component: () => import("./layout/AdminLayout.vue"),
		children: [
			{
				name: routerPageNameAdminPanel.ADMIN_PANEL_HOME,
				path: "/admin-panel",
				component: () => import("./pages/homeAdminPanel.vue"),
			},
			{
				name: routerPageNameAdminPanel.ADMIN_PANEL_ORGANIZATIONS,
				path: "/admin-panel/organizations",
				component: () => import("./pages/organizationsAdminPanel.vue"),
			},
			{
				name: routerPageNameAdminPanel.ADMIN_PANEL_USERS,
				path: "/admin-panel/users",
				component: () => import("./pages/UsersAdminPanel.vue"),
			},
		],
	},
];
