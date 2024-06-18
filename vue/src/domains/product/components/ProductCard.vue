<script setup lang="ts">
import type { FullProductSheet } from "@/lib/utils";

const { PRODUCT_PAGE } = routerPageName;

defineProps<{
	product: FullProductSheet;
}>();
</script>

<template>
	<TheCard class="border-0 rounded-md bg-gradient-to-b from-muted/50 to-muted">
		<RouterLink
			:to="{ name: PRODUCT_PAGE, params: { productSheetId: product.id } }"
			class="h-full flex flex-col"
		>
			<CardHeader>
				<img
					v-if="product.images.length > 0"
					:src="product.images[0]"
					alt="product"
					class="w-full aspect-square rounded-2xl"
				>

				<div
					v-else
					class="flex items-center justify-center w-full aspect-square rounded-2xl"
				>
					<TheIcon
						icon="image-outline"
						size="3xl"
						class="text-muted-foreground"
					/>
				</div>
			</CardHeader>

			<CardContent class="flex-1">
				<CardTitle
					class="mb-3 text-xl title-ellipsis"
					:title="product.name"
				>
					{{ product.name }}
				</CardTitle>

				<CardDescription class="w-fit description-ellipsis">
					{{ product.shortDescription }}
				</CardDescription>
			</CardContent>

			<CardFooter class="justify-end">
				<span>{{ product.price }} €</span>
			</CardFooter>
		</RouterLink>
	</TheCard>
</template>

<style scoped>
	.title-ellipsis {
		overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
	}

	.description-ellipsis {
		overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5; /* number of lines to show */
        -webkit-box-orient: vertical;
	}
</style>
