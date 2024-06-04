import type { CategoryProductSheet } from "@/lib/utils";

export function useGetCategoryProductSheets(categoryName: string) {
	const productSheets = ref<CategoryProductSheet[]>([]);

	function getCategoryProductSheets(page?: number) {
		return duploTo.enriched
			.get(
				"/category/{categoryName}/product-sheets",
				{ params: { categoryName }, query: { page } }
			)
			.info("category.products", (data) => {
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
