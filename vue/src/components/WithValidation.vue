<script setup lang="ts">
interface Props {
	title: string,
	content?: string
}

defineProps<Props>();

const emit = defineEmits<{
	validate: []
}>();
</script>

<template>
	<ThePopup class="flex flex-col gap-4">
		<template #trigger="{ open }">
			<div @click="open">
				<slot />
			</div>
		</template>

		<template #popupContent="{ close }">
			<h2 class="text-2xl font-bold">
				{{ title }}
			</h2>

			<p class="text-base">
				{{ content }}
			</p>

			<div class="flex gap-3 justify-end">
				<TheButton
					size="lg"
					variant="secondary"
					@click="close()"
				>
					{{ $t("button.cancel") }}
				</TheButton>

				<TheButton
					size="lg"
					@click="() => { emit('validate'); close(); }"
				>
					{{ $t("button.validate") }}
				</TheButton>
			</div>
		</template>
	</ThePopup>
</template>
