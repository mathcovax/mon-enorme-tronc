import DuploTo from "@duplojs/to";
import type { EnrichedDuploTo } from "./EnrichedDuploTo";

interface InterceptorParams {
	disabledLoader?: boolean
}

export const duploTo = new DuploTo<
	InterceptorParams, 
	EnrichedDuploTo<InterceptorParams>
>({
	prefix: "api"
});
