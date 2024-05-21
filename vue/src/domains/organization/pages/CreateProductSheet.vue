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
	
	if (result.success && result.info === "productSheet.created") {
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
					:placeholder="$t('page.createProductSheet.form.placeholder')"
					:empty-label="$t('page.createProductSheet.form.emptyLabel')"
					:text-button="$t('page.createProductSheet.form.button')"
				/>
			</template>

			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("page.createProductSheet.form.submit") }}
			</PrimaryButton>
		</ProductSheetForm>

		<SecondaryButton @click="back">
			{{ $t("back") }}
		</secondarybutton>
	</div>
</template>
