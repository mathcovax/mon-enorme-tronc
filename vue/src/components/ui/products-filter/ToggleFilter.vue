<script setup lang="ts">
interface Props {
	name: string;
	value: string;
}
const props = defineProps<Props>();
</script>
<template>
	<div>
		<label>
			{{ props.name }}
		</label>

		<input
			type="checkbox"
			:value="props.value"
		>
	</div>
</template>
