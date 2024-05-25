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
	<ThePopup>
		<template #trigger="{ open }">
			<div @click="open">
				<slot />
			</div>
		</template>

		<template #popupContent="{ close }">
			<div>
				<h2 class="mb-4 text-2xl font-bold">
					{{ title }}
				</h2>

				<p class="mb-4 text-base">
					{{ content }}
				</p>
			</div>

			<div class="flex gap-2 justify-end">
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
