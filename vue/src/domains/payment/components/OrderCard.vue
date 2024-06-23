<script setup lang="ts">
import type { Cart } from "@/lib/utils";

const $pt = usePageTranslate();

interface Props {
	article: Cart[number];
}
defineProps<Props>();
</script>
<template>
	<div
		class="flex items-center w-full gap-4 p-4 border border-gray-200 rounded-lg"
	>
		<img
			:src="article.imageUrl"
			class="object-cover w-20 h-20 rounded-lg"
			:alt="`Image ${article.name}`"
		>

		<div
			class="flex flex-col gap-1"
		>
			<span
				class="text-lg"
			>
				{{ $pt("step.cart.productName", { value: article.name }) }}
			</span>

			<span
				class="text-sm"
			>{{ $pt("step.cart.quantity", { value: article.quantity }) }}</span>

			<span
				class="text-sm"
			>{{ $pt("step.cart.price", { value: article.price }) }}</span>
		</div>
	</div>
</template>
