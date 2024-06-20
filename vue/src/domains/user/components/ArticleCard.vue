
<script setup lang="ts">
import type { Cart } from "@/lib/utils";

interface Props {
	article: Cart[number];
}

const { PRODUCT_PAGE } = routerPageName;

defineProps<Props>();
const emit = defineEmits<{
	addArticle: [];
	removeArticle: [];
	deleteArticle: [];
}>();

const updateQuantity = (amount: number, product: Cart[number]) => {
	if (amount === 1) {
		emit("addArticle");
	}
	
	if (amount === -1) {
		emit("removeArticle");
	}

	product.quantity += amount;
};
</script>

<template>
	<TheCard class="p-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center border-b transition-colors hover:bg-muted/50">
		<div class="flex gap-8 items-center">
			<CardHeader class="p-0">
				<img
					:src="article.imageUrl"
					alt="placeholder"
					width="64"
					height="64"
					class="aspect-square rounded-md object-cover"
				>
			</CardHeader>

			<CardContent class="p-0 flex flex-col gap-1">
				<RouterLink :to="{name: PRODUCT_PAGE, params: {productSheetId: article.productSheetId}}">
					<CardTitle>
						{{ article.name }}
					</CardTitle>
				</RouterLink>

				<CardDescription>
					{{ article.shortDescription }}
				</CardDescription>
			</CardContent>
		</div>

		<CardFooter class="p-0 flex items-center gap-8">
			<div class="flex items-center gap-4">
				<TheQuantity 
					:quantity="article.quantity"
					can-delete
					@increment="updateQuantity(1, article)"
					@decrement="updateQuantity(-1, article)"
				/>
			</div>

			<p class="text-lg font-semibold">
				{{ article.price * article.quantity }} €
			</p>
		</CardFooter>
	</TheCard>
</template>
