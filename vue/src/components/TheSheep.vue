<script setup lang="ts">
defineProps<{
  text: string;
  color?: string;
}>();
</script>

<template>
	<span
		:class="`inline-block px-4 py-2 border-2 b-${color || 'black'} t-${color || 'black'} rounded-3xl cursor-pointer`"
	>
		{{ text }}
	</span>
</template>

<style scoped>
	.b-red {
		border-color: red
	}
	.b-purple {
		border-color: rgb(154, 10, 194)
	}
	.b-green {
		border-color: green
	}
	.b-orange {
		border-color: orange
	}
	.t-red {
		color: red;
	}
	.t-purple {
		color:rgb(154, 10, 194)
	}
	.t-green {
		color: green
	}
	.t-orange {
		color:orange
	}
</style>
