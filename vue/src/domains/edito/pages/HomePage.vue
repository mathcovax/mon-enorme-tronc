<script setup lang="ts">
import { ref } from "vue";

const products = ref([
	{
		image: "https://via.placeholder.com/250",
		title: "Petit tronc",
		description: "Pour un moment tranquille sans écorce.",
		price: "59.99€",
		url: "/products/1",
	},
	{
		image: "https://via.placeholder.com/250",
		title: "Grand tronc",
		description: "Pour un moment tranquille avec écorce.",
		price: "99.99€",
		url: "/products/2",
	},
	{
		image: "https://via.placeholder.com/250",
		title: "Tronc géant",
		description: "Pour un moment tranquille avec écorce et feuilles.",
		price: "199.99€",
		url: "/products/3",
	},
	{
		image: "https://via.placeholder.com/250",
		title: "Tronc de luxe",
		description: "Pour un moment tranquille avec écorce, feuilles et fruits.",
		price: "399.99€",
		url: "/products/4",
	},
]);
</script>

<template>
	<section class="h-screen-no-header mb-12 lg:mb-16 bg-whiteless">
		<div class="container h-full flex flex-col lg:flex-row gap-12 lg:gap-24">
			<div class="h-1/2 lg:h-full flex flex-col justify-center">
				<h1 class="text-3xl lg:text-5xl font-bold">
					Faites vous&nbsp;plaisir tout en restant naturel
				</h1>
				<p class="mt-4 text-base lg:text-lg font-medium opacity-50">
					Des produits naturels et bio pour prendre soin de vous.
				</p>
				<TheButton
					size="lg"
					class="mt-8 w-min"
				>
					Parcourir les produits
				</TheButton>
			</div>
			<div class="h-1/2 lg:h-full">
				<img
					src="https://via.placeholder.com/250"
					alt="placeholder"
					class="w-full h-full object-cover"
				>
			</div>
		</div>
	</section>
	<section>
		<div class="container mb-12 lg:mb-16 flex flex-col gap-8 lg:gap-12 items-center">
			<h2 class="text-2xl lg:text-3xl font-bold">
				Nouveautés
			</h2>
			<ScrollArea class="w-full">
				<div class="flex justify-center">
					<ProductCard
						v-for="product in products"
						:key="product.title"
						:product="product"
					/>
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<TheButton
				size="lg"
				variant="outline"
				class="w-min"
			>
				Voir plus
			</TheButton>
		</div>
	</section>
	<hr class="max-w-screen-xl h-px mx-auto my-16 border-0 bg-black opacity-10">
	<section>
		<div class="container mb-12 lg:mb-16 flex flex-col gap-8 lg:gap-12 items-center">
			<h2 class="text-2xl lg:text-3xl font-bold">
				Meilleures ventes
			</h2>
			<ScrollArea class="w-full">
				<div class="flex justify-center">
					<ProductCard
						v-for="product in products"
						:key="product.title"
						:product="product"
					/>
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<TheButton
				size="lg"
				variant="outline"
				class="w-min"
			>
				Voir plus
			</TheButton>
		</div>
	</section>
	<section class="mb-12 lg:mb-16">
		<div
			class="container max-w-240 h-192 px-6 lg:px-16 py-10 lg:py-20 flex flex-col gap-8 lg:gap-12 items-center bg-whiteless rounded-3xl"
		>
			<h2 class="text-2xl lg:text-3xl font-bold">
				Notre pack Plaisir
			</h2>
			<div
				class="w-full h-[calc(100vh-11.25rem)] lg:h-[calc(100%-5.25rem)] grid grid-cols-6 grid-rows-12 lg:grid-rows-6 gap-5"
			>
				<div class="col-span-6 lg:col-span-4 row-span-3">
					<img
						src="https://via.placeholder.com/250"
						alt="placeholder"
						class="w-full h-full object-cover rounded-2xl"
					>
				</div>
				<div class="col-span-6 lg:col-span-2 row-span-3 row-start-4 lg:row-start-1 lg:col-start-5">
					<img
						src="https://via.placeholder.com/250"
						alt="placeholder"
						class="w-full h-full object-cover rounded-2xl"
					>
				</div>
				<div class="col-span-6 lg:col-span-2 row-span-3 row-start-7 lg:row-start-4">
					<img
						src="https://via.placeholder.com/250"
						alt="placeholder"
						class="w-full h-full object-cover rounded-2xl"
					>
				</div>
				<div class="col-span-6 lg:col-span-4 row-span-3 lg:col-start-3 row-start-10 lg:row-start-4">
					<img
						src="https://via.placeholder.com/250"
						alt="placeholder"
						class="w-full h-full object-cover rounded-2xl"
					>
				</div>
			</div>
		</div>
	</section>
</template>
