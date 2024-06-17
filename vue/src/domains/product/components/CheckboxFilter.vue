<script setup lang="ts">
interface Props {
	name: string;
	values: {
		value: string;
		quantity: number;
	}[];
}
const props = defineProps<Props>();
const checkboxValues = ref<string[]>([]);
const emits = defineEmits<{
	update: [value: string[]]
}>();

function onUpdate(valueFilter: string, value: boolean) {
	if (value) {
		checkboxValues.value.push(valueFilter);
	} else {
		checkboxValues.value = checkboxValues.value.filter(v => v !== valueFilter);
	}
}

watch(checkboxValues, () => {
	emits("update", checkboxValues.value);
}, { deep: true });

</script>
<template>
	<div>
		<div
			v-for="item in props.values"
			:key="item.value"
			class="flex gap-2 m-[0.5rem]"
		>
			<TheCheckbox
				@update:checked="onUpdate(item.value, $event)"
				:checked="checkboxValues.includes(item.value)"
				:disabled="item.quantity === 0"
			/>

			<span>{{ $t(`filters.${props.name}.${item.value}`) }}</span>

			<span :class="item.quantity === 0 ? `text-red-500` : `text-gray-500`">({{ item.quantity }})</span>
		</div>
	</div>
</template>
