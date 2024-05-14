<script setup lang="ts">
interface Props {
	btnTitle: string
	dialogTitle: string
	dialogDescription: string
	closeTitle: string
}
defineProps<Props>();
</script>

<template>
	<TheDialog>
		<DialogTrigger as-child>
			<TheButton variant="outline">
				{{ btnTitle }}
			</TheButton>
		</DialogTrigger>

		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>
					{{ dialogTitle }}
				</DialogTitle>

				<DialogDescription>
					{{ dialogDescription }}
				</DialogDescription>
			</DialogHeader>

			<div class="grid gap-4 py-4">
				<slot />
			</div>

			<DialogFooter>
				<DialogClose as-child>
					<TheButton variant="secondary">
						{{ closeTitle }}
					</TheButton>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</TheDialog>
</template>
