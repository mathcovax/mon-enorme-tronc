<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "radix-vue";
interface Props {
	name: string;
	min: number;
	max: number;
}
const props = defineProps<Props>();
const sliderValue = ref<number[]>([props.min, props.max]);
const emits = defineEmits<{
	update: [value: [number, number]]
}>();
</script>
<template>
	<div
		class="flex flex-col gap-4 m-[0.5rem]"
	>
		<SliderRoot
			v-model="sliderValue"
			class="relative flex items-center h-1 bg-black rounded-lg"
			:min="props.min"
			:max="props.max"
			@value-commit="emits('update', [sliderValue[0], sliderValue[1]])"
			:step="1"
		>
			<SliderTrack class="relative grow rounded-full h-[3px]">
				<SliderRange class="absolute h-full bg-black rounded-full" />
			</SliderTrack>

			<SliderThumb
				class="block w-4 h-4 bg-black rounded-full cursor-pointer"
				aria-label="Min price"
			/>

			<SliderThumb
				class="block w-4 h-4 bg-black rounded-full cursor-pointer"
				aria-label="Max price"
			/>
		</SliderRoot>

		<div
			class="flex justify-between"
		>
			<span
				class="px-2 py-1 border"
			>
				{{ sliderValue[0] }} €
			</span>

			<span
				class="px-2 py-1 border"
			>
				{{ sliderValue[1] }} €
			</span>
		</div>
	</div>
</template>
