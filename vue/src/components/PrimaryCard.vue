<script setup lang="ts">
import TheCardContent from './ui/card/TheCardContent.vue';
import TheCardDescription from './ui/card/TheCardDescription.vue';
import TheCardTitle from './ui/card/TheCardTitle.vue';

export interface Product {
	image: string;
	title: string;
	description: string;
	price: string;
	url: string;
}

const props = defineProps<{
	product: Product;
}>();
</script>

<template>
	<TheCard class="w-72 border-0">
		<RouterLink :to="product.url">
			<TheCardHeader>
				<img src="https://via.placeholder.com/250" alt="placeholder" width="250" height="250"
					class="rounded-2xl" />
			</TheCardHeader>
			<TheCardContent>
				<TheCardTitle class="mb-3">
					{{ product.title }}
				</TheCardTitle>
				<TheCardDescription>
					{{ product.description }}
				</TheCardDescription>
			</TheCardContent>
			<TheCardFooter>
				<span>{{ product.price }}</span>
			</TheCardFooter>
		</RouterLink>
	</TheCard>
</template>
