import type { RouteRecordRaw } from "vue-router";

export const routerPageNameOrganization = Object.freeze({
	ORGANIZATION_MANAGE_USER: "organization-manage-user",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameOrganization.ORGANIZATION_MANAGE_USER,
		path: "/organization/:organizationId/manage-user",
		component: () => import("./pages/ManageUserOrganization.vue"),
	}
];