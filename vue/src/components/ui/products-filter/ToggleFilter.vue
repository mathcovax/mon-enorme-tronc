<script setup lang="ts">

const $pt = usePageTranslate();

interface Props {
	name: string;
	quantity: number;
}
const props = defineProps<Props>();
</script>
<template>
	<div
		class="flex justify-between"
	>
		<div class="flex gap-2">
			<h1 class="font-medium">
				{{ $pt(`filters.accessories.${props.name}`) }}
			</h1>

			<span class="text-gray-600">({{ props.quantity }})</span>
		</div>

		<div>
			<label
				:for="props.name"
				class="relative inline-flex items-center gap-2 cursor-pointer"
			>
				<input
					type="checkbox" 
					:id="props.name" 
					class="sr-only peer"
					:value="props.name"
				>

				<div class="w-11 h-6 bg-gray-200 dark:bg-light-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-950" />

			</label>
		</div>
	</div>
</template>
