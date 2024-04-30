<script setup lang="ts">
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

const frameworks = [
	{ value: "next.js", label: "Next.js" },
	{ value: "sveltekit", label: "SvelteKit" },
	{ value: "nuxt.js", label: "Nuxt.js" },
	{ value: "remix", label: "Remix" },
	{ value: "astro", label: "Astro" },
];

const open = ref(false);
const value = ref("");
</script>

<template>
	<ThePopover v-model:open="open">
		<PopoverTrigger as-child>
			<TheButton
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				class="w-[200px] justify-between"
			>
				{{ value
					? frameworks.find((framework) => framework.value === value)?.label
					: "Select framework..." }}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</TheButton>
		</PopoverTrigger>

		<PopoverContent class="w-[200px] p-0">
			<TheCommand>
				<CommandInput
					class="h-9"
					placeholder="Search framework..."
				/>

				<CommandEmpty>No framework found.</CommandEmpty>

				<CommandList>
					<CommandGroup>
						<CommandItem
							v-for="framework in frameworks"
							:key="framework.value"
							:value="framework.value"
							@select="(ev) => {
								if (typeof ev.detail.value === 'string') {
									value = ev.detail.value
								}
								open = false
							}"
						>
							{{ framework.label }}
							<Check
								:class="cn(
									'ml-auto h-4 w-4',
									value === framework.value ? 'opacity-100' : 'opacity-0',
								)"
							/>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</TheCommand>
		</PopoverContent>
	</ThePopover>
</template>
