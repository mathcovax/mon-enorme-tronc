import type { Promotion } from "@/lib/utils";

export function useGetOrganizationPromotions(organizationId: string) {
	const promotions = ref<Promotion[]>([]);

	function getOrganizationPromotions(page: number) {
		return duploTo.enriched
			.get(
				"/organization/{organizationId}/promotions",
				{ params: { page, organizationId } }
			)
			.info("organization.promotions", (data) => {
				promotions.value = data;
			});
	}

	return {
		promotions,
		getOrganizationPromotions
	};
}
