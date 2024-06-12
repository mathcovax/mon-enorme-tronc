<script setup lang="ts">
import { ThePagination, PaginationList, PaginationListItem } from "@/components/ui/pagination";

const emit = defineEmits<{
	update: [value: number]
}>();

const props = defineProps<{
	itemsPerPage: number,
	totalProductSheets: number,
	currentPage: number,
}>();

const newPage = ref(0);
newPage.value = props.currentPage;

const updatePage = (page: number) => {
	newPage.value = page + 1;
	emit("update", newPage.value);
};
</script>

<template>
	<ThePagination
		v-slot="{ page }"
		:item-per-page="itemsPerPage"
		:total="totalProductSheets"
		show-edges
		:default-page="currentPage"
		@update:page="updatePage(currentPage)"
		class="flex justify-center my-8"
	>
		<PaginationList
			v-slot="{ items }"
			class="flex items-center gap-1"
		>
			<PaginationFirst />

			<PaginationPrev />

			<template v-for="(item, index) in items">
				<PaginationListItem
					v-if="item.type === 'page'"
					:key="index"
					:value="item.value"
					as-child
				>
					<TheButton
						class="w-10 h-10 p-0"
						:variant="item.value === page ? 'default' : 'outline'"
					>
						{{ item.value }}
					</TheButton>
				</PaginationListItem>

				<PaginationEllipsis
					v-else
					:key="item.type"
					:index="index"
				/>
			</template>

			<PaginationNext />

			<PaginationLast />
		</PaginationList>
	</ThePagination>
</template>
