<script setup lang="ts">
import TheToaster from "@/components/ui/toast/TheToaster.vue";
</script>

<template>
	<TheSpinner />

	<RouterView />

	<TheToaster	/>
</template>
