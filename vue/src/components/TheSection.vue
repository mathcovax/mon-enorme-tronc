<script setup lang="ts">
interface Props {
	title: string;
	content?: string;
	imagePath?: string;
}
defineProps<Props>();
</script>

<template>
	<div :class="['p-4 rounded-lg shadow-md overflow-hidden', $attrs.class]">
		<h2 class="text-2xl font-bold mb-4">
			<slot name="title">
				{{ title }}
			</slot>
		</h2>

		<div class="flex flex-col space-y-4 overflow-auto h-full">
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

