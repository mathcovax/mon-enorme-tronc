import type { GetDef } from "../../../lib/duploTo/EnrichedDuploTo";
import type { CategoryProductSheet } from "@/lib/utils";

type Query = GetDef<
	"GET",
	"/category/{categoryName}/full-product-sheets"
>["parameters"]["query"]

export function useGetCategoryProductSheets(categoryName: string) {
	const productSheets = ref<CategoryProductSheet[]>([]);

	let abortController: AbortController | undefined;
	function getCategoryProductSheets(query?: Query) {
		if (abortController) {
			abortController.abort();
		}
		abortController = new AbortController();

		return duploTo.enriched
			.get(
				"/category/{categoryName}/full-product-sheets",
				{ params: { categoryName }, query, signal: abortController.signal }
			)
			.info("fullProductSheets", (data) => {
				productSheets.value = data;
			})
			.result;
	}

	const categoryProductSheetsRefQuery = ref<Exclude<Query, undefined>>({});
	
	watchEffect(() => {
		getCategoryProductSheets(categoryProductSheetsRefQuery.value);
	});
	
	return {
		productSheets,
		getCategoryProductSheets,
		categoryProductSheetsRefQuery
	};
}
