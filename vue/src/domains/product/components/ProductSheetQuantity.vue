<script setup lang="ts">
interface TheQuantityProps {
	quantity: number;
	max?: number;
}
const props = defineProps<TheQuantityProps>();

const emit = defineEmits<{
	increment: [];
	decrement: [];
}>();

const increment = () => {
	if (props.max === undefined || props.max > props.quantity) {
		emit("increment");
	}
};

const decrement = () => {
	if (props.quantity > 1) {
		emit("decrement");
	}
};
</script>

<template>
	<div class="flex items-center gap-2">
		<PrimaryButton
			@click="decrement"
			:disabled="quantity === 1"
			:class="quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
			class="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary text-white"
			as-child
		>
			<TheIcon icon="minus" />
		</PrimaryButton>

		<span class="text-lg font-bold">{{ quantity }}</span>

		<PrimaryButton
			@click="increment"
			:disabled="max !== undefined && max <= quantity"
			:class="max !== undefined && max <= quantity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
			class="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary text-white"
			as-child
		>
			<TheIcon icon="plus" />
		</PrimaryButton>
	</div>
</template>
