<script setup lang="ts"  generic="T extends string | Record<string, unknown>">
import ButtonCarousel from "./ButtonCarousel.vue";

interface Props {
	items: T[];
	visibleItems: number;
	autoplay?: number;
}
  
const props = defineProps<Props>();

defineSlots<{
	default:(props: {item: T}) => unknown
}>();
  
const carouselContainer = ref<HTMLElement | null>(null);
const carousel = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const transitionEnabled = ref(true);
let autoplayInterval: number | null = props.autoplay || null;
  
const carouselStyle = computed(() => ({
	transform: `translateX(-${currentIndex.value * (100 / props.visibleItems)}%)`,
	transition: transitionEnabled.value ? "transform 0.5s ease" : "none",
}));
  
const itemStyle = computed(() => ({
	flex: `0 0 ${100 / props.visibleItems}%`
}));
  
const next = () => {
	transitionEnabled.value = true;
	if (currentIndex.value + props.visibleItems >= props.items.length) {
		currentIndex.value = 0;
	} else {
		currentIndex.value++;
	}
};
  
const prev = () => {
	transitionEnabled.value = true;
	if (currentIndex.value === 0) {
		currentIndex.value = props.items.length - props.visibleItems;
	} else {
		currentIndex.value--;
	}
};
  
const handleResize = () => {
	if (carouselContainer.value && carousel.value) {
		carousel.value.style.width = `${carouselContainer.value.clientWidth}px`;
	}
};

const startAutoplay = () => {
	if (autoplayInterval) {
		autoplayInterval = setInterval(() => {
			next();
		}, props.autoplay);
	}
};

const stopAutoplay = () => {
	if (autoplayInterval) {
		clearInterval(autoplayInterval);
		autoplayInterval = null;
	}
};

onMounted(() => {
	window.addEventListener("resize", handleResize);
	handleResize();
	startAutoplay();
});

onBeforeUnmount(() => {
	stopAutoplay();
	window.removeEventListener("resize", handleResize);
});
</script>

<template>
	<div class="relative group">
		<div
			class="overflow-hidden"
			ref="carouselContainer"
		>
			<div
				class="flex transition-transform"
				:style="carouselStyle"
			>
				<div
					class="flex-none"
					v-for="(item, index) in items"
					:key="index"
					:style="itemStyle"
				>
					<slot :item="item" />
				</div>
			</div>
		</div>

		<ButtonCarousel
			@click="prev"
			class="absolute top-0 left-0 h-full"
		/>

		<ButtonCarousel
			@click="next"
			class="absolute top-0 right-0 h-full rotate-180"
		/>
	</div>
</template>
