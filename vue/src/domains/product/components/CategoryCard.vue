<script setup lang="ts">
import type { Category } from "@/lib/utils";

const { CATEGORY_PAGE } = routerPageName;

defineProps<{
	category: Category;
}>();
</script>

<template>
	<TheCard class="border-0 rounded-md bg-gradient-to-b from-muted/50 to-muted">
		<RouterLink :to="{ name: CATEGORY_PAGE, params: { categoryName: category.name } }">
			<CardHeader>
				<img
					v-if="category.imageUrl"
					:src="category.imageUrl "
					alt="placeholder"
					class="w-full aspect-portrait rounded-2xl"
				>

				<div
					v-else
					class="flex items-center justify-center w-full aspect-portrait rounded-2xl"
				>
					<TheIcon
						icon="image-outline"
						size="3xl"
						class="text-muted-foreground"
					/>
				</div>
			</CardHeader>

			<CardContent>
				<CardTitle class="mb-3">
					{{ category.name }}
				</CardTitle>
			</CardContent>
		</RouterLink>
	</TheCard>
</template>
