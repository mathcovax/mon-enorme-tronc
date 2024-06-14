<script setup lang="ts">

const $pt = usePageTranslate();

interface Props {
	name: string;
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
				type="checkbox"
				:value="value"
			>

			<span v-if="props.name === 'color'">{{ $pt(`filters.colors.${value.value}`) }}</span>

			<span v-if="props.name === 'size'">{{ $pt(`filters.sizes.${value.value}`) }}</span>

			<span v-if="props.name === 'material'">{{ $pt(`filters.materials.${value.value}`) }}</span>

			<span v-if="props.name === 'stimulation'">{{ $pt(`filters.stimulations.${value.value}`) }}</span>

			<span v-if="props.name === 'diameter'">{{ value.value }}</span>

			<span class="text-gray-600">({{ value.quantity }})</span>
		</div>
	</div>
</template>
