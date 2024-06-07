<script setup lang="ts">
interface Props {
	name: string;
	min: number;
	max: number;
}
const props = defineProps<Props>();
</script>
<template>
	<div>
		<label>
			{{ props.name }}
		</label>

		<input
			type="range"
			:name="props.name"
			:min="props.min"
			:max="props.max"
		>
	</div>
</template>
