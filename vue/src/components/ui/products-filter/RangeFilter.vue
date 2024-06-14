<script setup lang="ts">
interface Props {
	name: string;
	min: number;
	max: number;
}
const props = defineProps<Props>();
</script>
<template>
	<div
		class="flex flex-col gap-2"
	>
		<input
			type="range"
			:name="props.name"
			:min="props.min"
			:max="props.max"
		>

		<div
			class="flex justify-between"
		>
			<input
				type="number"
				:value="props.min"
				class="px-2 py-1 border"
			>

			<input
				type="number"
				:value="props.max"
				class="px-2 py-1 border"
			>
		</div>
	</div>
</template>
