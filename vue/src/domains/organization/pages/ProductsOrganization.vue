<script setup lang="ts">
import { useGetProducts } from "../composables/useGetPorducts";
import type { Product, ProductStatus } from "@/lib/utils";
import { useProductForm } from "../composables/useProductForm";
import WithValidation from "@/components/WithValidation.vue";

const { organizationId } = useRouteParams({ 
	organizationId: zod.string(), 
});
const { products, getProducts } = useGetProducts(organizationId);
const { ProductForm, checkProductForm, resetProductForm } = useProductForm(organizationId);
const currentPage = ref(0);
const searchName = ref("");
const $pt = usePageTranslate();
const toggleBtnCreateForm = ref(false);
const statusToColor: Record<ProductStatus, string> = {
	ORDER: "orange",
	WRONG: "red",
	SOLD: "green",
	IN_STOCK: "purple",
};
const cols: BigTableColDef<Product>[] = [
	{
		title: $pt("table.ref"),
		getter: i => i.sku
	},
	{
		title: $pt("table.productSheetName"),
		getter: i => i.productSheet?.name
	},
	{
		title: $pt("table.warehouseName"),
		getter: i => i.warehouse?.name
	},
	{
		title: $pt("table.lastEdit"),
		getter: i => i.updatedAt?.split("T")[0]
	},
	{
		title: $pt("table.status"),
		slotName: "status"
	},
];

function next() {
	if (products.value.length < 10) {
		return;
	}
	getProducts(currentPage.value+=1, searchName.value);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	getProducts(currentPage.value-=1, searchName.value);
}

async function submitPost() {

	const formFields = await checkProductForm();

	if (!formFields) return;

	await duploTo.enriched
		.post(
			"/product-sheet/{productSheetId}/product",
			{
				sku: formFields.sku,
				warehouseId: formFields.warehouse
			},
			{ params: { productSheetId: formFields.productSheet } }
		)
		.info("product.created", () => {
			resetProductForm();
			getProducts(currentPage.value, searchName.value);
		});
}

async function toggleStatus(product: Product) {
	if (product.status !== "WRONG" && product.status !== "IN_STOCK") return;
	await duploTo.enriched
		.patch(
			"/product/{sku}",
			{
				status: product.status === "WRONG" ? "IN_STOCK" : "WRONG"
			},
			{ params: { sku: product.sku } }
		)
		.info("product.edited", () => {
			resetProductForm();
			getProducts(currentPage.value, searchName.value);
		});
}

function openCreateForm() {
	resetProductForm();
	toggleBtnCreateForm.value = !toggleBtnCreateForm.value;
}

const getColorForStatus = (status: ProductStatus) => {
	return statusToColor[status];
};

getProducts(currentPage.value, searchName.value);
watch(searchName, () => getProducts(0, searchName.value));
</script>

<template>
	<div class="flex flex-col items-center w-full gap-6 p-6">
		<div
			v-if="toggleBtnCreateForm"
			class="w-full flex flex-col items-center p-6 gap-6"
		>
			<ProductForm
				@submit="submitPost"
				class="max-w-[500px] w-[80%]"
			>
				<PrimaryButton
					type="submit"
					class="col-span-12"
				>
					{{ $t("button.create") }}
				</PrimaryButton>
			</ProductForm>
		</div>

		<div class="flex justify-center w-full gap-[1rem]">
			<PrimaryInput
				class="max-w-[300px]"
				:placeholder="$pt('searchPlaceholder')"
				v-model="searchName"
			/>

			<PrimaryButton @click="openCreateForm">
				<div v-if="toggleBtnCreateForm">
					<TheIcon icon="menu-down" />
					{{ $t("button.cancel") }}
				</div>

				<div v-else>
					<TheIcon icon="menu-up" />
					{{ $t("button.create") }}
				</div>
			</PrimaryButton>
		</div>

		<BigTable
			:items="products"
			:cols="cols"
			:current-page="currentPage + 1"
			@click-next="next"
			@click-previous="previous"
		>
			<template #status="{item}">
				<div>
					<WithValidation
						:title="$pt('popupWrongMessage')"
						@validate="toggleStatus(item)"
						:disabled="item.status !== 'WRONG' && item.status !== 'IN_STOCK'"
					>
						<TheSheep
							:text="$t(`productStatus.${item.status}`)"
							:color="getColorForStatus(item.status)"
						/>
					</WithValidation>
				</div>
			</template>
		</BigTable>
	</div>
</template>
