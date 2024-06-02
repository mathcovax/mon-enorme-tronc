import type { GetDef } from "@/lib/duploTo/EnrichedDuploTo";

export type Query = Exclude<
	GetDef<"GET", "/geocoder">["parameters"]["query"], 
	undefined
>

export function useSearchAddresses() {
	const addresses = ref<string[]>([]);

	let abortController: AbortController | undefined;
	function searchAddresses(address?: string) {
		if (abortController) {
			abortController.abort();
		}
		abortController = new AbortController();

		return duploTo.enriched
			.get(
				"/geocoder", 
				{ 
					query: { address }, 
					signal: abortController.signal 
				},
				{ disabledLoader: true }
			)
			.s((resultAddresses) => {
				addresses.value = resultAddresses;
			})
			.then(() => abortController = undefined)
			.result;	
	}

	const addressesQuery = reactive<Query>({});

	watch(
		addressesQuery,
		() => {
			searchAddresses(addressesQuery.address);
		},
		{
			immediate: true
		}
	);

	return {
		addresses,
		searchAddresses,
		addressesQuery,
	};
}
