import type { RouteRecordRaw } from "vue-router";

export const routerPageOrganization = Object.freeze({
	ORGANIZATION_MANAGE_USER: "organization-manage-user",
	ORGANIZATION_CREATE_PRODUCT_SHEET: "create-product-sheet",
	ORGANIZATION_EDIT_PRODUCT_SHEET: "edit-product-sheet",
	ORGANIZATION_GET_PRODUCT_SHEET: "get-product-sheet",
	ORGANIZATION_DASHBOARD: "organization",
});

export default (): RouteRecordRaw[] => [
	{
		path: "/organization",
		component: () => import("./layout/OrganizationLayout.vue"),
		children: [
			{
				name: routerPageOrganization.ORGANIZATION_DASHBOARD,
				path: "/organization/:organizationId/dashboard",
				component: () => import("./pages/OrganizationPage.vue"),
			},
			{
				name: routerPageOrganization.ORGANIZATION_MANAGE_USER,
				path: "/organization/:organizationId/manage-user",
				component: () => import("./pages/ManageUserOrganization.vue"),
			},
			{
				name: routerPageOrganization.ORGANIZATION_CREATE_PRODUCT_SHEET,
				path: "/organization/:organizationId/create-product-sheet",
				component: () => import("./pages/CreateProductSheet.vue")
			},
			{
				name: routerPageOrganization.ORGANIZATION_EDIT_PRODUCT_SHEET,
				path: "/organization/:organizationId/edit-product-sheet/:productSheetId",
				component: () => import("./pages/EditProductSheet.vue")
			},
			{
				name: routerPageOrganization.ORGANIZATION_GET_PRODUCT_SHEET,
				path: "/organization/:organizationId/product-sheets",
				component: () => import("./pages/ProductSheets.vue")
			}
		]
	}
];
