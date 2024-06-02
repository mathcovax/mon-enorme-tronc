import type { Product } from "@/lib/utils";

export function useGetProducts(organizationId: string) {
	const products = ref<Product[]>([]);

	function getProducts(page: number, sku: string) {
		return duploTo.enriched
			.get(
				"/organization/{organizationId}/products",
				{ 
					params: { organizationId }, 
					query: {
						page, 
						sku, 
						withProductSheet: "true", 
						withWarehouse: "true" 
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
