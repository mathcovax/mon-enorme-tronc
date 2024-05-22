<script setup lang="ts">
import { useProductSheetForm } from "../composables/useProductSheetForm";

const { productSheetId, organizationId } = useRouteParams({ 
	organizationId: zod.string(), 
	productSheetId: zod.string() 
});
const { 
	ProductSheetForm, 
	checkProductSheetForm, 
	suggestedCategories,
	onSearchCategories,
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
		formFields.categories?.forEach((c) => {
			if (!formFields.oldCategories?.find(({ value }) => value === c.value)) {
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
			}
		});
		formFields.oldCategories?.forEach((c) => {
			if (!formFields.categories?.find(({ value }) => value === c.value)) {
				promiseList.push(
					duploTo.enriched
						.delete(
							"/product-sheet/{productSheetId}/category/{categoryId}",
							{ params: { categoryId: c.value.toString(), productSheetId } }
						)
						.result
				);
			}
		});
		await Promise.all(promiseList);
	}

	router.push({ name: routerPageName.ORGANIZATION_GET_PRODUCT_SHEET, params: { organizationId } });
}

function back() {
	router.push({ name: routerPageName.ORGANIZATION_GET_PRODUCT_SHEET, params: { organizationId } });
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
