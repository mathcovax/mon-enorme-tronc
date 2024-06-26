import type { Organization } from "@/lib/utils";

export function useGetOrganization(organizationId: string) {
	const organization = ref<Organization>({
		id: "",
		name: "",
		label: "",
		ownerId: "",
		suspended: false,
		logoKey: "",
		logoUrl: "",
	});

	function getOrganization() {
		return duploTo.enriched
			.get(
				"/organization/{organizationId}",
				{ params: { organizationId } }
			)
			.info("organization.found", (data) => {
				organization.value = data;
			});
	}

	return {
		organization,
		getOrganization
	};
}
