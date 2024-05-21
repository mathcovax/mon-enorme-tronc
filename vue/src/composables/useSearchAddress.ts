export function useSearchAddresses() {
	const addresses = ref<string[]>([]);

	function searchAddresses(address: string) {
		duploTo.enriched.
			get("/geocoder", { query: { address } })
			.s((resultAddresses) => {
				addresses.value = resultAddresses;
			});	
	}

	return {
		addresses,
		searchAddresses
	};
}
