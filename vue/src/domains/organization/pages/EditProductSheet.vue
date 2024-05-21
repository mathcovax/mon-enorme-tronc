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
	onSearchCategories 
} = useProductSheetForm(organizationId, productSheetId);

const oldCategories = suggestedCategories.value.map((category) => category.value.toString());

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

	if (result.success && result.info === "product_sheet.edited") {
		const promiseList: unknown[] = [];
		formFields.categories?.forEach((c) => {
			if (!oldCategories.includes(c.value.toString())) {
				promiseList.push(
					duploTo.enriched
						.post(
							"/category/{categoryId}/product-sheet",
							{
								productSheetId
							},
							{ params: { categoryId: c.value.toString() } }
						)
						.result
				);
			}
		});
		await Promise.all(promiseList);
	}

	router.push({ name: routerPageName.GET_PRODUCT_SHEET });
}
</script>

<template>
	<ProductSheetForm @submit="submit">
		<template #categories="{onUpdate, modelValue}">
			<MultiComboBox
				:model-value="modelValue"
				@update:model-value="onUpdate"
				:items="suggestedCategories"
				@update:search-term="onSearchCategories"
				:placeholder="$t('page.editProductSheet.form')"
				:empty-label="$t('page.editProductSheet.form')"
				:text-button="$t('page.editProductSheet.form')"
			/>
		</template>
			
		<PrimaryButton
			type="submit"
			class="col-span-12"
		>
			{{ $t("page.editProductSheet.form.submit") }}
		</PrimaryButton>
	</ProductSheetForm>
</template>
