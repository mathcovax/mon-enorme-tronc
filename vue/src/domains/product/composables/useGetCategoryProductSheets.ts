import type { CategoryProductSheet } from "@/lib/utils";

export function useGetCategoryProductSheets(categoryName: string) {
	const productSheets = ref<CategoryProductSheet[]>([]);

	function getCategoryProductSheets(page?: number) {
		return duploTo.enriched
			.get(
				"/category/{categoryName}/full-product-sheets",
				{ params: { categoryName }, query: { page } }
			)
			.info("fullProductSheets", (data) => {
				productSheets.value = data;
			})
			.result;
	}
	getCategoryProductSheets();
	
	return {
		productSheets,
		getCategoryProductSheets
	};
}
