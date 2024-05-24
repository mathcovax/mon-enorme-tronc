<script setup lang="ts">
import SecondaryButton from "@/components/SecondaryButton.vue";
import { useProductSheetForm } from "../composables/useProductSheetForm";
//@ts-expect-error missing déclaration vue3-markdown
import { VMarkdownEditor } from "vue3-markdown";
import "vue3-markdown/dist/style.css";

const { productSheetId, organizationId } = useRouteParams({ 
	organizationId: zod.string(), 
	productSheetId: zod.string() 
});
const { 
	ProductSheetForm, 
	checkProductSheetForm, 
	suggestedCategories,
	onSearchCategories,
	ProductSheetValues,
} = useProductSheetForm(productSheetId);
const $pt = usePageTranslate();

const router = useRouter();

async function submit() {

	const formFields = await checkProductSheetForm();

	if (!formFields) {
		return; 
	}

	const result = await duploTo.enriched
		.patch(
			"/product-sheet/{productSheetId}",
			{
				name: formFields.name,
				description: formFields.description,
				shortDescription: formFields.shortDescription,
				price: formFields.price,
			},
			{ params: { productSheetId } }
		)
		.result;

	if (result.success && result.info === "productSheet.edited") {
		const promiseList: unknown[] = [];

		formFields.categories.forEach((c) => {
			if (formFields.oldCategories?.find(({ value }) => value === c.value)) {
				return;
			}

			promiseList.push(
				duploTo.enriched
					.post(
						"/product-sheet/{productSheetId}/category",
						{
							categoryId: c.value.toString()
						},
						{ params: { productSheetId } }
					)
					.result
			);
		});

		formFields.oldCategories?.forEach((c) => {
			if (formFields.categories?.find(({ value }) => value === c.value)) {
				return;
			}

			promiseList.push(
				duploTo.enriched
					.delete(
						"/product-sheet/{productSheetId}/category/{categoryId}",
						{ params: { categoryId: c.value.toString(), productSheetId } }
					)
					.result
			);
		});

		formFields.images.forEach(item => { 
			if (!("blob" in item)) {
				return;
			}

			const formData = new FormData();
			formData.append("image", item.blob);

			promiseList.push(
				duploTo
					.post(
						"/product-sheet/{productSheetId}/image",
						formData,
						{ params: { productSheetId } }
					)
					.result
			);
		});

		formFields.oldImages?.forEach(item => { 
			if (formFields.images.find(i => item === i)) {
				return;
			}

			promiseList.push(
				duploTo.enriched
					.delete(
						"/image-product-sheet/{imageProductSheetId}",
						{ params: { imageProductSheetId: item.id } }
					)
					.result
			);
		});

		await Promise.all(promiseList);
	}

	router.push({ name: routerPageName.ORGANIZATION_GET_PRODUCT_SHEET, params: { organizationId } });
}

function back() {
	router.push({ name: routerPageName.ORGANIZATION_GET_PRODUCT_SHEET, params: { organizationId } });
}

const inputFile = ref<null | HTMLInputElement>(null);
function addImage() {
	if (!inputFile.value?.files?.[0]) {
		return; 
	}

	ProductSheetValues.images.value = [
		...ProductSheetValues.images.value, 
		{ blob: inputFile.value.files[0], url: URL.createObjectURL(inputFile.value.files[0]) }
	];
	
	inputFile.value.value = "";
}
</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-6">
		<ProductSheetForm
			@submit="submit"
			class="max-w-[500px] w-[80%]"
		>
			<template #categories="{onUpdate, modelValue}">
				<MultiComboBox
					:model-value="modelValue"
					@update:model-value="onUpdate"
					:items="suggestedCategories"
					@update:search-term="onSearchCategories"
					:placeholder="$pt('form.placeholder')"
					:empty-label="$t('label.empty')"
				/>
			</template>

			<template #description="{onUpdate, modelValue}">
				<VMarkdownEditor
					:model-value="modelValue"
					@update:model-value="onUpdate"
				/>
			</template>

			<template #images="{modelValue, onUpdate}">
				<div class="flex flex-col items-center gap-3">
					<input
						ref="inputFile"
						type="file"
						class="fixed top-full left-full"
						accept="image/png, image/jpeg"
						@input="addImage"
					>

					<SecondaryButton
						type="button"
						@click="inputFile?.click()"
						:disabled="ProductSheetValues.images.value.length > 5"
					>
						<TheIcon icon="plus" />
						{{ $pt("form.addImage") }}
					</SecondaryButton>

					<div class="w-full overflow-hidden grid grid-cols-3 grid-row-2 gap-3">
						<div
							v-for="(itemImage, index) of modelValue"
							:key="'id' in itemImage? itemImage.id : index"
							class=" w-full aspect-square overflow-hidden relative"
						>
							<TheIcon
								icon="delete"
								class="absolute top-2 right-2 rounded-sm bg-white hover:opacity-80 transition-all cursor-pointer"
								@click="onUpdate(modelValue.filter(i => i!==itemImage))"
							/>

							<img
								:src="itemImage.url"
								class="col-span-1 row-span-1"
							>
						</div>
					</div>
				</div>
			</template>
			
			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("button.save") }}
			</PrimaryButton>
		</ProductSheetForm>

		<SecondaryButton @click="back">
			{{ $t("button.back") }}
		</secondarybutton>
	</div>
</template>
