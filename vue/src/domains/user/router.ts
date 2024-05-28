import type { RouteRecordRaw } from "vue-router";

export const routerPageNameUser = Object.freeze({
	USER_EDIT_PROFIL: "edit-profil",
	USER_CART: "cart",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameUser.USER_EDIT_PROFIL,
		path: "/edit-profil",
		component: () => import("./pages/EditProfil.vue"),
	},
	{
		name: routerPageNameUser.USER_CART,
		path: "/cart",
		component: () => import("./pages/CartPage.vue"),
	}
];
