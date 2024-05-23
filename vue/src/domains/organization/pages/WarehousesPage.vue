<script setup lang="ts">
import { useGetWarehouses } from "../composables/useGetWarehouses";
import type { Warehouse } from "@/lib/utils";
import type ThePopup from "@/components/ThePopup.vue";
import { useWarehouseForm } from "../composables/useWarehouseForm";

const { organizationId } = useRouteParams({ 
	organizationId: zod.string(), 
});
const router = useRouter();
const { warehouses, getWarehouses } = useGetWarehouses(organizationId);
const { WarehouseForm, warehouseValues, checkWarehouseForm, resetWarehouseForm } = useWarehouseForm();
const $pt = usePageTranslate();
const currentPage = ref(0);
const searchName = ref("");
const popup = ref<InstanceType<typeof ThePopup>>();
const cols: BigTableColDef<Warehouse>[] = [
	{
		title: $t("label.lastname"),
		getter: i => i.name
	},
	{
		title: $t("label.address"),
		getter: i => i.address
	},
	{
		title: $t("label.actions"),
		slotName: "actions"
	},
];

function next() {
	if (warehouses.value.length < 10) {
		return;
	}
	getWarehouses(currentPage.value+=1, searchName.value);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	getWarehouses(currentPage.value-=1, searchName.value);
}

function redirectToCreatedPage() {
	router.push({ name: routerPageName.ORGANIZATION_CREATE_WAREHOUSE, params: { organizationId } });
}

async function submitPatch() {
	const formFields = await checkWarehouseForm();

	if (!formFields) {
		return;
	}

	if (!formFields.warehouse?.id) {
		return;
	}

	duploTo.enriched
		.patch(
			"/warehouse/{warehouseId}",
			{
				name: formFields.name,
				address: formFields.address
			},
			{ params: { warehouseId: formFields.warehouse.id } }
		).info("warehouse.edited", () => {
			resetWarehouseForm();
			getWarehouses(currentPage.value=0, searchName.value="");
			popup.value?.close();
		});
}

function openPopup(warehouse: Warehouse) {
	warehouseValues.warehouse.value = warehouse;
	warehouseValues.name.value = warehouse.name;
	warehouseValues.address.value = warehouse.address;
	popup.value?.open();
}

getWarehouses(currentPage.value, searchName.value);
watch(searchName, () => getWarehouses(0, searchName.value));
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
			:items="warehouses"
			:cols="cols"
			:current-page="currentPage + 1"
			@click-next="next"
			@click-previous="previous"
		>
			<template #actions="{item}">
				<SecondaryButton @click="openPopup(item)">
					<TheIcon icon="square-edit-outline" />
				</SecondaryButton>
			</template>
		</BigTable>
	</div>

	<ThePopup
		ref="popup"
		class="max-w-[500px] w-[80%]"
	>
		<template #popupContent>
			<WarehouseForm
				@submit="submitPatch"
				class="items-center"
			>
				<template #warehouse="{modelValue}">
					<span class="text-center">{{ modelValue?.name }}</span>
				</template>

				<PrimaryButton
					type="submit"
					class="col-span-12"
				>
					{{ $t("form.submit") }}
				</PrimaryButton>
			</WarehouseForm>
		</template>
	</ThePopup>
</template>
