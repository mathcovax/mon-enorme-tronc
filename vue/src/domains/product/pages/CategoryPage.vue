<script setup lang="ts">
import { useGetCategoryProductSheets } from "../composables/useGetCategoryProductSheets";
import ProductPagination from "../components/ProductPagination.vue";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();
const { CATEGORIES_PAGE } = routerPageName;
const $pt = usePageTranslate();

const currentPage = ref(0);

const { categoryName } = useRouteParams({ 
	categoryName: zod.string(), 
});
const { productSheets, totalProductSheets, getCategoryProductSheets } = useGetCategoryProductSheets(categoryName);

getCategoryProductSheets(currentPage.value);

const updatePage = (page: number) => {
	currentPage.value = page;
	getCategoryProductSheets(currentPage.value - 1);
};
</script>

<template>
	<section class="min-h-screen-no-header flex">
		<div class="grow container my-12 lg:my-16 flex flex-col gap-12">
			<div class="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
				<h1 class="text-2xl lg:text-3xl font-bold">
					{{ route.params.categoryName }}
				</h1>

				<div
					v-if="productSheets.length > 0"
					class="flex gap-4 items-center text-sm opacity-50"
				>
					<span>
						Affiche les produits de 
						{{ productSheets.length * currentPage + 1 }} 
						à
						{{ Math.min(productSheets.length * (currentPage + 1), totalProductSheets) }}
					</span>

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

			<div
				v-if="totalProductSheets > 0"
			>
				<ProductPagination 
					:items-per-page="productSheets.length"
					:total-product-sheets="totalProductSheets"
					:current-page="currentPage + 1"
					@update="updatePage($event)"
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
					:items-per-page="productSheets.length"
					:total-product-sheets="totalProductSheets"
					:current-page="currentPage + 1"
					@update="updatePage($event)"
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
