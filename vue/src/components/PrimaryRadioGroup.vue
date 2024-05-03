<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Item{
	label: string
	value: string
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
			:key="index"
			class="flex items-center space-x-2"
		>
			<RadioGroupItem
				:id="`radio-${index}`"
				:value="item.value"
			/>

			<TheLabel for="r1">
				{{ item.label }}
			</TheLabel>
		</div>
	</RadioGroup>
</template>
