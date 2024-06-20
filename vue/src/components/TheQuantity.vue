<script setup lang="ts">
interface TheQuantityProps {
	quantity: number;
	max?: number;
	canDelete?: boolean;
}
const props = defineProps<TheQuantityProps>();

const $pt = usePageTranslate();

const quantity = ref(props.quantity || 1);

const emit = defineEmits<{
	increment: [];
	decrement: [];
}>();

const increment = () => {
	if (props.max === undefined || props.max > quantity.value) {
		quantity.value++;
		emit("increment");
	}
};

const decrement = () => {
	if (quantity.value > 1) {
		quantity.value--;
		emit("decrement");
	}
};
</script>

<template>
	<div class="flex items-center gap-2">
		<TheButton
			@click="decrement"
			v-if="!canDelete || canDelete && quantity > 1"
			:disabled="quantity === 1"
			:class="quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
			class="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary text-white"
			as-child
		>
			<TheIcon icon="minus" />
		</TheButton>

		<WithValidation
			v-else
			:title="$pt('popup.title')"
			:content="$pt('popup.content')"
			class="col-span-4"
			@validate="emit('decrement')"
		>
			<TheButton
				type="button"
				class="w-[40px] h-[40px] rounded-full"
				variant="destructive"
			>
				<TheIcon icon="delete-outline" />
			</TheButton>
		</WithValidation>

		<span class="text-lg font-bold">{{ quantity }}</span>

		<TheButton
			@click="increment"
			:disabled="props.max !== undefined && props.max <= quantity"
			:class="props.max !== undefined && props.max <= quantity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
			class="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary text-white"
			as-child
		>
			<TheIcon icon="plus" />
		</TheButton>
	</div>
</template>
