<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";

const $pt = usePageTranslate();

const products = ref(
	[
		{
			id: 1,
			name: "Product 1",
			description: "Description of product 1",
			quantity: 1,
			price: 10,
			url: "#"
		},
		{
			id: 2,
			name: "Product 2",
			description: "Description of product 2",
			quantity: 1,
			price: 20,
			url: "#"
		},
	],
); // TODO: replace with real data
</script>

<template>
	<section class="h-screen-no-header">
		<div class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12">
			<h1 class="text-2xl lg:text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<div
				class="mb-12 flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
				:class="{ 'items-center': products.length === 0 }"
			>
				<div
					v-if="products.length === 0"
					class="flex flex-col items-center gap-1 text-center"
				>
					<h2 class="text-2xl font-bold tracking-tight">
						{{ $pt("emptyTitle") }}
					</h2>

					<p class="text-sm text-muted-foreground">
						{{ $pt("emptySubtitle") }}
					</p>

					<TheButton class="mt-4">
						{{ $pt("browseButton") }}
					</TheButton>
				</div>

				<ul
					v-else
					class="w-full"
				>
					<li
						v-for="product in products"
						:key="product.id"
					>
						<ProductCard 
							:product="product"
						/>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
