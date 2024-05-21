interface ItemMultiComBox {
	label: string,
	value: string | number
}

export function useProductSheetForm(organizationId: string, productSheetId?: string) {
	const suggestedCategories = ref<ItemMultiComBox[]>([]);
	
	function onSearchCategories(categoryName: string) {
		duploTo.enriched.
			get("/categories", { query: { name: categoryName } })
			.s((categories) => {
				suggestedCategories.value = categories.map(
					(category) => ({ label: category.name, value: category.id })
				);
			});
	}

	const { Form, checkForm, resetForm, values } = useFormBuilder({
		name: {
			type: "text",
			label: $t("page.createProductSheet.form.name.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("page.createProductSheet.form.required") })
				.max(255, { message: $t("page.createProductSheet.form.name.maxLength") })
				.min(2, { message: $t("page.createProductSheet.form.name.minLength") })
		},
		description: {
			type: "textarea",
			label: $t("page.createProductSheet.form.description.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("page.createProductSheet.form.required") })
				.min(2, { message: $t("page.createProductSheet.form.description.minLength") })
		},
		shortDescription: {
			type: "text",
			label: $t("page.createProductSheet.form.shortDescription.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("page.createProductSheet.form.required") })
				.max(255, { message: $t("page.createProductSheet.form.shortDescription.maxLength") })
				.min(2, { message: $t("page.createProductSheet.form.shortDescription.minLength") })
		},
		price: {
			type: "number",
			label: $t("page.createProductSheet.form.price.label"),
			defaultValue: 0,
			zodSchema: zod.number({ message: $t("page.createProductSheet.form.required") })
				.min(0, { message: $t("page.createProductSheet.form.price.min") })
		},
		categories: {
			type: "custom",
			defaultValue: undefined as ItemMultiComBox[] | undefined,
		}
	});

	if (productSheetId) {
		duploTo.enriched
			.get(
				"/product-sheet/{productSheetId}",
				{ params: { productSheetId } }
			)
			.info("product_sheet.found", (data) => {
				values.name.value = data.name;
				values.description.value = data.description;
				values.shortDescription.value = data.shortDescription;
				values.price.value = data.price;
			});
	
		duploTo.enriched
			.get(
				"/product-sheet/{productSheetId}/categories",
				{ params: { productSheetId } }
			)
			.info("product_sheet.categories", (data) => {
				values.categories.value = data.map(c => ({ label: c.name, value: c.id }));
			});
	}

	return {
		ProductSheetForm: Form,
		checkProductSheetForm: checkForm,
		resetProductSheetForm: resetForm,
		ProductSheetValues: values,
		onSearchCategories,
		suggestedCategories
	};
}
