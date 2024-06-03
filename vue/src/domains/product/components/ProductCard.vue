<script setup lang="ts">
export interface Product {
	image: string;
	title: string;
	description: string;
	price: string;
	url: string;
}

defineProps<{
	product: Product;
}>();
</script>

<template>
	<TheCard class="border-0 rounded-md bg-gradient-to-b from-muted/50 to-muted">
		<RouterLink :to="product.url">
			<CardHeader>
				<img
					src="https://via.placeholder.com/250"
					alt="placeholder"
					width="250"
					height="250"
					class="rounded-2xl"
				>
			</CardHeader>

			<CardContent>
				<CardTitle class="mb-3">
					{{ product.title }}
				</CardTitle>

				<CardDescription>
					{{ product.description }}
				</CardDescription>
			</CardContent>

			<CardFooter>
				<span>{{ product.price }}</span>
			</CardFooter>
		</RouterLink>
	</TheCard>
</template>
