<script setup lang="ts">
interface Props {
	title: string;
	content?: string;
	imagePath?: string;
}
defineProps<Props>();
</script>

<template>
	<div :class="['section-container', $attrs.class]">
		<h2 class="section-title">
			<slot name="title">
				{{ title }}
			</slot>
		</h2>

		<div class="section-content">
			<slot
				name="image"
				v-if="imagePath"
			>
				<img
					:src="imagePath"
					alt="image section"
				>
			</slot>

			<slot
				name="content"
				v-if="content"
			>
				<p>{{ content }}</p>
			</slot>
		</div>
	</div>
</template>

<style scoped>
.section-container {
	@apply p-4 rounded-lg shadow-md overflow-hidden;
}

.section-title {
	@apply text-2xl font-bold mb-4;
}

.section-content {
	@apply flex flex-col space-y-4 overflow-auto;
	height: 100%;
}
</style>
