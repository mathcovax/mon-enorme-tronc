import type { NavigationBar } from "@/lib/utils";

export function useGetNavigationBar() {
	const items = ref<NavigationBar>([]);

	function getNavbarItems() {
		return duploTo.enriched
			.get("/navigation-bar",)
			.info("navigationBar", (data) => {
				items.value = data;
			})
			.result;
	}

	getNavbarItems();
	return {
		items,
		getNavbarItems
	};
}
