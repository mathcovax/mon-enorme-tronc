<script setup lang="ts">

const $pt = usePageTranslate();

interface Props {
	name: string;
	radioIndex: number;
	values: {
		value: string;
		quantity: number;
	}[];
}
const props = defineProps<Props>();
</script>
<template>
	<div>
		<div
			v-for="(value) in props.values"
			:key="value.value"
			class="flex gap-2"
		>
			<input 
				type="radio"
				:value="value"
				:name="radioIndex.toString()"
			>

			<span>{{ $pt(`filters.targets.${value.value}`) }}</span>

			<span class="text-gray-600">({{ value.quantity }})</span>
		</div>
	</div>
</template>
