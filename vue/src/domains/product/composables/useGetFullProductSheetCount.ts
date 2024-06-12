import type { GetDef } from "../../../lib/duploTo/EnrichedDuploTo";

type Query = GetDef<
	"GET",
	"/full-product-sheets-count"
>["parameters"]["query"]

export function useGetFullProductSheetCount(categoryName?: string) {
	const fullProductSheetCount = ref<number>(0); 

	let abortController: AbortController | undefined;
	function getFullProductSheetCount(query?: Omit<Query, "categoryName">) {
		if (abortController) {
			abortController.abort();
		}
		abortController = new AbortController();

		return duploTo.enriched
			.get(
				"/full-product-sheets-count",
				{
					query: {
						...query,
						categoryName,
					},
					signal: abortController.signal
				}
			)
			.info("fullProductSheetCount", (data) => {
				fullProductSheetCount.value = Number(data);
			})
			.result;
	}

	const fullProductSheetCountRefQuery = ref<Omit<Exclude<Query, undefined>, "categoryName">>({});
	
	watchEffect(() => {
		getFullProductSheetCount(fullProductSheetCountRefQuery.value);
	});

	return {
		getFullProductSheetCount,
		fullProductSheetCount,
		fullProductSheetCountRefQuery
	};
}
