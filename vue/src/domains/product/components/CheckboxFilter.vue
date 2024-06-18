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
		class="flex gap-2 m-[0.5rem]"
	>
		<TheCheckbox
			@update:checked="onUpdate(item.value, $event)"
			:checked="!!filterValue?.includes(item.value)"
			:disabled="item.quantity === 0"
		/>

		<span>{{ $t(`filters.values.${props.name}.${item.value}`) }}</span>

		<span :class="item.quantity === 0 ? `text-red-500` : `text-gray-500`">({{ item.quantity }})</span>
	</div>
</template>
