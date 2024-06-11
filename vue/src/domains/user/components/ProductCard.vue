
<script setup lang="ts">
import type { ItemsCart } from "@/lib/utils";

// supprimer si existe déja (pas trouvé d'équivalent)
type ElementType<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never;

defineProps<{
	product: ElementType<ItemsCart>;
	addProduct:(productSheetId: string) => void;
	removeProduct:(productSheetId: string) => void;
}>();
</script>

<template>
	<TheCard class="p-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center border-b transition-colors hover:bg-muted/50">
		<div class="flex gap-8 items-center">
			<CardHeader class="p-0">
				<img
					:src="product.imageUrl"
					alt="placeholder"
					width="64"
					height="64"
					class="aspect-square rounded-md object-cover"
				>
			</CardHeader>

			<CardContent class="p-0 flex flex-col gap-1">
				<RouterLink :to="'/product/' + product.productSheetId">
					<CardTitle>
						{{ product.name }}
					</CardTitle>
				</RouterLink>

				<CardDescription>
					{{ product.shortDescription }}
				</CardDescription>
			</CardContent>
		</div>

		<CardFooter class="p-0 flex items-center gap-8">
			<div class="flex items-center gap-4">
				<TheButton
					class="text-xl aspect-square"
					variant="secondary"
					@click="removeProduct(product.productSheetId)"
				>
					-
				</TheButton>

				<p class="text-lg font-semibold">
					{{ product.quantity }}
				</p>

				<TheButton
					class="text-xl aspect-square"
					variant="secondary"
					@click="addProduct(product.productSheetId)"
				>
					+
				</TheButton>
			</div>

			<p class="text-lg font-semibold">
				{{ product.price }} €
			</p>
		</CardFooter>
	</TheCard>
</template>
