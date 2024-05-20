import type { GetDef, GetResponseByInfo } from "@/lib/duploTo/EnrichedDuploTo";

export type ProductSheet = GetResponseByInfo<
	GetDef<"GET", "/organization/{organizationId}/product-sheets">,
	"product_sheets.found"
>["body"][number]

export function useGetProductSheets(organizationId: string) {
	const productSheets = ref<ProductSheet[]>([]);

	function getProductSheets(page: number, name: string) {
		return duploTo.enriched
			.get(
				"/organization/{organizationId}/product-sheets",
				{ params: { organizationId }, query: { page, name } }
			)
			.info("product_sheets.found", (data) => {
				productSheets.value = data;
			})
			.result;
	}
	return {
		productSheets,
		getProductSheets
	};
}