<script setup lang="ts">
interface Props {
	name: string;
	values: string[];
}
const props = defineProps<Props>();
</script>
<template>
	<div>
		<label>
			{{ props.name }}
		</label>

		<input
			v-for="(value, index) in props.values"
			:key="index"
			type="checkbox"
			:value="value"
		>
	</div>
</template>
