<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
	ScrollAreaCorner,
	ScrollAreaRoot,
	type ScrollAreaRootProps,
	ScrollAreaViewport,
} from "radix-vue";
import ScrollBar from "./ScrollBar.vue";
import { cn } from "@/lib/utils";

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {

	return {
		...props,
		class: undefined,
	};
});
</script>

<template>
	<ScrollAreaRoot
		v-bind="delegatedProps"
		:class="cn('relative overflow-hidden', props.class)"
	>
		<ScrollAreaViewport class="h-full w-full rounded-[inherit]">
			<slot />
		</ScrollAreaViewport>

		<ScrollBar />

		<ScrollAreaCorner />
	</ScrollAreaRoot>
</template>
