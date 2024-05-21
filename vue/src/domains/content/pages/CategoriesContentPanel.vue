<script setup lang="ts">
import { useCategoryForm } from "../composables/useCategoryForm";
import { useGetCategories } from "../composables/useGetCategories";
import type { Category } from "@/lib/utils";
import type ThePopup from "@/components/ThePopup.vue";

const $pt = usePageTranslate(); 

const { 
	CategoryForm: CreateCategoryForm, 
	checkCategoryForm: checkCreateCategoryForm, 
	resetCategoryForm: resetCreateCategoryForm 
} = useCategoryForm();
const { 
	CategoryForm: PatchCategoryForm, 
	checkCategoryForm: checkPatchCategoryForm, 
	resetCategoryForm: resetPatchCategoryForm,
	valuesCategoryForm: valuesPatchCategoryForm
} = useCategoryForm();
const { categories, getCategories } = useGetCategories();
const currentPage = ref(0);
const searchName = ref("");
const popup = ref<InstanceType<typeof ThePopup>>();
const cols: BigTableColDef<Category>[] = [
	{
		title: $pt("table.col.name"),
		getter: i => i.name
	},
	{
		title: $pt("table.col.disabled"),
		slotName: "disabled", 
	},
];

async function submitCreate() {
	const formFields = await checkCreateCategoryForm();

	if (!formFields) {
		return; 
	}

	await duploTo.enriched
		.post(
			"/category",
			{ name: formFields.name, disabled: formFields.disabled }
		)
		.info("category.created", () => {
			resetCreateCategoryForm();
			getCategories(currentPage.value = 0, searchName.value = "");
		})
		.result;
}

async function submitPatch() {
	const formFields = await checkPatchCategoryForm();

	if (!formFields) {
		return; 
	}

	await duploTo.enriched
		.patch(
			"/category/{categoryName}",
			{ name: formFields.name, disabled: formFields.disabled },
			{ params: { categoryName: formFields.oldName } }
		)
		.info("category.edited", () => {
			popup.value?.close();
			resetPatchCategoryForm();
			getCategories(currentPage.value, searchName.value);
		})
		.result;
}

function next() {
	if (categories.value.length < 10) {
		return;
	}
	getCategories(currentPage.value+=1, searchName.value);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	getCategories(currentPage.value-=1, searchName.value);
}

function openPopup(category: Category) {
	valuesPatchCategoryForm.oldName.value = category.name;
	valuesPatchCategoryForm.name.value = category.name;
	valuesPatchCategoryForm.disabled.value = category.disabled;
	popup.value?.open();
}

watch(
	searchName,
	() => {
		getCategories(currentPage.value, searchName.value);
	}
);
getCategories(currentPage.value, searchName.value);
</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-10">
		<CreateCategoryForm
			@submit="submitCreate"
			class="max-w-[500px] w-[80%] items-center"
		>
			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("button.validate") }}
			</PrimaryButton>
		</CreateCategoryForm>

		<div class="flex flex-col items-center w-full gap-3">
			<PrimaryInput
				class="max-w-[300px]"
				:placeholder="$pt('table.searchPlaceholder')"
				v-model="searchName"
			/>

			<BigTable
				:items="categories"
				:cols="cols"
				:current-page="currentPage + 1"
				@click-next="next"
				@click-previous="previous"
				@click-on-row="openPopup"
			>
				<template #disabled="{item}">
					<TheIcon
						:icon="item.disabled ? 'close' : 'check'"
						:class="{
							'text-green-400': !item.disabled, 
							'text-red-400': item.disabled
						}"
					/>
				</template>
			</BigTable>
		</div>
	</div>

	<ThePopup
		ref="popup"
		class="max-w-[500px] w-[80%]"
	>
		<template #popupContent>
			<PatchCategoryForm
				@submit="submitPatch"
				class="items-center"
			>
				<template #oldName="{modelValue}">
					<span class="text-center">{{ $pt("form.oldName.label", { currentName: modelValue }) }}</span>
				</template>

				<PrimaryButton
					type="submit"
					class="col-span-12"
				>
					{{ $t("button.validate") }}
				</PrimaryButton>
			</PatchCategoryForm>
		</template>
	</ThePopup>
</template>
