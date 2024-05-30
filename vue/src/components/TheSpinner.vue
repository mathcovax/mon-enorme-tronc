<script setup lang="ts">
import type { HTMLAttributes } from "vue";

interface Props {
	priority?: number
	class?: HTMLAttributes["class"]
}

const isLoading = ref(false);
const props = withDefaults(
	defineProps<Props>(),
	{
		priority: 10
	}
);

defineExpose({ isLoading });

onMounted(() => {
	watch(isLoading, (value) => {
		if (value) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, { immediate: true });
});
</script>

<template>
	<div
		v-if="isLoading"
		class="fixed w-full h-[calc(100%-6rem)] top-0 left-0 inset-0 mt-24 flex items-center justify-center bg-white"
		:style="{ zIndex: priority }"
	>
		<svg
			:class="props.class"
			class="h-10 w-10 text-primary animate-spin"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				class="opacity-25"
				stroke="currentColor"
				stroke-width="4"
				cx="12"
				cy="12"
				r="10"
			/>

			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	</div>
</template>
