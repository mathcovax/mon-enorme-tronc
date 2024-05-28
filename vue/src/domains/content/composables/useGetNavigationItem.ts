import type { NavigationItem } from "@/lib/utils";


export function useGetNavigationItem() {
	const navigationItems = ref<NavigationItem[]>([]);

	function getNavigationItem() {
		return duploTo.enriched
			.get("/navigation-items")
			.info("navigationItems", (data) => {
				navigationItems.value = data;
			})
			.result;
	}
	
	getNavigationItem();
	return {
		navigationItems,
		getNavigationItem
	};
}
