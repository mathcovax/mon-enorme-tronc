import type { Product, ProductStatus } from "@/lib/utils";

export function useGetProducts(organizationId: string) {
	const products = ref<Product[]>([]);

	function getProducts(page: number, sku: string, productSheetId?: string, status?: ProductStatus) {
		return duploTo.enriched
			.get(
				"/organization/{organizationId}/products",
				{ 
					params: { organizationId }, 
					query: {
						page, 
						sku,
						productSheetId,
						status,
					} 
				},
				{ disabledLoader: true }
			)
			.info("products.found", (data) => {
				products.value = data;
			});
	}

	return {
		products,
		getProducts
	};
}
