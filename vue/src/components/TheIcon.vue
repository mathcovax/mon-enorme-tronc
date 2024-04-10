<script setup lang="ts">
defineProps<{
	icon: string;
	size?: string;
	color?: string;
}>();
</script>

<template>
	<span :class="`mdi mdi-${icon} text-${color || 'black'} text-${size || 'base'}`" />
</template>
