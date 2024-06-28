<script setup lang="ts">
import type { OrganizationCommandCollection, OrganizationCommandDetailes, Warehouse } from "@/lib/utils";
import { useGetCommands } from "../composables/useGetCommands";
import { useGetWarehouses } from "../composables/useGetWarehouses";
import { effect } from "vue";
import type ThePopup from "@/components/ThePopup.vue";

const params = useRouteParams({ 
	organizationId: zod.string(), 
});
const { 
	commandRefQuery, 
	organizationCommandCollection 
} = useGetCommands(params.value.organizationId, { page: 0, warehouseId: "none" });
const {
	warehouses,
	getWarehouses,
} = useGetWarehouses(params.value.organizationId);
const $pt = usePageTranslate();
const cols: BigTableColDef<OrganizationCommandCollection[number]>[] = [
	{
		title: $pt("table.id"),
		getter: i => i.commandId,
	},
	{
		title: $pt("table.quantity"),
		getter: i => i.quantity
	},
	{
		title: $pt("table.date"),
		getter: i => i.createdAt?.split("T")[0]
	},
];
const popup = ref<InstanceType<typeof ThePopup>>();
const selectWareHouse = ref<Warehouse | null>(null);
const currentPage = computed({
	get: () => commandRefQuery.value.page ?? 1,
	set: (value: number) => {
		commandRefQuery.value.page = value;
	}
});

function next() {
	if (organizationCommandCollection.value.length < 10) {
		return;
	}
	currentPage.value++;
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	currentPage.value --;
}

effect(() => {
	commandRefQuery.value.warehouseId = selectWareHouse.value?.id ?? "0";
});

const commandDetailes = ref<OrganizationCommandDetailes>([]);
function openPopup(commandId: string) {
	popup.value?.open();

	duploTo.enriched
		.get(
			"/organization/{organizationId}/commands/{commandId}/details",
			{
				params: {
					organizationId: params.value.organizationId,
					commandId,
				}
			}
		)
		.info("organizationCommandDetailes", (data) => {
			commandDetailes.value = data;
		});
}

</script>

<template>
	<section>
		<h1 class="mb-12 text-2xl font-semibold">
			{{ $pt("title") }}
		</h1>

		<div class="flex flex-col items-center w-full gap-6 p-6">
			<PrimaryComboBox
				class="w-[300px]"
				:items="warehouses"
				:filter-function="v => v"
				:get-identifier="w => w.id"
				:get-label="w => w.name"
				@update:search-term="name => getWarehouses(0, name)"
				v-model="selectWareHouse"
				:text-button="$pt('cb.textButton')"
				:empty-label="$t('label.empty')"
				:placeholder="$pt('cb.placeholder')"
			/>

			<BigTable
				:items="organizationCommandCollection"
				:cols="cols"
				:current-page="currentPage + 1"
				@click-next="next"
				@click-previous="previous"
				@click-on-row="i => openPopup(i.commandId)"
			/>
		</div>
	</section>

	<ThePopup
		ref="popup"
		class="w-[90%]"
	>
		<template #popupContent>
			<BigTable
				:items="commandDetailes"
				:cols="[
					{
						title: $pt('table.image'),
						slotName: 'img'
					},
					{
						title: $pt('table.productSheetName'),
						getter: i => i.productSheetName
					},
					{
						title: $pt('table.productSheetId'),
						getter: i => i.productSheetId
					},
					{
						title: $pt('table.quantityRest'),
						getter: i => i.quantity - i.processQuantity
					},
					{
						title: $pt('table.quantity'),
						getter: i => i.quantity
					},
				]"
			>
				<template #img="{item}">
					<div class="aspect-square w-[100px] flex justify-center items-center col-span-2">
						<img :src="item.productSheetFirstImageUrl">
					</div>
				</template>
			</BigTable>
		</template>
	</ThePopup>
</template>
