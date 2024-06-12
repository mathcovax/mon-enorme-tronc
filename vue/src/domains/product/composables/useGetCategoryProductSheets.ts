import type { CategoryProductSheet } from "@/lib/utils";

export function useGetCategoryProductSheets(categoryName: string) {
	const productSheets = ref<CategoryProductSheet[]>([]);
	const totalProductSheets = ref(0);

	function getCategoryProductSheets(page?: number) {
		return duploTo.enriched
			.get(
				"/category/{categoryName}/full-product-sheets",
				{ params: { categoryName }, query: { page } }
			)
			.info("fullProductSheets", (data) => {
				productSheets.value = data.fullProductSheets;
				totalProductSheets.value = data.total;
			})
			.result;
	}
	
	return {
		productSheets,
		totalProductSheets,
		getCategoryProductSheets
	};
}
