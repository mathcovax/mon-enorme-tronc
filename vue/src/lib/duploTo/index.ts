import DuploTo from "@duplojs/to";
import type {EnrichedDuplojsTo} from ".duplojs/client/EnrichedDuploTo";

interface InterceptorParams {
	disabledLoader?: boolean
}

export const duploTo = new DuploTo<
	InterceptorParams, 
	EnrichedDuplojsTo<InterceptorParams>
>();

duploTo.enriched.get("/is-odd", {query: {number: 1}})
	.s((data) => {
		data;
	});
