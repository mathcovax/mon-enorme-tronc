<script setup lang="ts">
import TheToaster from "@/components/ui/toast/TheToaster.vue";

usePageTranslate();
</script>

<template>
	<RouterView />

	<TheToaster />
</template>
