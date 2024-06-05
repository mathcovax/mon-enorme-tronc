<script setup lang="ts">
import { facetType } from "@/lib/utils";
import { type FacetItem } from "../composables/useProductSheetForm";

interface Props {
	modelValue: FacetItem[];
}

const props = defineProps<Props>();
const emits = defineEmits<{
	"update:modelValue": [FacetItem[]]
}>();
const $pt = usePageTranslate();

function addFacet() {
	emits(
		"update:modelValue", 
		[...props.modelValue, { type: undefined, value: undefined }]
	);
}

function removeFacet(facet: FacetItem) {
	emits(
		"update:modelValue", 
		props.modelValue.filter(f => facet !== f)
	);
}

const usedFacetType = computed(
	() => props.modelValue.map(({ type }) => type)
);
</script>

<template>
	<div class="flex flex-col gap-3">
		<SecondaryButton
			type="button"
			@click="addFacet"
			:disabled="modelValue.length >= facetType.length"
		>
			{{ $pt("form.facet.add") }}
		</SecondaryButton>

		<div
			v-for="facet of modelValue"
			:key="facet.type"
			class="w-full grid grid-cols-12 gap-3"
		>
			<PrimarySelect
				class="col-span-5"
				:items="facetType.filter(ft => ft === facet.type || !usedFacetType.includes(ft)).map(ft => ({label: $t(`facetType.${ft}`), value: ft}))"
				v-model="facet.type"
			/>

			<PrimaryInput
				class="col-span-6"
				v-model="facet.value"
			/>

			<SecondaryButton @click="removeFacet(facet)">
				<TheIcon icon="delete" />
			</SecondaryButton>
		</div>
	</div>
</template>
