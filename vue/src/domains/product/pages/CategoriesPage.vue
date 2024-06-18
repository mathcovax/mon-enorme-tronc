<script setup lang="ts">
import type { Category } from "@/lib/utils";
import CategoryCard from "../components/CategoryCard.vue";

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
	<section class="min-h-screen-no-header flex">
		<div class="grow container my-12 lg:my-16 flex flex-col gap-12">
			<h1 class="text-2xl lg:text-3xl font-bold">
				Catégories
			</h1>

			<div class="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<CategoryCard
					v-for="category in categories"
					:category="category"
					:key="category.name"
					class="max-w-80 mx-auto"
				/>
			</div>
		</div>
	</section>
</template>
