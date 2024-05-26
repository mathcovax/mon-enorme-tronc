import type { RouteRecordRaw } from "vue-router";

export const routerPageNameContentPanel = Object.freeze({
	CONTENT_PANEL_HOME: "content-panel-home",
	CONTENT_PANEL_CATEGORIES: "content-panel-categories",
	CONTENT_PANEL_PARENT_CATEGORIES: "content-panel-parent-categories",
});

export default (): RouteRecordRaw[] => [
	{
		path: "/content-panel",
		component: () => import("./layout/ContentLayout.vue"),
		children: [
			{
				name: routerPageNameContentPanel.CONTENT_PANEL_HOME,
				path: "/content-panel",
				component: () => import("./pages/HomeContentPanel.vue"),
			},
			{
				name: routerPageNameContentPanel.CONTENT_PANEL_CATEGORIES,
				path: "/content-panel/categories",
				component: () => import("./pages/CategoriesContentPanel.vue"),
			},
			{
				name: routerPageNameContentPanel.CONTENT_PANEL_PARENT_CATEGORIES,
				path: "/content-panel/parent-categories",
				component: () => import("./pages/ParentCategoriesContentPanel.vue"),
			},
		],
	},
];
