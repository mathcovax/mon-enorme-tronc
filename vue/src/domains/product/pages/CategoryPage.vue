<script setup lang="ts">
import { useGetCategoryProductSheets } from "../composables/useGetCategoryProductSheets";
import ProductPagination from "../components/ProductPagination.vue";
import ProductCard from "../components/ProductCard.vue";
import { useGetComputedFilters } from "../composables/useGetComputedFilters";
import { useGetFullProductSheetCount } from "../composables/useGetFullProductSheetCount";
import type { QueryFilters } from "@/lib/utils";

const router = useRouter();
const $pt = usePageTranslate();
const { CATEGORIES_PAGE } = routerPageName;

const params = useRouteParams({ 
	categoryName: zod.string(), 
});
const query = useRouteQuery({
	page: zod.coerce.number().default(1)
});

const { 
	productSheets, 
	categoryProductSheetsRefQuery
} = useGetCategoryProductSheets({
	page: query.value.page, 
	categoryName: params.value.categoryName
});
const { 
	computedFilters, 
	computedFiltersRefQuery,
	
} = useGetComputedFilters(params.value.categoryName);
const { 
	fullProductSheetCount, 
	fullProductSheetCountRefQuery
} = useGetFullProductSheetCount(params.value.categoryName);

const currentPage = computed({
	get: () => categoryProductSheetsRefQuery.value.page ?? 1,
	set: (value: number) => {
		categoryProductSheetsRefQuery.value.page = value;
		router.push({ query: { page: value } });
	}
});

watch(
	() => query.value.page,
	() => {
		if (query.value.page !== categoryProductSheetsRefQuery.value.page) {
			return; 
		}
		categoryProductSheetsRefQuery.value.page = query.value.page;
	}
);

function filters(query: QueryFilters) {
	fullProductSheetCountRefQuery.value;
	computedFiltersRefQuery.value;
	categoryProductSheetsRefQuery.value;
}
</script>

<template>
	<section class="min-h-screen-no-header flex">
		<div class="grow container my-12 lg:my-16 flex flex-col gap-12">
			<div class="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
				<h1 class="text-2xl lg:text-3xl font-bold">
					{{ params.categoryName }}
				</h1>
			</div>

			<div v-if="productSheets">
				<ProductPagination 
					v-if="currentPage > 1"
					:total="fullProductSheetCount"
					:current-page="currentPage"
					@update="page => currentPage = page"
					:key="'top-pagination-' + currentPage"
				/>

				<div class="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					<ProductCard
						v-for="(product, index) in productSheets"
						:key="index"
						:product="product"
						class="w-full max-w-80 mx-auto"
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
				class="h-full flex flex-col justify-center items-center gap-1 text-center"
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
					<RouterLink :to="{ name: CATEGORIES_PAGE }">
						{{ $pt("buttonBack") }}
					</RouterLink>
				</TheButton>
			</div>
		</div>
	</section>
</template>
