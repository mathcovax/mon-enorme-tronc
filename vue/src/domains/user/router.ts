import type { RouteRecordRaw } from "vue-router";

export const routerPageNameUser = Object.freeze({
	USER_EDIT_PROFIL: "edit-profil"
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameUser.USER_EDIT_PROFIL,
		path: "/edit-profil",
		component: () => import("./pages/EditProfil.vue"),
	},
];
