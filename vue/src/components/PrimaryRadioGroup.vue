<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Item{
	label: string
	value: string
	disabled?: boolean
}

interface Props {
	modelValue?: string
	defaultValue?: string
	items: Item[]
}

defineProps<Props>();
const emit = defineEmits<{"update:modelValue": [value: string]}>();
</script>

<template>
	<RadioGroup
		:default-value="defaultValue"
		:model-value="modelValue"
		@update:model-value="(value) => emit('update:modelValue', value)"
	>
		<div
			v-for="(item, index) of items"
			:key="item.value"
			class="flex items-center space-x-2"
		>
			<RadioGroupItem
				:id="`radio-${index}`"
				:value="item.value"
				:disabled="item.disabled"
			/>

			<TheLabel :for="`radio-${index}`">
				{{ item.label }}
			</TheLabel>
		</div>
	</RadioGroup>
</template>
