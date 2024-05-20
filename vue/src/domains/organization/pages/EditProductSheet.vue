<script setup lang="ts">
import { useProductSheetForm } from "../composables/useProductSheetForm";

const { 
	ProductSheetForm, 
	checkProductSheetForm, 
	resetProductSheetForm 
} = useProductSheetForm();
const router = useRouter();
const { params: { organizationId, productSheetId } } = useRoute();

async function submit() {

	const formFields = await checkProductSheetForm();

	if (!formFields) {
		return; 
	}

	const result = await duploTo.enriched
		.put(
			"/organization/{organizationId}/product-sheet/{productSheetId}",
			{
				name: formFields.name,
				description: formFields.description,
				shortDescription: formFields.shortDescription,
				price: formFields.price,
			},
			{ params: { organizationId: organizationId as string, productSheetId: productSheetId as string } }
		)
		.result;

	if (result.success && result.info === "product_sheet.edited") {
		await duploTo.enriched
			.post(
				"/category/{categoryId}/product-sheet/{productSheetId}",
				{},
				{ params: { productSheetId: result.data, categoryId: formFields.categoryId } }
			)
			.info("product_sheet_to_category.created", () => {
				resetProductSheetForm();
			}); 
	}
}

onMounted(async () => {
	if (typeof organizationId !== "string" || typeof productSheetId !== "string") {
		router.push({ name: routerPageName.EDITO_HOME });
	}
});

</script>

<template>
	<ProductSheetForm @submit="submit">
		<PrimaryButton
			type="submit"
			class="col-span-12"
		>
			{{ $t("page.editProductSheet.form.submit") }}
		</PrimaryButton>
	</ProductSheetForm>
</template>
