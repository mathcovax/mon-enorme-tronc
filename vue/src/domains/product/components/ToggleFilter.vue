<script setup lang="ts">
interface Props {
	name: string;
	quantity: number;
}
const props = defineProps<Props>();
const filterValue = defineModel<"true" | undefined>("filterValue", { required: true });

function click() {
	filterValue.value = !filterValue.value === true 
		? "true" 
		: undefined;
}
</script>
<template>
	<div
		class="flex justify-between gap-2 cursor-pointer"
		@click="click"
	>
		<label
			:for="props.name"
			class="relative inline-flex items-center gap-2 cursor-pointer"
			:class="{'!cursor-not-allowed': props.quantity === 0}"
			@click="$event.stopPropagation()"
		>
			<input
				type="checkbox"
				:id="props.name" 
				class="sr-only peer"
				:disabled="props.quantity === 0"
				@click="click"
				:checked="filterValue === 'true'"
			>

			<div class="w-11 h-6 bg-gray-200 dark:bg-light-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-950" />

		</label>

		<span class="text-gray-600">({{ props.quantity }})</span>
	</div>
</template>
