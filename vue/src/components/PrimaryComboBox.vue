<script setup lang="ts" generic="T extends string | Record<string, unknown>">
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import TheButton from "@/components/ui/button/TheButton.vue";
import {
	TheCommand,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	ThePopover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
	items: T[]
	getLabel: (item: T) => string
	getIdentifier: (item: T) => string | number
	textButton: string
	placeholder: string
	emptyLabel: string
	modelValue?: unknown
	class?: string
	searchTerm?: string
	filterFunction?: (items: T[], term: string) => T[]
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:modelValue": [value: T | undefined]
	"update:searchTerm": [value: string]
}>();

const open = ref(false);

function onSelect(value: T) {
	emit("update:modelValue", value);
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
				:class="`${props.class} justify-between`"
			>
				{{ modelValue ? getLabel(modelValue as T) : textButton }}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</TheButton>
		</PopoverTrigger>

		<PopoverContent class="p-0">
			<TheCommand
				@update:search-term="(value) => emit('update:searchTerm', value)"
				:search-term="searchTerm"
				:filter-function="(filterFunction as undefined)"
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
							:key="getIdentifier(item)"
							:value="getIdentifier(item)"
							@select="onSelect(item)"
						>
							{{ getLabel(item) }}
							<Check
								:class="cn(
									'ml-auto h-4 w-4',
									modelValue && getIdentifier(modelValue as T) === getIdentifier(item) ? 'opacity-100' : 'opacity-0',
								)"
							/>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</TheCommand>
		</PopoverContent>
	</ThePopover>
</template>
