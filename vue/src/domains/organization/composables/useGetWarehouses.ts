import type { Warehouse } from "@/lib/utils";

export function useGetWarehouses(organizationId: string) {
	const warehouses = ref<Warehouse[]>([]);

	function getWarehouses(page?: number, name?: string) {
		return duploTo.enriched
			.get(
				"/organization/{organizationId}/warehouses",
				{ params: { organizationId }, query: { page, name } }
			)
			.info("warehouses.found", (data) => {
				warehouses.value = data;
			});
	}
	return {
		warehouses,
		getWarehouses
	};
}
