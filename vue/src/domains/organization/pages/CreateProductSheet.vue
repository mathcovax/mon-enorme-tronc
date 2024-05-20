<script setup lang="ts">
import { useProductSheetForm } from "../composables/useProductSheetForm";

const { 
	ProductSheetForm, 
	checkProductSheetForm, 
	resetProductSheetForm 
} = useProductSheetForm();
const router = useRouter();
const { params: { organizationId } } = useRoute();


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
	if (typeof organizationId !== "string") {
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
			{{ $t("page.createProductSheet.form.submit") }}
		</PrimaryButton>
	</ProductSheetForm>
</template>