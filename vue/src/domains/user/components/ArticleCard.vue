
<script setup lang="ts">
import type { Cart } from "@/lib/utils";

// supprimer si existe déja (pas trouvé d'équivalent)
type ElementType<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never;

defineProps<{
	article: ElementType<Cart>;
	addArticle:(productSheetId: string) => void;
	removeArticle:(productSheetId: string) => void;
}>();

const updateQuantity = (amount: number, product: Product) => {
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
				<RouterLink :to="'/product/' + article.productSheetId">
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
					:quantity="product.quantity"
					@increment="updateQuantity(1, product)"
					@decrement="updateQuantity(-1, product)"
				/>
			</div>

			<p class="text-lg font-semibold">
				{{ article.price }} €
			</p>
		</CardFooter>
	</TheCard>
</template>
