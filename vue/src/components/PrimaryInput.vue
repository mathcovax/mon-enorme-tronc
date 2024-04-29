<script setup lang="ts">
const emit = defineEmits<{ "update:modelValue": [value: string | number] }>();

interface Props {
	modelValue?: string | number
}

defineProps<Props>();
</script>

<template>
	<TheInput 
		@update:model-value="(value) => emit('update:modelValue', value)"
		:model-value="modelValue"
	/>
</template>
