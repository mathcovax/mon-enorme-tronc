<script setup lang="ts">
const emit = defineEmits<{
	close: []
}>();
</script>

<template>
	<div class="flex gap-2 items-center bg-whiteless pl-3 pr-2 rounded-sm">
		<slot />

		<TheIcon
			class="hover:scale-110 transition"
			icon="close"
			@click="emit('close')"
		/>
	</div>
</template>
