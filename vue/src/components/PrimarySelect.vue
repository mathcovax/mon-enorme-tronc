<script setup lang="ts">
import {
	TheSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { HTMLAttributes } from "vue";

interface Item {
	label: string
	value: string | number
}

interface Props {
	placeholder?: string
	items: Item[]
	modelValue?: string
	class?: HTMLAttributes["class"]
}

const props = defineProps<Props>();
const emit = defineEmits<{"update:modelValue": [value: string]}>();
</script>

<template>
	<TheSelect
		:model-value="modelValue"
		@update:model-value="(value) => emit('update:modelValue', value.toString())"
	>
		<SelectTrigger :class="props.class">
			<SelectValue
				:placeholder="placeholder"
				:class="{
					'text-muted-foreground': !modelValue
				}"
			/>
		</SelectTrigger>

		<SelectContent>
			<SelectGroup>
				<SelectItem
					v-for="item of items"
					:key="item.value"
					:value="item.value.toString()"
				>
					{{ item.label }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</TheSelect>
</template>
