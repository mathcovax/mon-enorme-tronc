<script setup lang="ts">
import { useGetProductSheets, type ProductSheet } from "../composables/useGetProductSheets";

const { organizationId } = useRouteParams({ 
	organizationId: zod.string(), 
});
const router = useRouter();
const { productSheets, getProductSheets } = useGetProductSheets(organizationId);
const $pt = usePageTranslate();

const currentPage = ref(0);
const searchName = ref("");
const cols: BigTableColDef<ProductSheet>[] = [
	{
		title: $t("label.lastname"),
		getter: i => i.name
	},
	{
		title: $t("label.description"),
		getter: i => i.shortDescription
	},
	{
		title: $pt("price"),
		getter: i => i.price
	},
	{
		title: $t("label.createdAt"),
		getter: i => i.createdAt?.split("T")[0]
	},
	{
		title: $t("label.updatedAt"),
		getter: i => i.updatedAt?.split("T")[0]
	},
	{
		title: $t("label.actions"),
		slotName: "actions"
	},
];

function next() {
	if (productSheets.value.length < 10) {
		return;
	}
	getProductSheets(currentPage.value+=1, searchName.value);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	getProductSheets(currentPage.value-=1, searchName.value);
}

function redirectToEditPage(productSheet: ProductSheet) {
	router.push({
		name: routerPageName.ORGANIZATION_EDIT_PRODUCT_SHEET,
		params: {
			organizationId,
			productSheetId: productSheet.id
		},
	});
}

function redirectToCreatedPage() {
	router.push({ name: routerPageName.ORGANIZATION_CREATE_PRODUCT_SHEET, params: { organizationId } });
}

getProductSheets(currentPage.value, searchName.value);
watch(searchName, () => getProductSheets(0, searchName.value));
</script>
<template>
	<div class="flex flex-col items-center w-full gap-6 p-6">
		<div class="flex justify-center w-full gap-[1rem]">
			<PrimaryInput
				class="max-w-[300px]"
				:placeholder="$pt('searchPlaceholder')"
				v-model="searchName"
			/>

			<PrimaryButton @click="redirectToCreatedPage">
				{{ $t("button.create") }}
			</PrimaryButton>
		</div>

		<BigTable
			:items="productSheets"
			:cols="cols"
			:current-page="currentPage + 1"
			@click-next="next"
			@click-previous="previous"
		>
			<template #actions="{item}">
				<SecondaryButton @click="redirectToEditPage(item)">
					<TheIcon icon="square-edit-outline" />
				</SecondaryButton>
			</template>
		</BigTable>
	</div>
</template>
