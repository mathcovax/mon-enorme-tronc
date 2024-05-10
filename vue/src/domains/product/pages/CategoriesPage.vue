<script setup lang="ts">
import NavBreadcrumb from "@/domains/navigation/components/NavBreadCrumb.vue";
import CategoryCard from "../components/CategoryCard.vue";

const breadcrumbItems = [ // TODO: Replace with real data
	{
		title: "Catégories",
	},
];

const categoryData = { // TODO: Replace with real data
	image: "https://picsum.photos/250",
	title: "Catégorie",
	description: "Description de la catégorie",
	url: "/categories/1",
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
				<h1 class="text-2xl lg:text-4xl font-bold">
					Catégories
				</h1>
			</div>

			<TheSeparator class="my-4" />

			<div class="flex flex-wrap justify-center">
				<CategoryCard
					v-for="category in 4"
					:product="categoryData"
					:key="category"
				/>
			</div>
		</div>
	</section>
</template>
