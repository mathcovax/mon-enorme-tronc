<script setup lang="ts">
import { useGetCategoryProductSheets } from "../composables/useGetCategoryProductSheets";
import ProductPagination from "../components/ProductPagination.vue";
import ProductCard from "../components/ProductCard.vue";
import TheFilters from "../components/TheFilters.vue";
import { useGetComputedFilters } from "../composables/useGetComputedFilters";
import { useGetFullProductSheetCount } from "../composables/useGetFullProductSheetCount";
import type { QueryFilters } from "@/lib/utils";

const router = useRouter();
const $pt = usePageTranslate();
const { CATEGORIES_PAGE, SEARCH_PAGE } = routerPageName;

const params = useRouteParams({ 
	categoryName: zod.string().optional(), 
	productSheetName: zod.string().optional(),
});

const query = useRouteQuery({
	page: zod.coerce.number().default(1)
});

const { 
	productSheets, 
	categoryProductSheetsRefQuery
} = useGetCategoryProductSheets({
	page: query.value.page, 
	categoryName: params.value.categoryName,
	searchByRegex: params.value.productSheetName,
});
const { 
	computedFilters, 
	computedFiltersRefQuery,
} = useGetComputedFilters({
	categoryName: params.value.categoryName,
	searchByRegex: params.value.productSheetName,
});
const { 
	fullProductSheetCount, 
	fullProductSheetCountRefQuery
} = useGetFullProductSheetCount({
	categoryName: params.value.categoryName,
	searchByRegex: params.value.productSheetName,
});

const currentPage = computed({
	get: () => categoryProductSheetsRefQuery.value.page ?? 1,
	set: (value: number) => {
		categoryProductSheetsRefQuery.value.page = value;
		router.push({ query: { page: value } });
	}
});

const filtersValue = ref<Record<string, QueryFilters[keyof QueryFilters]>>({});

watch(
	() => params.value.categoryName,
	() => {
		categoryProductSheetsRefQuery.value.categoryName = params.value.categoryName;
	}
);

watch(
	filtersValue,
	() => {
		const newQuery = filtersValue.value as QueryFilters;

		fullProductSheetCountRefQuery.value = {
			...fullProductSheetCountRefQuery.value,
			...newQuery
		};
		
		computedFiltersRefQuery.value = {
			...computedFiltersRefQuery.value,
			...newQuery
		};

		categoryProductSheetsRefQuery.value = {
			...categoryProductSheetsRefQuery.value,
			...newQuery
		};
	},
	{ deep: true }
);
</script>

<template>
	<section class="flex min-h-screen-no-header">
		<div class="container flex flex-col gap-12 my-12 grow lg:my-16">
			<div class="flex flex-col items-center justify-between gap-4 sm:gap-0 sm:flex-row">
				<h1 class="text-2xl font-bold lg:text-3xl">
					{{ $pt("title", {value: params.categoryName ?? params.productSheetName}) }}
				</h1>
			</div>

			<div
				class="grid gap-6 sm:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
			>
				<aside>
					<div
						v-if="fullProductSheetCount !== 0"
						class="sticky top-28"
					>
						<TheFilters
							:filters="computedFilters"
							v-model:filters-value="filtersValue"
						/>

						<span class="pt-4">{{ $pt('quantityProduct', {count: fullProductSheetCount}) }}</span>
					</div>
				</aside>

				<div v-if="productSheets">
					<ProductPagination 
						v-if="currentPage > 1"
						:total="fullProductSheetCount"
						:current-page="currentPage"
						@update="page => currentPage = page"
						:key="'top-pagination-' + currentPage"
					/>

					<div class="grid grid-cols-1 gap-6 my-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						<ProductCard
							v-for="(product, index) in productSheets"
							:key="index"
							:product="product"
							class="w-full mx-auto max-w-80"
						/>
					</div>

					<ProductPagination 
						v-if="fullProductSheetCount >= 40"
						:total="fullProductSheetCount"
						:current-page="currentPage"
						@update="page => currentPage = page"
						:key="'bottom-pagination-' + currentPage"
					/>
				</div>
			
				<div
					v-else
					class="flex flex-col items-center justify-center h-full gap-1 text-center"
				>
					<h2 class="text-2xl font-bold tracking-tight">
						{{ $pt("emptyTitle") }}
					</h2>

					<p class="text-sm text-muted-foreground">
						{{ $pt("emptySubtitle") }}
					</p>

					<TheButton 
						class="mt-4"
						as-child
					>
						<RouterLink :to="{ name: params.categoryName ? CATEGORIES_PAGE : SEARCH_PAGE }">
							{{ $pt("buttonBack") }}
						</RouterLink>
					</TheButton>
				</div>
			</div>
		</div>
	</section>
</template>
