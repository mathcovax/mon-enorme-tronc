<script setup lang="ts">
interface Props {
	priority?: number
}

const isOpen = ref(false);
withDefaults(
	defineProps<Props>(),
	{
		priority: 10
	}
);
defineSlots<{
	trigger(prop: { open: () => void }): unknown;
	popupContent(prop: { close: () => void }): unknown;
}>();

const open = () => isOpen.value = true;
const close = () => isOpen.value = false;

defineExpose({ isOpen, open, close });
</script>

<template>
	<slot 
		name="trigger" 
		:open="open" 
	/>

	<Teleport to="#popup">
		<div 
			v-if="isOpen" 
			class="fixed w-full h-full top-0 left-0 inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center"
			:style="{ zIndex: priority }"
		>
			<div class="bg-white p-5 rounded-lg">
				<slot 
					name="popupContent" 
					:close="close" 
				/>
			</div>
		</div>
	</Teleport>
</template>
