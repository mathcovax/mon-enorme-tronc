<script setup lang="ts">
import type { CategoryProductSheet } from "@/lib/utils";

const props = defineProps<{
	product: CategoryProductSheet;
}>();

const imageUrl = ref<string>("");

onBeforeMount(() => {
	const productSheetId = props.product.id;

	duploTo.enriched
		.get(
			"/product-sheet/{productSheetId}/images",
			{ params: { productSheetId } },
			{ disabledToast: ["productSheet.notfound"] }
		)
		.info("productSheet.images", (data) => {
			const itemImages = data.map(({ id, url }) => ({ id, url }));

			imageUrl.value = itemImages[itemImages.length - 1].url;
		});
});
</script>

<template>
	<TheCard class="border-0 rounded-md bg-gradient-to-b from-muted/50 to-muted">
		<RouterLink to="#">
			<CardHeader>
				<img
					v-if="imageUrl"
					:src="imageUrl"
					alt="placeholder"
					class="w-full aspect-square rounded-2xl"
				>

				<div
					v-else
					class="w-full aspect-square flex items-center justify-center rounded-2xl"
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
					{{ product.name }}
				</CardTitle>

				<CardDescription class=" w-fit">
					{{ product.shortDescription }}
				</CardDescription>
			</CardContent>

			<CardFooter>
				<span>{{ product.price }} €</span>
			</CardFooter>
		</RouterLink>
	</TheCard>
</template>
