<script setup lang="ts">
import { useGetProductSheets, type ProductSheet } from "../composables/useGetProductSheets";

const { params: { organizationId } } = useRoute();
const router = useRouter();
const { productSheets, getProductSheets } = useGetProductSheets(organizationId as string);

const currentPage = ref(0);
const searchName = ref("");
const cols: BigTableColDef<ProductSheet>[] = [
	{
		title: $t("page.getProductSheets.table.cols.name"),
		getter: i => i.name
	},
	{
		title: $t("page.getProductSheets.table.cols.shortDescription"),
		getter: i => i.shortDescription
	},
	{
		title: $t("page.getProductSheets.table.cols.price"),
		getter: i => i.price
	},
	{
		title: $t("page.getProductSheets.table.cols.createdAt"),
		getter: i => i.createdAt?.split("T")[0]
	},
	{
		title: $t("page.getProductSheets.table.cols.updatedAt"),
		getter: i => i.updatedAt?.split("T")[0]
	},
	{
		title: $t("page.getProductSheets.table.cols.actions"),
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
		name: routerPageName.EDIT_PRODUCT_SHEET,
		params: {
			organizationId: organizationId as string,
			productSheetId: productSheet.id as string
		},
	});
}

getProductSheets(currentPage.value, searchName.value);
watch(searchName, () => getProductSheets(0, searchName.value));
</script>
<template>
	<div class="flex flex-col items-center w-full gap-6 p-6">
		<div class="flex justify-center w-full">
			<PrimaryInput
				class="max-w-[300px]"
				:placeholder="$t('page.getProductSheets.table.searchPlaceholder')"
				v-model="searchName"
			/>
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
