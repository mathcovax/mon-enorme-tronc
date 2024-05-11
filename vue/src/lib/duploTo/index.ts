import DuploTo from "@duplojs/to";
import type { EnrichedDuploTo } from "./EnrichedDuploTo";

declare global {
	//@ts-expect-error useless error
	export type { GetDef, GetResponseByCode, GetResponseByInfo } from "./EnrichedDuploTo";
}

interface InterceptorParams {
	disabledLoader?: boolean
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
