import DuploTo from "@duplojs/to";
import type { EnrichedDuploTo } from "./EnrichedDuploTo";

declare global {
	//@ts-expect-error useless error
	export type { GetDef, GetResponseByCode, GetResponseByInfo } from "./EnrichedDuploTo";
}

interface InterceptorParams {
	disabledLoader?: boolean
	disabledToast?: boolean
}

export const duploTo = new DuploTo<
	InterceptorParams, 
	EnrichedDuploTo<InterceptorParams>
>({
	prefix: "api"
});

duploTo.setDefaultHeaders({
	get "access-token"(){
		return useUserStore().accessToken || undefined;
	}
});

duploTo.setResponseInterceptor(
	(responseObject, request, params) => {
		if(
			!params.disabledToast && 
			responseObject.success && 
			responseObject.info &&
			i18n.global.te(`response.${responseObject.info}`)
		) {
			if(responseObject.response.ok){
				successToast($t(`response.${responseObject.info}`));
			}
			else {
				errorToast($t(`response.${responseObject.info}`));
			}
		}
		
		return responseObject;
	}
);

