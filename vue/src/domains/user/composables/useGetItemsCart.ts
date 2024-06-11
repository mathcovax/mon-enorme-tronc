import type { ItemsCart } from "@/lib/utils";

export function useGetItemsCart() {
	const itemsCart = ref<ItemsCart>([]);

	function getItemsCart() {
		return duploTo.enriched
			.get(
				"/cart",
			)
			.info("cart.fetched", (data) => {
				itemsCart.value = data;
			});
	}

	getItemsCart();
	return {
		itemsCart,
		getItemsCart
	};
}
