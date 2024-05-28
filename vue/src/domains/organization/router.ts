import type { RouteRecordRaw } from "vue-router";

export const routerPageNameOrganization = Object.freeze({
	ORGANIZATION_HOME: "organizations",
	ORGANIZATION_EDIT: "organization-edit",
	ORGANIZATION_MANAGE_USER: "organization-manage-user",
	ORGANIZATION_CREATE_PRODUCT_SHEET: "create-product-sheet",
	ORGANIZATION_EDIT_PRODUCT_SHEET: "edit-product-sheet",
	ORGANIZATION_GET_PRODUCT_SHEET: "get-product-sheet",
	ORGANIZATION_GET_WAREHOUSE: "get-warehouse",
	ORGANIZATION_MANAGE_PRODUCT: "manage-product"
});

export default (): RouteRecordRaw[] => [
	{
		path: "/organizations",
		component: () => import("./layout/OrganizationLayout.vue"),
		children: [
			{
				name: routerPageNameOrganization.ORGANIZATION_HOME,
				path: "/organizations",
				component: () => import("./pages/OrganizationsPage.vue"),
			},
			{
				name: routerPageNameOrganization.ORGANIZATION_EDIT,
				path: "/organization/:organizationId/manage",
				component: () => import("./pages/EditOrganization.vue"),
			},
			{
				name: routerPageNameOrganization.ORGANIZATION_MANAGE_USER,
				path: "/organizations/:organizationId/manage-user",
				component: () => import("./pages/ManageUserOrganization.vue"),
			},
			{
				name: routerPageNameOrganization.ORGANIZATION_CREATE_PRODUCT_SHEET,
				path: "/organizations/:organizationId/create-product-sheet",
				component: () => import("./pages/CreateProductSheet.vue")
			},
			{
				name: routerPageNameOrganization.ORGANIZATION_EDIT_PRODUCT_SHEET,
				path: "/organizations/:organizationId/edit-product-sheet/:productSheetId",
				component: () => import("./pages/EditProductSheet.vue")
			},
			{
				name: routerPageNameOrganization.ORGANIZATION_GET_PRODUCT_SHEET,
				path: "/organizations/:organizationId/product-sheets",
				component: () => import("./pages/ProductSheets.vue")
			},
			{
				name: routerPageNameOrganization.ORGANIZATION_GET_WAREHOUSE,
				path: "/organizations/:organizationId/warehouses",
				component: () => import("./pages/WarehousesPage.vue")
			},
			{
				name: routerPageNameOrganization.ORGANIZATION_MANAGE_PRODUCT,
				path: "/organization/:organizationId/products",
				component: () => import("./pages/ProductsOrganization.vue")
			},
		]
	}
];
