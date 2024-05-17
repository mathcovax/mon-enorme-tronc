import { routerPageNameAdminPanel } from "@/domains/admin/router";
import { routerPageNameAuth } from "@/domains/auth/router";
import { routerPageNameContentPanel } from "@/domains/content/router";
import { routerPageNameEdito } from "@/domains/edito/router";

export const routerPageName = Object.freeze({
	...routerPageNameAdminPanel,
	...routerPageNameAuth,
	...routerPageNameEdito,
	...routerPageNameContentPanel
});
