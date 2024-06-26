<script setup lang="ts">
import ArticleCard from "../components/ArticleCard.vue";
import { useGetCart } from "../composables/useGetCart";

const { 
	CATEGORIES_PAGE,
	ORDER_PAGE,
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
			{ disabledToast: ["article.created"] }
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
	<section class="min-h-screen-nhm-mobile lg:min-h-screen-nhm-desktop container my-12 lg:my-16 flex flex-col gap-12">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold lg:text-3xl">
				{{ $pt("title") }}
			</h1>

			<PrimaryButton
				v-if="cart.length > 0"
				as-child
			>
				<RouterLink :to="{ name: ORDER_PAGE }">
					{{ $pt("orderButton") }}
				</RouterLink>
			</PrimaryButton>
		</div>

		<div
			v-if="cart.length === 0"
			class="flex-1 flex flex-col justify-center items-center gap-1 text-center"
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
			class="border-dashed flex flex-col rounded-lg border shadow-sm p-4 gap-4 min-h-[60vh]"
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
	</section>
</template>
