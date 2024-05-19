import type { Organization } from "@/lib/utils";

export function useGetOganizations(){
	const organizations = ref<Organization[]>([]);

	function getOrganizations(page: number, name: string){
		return duploTo.enriched
			.get(
				"/organizations",
				{ query: { page, name } }
			)
			.info("organizations", (data) => {
				organizations.value = data;
			})
			.result;
	}

	return {
		organizations,
		getOrganizations
	};
}
