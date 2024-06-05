<script setup lang="ts">
import type { CategoryProductSheet } from "@/lib/utils";
import { useGetCategoryProductImage } from "../composables/useGetCategoryProductImage";

const { PRODUCT_PAGE } = routerPageName;

const props = defineProps<{
	product: CategoryProductSheet;
}>();

const productSheetId = props.product.id;
const { imageUrl, getCategoryProductImage } = useGetCategoryProductImage(productSheetId);

getCategoryProductImage();
</script>

<template>
	<TheCard class="border-0 rounded-md bg-gradient-to-b from-muted/50 to-muted">
		<RouterLink :to="{ name: PRODUCT_PAGE, params: { productSheetId: product.id } }">
			<CardHeader>
				<img
					v-if="imageUrl"
					:src="imageUrl"
					alt="placeholder"
					class="w-full aspect-square rounded-2xl"
				>

				<div
					v-else
					class="w-full aspect-square flex items-center justify-center rounded-2xl"
				>
					<TheIcon
						icon="image-outline"
						size="3xl"
						class="text-muted-foreground"
					/>
				</div>
			</CardHeader>

			<CardContent>
				<CardTitle class="mb-3">
					{{ product.name }}
				</CardTitle>

				<CardDescription class=" w-fit">
					{{ product.shortDescription }}
				</CardDescription>
			</CardContent>

			<CardFooter>
				<span>{{ product.price }} €</span>
			</CardFooter>
		</RouterLink>
	</TheCard>
</template>
