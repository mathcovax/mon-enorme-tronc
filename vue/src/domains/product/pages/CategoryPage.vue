<script setup lang="ts">
import { useGetCategoryProductSheets } from "../composables/useGetCategoryProductSheets";
import ProductPagination from "../components/ProductPagination.vue";
import ProductCard from "../components/ProductCard.vue";
import { useGetComputedFilters } from "../composables/useGetComputedFilters";
import { useGetFullProductSheetCount } from "../composables/useGetFullProductSheetCount";
import type { QueryFilters } from "@/lib/utils";

const router = useRouter();
const $pt = usePageTranslate();

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
	ComputedFiltersRefQuery
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

function filters(query: QueryFilters) {
	fullProductSheetCountRefQuery.value;
	ComputedFiltersRefQuery.value;
	categoryProductSheetsRefQuery.value;
}

const updatePage = (page: number) => {
	currentPage.value = page;
};
</script>

<template>
	<section class="min-h-screen-no-header flex">
		<div class="grow container my-12 lg:my-16 flex flex-col gap-12">
			<div class="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
				<h1 class="text-2xl lg:text-3xl font-bold">
					{{ params.categoryName }}
				</h1>

				<div
					v-if="productSheets.length > 0"
					class="flex gap-4 items-center text-sm opacity-50"
				>
					<TheSelect default-value="popular">
						<SelectTrigger class="w-[180px]">
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							<SelectGroup>
								<SelectItem value="popular">
									Le plus populaire
								</SelectItem>

								<SelectItem value="new">
									Nouveautés
								</SelectItem>

								<SelectItem value="price-asc">
									Du moins cher au plus cher
								</SelectItem>

								<SelectItem value="price-des">
									Du plus cher au moins cher
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</TheSelect>
				</div>
			</div>

			<div>
				<ProductPagination 
					v-if="currentPage > 1"
					:items-per-page="50"
					:total-product-sheets="fullProductSheetCount"
					:current-page="currentPage"
					@update="updatePage($event)"
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
					v-if="fullProductSheetCount >= 50"
					:items-per-page="50"
					:total-product-sheets="fullProductSheetCount"
					:current-page="currentPage"
					@update="updatePage($event)"
					:key="'bottom-pagination-' + currentPage"
				/>
			</div>
			<!-- 
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
			</div> -->
		</div>
	</section>
</template>
