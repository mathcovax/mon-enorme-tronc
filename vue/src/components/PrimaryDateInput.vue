<script setup lang="ts">
import { DateFieldInput, DateFieldRoot } from "radix-vue";
import { parseDate } from "@internationalized/date";

interface Props {
	modelValue?: string
}
const props = defineProps<Props>();
const emit = defineEmits<{"update:modelValue": [value?: string]}>();

const curretDate = computed(() => props.modelValue ? parseDate(props.modelValue) : undefined);
</script>

<template>
	<DateFieldRoot
		locale="fr"
		:model-value="curretDate"
		@update:model-value="(value) => emit('update:modelValue', value?.toString())"
		v-slot="{ segments }"
		class="flex select-none bg-white items-center text-center text-green10 p-1 data-[invalid]:border-red-500 rounded-md border border-input bg-background file:border-0 file:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
	>
		<template
			v-for="item in segments"
			:key="item.part"
		>
			<DateFieldInput
				v-if="item.part === 'literal'"
				:part="item.part"
			>
				{{ item.value }}
			</DateFieldInput>

			<DateFieldInput
				v-else
				:part="item.part"
				class="rounded p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
			>
				{{ item.value }}
			</DateFieldInput>
		</template>
	</DateFieldRoot>
</template>
