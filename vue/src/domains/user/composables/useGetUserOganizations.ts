import type { Organization } from "@/lib/utils";

export function useGetUserOganizations() {
	const organizations = ref<Organization[]>([]);

	function getUserOrganizations(page: number) {
		return duploTo.enriched
			.get(
				"/user/organizations",
				{ query: { page: page } }
			)
			.info("user.organizations", (data) => {
				organizations.value = data;
			})
			.result;
	}

	return {
		organizations,
		getUserOrganizations
	};
}
