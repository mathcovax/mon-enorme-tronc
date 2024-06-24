<script setup lang="ts">
import { useGetCategoryProductSheets } from "@/domains/product/composables/useGetCategoryProductSheets";
import type { FullProductSheet } from "@/lib/utils";

const { SEARCH_PAGE, PRODUCT_PAGE } = routerPageName;
const router = useRouter();
const params = useRouteParams({ 
	productSheetName: zod.string().optional(),
});

const { getCategoryProductSheets, productSheets } = useGetCategoryProductSheets({
	available: true,
	searchByRegex: params.value.productSheetName,
});

const search = ref(params.value.productSheetName ?? "");
const suggestions = ref(false);
// const filteredProductSheets = computed(() => {
// 	if (!productSheets.value) {
// 		return null;
// 	}

// 	return productSheets.value.filter((productSheet: FullProductSheet) => productSheet.quantity > 0);
// });

function openSuggestions() {
	suggestions.value = true;
}

function closeSuggestions(instant = false) {
	setTimeout(() => {
		suggestions.value = false;
	}, instant ? 0 : 300);
}

function submit() {
	if (!search.value) {
		return;
	}

	closeSuggestions();
	router.push({ name: SEARCH_PAGE, params: { productSheetName: search.value.trim() } });
}

watch(
	() => search.value,
	() => {
		if (!search.value) {
			return;
		}

		getCategoryProductSheets({ available: true, searchByRegex: search.value });
	}
);
</script>

<template>
	<div class="relative lg:flex-1 flex gap-3 justify-end items-center">
		<form
			@submit="$event.preventDefault(); submit()"
			class="hidden lg:block grow max-w-144"
		>
			<input
				type="text"
				placeholder="Rechercher un produit..."
				class="w-full px-4 py-3 bg-whiteless rounded-full"
				v-model="search"
				@focus="openSuggestions"
				@blur="closeSuggestions()"
			>
		</form>

		<ul
			v-if="search && productSheets && productSheets.length > 0 && suggestions"
			class="absolute top-[calc(100%+0.5rem)] left-0 hidden lg:flex flex-col gap-2 bg-whiteless rounded-lg p-4 shadow-lg w-full max-h-96 overflow-y-auto"
		>
			<li
				v-for="productSheet in productSheets"
				:key="productSheet.id"
			>
				<RouterLink
					:to="{ name: PRODUCT_PAGE, params: { productSheetId: productSheet.id } }"
					class="flex items-center gap-2"
					@click="closeSuggestions(true)"
				>
					{{ productSheet.name }}
				</RouterLink>
			</li>
		</ul>
	</div>
</template>
