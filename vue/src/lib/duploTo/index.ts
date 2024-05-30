import DuploTo from "@duplojs/to";
import type { EnrichedDuploTo } from "./EnrichedDuploTo";

declare global {
	//@ts-expect-error useless error
	export type { GetDef, GetResponseByCode, GetResponseByInfo } from "./EnrichedDuploTo";
}

interface InterceptorParams {
	disabledLoader?: boolean
	disabledToast?: boolean | string[]
}

export const duploTo = new DuploTo<
	InterceptorParams, 
	EnrichedDuploTo<InterceptorParams>
>({
	prefix: "api"
});

duploTo.setDefaultHeaders({
	get "access-token"() {
		return useUserStore().accessToken || undefined;
	}
});

duploTo.setResponseInterceptor(
	(responseObject, request, params) => {
		if (
			params.disabledToast !== true && 
			responseObject.success && 
			responseObject.info &&
			i18n.global.te(`response.${responseObject.info}`)
		) {
			if (!params.disabledToast || !params.disabledToast.includes(responseObject.info)) {
				if (responseObject.response.ok) {
					successToast($t(`response.${responseObject.info}`));
				}
				else {
					errorToast($t(`response.${responseObject.info}`));
				}
			}
		}
		
		return responseObject;
	}
);

duploTo.addHookCode(400, (req, res) => {
	if (res.success && res.info?.startsWith("TYPE_ERROR")) {
		errorToast($t("response.TYPE_ERROR"));
	}
});

duploTo.addHookInfo("NOTFOUND", () => {
	errorToast($t("response.NOTFOUND"));
});

duploTo.addHookInfo("INTERNAL_SERVER_ERROR", () => {
	errorToast($t("response.INTERNAL_SERVER_ERROR"));
});

duploTo.addHookInfo("WHAT_WAS_SENT_ERROR", () => {
	errorToast($t("response.WHAT_WAS_SENT_ERROR"));
});
