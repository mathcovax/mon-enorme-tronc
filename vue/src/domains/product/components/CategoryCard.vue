<script setup lang="ts">
export interface Product {
	image: string;
	title: string;
	description: string;
	url: string;
}

defineProps<{
	product: Product;
}>();
</script>

<template>
	<TheCard class="w-72 border-0">
		<RouterLink :to="product.url">
			<CardHeader>
				<img
					:src="product.image"
					alt="placeholder"
					width="250"
					height="330"
					class="h-80 rounded-2xl"
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
		</RouterLink>
	</TheCard>
</template>
