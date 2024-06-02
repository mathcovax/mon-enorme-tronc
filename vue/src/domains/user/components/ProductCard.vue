
<script setup lang="ts">
interface Product {
	name: string;
	description: string;
	quantity: number;
	price: number;
	url: string;
}

defineProps<{
	product: Product;

}>();
</script>

<template>
	<TheCard class="p-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center border-b transition-colors hover:bg-muted/50">
		<div class="flex gap-8 items-center">
			<CardHeader class="p-0">
				<img
					src="https://via.placeholder.com/250"
					alt="placeholder"
					width="64"
					height="64"
					class="aspect-square rounded-md object-cover"
				>
			</CardHeader>

			<CardContent class="p-0 flex flex-col gap-1">
				<RouterLink :to="product.url">
					<CardTitle>
						{{ product.name }}
					</CardTitle>
				</RouterLink>

				<CardDescription>
					{{ product.description }}
				</CardDescription>
			</CardContent>
		</div>

		<CardFooter class="p-0 flex items-center gap-8">
			<div class="flex items-center gap-4">
				<TheButton
					class="text-xl aspect-square"
					variant="secondary"
				>
					-
				</TheButton>

				<p class="text-lg font-semibold">
					{{ product.quantity }}
				</p>

				<TheButton
					class="text-xl aspect-square"
					variant="secondary"
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
