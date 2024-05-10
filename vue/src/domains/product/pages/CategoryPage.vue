<script setup lang="ts">
import NavBreadcrumb from "@/domains/navigation/components/NavBreadCrumb.vue";
import ProductCard from "../components/ProductCard.vue";
import { ThePagination, PaginationList, PaginationListItem } from "@/components/ui/pagination";

const breadcrumbItems = [ // TODO: Replace with real data
	{
		title: "Catégories",
		href: "/categories"
	},
	{
		title: "Catégorie",
	},
];
// TODO: Replace with real data
const productData = {
	image: "https://picsum.photos/250",
	title: "Petit tronc",
	description: "Pour un moment tranquille sans écorce.",
	price: "59.99€",
	url: "/products/1",
};
const allProducts = Array(63).fill(productData);
//
const itemsPerPage = ref(10);
const currentPage = ref(1);
const paginatedProducts = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value;
	const end = start + itemsPerPage.value;
	return allProducts.slice(start, end);
});

const updatePage = (page: number) => {
	currentPage.value = page;
	window.scrollTo(0, 0);
};
</script>

<template>
	<section>
		<div class="container mb-12 lg:mb-16">
			<NavBreadcrumb
				:breadcrumb-items="breadcrumbItems"
				class="mb-9"
			/>

			<div>
				<div class="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
					<h1 class="text-2xl lg:text-4xl font-bold">
						Catégorie
					</h1>

					<div class="flex gap-4 items-center text-sm opacity-50">
						<span>
							Affiche les produits de 
							{{ (currentPage - 1) * itemsPerPage + 1 }} 
							à
							{{ Math.min(currentPage * itemsPerPage, allProducts.length) }}
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

				<div>
					<div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						<ProductCard
							v-for="(product, index) in paginatedProducts"
							:key="index"
							:product="product"
							class="mx-auto"
						/>
					</div>

					<ThePagination
						v-slot="{ page }"
						:item-per-page="itemsPerPage"
						:total="allProducts.length"
						:sibling-count="1"
						show-edges
						:default-page="currentPage"
						@update:page="updatePage"
						class="flex justify-center mt-8"
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
			</div>
		</div>
	</section>
</template>
