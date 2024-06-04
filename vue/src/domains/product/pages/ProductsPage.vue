<script setup lang="ts">
import { useGetCategoryProductSheets } from "../composables/useGetCategoryProductSheets";
import { ThePagination, PaginationList, PaginationListItem } from "@/components/ui/pagination";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();
const $pt = usePageTranslate();

const itemsPerPage = ref(10);
const currentPage = ref(1);

const { categoryName } = useRouteParams({ 
	categoryName: zod.string(), 
});
const { productSheets, getCategoryProductSheets } = useGetCategoryProductSheets(categoryName);

getCategoryProductSheets();

const paginatedProducts = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value;
	const end = start + itemsPerPage.value;

	console.log(productSheets.value);
	return productSheets.value.slice(start, end);
});

const updatePage = (page: number) => {
	currentPage.value = page;
	getCategoryProductSheets(currentPage.value);
};
</script>

<template>
	<section class="min-h-screen-no-header flex">
		<div 
			class="grow container my-12 lg:my-16 flex flex-col gap-12"
		>
			<div class="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
				<h1 class="text-2xl lg:text-3xl font-bold">
					{{ route.params.categoryName }}
				</h1>

				<div class="flex gap-4 items-center text-sm opacity-50">
					<span>
						Affiche les produits de 
						{{ (currentPage - 1) * itemsPerPage + 1 }} 
						à
						{{ Math.min(currentPage * itemsPerPage, productSheets.length) }}
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
				:class="{ 'flex justify-center items-center': productSheets.length === 0 }"
				class="h-full"
			>
				<div v-if="productSheets.length > 0">
					<ThePagination
						v-slot="{ page }"
						:item-per-page="itemsPerPage"
						:total="productSheets.length"
						:sibling-count="1"
						show-edges
						:default-page="currentPage"
						@update:page="updatePage"
						class="flex justify-center my-8"
					>
						<PaginationList
							v-slot="{ items }"
							class="flex items-center gap-1"
						>
							<PaginationFirst />

							<PaginationPrev />

							<template v-for="(item, index) in items">
								<PaginationListItem
									v-if="item.type === 'page'"
									:key="index"
									:value="item.value"
									as-child
								>
									<TheButton
										class="w-10 h-10 p-0"
										:variant="item.value === page ? 'default' : 'outline'"
									>
										{{ item.value }}
									</TheButton>
								</PaginationListItem>

								<PaginationEllipsis
									v-else
									:key="item.type"
									:index="index"
								/>
							</template>

							<PaginationNext />

							<PaginationLast />
						</PaginationList>
					</ThePagination>

					<div class="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						<ProductCard
							v-for="(product, index) in paginatedProducts"
							:key="index"
							:product="product"
							class="w-44 lg:w-64"
						/>
					</div>

					<ThePagination
						v-slot="{ page }"
						:item-per-page="itemsPerPage"
						:total="productSheets.length"
						:sibling-count="1"
						show-edges
						:default-page="currentPage"
						@update:page="updatePage"
						class="flex justify-center my-8"
					>
						<PaginationList
							v-slot="{ items }"
							class="flex items-center gap-1"
						>
							<PaginationFirst />

							<PaginationPrev />

							<template v-for="(item, index) in items">
								<PaginationListItem
									v-if="item.type === 'page'"
									:key="index"
									:value="item.value"
									as-child
								>
									<TheButton
										class="w-10 h-10 p-0"
										:variant="item.value === page ? 'default' : 'outline'"
									>
										{{ item.value }}
									</TheButton>
								</PaginationListItem>

								<PaginationEllipsis
									v-else
									:key="item.type"
									:index="index"
								/>
							</template>

							<PaginationNext />

							<PaginationLast />
						</PaginationList>
					</ThePagination>
				</div>

				<div
					v-else
					class="flex flex-col items-center gap-1 text-center"
				>
					<h2 class="text-2xl font-bold tracking-tight">
						{{ $pt("emptyTitle") }}
					</h2>

					<p class="text-sm text-muted-foreground">
						{{ $pt("emptySubtitle") }}
					</p>

					<TheButton class="mt-4">
						{{ $pt("buttonBack") }}
					</TheButton>
				</div>
			</div>
		</div>
	</section>
</template>
