import type { GetDef } from "@/lib/duploTo/EnrichedDuploTo";
import type { Category } from "@/lib/utils";

export type Query = Exclude<
	GetDef<"GET", "/categories">["parameters"]["query"], 
	undefined
>

export function useSearchCategories() {
	const categories = ref<Category[]>([]);

	let abortController: AbortController | undefined;
	function getCategories(page?: number, name?: string, withDisabled = true) {
		if (abortController) {
			abortController.abort();
		}
		abortController = new AbortController();

		return duploTo.enriched
			.get(
				"/categories",
				{ 
					query: { page, name, withDisabled }, 
					signal: abortController.signal
				}
			)
			.info("categories", (data) => {
				categories.value = data;
			})
			.then(() => abortController = undefined)
			.result;
	}

	const categoriesQuery = reactive<Query>({
		page: 0,
		name: "",
		withDisabled: true,
	});
	
	watchEffect(
		() => {
			getCategories(
				categoriesQuery.page, 
				categoriesQuery.name, 
				categoriesQuery.withDisabled
			);
		}
	);

	return {
		categories,
		getCategories,
		categoriesQuery,
	};
}
