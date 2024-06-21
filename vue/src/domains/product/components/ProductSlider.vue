<script setup lang="ts">
defineProps<{
	imageUrls: string[];
}>();
</script>

<template>
	<TheCarousel 
		:items="imageUrls"
		v-slot="imageUrl"
		:visible-items="1"
		class="TheCarousel relative w-full h-full"
	>
		<CarouselContent class="CarouselContent h-full">
			<CarouselItem class="CarouselItem h-full">
				<img
					:src="imageUrl.item"
					alt="product-image"
					class="w-full h-full object-cover"
				>
			</CarouselItem>
		</CarouselContent>

		<CarouselPrevious />

		<CarouselNext />
	</TheCarousel>
</template>
