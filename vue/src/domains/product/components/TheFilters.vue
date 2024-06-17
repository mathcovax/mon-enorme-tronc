<script setup lang="ts">
import type { ComputedFilter, QueryFilters } from "@/lib/utils";
import ToggleFilter from "./ToggleFilter.vue";
import CheckboxFilter from "./CheckboxFilter.vue";
import RangeFilter from "./RangeFilter.vue";
import RadioFilter from "./RadioFilter.vue";

const filtersValue = ref<Record<string, QueryFilters[keyof QueryFilters]>>({});

defineProps<{
	filters: ComputedFilter[];
}>();
const emits = defineEmits<{
	update: [value: Record<string, QueryFilters[keyof QueryFilters]>]
}>();

watch(filtersValue, () => {
	emits("update", filtersValue.value);
}, { deep: true });
</script>
<template>
	<div
		class="flex flex-col gap-4"
	>
		<template
			v-for="(filter, index) in filters"
			:key="filter.name"
		>
			<div
				class="flex flex-col gap-2 pb-2 mb-2 border-b border-gray-200 dark:border-slate-950"
			>
				<ToggleFilter
					v-if="filter.type === 'TOGGLE'"
					:key="filter.name"
					:name="filter.name"
					:quantity="filter.quantity"
					@update="value => filtersValue[filter.name] = value"
				/>

				<TheAccordion
					type="single"
					collapsible
					class="w-full"
					v-else
				>
					<AccordionItem 
						class="border-b-0"
						:value="filter.name"
					>
						<AccordionTrigger class="hover:no-underline ">
							{{ $t(`filters.name.${filter.name}`) }}
						</AccordionTrigger>

						<AccordionContent>
							<CheckboxFilter
								v-if="filter.type === 'CHECKBOX'"
								:key="filter.name"
								:name="filter.name"
								:values="filter.values"
								@update="value => filtersValue[filter.name] = value"
							/>

							<RangeFilter
								v-if="filter.type === 'RANGE'"
								:key="filter.name"
								:name="filter.name"
								:min="filter.min"
								:max="filter.max"
								@update="value => filtersValue[filter.name] = value"
							/>

							<RadioFilter
								v-if="filter.type === 'RADIO'"
								:key="filter.name"
								:name="filter.name"
								:values="filter.values"
								:radio-index="index"
								@update="value => filtersValue[filter.name] = value"
							/>
						</AccordionContent>
					</AccordionItem>
				</TheAccordion>
			</div>
		</template>
	</div>
</template>
