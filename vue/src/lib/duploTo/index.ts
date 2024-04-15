import DuploTo from "@duplojs/to";
import type EnrichedDuploTo from "@duplojs/to";

interface InterceptorParams {
	disabledLoader?: boolean
}

export const duploTo = new DuploTo<
	InterceptorParams, 
	EnrichedDuploTo<InterceptorParams>
>({
	prefix: "api"
});
