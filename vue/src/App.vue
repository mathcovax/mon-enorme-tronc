<script setup lang="ts">
import TheToaster from "@/components/ui/toast/TheToaster.vue";
</script>

<template>
	<TheLoader />

	<div class="w-full h-[100vh] overflow-auto">
		<RouterView />
	</div>

	<TheToaster	/>
</template>
