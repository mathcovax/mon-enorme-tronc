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
} = useProductSheetForm();

const router = useRouter();
const $pt = usePageTranslate();

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
						"/product-sheet/{productSheetId}/category",
						{
							categoryId: c.value.toString()
						},
						{ params: { productSheetId: result.data } }
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
					:placeholder="$pt('page.createProductSheet.form.placeholder')"
					:empty-label="$pt('page.createProductSheet.form.emptyLabel')"
					:text-button="$pt('page.createProductSheet.form.button')"
				/>
			</template>

			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("button.create") }}
			</PrimaryButton>
		</ProductSheetForm>

		<SecondaryButton @click="back">
			{{ $t("back") }}
		</secondarybutton>
	</div>
</template>
