<script setup lang="ts">
import type { Item } from "./types";

interface Props {
	items: Item[]
	placeholder: string
	emptyLabel: string
	modelValue?: Item[]
	class?: string
	searchTerm?: string
}

const props = defineProps<Props>();
const emit = defineEmits<{
	"update:modelValue": [value: Item[] | undefined]
	"update:searchTerm": [value: string]
}>();
const open = ref(false);

function removeTag(value: Item["value"]) {
	emit("update:modelValue", props.modelValue?.filter(i => i.value !== value));
}

function onSelect(item: Item) {
	if (props.modelValue && props.modelValue.find(i => i.value === item.value)) {
		return; 
	}
	emit("update:modelValue", [...(props.modelValue || []), item]);
	open.value = false;
}

</script>

<template>
	<ThePopover v-model:open="open">
		<PopoverTrigger as-child>
			<TheButton
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				:class="`${props.class} h-auto !px-2 !py-0 flex gap-2`"
			>
				<div class="w-full justify-start flex overflow-y-hidden overflow-x-auto gap-2 py-2">
					<ClosingTag
						v-for="item of modelValue"
						:key="item.value"
						@close="removeTag(item.value)"
						@click="$event.stopPropagation()"
					>
						{{ item.label }}
					</ClosingTag>
				</div>

				<TheIcon icon="plus" />
			</TheButton>
		</PopoverTrigger>

		<PopoverContent class="p-0">
			<TheCommand
				@update:search-term="(value) => emit('update:searchTerm', value)"
				:search-term="searchTerm"
				:filter-function="(val) => val"
			>
				<CommandInput
					class="h-9"
					:placeholder="placeholder"
				/>

				<CommandEmpty>{{ emptyLabel }}</CommandEmpty>

				<CommandList>
					<CommandGroup>
						<CommandItem
							v-for="item in items"
							:key="item.value"
							:value="item.value"
							@select="onSelect(item)"
						>
							{{ item.label }}
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</TheCommand>
		</PopoverContent>
	</ThePopover>
</template>

<style scoped>
::-webkit-scrollbar {
	height: 0px;
}
</style>
