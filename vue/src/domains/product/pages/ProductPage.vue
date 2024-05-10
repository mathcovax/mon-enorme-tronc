<script setup lang="ts">
import NavBreadcrumb from "@/domains/navigation/components/NavBreadCrumb.vue";

const breadcrumbItems = [ // TODO: Replace with real data
	{
		title: "Catégories",
		href: "/categories"
	},
	{
		title: "Catégorie",
		href: "/category/1"
	},
	{
		title: "Produit"
	}
];
</script>

<template>
	<section>
		<div class="container mb-12 lg:mb-16">
			<NavBreadcrumb
				:breadcrumb-items="breadcrumbItems"
				class="mb-9"
			/>

			<div class="flex flex-col lg:flex-row gap-10">
				<div class="lg:shrink-0 w-full lg:w-[450px] lg:h-[530px]">
					<img
						src="https://via.placeholder.com/250"
						alt="product"
						class="w-full h-full object-cover"
					>
				</div>

				<div class="flex flex-col gap-4">
					<h1 class="text-2xl lg:text-4xl font-bold">
						Product
					</h1>

					<span class="text-xl font-semibold">XX €</span>

					<p class="mt-1 opacity-50">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Sed quia omnis eos consectetur aliquam asperiores facilis quasi illo necessitatibus assumenda,
						consequatur autem possimus quos soluta maiores non, odio similique nemo.
					</p>

					<div>
						<TheButton>Ajouter au panier</TheButton>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="container mb-12 lg:mb-16">
			<TheTabs
				default-value="product-details"
			>
				<TabsList class="mb-6 grid w-full grid-cols-2">
					<TabsTrigger value="product-details">
						Détails sur le produit
					</TabsTrigger>

					<TabsTrigger value="client-rates">
						Commentaires client
					</TabsTrigger>
				</TabsList>

				<TabsContent value="product-details">
					Détails sur le produit
				</TabsContent>

				<TabsContent value="client-rates">
					Commentaires client
				</TabsContent>
			</TheTabs>
		</div>
	</section>
</template>
