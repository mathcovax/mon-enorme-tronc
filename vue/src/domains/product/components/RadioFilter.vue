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

const filterValue = defineModel<string | undefined>("filterValue", { required: true });
const items = computed(
	() => [
		...props.values.map(({ value, quantity }) => ({
			label: `${$t(`filters.values.${props.name}.${value}`)} (${quantity})`,
			value,
			disabled: quantity === 0
		})),
		{
			label: `${$t("filters.type.radio.undefined")}`,
			value: ""
		}
	]
);

</script>
<template>
	<PrimaryRadioGroup
		:items="items"
		:model-value="filterValue || ''"
		@update:model-value="value => filterValue = value || undefined"
	/>
</template>
