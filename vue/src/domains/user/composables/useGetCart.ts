import type { Cart } from "@/lib/utils";

export function useGetCart() {
	const cart = ref<Cart>([]);

	function getCart() {
		return duploTo.enriched
			.get(
				"/cart",
			)
			.info("cart.fetched", (data) => {
				cart.value = data;
				console.log(data);
			});
	}

	getCart();
	return {
		cart,
		getCart
	};
}
