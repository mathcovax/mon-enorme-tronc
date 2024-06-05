<script setup lang="ts">
import { marked } from "marked";
import type { CategoryProductSheet } from "@/lib/utils";
import { useGetCategoryProductImage } from "../composables/useGetCategoryProductImage";

const $pt = usePageTranslate();

const product = ref<CategoryProductSheet>({
	id: "",
	name: "",
	description: "",
	shortDescription: "",
	price: 0,
	organizationId: ""
});

const { productSheetId } = useRouteParams({ 
	productSheetId: zod.string(), 
});
const { imageUrl, getCategoryProductImage } = useGetCategoryProductImage(productSheetId);

function getProductData() {
	getCategoryProductImage();

	return duploTo.enriched
		.get(
			"/product-sheet/{productSheetId}",
			{ params: { productSheetId } }
		)
		.info("productSheet.found", (data) => {
			product.value = data;
		})
		.result;
}

function renderDescription() {
	return marked.parse(product.value.description);
}

getProductData();
</script>

<template>
	<section>
		<div class="container my-12 lg:my-16">
			<div class="flex flex-col sm:flex-row gap-10">
				<div class="lg:shrink-0 w-full max-w-80 aspect-square sm:aspect-portrait">
					<img
						v-if="!imageUrl"
						:src="imageUrl"
						alt="product"
						class="w-full h-full object-cover"
					>

					<div
						v-else
						class="w-full h-full flex items-center justify-center bg-muted/80"
					>
						<TheIcon
							icon="image-outline"
							size="3xl"
							class="text-muted-foreground"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<h1 class="text-2xl lg:text-4xl font-bold">
						{{ product.name }}
					</h1>

					<span class="text-xl font-semibold">{{ product.price }} €</span>

					<p class="mt-1 opacity-50">
						{{ product.shortDescription }}
					</p>

					<div>
						<TheButton>{{ $pt("addCartButton") }}</TheButton>
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
						{{ $pt("label.productDetails") }}
					</TabsTrigger>

					<TabsTrigger value="client-rates">
						{{ $pt("label.comments") }}
					</TabsTrigger>
				</TabsList>

				<TabsContent value="product-details">
					<div 
						class="prose" 
						v-html="renderDescription()"
					/>
				</TabsContent>

				<TabsContent value="client-rates">
					{{ $pt("label.comments") }}
				</TabsContent>
			</TheTabs>
		</div>
	</section>
</template>
