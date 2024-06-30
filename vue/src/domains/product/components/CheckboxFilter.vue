<script setup lang="ts">
interface Values {
	value: string;
	quantity: number;
}
interface Props {
	name: string;
	values: Values[];
}
const props = defineProps<Props>();
const filterValue = defineModel<string[] | undefined>(
	"filterValue",
	{ required: true }
);


function onUpdate(valueFilter: string, value: boolean) {
	if (value) {
		filterValue.value = [...filterValue.value ?? [], valueFilter];
	} else {
		filterValue.value = filterValue.value?.filter(v => v !== valueFilter) || [];
	}
}
</script>

<template>
	<div
		v-for="item in props.values"
		:key="item.value"
		class="m-[0.5rem] flex gap-2 items-center"
	>
		<TheCheckbox
			@update:checked="onUpdate(item.value, $event)"
			:checked="!!filterValue?.includes(item.value)"
			:disabled="item.quantity === 0"
			:id="`checkbox-${item.value}`"
		/>

		<label
			:for="`checkbox-${item.value}`"
			class="text-sm font-medium"
			:class="{ 'cursor-not-allowed opacity-50': item.quantity === 0}"
		>
			{{ $t(`filters.values.${props.name}.${item.value}`) }}
			({{ item.quantity }})
		</label>
	</div>
</template>
