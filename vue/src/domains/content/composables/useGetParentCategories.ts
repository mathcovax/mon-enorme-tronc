import type { GetDef } from "@/lib/duploTo/EnrichedDuploTo";
import type { ParentCategory } from "@/lib/utils";

export type Query = Exclude<
	GetDef<"GET", "/parent-categories">["parameters"]["query"], 
	undefined
>

export function useGetParentCategories(withCategories?: boolean) {
	const parentCategories = ref<ParentCategory[]>([]);

	let abortController: AbortController | undefined;
	function getParentCategories(
		page?: number, 
		name?: string,
		withCategories?: Query["withCategories"],
	) {
		if (abortController) {
			abortController.abort();
		}
		abortController = new AbortController();

		return duploTo.enriched
			.get(
				"/parent-categories",
				{ 
					query: { 
						page, 
						name, 
						withCategories: withCategories ? "true" : undefined
					}, 
					signal: abortController.signal
				}
			)
			.info("parentCategory", (data) => {
				parentCategories.value = data;
			})
			.then(() => abortController = undefined)
			.result;
	}

	const refreshSignal = ref(true);

	const parentCategoriesQuery = reactive<Query>({
		page: 0,
		name: "",
		withCategories: withCategories ? "true" : undefined
	});
	
	watchEffect(
		() => {
			refreshSignal.value;
			getParentCategories(
				parentCategoriesQuery.page, 
				parentCategoriesQuery.name, 
				parentCategoriesQuery.withCategories ? "true" : undefined
			);
		}
	);

	return {
		parentCategories,
		getParentCategories,
		parentCategoriesQuery,
		refreshParentCategories: () => refreshSignal.value = !refreshSignal.value
	};
}
