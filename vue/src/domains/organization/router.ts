import type { RouteRecordRaw } from "vue-router";

export const routerPageOrganization = Object.freeze({
	ORGANIZATION_MANAGE_USER: "organization-manage-user",
	MANAGE_PRODUCT_SHEET: "manage-product-sheet",
	CREATE_PRODUCT_SHEET: "create-product-sheet",
	EDIT_PRODUCT_SHEET: "edit-product-sheet",
	DASHBOARD: "organization"
});

export default (): RouteRecordRaw[] => [
	{
		path: "/organization",
		component: () => import("./layout/OrganizationLayout.vue"),
		children: [
			{
				name: routerPageOrganization.DASHBOARD,
				path: "/organization/:organizationId/dashboard",
				component: () => import("./pages/OrganizationPage.vue"),
			},
			{
				name: routerPageOrganization.ORGANIZATION_MANAGE_USER,
				path: "/organization/:organizationId/manage-user",
				component: () => import("./pages/ManageUserOrganization.vue"),
			},
			{
				name: routerPageOrganization.MANAGE_PRODUCT_SHEET,
				path: "/organization/:organizationId/manage-product-sheet",
				component: () => import("./pages/ManageProductSheet.vue")
			},
			{
				name: routerPageOrganization.CREATE_PRODUCT_SHEET,
				path: "/organization/:organizationId/create-product-sheet",
				component: () => import("./pages/FormProductSheet.vue")
			},
			{
				name: routerPageOrganization.EDIT_PRODUCT_SHEET,
				path: "/cate organization/:organizationId/edit-product-sheet/:productSheetId",
				component: () => import("./pages/FormProductSheet.vue")
			}
		]
	}
];
