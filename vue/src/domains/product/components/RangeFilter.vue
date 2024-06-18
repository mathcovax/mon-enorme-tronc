<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "radix-vue";
interface Props {
	name: string;
	min: number;
	max: number;
}
const props = defineProps<Props>();
const sliderValue = ref<[number, number]>([props.min, props.max]);
const limits = reactive({
	max: props.max,
	min: props.min,
});

const filterValue = defineModel<[number, number] | undefined>(
	"filterValue", 
	{ required: true }
);

function commit() {
	filterValue.value = [
		sliderValue.value[0], 
		sliderValue.value[1], 
	];
}

watch(
	filterValue,
	() => {
		sliderValue.value[0] = filterValue.value?.[0] ?? props.min;
		sliderValue.value[1] = filterValue.value?.[1] ?? props.max;
	}
);
</script>
<template>
	<div
		class="flex flex-col gap-4 m-[0.5rem]"
	>
		<SliderRoot
			v-model="sliderValue"
			class="relative flex items-center h-1 bg-black rounded-lg"
			:min="limits.min"
			:max="limits.max"
			@value-commit="commit"
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
			<div class="flex gap-2 px-2 py-1 border">
				<span>{{ $t(`filters.type.range.${props.name}`, {value: sliderValue[0]}) }}</span>
			</div>

			<div class="flex gap-2 px-2 py-1 border">
				<span>{{ $t(`filters.type.range.${props.name}`, {value: sliderValue[1]}) }}</span>
			</div>
		</div>
	</div>
</template>
