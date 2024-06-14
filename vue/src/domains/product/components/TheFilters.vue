<script setup lang="ts">
import type { ComputedFilter } from "@/lib/utils";

const $pt = usePageTranslate();

defineProps<{
	filters: ComputedFilter[];
}>();
</script>
<template>
	<div>
		<template
			v-for="(filter, index) in filters"
			:key="filter.name"
		>
			<ToggleFilter
				v-if="filter.type === 'TOGGLE'"
				:key="filter.name"
				:name="filter.name"
				:quantity="filter.quantity"
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
						{{ $pt(`filters.${filter.name}`) }}
					</AccordionTrigger>

					<AccordionContent>
						<CheckboxFilter
							v-if="filter.type === 'CHECKBOX'"
							:key="filter.name"
							:name="filter.name"
							:values="filter.values"
						/>

						<RangeFilter
							v-if="filter.type === 'RANGE'"
							:key="filter.name"
							:name="filter.name"
							:min="filter.min"
							:max="filter.max"
						/>

						<RadioFilter
							v-if="filter.type === 'RADIO'"
							:key="filter.name"
							:name="filter.name"
							:values="filter.values"
							:radio-index="index"
						/>
					</AccordionContent>
				</AccordionItem>
			</TheAccordion>
		</template>
	</div>
</template>
