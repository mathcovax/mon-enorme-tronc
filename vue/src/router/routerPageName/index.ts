import { routerPageNameAdminPanel } from "@/domains/admin/router";
import { routerPageNameAuth } from "@/domains/auth/router";
import { routerPageNameEdito } from "@/domains/edito/router";

export const routerPageName = Object.freeze({
	...routerPageNameAdminPanel,
	...routerPageNameAuth,
	...routerPageNameEdito,
});
