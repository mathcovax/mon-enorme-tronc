<script setup lang="ts">
import { useLoader } from "./useLoader";
const { showLoader } = useLoader();
</script>

<template>
	<div
		v-if="showLoader"
		class="fixed w-full h-full z-20 flex items-center justify-center bg-black/80"
	>
		<TheSpinner />
	</div>
</template>
