<script setup lang="ts">
interface Props {
	name: string;
	radioIndex: number;
	values: {
		value: string;
		quantity: number;
	}[];
}
const props = defineProps<Props>();
const emits = defineEmits<{
	update: [value: string | undefined]
}>();
</script>
<template>
	<div>
		<div
			v-for="item in [{value: undefined, quantity: 1}, ...props.values]"
			:key="item.value"
			class="flex gap-2 m-[0.5rem]"
		>
			<input 
				type="radio"
				:value="item"
				:name="radioIndex.toString()"
				:disabled="item.quantity === 0"
				@change="emits('update', item.value)"
			>

			<span>{{ $t(`filters.targets.${item.value}`) }}</span>

			<span
				v-if="item.value !== undefined"
				class="text-gray-600"
			>({{ item.quantity }})</span>
		</div>
	</div>
</template>
