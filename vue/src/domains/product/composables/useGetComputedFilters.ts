import type { ComputedFilter } from "@/lib/utils";
import type { GetDef } from "../../../lib/duploTo/EnrichedDuploTo";

export type Query = GetDef<
	"GET",
	"/computed-filters"
>["parameters"]["query"]

export function useGetComputedFilters(query?: Query) {
	const computedFilters = ref<ComputedFilter[]>([]); 
	
	let abortController: AbortController | undefined;
	function getComputedFilters(query?: Query) {
		if (abortController) {
			abortController.abort();
		}
		abortController = new AbortController();

		return duploTo.enriched
			.get(
				"/computed-filters",
				{
					query,
					signal: abortController.signal
				}
			)
			.info("filters", (data) => {
				computedFilters.value = data;
			})
			.result;
	}

	const computedFiltersRefQuery = ref<Exclude<Query, undefined>>(query ?? {});
	
	watch(
		computedFiltersRefQuery, 
		() => {
			getComputedFilters(computedFiltersRefQuery.value);
		},
		{
			deep: true
		}
	);
	getComputedFilters(query);

	return {
		getComputedFilters,
		computedFilters,
		computedFiltersRefQuery
	};
}
