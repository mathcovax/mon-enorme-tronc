<script setup lang="ts">
interface Props {
	modelValue?: string
}
defineProps<Props>();
const emit = defineEmits<{"update:modelValue": [value: string]}>();
</script>

<template>
	<TheTextarea
		:model-value="modelValue"
		@update:model-value="(value) => emit('update:modelValue', value.toString())"
	/>
</template>
