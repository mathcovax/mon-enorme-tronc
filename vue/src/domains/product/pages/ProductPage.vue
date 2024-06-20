<script setup lang="ts">
import { marked } from "marked";
import type { FullProductSheet } from "@/lib/utils";
import ProductSlider from "../components/ProductSlider.vue";

const { CATEGORY_PAGE } = routerPageName;

const $pt = usePageTranslate();
const router = useRouter();
const { EDITO_HOME } = routerPageName;

const product = ref<FullProductSheet | null>(null);
const productQuantity = ref(1);

const params = useRouteParams({ 
	productSheetId: zod.string(), 
});

function getProductData() {
	return duploTo.enriched
		.get(
			"/full-product-sheet/{productSheetId}",
			{ params: { productSheetId: params.value.productSheetId } }
		)
		.info("fullProductSheet", (data) => {
			product.value = data;
		})
		.e(() => {
			router.push({ name: EDITO_HOME });
		})
		.result;
}

function createArticle() {
	duploTo.enriched.post(
		"/article",
		{ 
			productSheetId: params.value.productSheetId,
			quantity: productQuantity.value
		}
	);

	productQuantity.value = 1;
}

const renderDescription = computed(() => {
	if (!product.value) {
		return "";
	}

	return marked.parse(product.value.description);
});

getProductData();
</script>

<template>
	<section>
		<div class="container my-12 lg:my-16">
			<div
				v-if="product"
				class="flex flex-col sm:flex-row gap-10"
			>
				<div class="lg:shrink-0 w-full max-w-80 aspect-square sm:aspect-portrait">
					<ProductSlider
						v-if="product.images.length > 0"
						:image-urls="product.images"
					/>

					<div
						v-else
						class="w-full h-full flex items-center justify-center bg-muted/80"
					>
						<TheIcon
							icon="image-outline"
							size="3xl"
							class="text-muted-foreground"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<h1 class="text-2xl lg:text-4xl font-bold">
						{{ product.name }}
					</h1>

					<div class="flex flex-wrap gap-4">
						<RouterLink
							v-for="category in product.categories"
							:key="category"
							:to="{ name: CATEGORY_PAGE, params: { categoryName: category } }"
						>
							<TheBadge>
								{{ category }}
							</TheBadge>
						</RouterLink>
					</div>

					<span class="text-xl font-semibold">
						{{ product.price }} €
						(<span :class="{ 'text-red-600' : product.quantity < 10 }">{{ product.quantity < 10 ? "Plus que " : "" }}{{ product.quantity }}{{ product.quantity < 10 ? " !" : "" }}</span>)
					</span>

					<p class="mt-1 opacity-50">
						{{ product.shortDescription }}
					</p>

					<div class="mt-4 flex gap-12 items-center">
						<TheQuantity 
							:quantity="productQuantity"
							:max="product.quantity"
							@increment="productQuantity++"
							@decrement="productQuantity--"
						/>

						<PrimaryButton @click="createArticle">
							{{ $pt("addCartButton") }}
						</PrimaryButton>
					</div>

					<div class="self-end mt-auto flex gap-2 items-center">
						<span class="inline-block opacity-50">Vendu par :</span>

						<div class="flex gap-1 items-center">
							<span class="inline-block opacity-50">{{ product.organization.name }}</span>

							<img
								v-if="product.organization.logoUrl"
								:src="product.organization.logoUrl"
								alt="seller"
								class="w-8 h-8 rounded-full object-cover"
							>

							<TheIcon
								v-else
								icon="storefront-outline"
								size="lg"
								class="w-8 h-8 flex justify-center items-center bg-muted/80 text-muted-foreground p-1 rounded-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="container mb-12 lg:mb-16">
			<TheTabs
				default-value="product-details"
			>
				<TabsList class="mb-6 grid w-full grid-cols-2">
					<TabsTrigger value="product-details">
						{{ $pt("label.productDetails") }}
					</TabsTrigger>

					<TabsTrigger value="client-rates">
						{{ $pt("label.comments") }}
					</TabsTrigger>
				</TabsList>

				<TabsContent value="product-details">
					<div 
						class="prose" 
						v-html="renderDescription"
					/>
				</TabsContent>

				<TabsContent value="client-rates">
					Les commentaires arrivent bientôt !
				</TabsContent>
			</TheTabs>
		</div>
	</section>
</template>
