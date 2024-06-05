<script setup lang="ts">
interface SliderItem {
	url: string;
	image: string;
}

defineProps<{
	items: SliderItem[];
}>();
</script>

<template>
	<TheCarousel
		:items="items.map(item => ({ url: item.url, image: item.image }))"
		:visible-items="1"
		:autoplay="4000"
	>
		<template #default="{ item }">
			<a :href="item.url">
				<img
					:src="item.image"
					alt="slider-item"
					class="w-full h-[200px] object-cover"
				>
			</a>
		</template>
	</TheCarousel>
</template>
