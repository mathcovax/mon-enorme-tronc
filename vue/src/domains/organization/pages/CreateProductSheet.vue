<script setup lang="ts">
import { useProductSheetForm } from "../composables/useProductSheetForm";

const { organizationId } = useRouteParams({ 
	organizationId: zod.string(), 

});
const { 
	ProductSheetForm, 
	checkProductSheetForm, 
	resetProductSheetForm,
	suggestedCategories,
	onSearchCategories 
} = useProductSheetForm(organizationId);
const router = useRouter();


async function submit() {

	const formFields = await checkProductSheetForm();

	if (!formFields) {
		return; 
	}

	const result = await duploTo.enriched
		.post(
			"/organization/{organizationId}/product-sheet",
			{
				name: formFields.name,
				description: formFields.description,
				shortDescription: formFields.shortDescription,
				price: formFields.price,
			},
			{ params: { organizationId: organizationId as string } }
		)
		.result;
	
	if (result.success && result.info === "product_sheet.created") {
		const promiseList: unknown[] = [];
		formFields.categories?.forEach((c) => {
			promiseList.push(
				duploTo.enriched
					.post(
						"/category/{categoryId}/product-sheet",
						{
							productSheetId: result.data
						},
						{ params: { categoryId: c.value.toString() } }
					)
					.result
			);
		});
		await Promise.all(promiseList);
		resetProductSheetForm();
	}
}

onMounted(async () => {
	if (typeof organizationId !== "string") {
		router.push({ name: routerPageName.EDITO_HOME });
	}
});

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
			{{ $t("page.createProductSheet.form.submit") }}
		</PrimaryButton>
	</ProductSheetForm>
</template>
