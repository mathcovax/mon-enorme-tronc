<script setup lang="ts">
import type { Category } from "@/lib/utils";
import CategoryCard from "../components/CategoryCard.vue";

const { EDITO_HOME } = routerPageName;
const $pt = usePageTranslate();

const categories = ref<Category[]>([]);

function getCategories() {
	duploTo.enriched.
		get("/categories")
		.info("categories", (data) => {
			categories.value = data;
		});
}

getCategories();
</script>

<template>
	<section class="min-h-screen-nhm-mobile lg:min-h-screen-nhm-desktop container my-12 lg:my-16 flex flex-col gap-12">
		<h1 class="text-2xl lg:text-3xl font-bold">
			{{ $pt("title") }}
		</h1>

		<div
			v-if="categories.length > 0"
			class="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
		>
			<CategoryCard
				v-for="category in categories"
				:category="category"
				:key="category.name"
				class="w-full max-w-80 mx-auto"
			/>
		</div>

		<div
			v-else
			class="flex-1 flex flex-col items-center justify-center gap-1 text-center"
		>
			<h2 class="text-2xl font-bold tracking-tight">
				{{ $pt("emptyTitle") }}
			</h2>

			<p class="text-sm text-muted-foreground">
				{{ $pt("emptySubtitle") }}
			</p>

			<PrimaryButton 
				class="mt-4"
				as-child
			>
				<RouterLink :to="{ name: EDITO_HOME }">
					{{ $pt("buttonBack") }}
				</RouterLink>
			</PrimaryButton>
		</div>
	</section>
</template>
