<script setup lang="ts">
interface Props {
	color?: string
}

withDefaults(
	defineProps<Props>(),
	{ color: "white" }
);
</script>

<template>
	<svg
		class="svgLoading"
		viewBox="0 0 50 50"
	>
		<circle
			class="circleLoading"
			cx="25"
			cy="25"
			r="20"
			fill="none"
		/>
	</svg>
</template>

<style scoped>
.svgLoading {
	animation: rotate 2s linear infinite;
	aspect-ratio: 1/1;
	width: 200px;
}

.svgLoading>.circleLoading {
	stroke: v-bind(color);
	stroke-width: 3px;
	stroke-linecap: round;
	animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}

	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}
</style>
