import type { ComputedFilter } from "@/lib/utils";
import type { GetDef } from "../../../lib/duploTo/EnrichedDuploTo";

export type Query = GetDef<
	"GET",
	"/computed-filters"
>["parameters"]["query"]

export function useGetComputedFilters(categoryName?: string) {
	const computedFilters = ref<ComputedFilter[]>([]); 
	
	let abortController: AbortController | undefined;
	function getComputedFilters(query?: Omit<Query, "categoryName">) {
		if (abortController) {
			abortController.abort();
		}
		abortController = new AbortController();

		return duploTo.enriched
			.get(
				"/computed-filters",
				{
					query: {
						...query,
						categoryName,
					},
					signal: abortController.signal
				}
			)
			.info("filters", (data) => {
				computedFilters.value = data;
			})
			.result;
	}

	const computedFiltersRefQuery = ref<Omit<Exclude<Query, undefined>, "categoryName">>({});
	
	watchEffect(() => {
		getComputedFilters(computedFiltersRefQuery.value);
	});

	return {
		getComputedFilters,
		computedFilters,
		computedFiltersRefQuery
	};
}
