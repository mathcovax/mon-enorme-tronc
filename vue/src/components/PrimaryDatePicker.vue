<script setup lang="ts">
import {
	DateFormatter,
	getLocalTimeZone,
	parseDate
} from "@internationalized/date";

import { Calendar as CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const df = new DateFormatter("fr-FR", {
	dateStyle: "long",
});

interface Props {
	modelValue?: string
	placeholder?: string
}
const props = defineProps<Props>();
const emit = defineEmits<{"update:modelValue": [value?: string]}>();

const curretDate = computed(() => props.modelValue ? parseDate(props.modelValue) : undefined);
</script>

<template>
	<ThePopover>
		<PopoverTrigger as-child>
			<TheButton
				variant="outline"
				:class="cn(
					'justify-start text-left font-normal',
					!curretDate && 'text-muted-foreground',
				)"
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{{ curretDate ? df.format(curretDate.toDate(getLocalTimeZone())) : placeholder }}
			</TheButton>
		</PopoverTrigger>

		<PopoverContent class="w-auto p-0">
			<TheCalendar
				:model-value="curretDate"
				@update:model-value="(value) => emit('update:modelValue', value?.toString())"
				initial-focus
			/>
		</PopoverContent>
	</ThePopover>
</template>
