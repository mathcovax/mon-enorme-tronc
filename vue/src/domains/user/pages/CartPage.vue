<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";
import { useGetItemsCart } from "../composables/useGetItemsCart";

const $pt = usePageTranslate();
const { itemsCart, getItemsCart } = useGetItemsCart();

const addProduct = (productSheetId: string) => 
	duploTo.enriched
		.post(
			"/user/article",
			{
				productSheetId,
			},
		)
		.info("article.created", () => getItemsCart());

const removeProduct = (productSheetId: string) =>
	duploTo.enriched
		.delete(
			"/article/{productSheetId}",
			{ params: { productSheetId } }
		)
		.info("article.deleted", () => getItemsCart());


getItemsCart();
</script>

<template>
	<section class="h-screen-no-header">
		<div class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12">
			<h1 class="text-2xl lg:text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<div
				class="mb-12 flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
				:class="{ 'items-center': itemsCart.length === 0 }"
			>
				<div
					v-if="itemsCart.length === 0"
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
						v-for="item in itemsCart"
						:key="item.productSheetId"
					>
						<ProductCard 
							:product="item"
							:add-product="addProduct"
							:remove-product="removeProduct"
						/>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
