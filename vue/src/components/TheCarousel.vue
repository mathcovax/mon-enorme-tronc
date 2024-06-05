<script setup lang="ts"  generic="T extends string | Record<string, unknown>">
  
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
	<div class="carousel-container relative group">
		<div
			class="carousel overflow-hidden"
			ref="carouselContainer"
		>
			<div
				class="carousel-track flex transition-transform mg"
				:style="carouselStyle"
			>
				<div
					class="carousel-item flex-none"
					v-for="(item, index) in items"
					:key="index"
					:style="itemStyle"
				>
					<slot :item="item" />
				</div>
			</div>
		</div>

		<button
			@click="prev"
			class="carousel-btn left-0"
		>
			<TheIcon icon="chevron-left" />
		</button>

		<button
			@click="next"
			class="carousel-btn right-0"
		>
			<TheIcon icon="chevron-right" />
		</button>
	</div>
</template>
  
<style scoped>
.carousel-container {
	@apply relative;
}

.carousel {
	@apply overflow-hidden;
}

.carousel-track {
	@apply flex transition-transform;
}

.carousel-item {
	@apply flex-none;
}

.carousel-btn {
	@apply absolute top-0 bottom-0 w-12 bg-gray-700 bg-opacity-75 text-white flex items-center justify-center opacity-0 transition-opacity duration-300 h-full;

	.right-0 {
		right: 0;
	}

	.left-0 {
		left: 0;
	}
}

.carousel-btn:hover {
	@apply bg-opacity-100;
}

.carousel-container:hover .carousel-btn {
	@apply opacity-100;
}
</style>
  
