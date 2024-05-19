<script setup lang="ts" generic="T extends object">
import {
	TheTable,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from "@/components/ui/table";
import type { ColDef } from "./types";

interface Props {
	title?: string
	items: T[]
	cols: (ColDef<T>)[]
	currentPage?: number
}

defineProps<Props>();

const emit = defineEmits<{
	clickOnRow: [item: T], 
	clickNext: [], 
	clickPrevious: []
}>();

const slot = defineSlots<Record<string,(prop: {item: T}) => unknown | undefined>>();

</script>

<template>
	<TheTable>
		<TableCaption v-if="title">
			{{ title }}
		</TableCaption>

		<TableHeader>
			<TableRow>
				<TableHead
					v-for="(col, key) of cols"
					:key="key"
					:colspan="col.cols || 1"
				>
					{{ col.title }}
				</TableHead>
			</TableRow>
		</TableHeader>

		<TableBody>
			<TableRow
				v-for="(item, index) of items"
				:key="index"
				@click="emit('clickOnRow', item)"
			>
				<TableCell
					v-for="(col, subIndex) of cols"
					:key="subIndex"
					:colspan="col.cols || 1"
				>
					<slot
						v-if="col.slotName && slot[col.slotName]"
						:name="col.slotName"
						:item="item"
					/>

					<span v-else>
						{{ col.getter ? col.getter(item) : "null" }}
					</span>
				</TableCell>
			</TableRow>
		</TableBody>

		<TableFooter
			v-if="currentPage !== undefined"
		>
			<TableCell :colspan="Object.keys(cols as object).length">
				<div class="flex items-center justify-center w-full gap-10">
					<TheButton
						variant="ghost"
						@click="emit('clickPrevious')"
					>
						<TheIcon icon="arrow-left" />
					</TheButton>
					{{ currentPage }}
					<TheButton
						variant="ghost"
						@click="emit('clickNext')"
					>
						<TheIcon icon="arrow-right" />
					</TheButton>
				</div>
			</TableCell>
		</TableFooter>
	</TheTable>
</template>
