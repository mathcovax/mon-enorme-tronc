<script setup lang="ts">
import type { OrganizationCommandCollection, Warehouse } from "@/lib/utils";
import { useGetCommands } from "../composables/useGetCommands";
import { useGetWarehouses } from "../composables/useGetWarehouses";
import { effect } from "vue";

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
			/>
		</div>
	</section>
</template>
