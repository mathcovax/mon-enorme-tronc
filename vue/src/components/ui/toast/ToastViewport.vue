<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ToastViewport, type ToastViewportProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {

	return {
		...props,
		class: undefined,
	};
});
</script>

<template>
	<ToastViewport
		v-bind="delegatedProps"
		:class="cn('fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]', props.class)"
	/>
</template>
