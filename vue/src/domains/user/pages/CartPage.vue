<script setup lang="ts">
import ArticleCard from "../components/ArticleCard.vue";
import { useGetCart } from "../composables/useGetCart";

const { 
	CATEGORIES_PAGE,
} = routerPageName;
const $pt = usePageTranslate();

const { cart, getCart } = useGetCart();

const addArticle = (productSheetId: string) => 
	duploTo.enriched
		.post(
			"/article",
			{
				productSheetId,
			},
			undefined,
			{ disabledToast: true }
		)
		.then(getCart);

const removeArticle = (productSheetId: string) =>
	duploTo.enriched
		.delete(
			"/article/{productSheetId}",
			{ params: { productSheetId } }
		)
		.then(getCart);
</script>

<template>
	<section class="h-screen-no-header">
		<div class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12">
			<h1 class="text-2xl lg:text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<div
				class="mb-12 flex flex-1 justify-center rounded-lg border shadow-sm"
				:class="{ 'items-center border-dashed': cart.length === 0 }"
			>
				<div
					v-if="cart.length === 0"
					class="flex flex-col items-center gap-1 text-center"
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
							{{ $pt("browseButton") }}
						</RouterLink>
					</TheButton>
				</div>

				<ul
					v-else
					class="w-full"
				>
					<li
						v-for="article in cart"
						:key="article.productSheetId"
					>
						<ArticleCard 
							:article="article"
							@add-article="addArticle(article.productSheetId)"
							@remove-article="removeArticle(article.productSheetId)"
						/>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
